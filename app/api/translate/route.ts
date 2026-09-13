import { NextResponse } from "next/server"

import { translateText, type TranslationRequest } from "@/lib/translation-handler"

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TranslationRequest>

  if (
    typeof body.text !== "string" ||
    (body.sourceLocale !== "id" && body.sourceLocale !== "en") ||
    (body.targetLocale !== "id" && body.targetLocale !== "en")
  ) {
    return NextResponse.json({ error: "Invalid translation request." }, { status: 400 })
  }

  try {
    const translatedText = await translateText(body as TranslationRequest)
    return NextResponse.json({ translatedText })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Translation failed."
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
