export type TranslationRequest = {
  text: string
  sourceLocale: "id" | "en"
  targetLocale: "id" | "en"
}

export async function translateText(request: TranslationRequest) {
  const [translatedText] = await translateTexts([request])
  return translatedText
}

export async function translateTexts(requests: TranslationRequest[]) {
  if (requests.length === 0) return []

  const sameLocale = requests.every(
    (request) => request.sourceLocale === request.targetLocale
  )
  if (sameLocale) return requests.map((request) => request.text)

  const sourceLocale = requests[0].sourceLocale
  const targetLocale = requests[0].targetLocale
  if (
    requests.some(
      (request) =>
        request.sourceLocale !== sourceLocale ||
        request.targetLocale !== targetLocale
    )
  ) {
    throw new Error("A translation batch must use one locale pair.")
  }

  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    throw new Error("DeepL is not configured. Set DEEPL_API_KEY.")
  }

  const endpoint =
    process.env.DEEPL_API_URL ?? "https://api-free.deepl.com/v2/translate"
  const body = new URLSearchParams({
    auth_key: apiKey,
    source_lang: sourceLocale === "id" ? "ID" : "EN",
    target_lang: targetLocale === "id" ? "ID" : "EN",
  })
  for (const request of requests) body.append("text", request.text)

  const response = await fetch(endpoint, {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  if (!response.ok) {
    throw new Error(`DeepL returned ${response.status}.`)
  }

  const payload = (await response.json()) as {
    translations?: Array<{ text?: string }>
  }
  const translations = payload.translations?.map((translation) => translation.text)
  if (
    !translations ||
    translations.length !== requests.length ||
    translations.some((text) => typeof text !== "string")
  ) {
    throw new Error("DeepL returned an invalid response.")
  }

  return translations as string[]
}
