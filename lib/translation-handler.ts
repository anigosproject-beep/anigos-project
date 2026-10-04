import { createHash } from "node:crypto"

export type TranslationRequest = {
  text: string
  sourceLocale: "id" | "en"
  targetLocale: "id" | "en"
}

const maxTextLength = 5000
const maxBatchItems = 20
const maxBatchCharacters = 80_000
const maxCachedTranslations = 256
const translationCache = new Map<string, string>()
const inFlightTranslations = new Map<string, Promise<string>>()

export async function translateText(request: TranslationRequest) {
  const [translatedText] = await translateTexts([request])
  return translatedText
}

export async function translateTexts(requests: TranslationRequest[]) {
  if (requests.length === 0) return []

  for (const request of requests) {
    if (
      typeof request.text !== "string" ||
      request.text.length === 0 ||
      request.text.length > maxTextLength
    ) {
      throw new Error(
        "Translation text is empty or exceeds the 5000-character limit."
      )
    }
  }

  const promisesByKey = new Map<string, Promise<string>>()
  const pending = new Map<string, TranslationRequest>()

  for (const request of requests) {
    const key = getCacheKey(request)
    if (promisesByKey.has(key)) continue

    if (request.sourceLocale === request.targetLocale) {
      promisesByKey.set(key, Promise.resolve(request.text))
      continue
    }

    const cached = translationCache.get(key)
    if (cached !== undefined) {
      translationCache.delete(key)
      translationCache.set(key, cached)
      promisesByKey.set(key, Promise.resolve(cached))
      continue
    }

    const inFlight = inFlightTranslations.get(key)
    if (inFlight) {
      promisesByKey.set(key, inFlight)
      continue
    }

    pending.set(key, request)
  }

  const pendingEntries = [...pending.entries()]
  for (const batch of chunkRequests(pendingEntries)) {
    const batchPromise = translateBatch(batch.map(([, request]) => request))

    batch.forEach(([key], index) => {
      const translationPromise = batchPromise
        .then((translations) => {
          const translation = translations[index]
          if (typeof translation !== "string") {
            throw new Error(
              "Translation provider returned an invalid response."
            )
          }

          rememberTranslation(key, translation)
          return translation
        })
        .finally(() => {
          if (inFlightTranslations.get(key) === translationPromise) {
            inFlightTranslations.delete(key)
          }
        })

      inFlightTranslations.set(key, translationPromise)
      promisesByKey.set(key, translationPromise)
    })
  }

  return Promise.all(
    requests.map((request) => {
      const promise = promisesByKey.get(getCacheKey(request))
      if (!promise) throw new Error("Translation request was not scheduled.")
      return promise
    })
  )
}

function chunkRequests(entries: Array<[string, TranslationRequest]>) {
  const batches: Array<Array<[string, TranslationRequest]>> = []
  let batch: Array<[string, TranslationRequest]> = []
  let characterCount = 0

  for (const entry of entries) {
    const textLength = entry[1].text.length
    if (
      batch.length > 0 &&
      (batch.length >= maxBatchItems ||
        characterCount + textLength > maxBatchCharacters)
    ) {
      batches.push(batch)
      batch = []
      characterCount = 0
    }

    batch.push(entry)
    characterCount += textLength
  }

  if (batch.length > 0) batches.push(batch)
  return batches
}

async function translateBatch(requests: TranslationRequest[]) {
  const sourceLocale = requests[0]?.sourceLocale
  const targetLocale = requests[0]?.targetLocale
  if (!sourceLocale || !targetLocale) return []
  if (
    requests.some(
      (request) =>
        request.sourceLocale !== sourceLocale ||
        request.targetLocale !== targetLocale
    )
  ) {
    throw new Error(
      "A translation batch must use one source and target language."
    )
  }

  const deeplKey = process.env.DEEPL_API_KEY
  if (deeplKey) {
    return translateWithDeepL(requests, deeplKey, sourceLocale, targetLocale)
  }

  const endpoint = process.env.TRANSLATION_API_URL
  const apiKey = process.env.TRANSLATION_API_KEY
  if (!endpoint || !apiKey) {
    throw new Error(
      "Translation provider is not configured. Set DEEPL_API_KEY or the legacy TRANSLATION_API_URL and TRANSLATION_API_KEY."
    )
  }

  return Promise.all(
    requests.map(async (request) => {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`Translation provider returned ${response.status}.`)
      }

      const payload: unknown = await response.json()
      if (
        typeof payload !== "object" ||
        payload === null ||
        !("translatedText" in payload) ||
        typeof payload.translatedText !== "string"
      ) {
        throw new Error("Translation provider returned an invalid response.")
      }

      return payload.translatedText
    })
  )
}

async function translateWithDeepL(
  requests: TranslationRequest[],
  apiKey: string,
  sourceLocale: "id" | "en",
  targetLocale: "id" | "en"
) {
  const endpoint =
    process.env.DEEPL_API_URL ??
    (apiKey.endsWith(":fx")
      ? "https://api-free.deepl.com/v2/translate"
      : "https://api.deepl.com/v2/translate")
  const body = new URLSearchParams({
    source_lang: sourceLocale.toUpperCase(),
    target_lang: targetLocale.toUpperCase(),
    preserve_formatting: "1",
  })
  for (const request of requests) body.append("text", request.text)

  const response = await fetch(endpoint, {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })

  if (!response.ok) {
    throw new Error(`DeepL returned ${response.status}.`)
  }

  const payload: unknown = await response.json()
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("translations" in payload) ||
    !Array.isArray(payload.translations) ||
    payload.translations.length !== requests.length ||
    payload.translations.some(
      (translation) =>
        typeof translation !== "object" ||
        translation === null ||
        !("text" in translation) ||
        typeof translation.text !== "string"
    )
  ) {
    throw new Error("DeepL returned an invalid response.")
  }

  return payload.translations.map((translation) => translation.text)
}

function getCacheKey(request: TranslationRequest) {
  return createHash("sha256")
    .update(`${request.sourceLocale}\0${request.targetLocale}\0${request.text}`)
    .digest("hex")
}

function rememberTranslation(key: string, translation: string) {
  translationCache.delete(key)
  translationCache.set(key, translation)

  if (translationCache.size > maxCachedTranslations) {
    const oldestKey = translationCache.keys().next().value
    if (oldestKey) translationCache.delete(oldestKey)
  }
}
