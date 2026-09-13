export type TranslationRequest = {
  text: string
  sourceLocale: "id" | "en"
  targetLocale: "id" | "en"
}

export async function translateText(request: TranslationRequest) {
  if (request.sourceLocale === request.targetLocale) {
    return request.text
  }

  const endpoint = process.env.TRANSLATION_API_URL
  const apiKey = process.env.TRANSLATION_API_KEY

  if (!endpoint || !apiKey) {
    throw new Error(
      "Translation provider is not configured. Set TRANSLATION_API_URL and TRANSLATION_API_KEY."
    )
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Translation provider returned ${response.status}.`)
  }

  const payload = (await response.json()) as { translatedText?: unknown }
  if (typeof payload.translatedText !== "string") {
    throw new Error("Translation provider returned an invalid response.")
  }

  return payload.translatedText
}
