export type TranslationRequest = {
  text: string
  sourceLocale: "id" | "en"
  targetLocale: "id" | "en"
}

export async function translateText(request: TranslationRequest) {
  if (request.sourceLocale === request.targetLocale) {
    return request.text
  }

  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    throw new Error("DeepL is not configured. Set DEEPL_API_KEY.")
  }

  const endpoint = process.env.DEEPL_API_URL ?? "https://api-free.deepl.com/v2/translate"
  const body = new URLSearchParams({
    auth_key: apiKey,
    text: request.text,
    source_lang: request.sourceLocale === "id" ? "ID" : "EN",
    target_lang: request.targetLocale === "id" ? "ID" : "EN",
  })

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
    translations?: Array<{ text?: unknown }>
  }
  const translatedText = payload.translations?.[0]?.text
  if (typeof translatedText !== "string") {
    throw new Error("DeepL returned an invalid response.")
  }

  return translatedText
}
