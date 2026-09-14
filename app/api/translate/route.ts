import { NextResponse } from "next/server"

import { translateText, type TranslationRequest } from "@/lib/translation-handler"

const maxBodyBytes = 16 * 1024
const maxTextLength = 5000

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > maxBodyBytes) {
    return NextResponse.json({ error: "Translation request is too large." }, { status: 413 })
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 })
  }

  let body: Partial<TranslationRequest>
  try {
    body = (await request.json()) as Partial<TranslationRequest>
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (
    typeof body.text !== "string" ||
    body.text.length === 0 ||
    body.text.length > maxTextLength ||
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
