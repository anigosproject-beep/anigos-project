import { createClient } from "@sanity/client"
import { NextResponse } from "next/server"

import { translateText } from "@/lib/translation-handler"

export const runtime = "nodejs"

const maxBodyBytes = 8 * 1024
const careerTextFields = [
  "title",
  "department",
  "location",
  "employmentType",
  "summary",
] as const

type CareerTranslationDocument = {
  _id: string
  _type: "careerOpening"
  title?: { id?: string }
  department?: { id?: string }
  location?: { id?: string }
  employmentType?: { id?: string }
  summary?: { id?: string }
  responsibilities?: Array<{ _key: string; id?: string }>
}

type WebhookPayload = {
  _id?: unknown
  _type?: unknown
}

export async function POST(request: Request) {
  const secret =
    process.env.SANITY_TRANSLATION_WEBHOOK_SECRET ??
    process.env.SANITY_PREVIEW_SECRET
  if (!secret) {
    console.error("Sanity translation webhook secret is not configured.")
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 }
    )
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > maxBodyBytes) {
    return NextResponse.json(
      { error: "Webhook body is too large." },
      { status: 413 }
    )
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 }
    )
  }

  let payload: WebhookPayload
  try {
    payload = (await request.json()) as WebhookPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (
    payload._type !== "careerOpening" ||
    typeof payload._id !== "string" ||
    payload._id.length === 0 ||
    payload._id.startsWith("drafts.")
  ) {
    return NextResponse.json(
      { error: "Unsupported Sanity document." },
      { status: 400 }
    )
  }

  const token = process.env.SANITY_AUTH_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6zvti7ob"
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
  if (!token || !projectId || !dataset) {
    console.error("Sanity translation webhook write configuration is incomplete.")
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 }
    )
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-09-13",
    useCdn: false,
    token,
  })

  try {
    const document = await client.fetch<CareerTranslationDocument | null>(
      `*[_id == $id && _type == "careerOpening"][0]{
        _id, _type,
        title { id },
        department { id },
        location { id },
        employmentType { id },
        summary { id },
        responsibilities[] { _key, id }
      }`,
      { id: payload._id }
    )

    if (!document) {
      return NextResponse.json({ error: "Document not found." }, { status: 404 })
    }

    const updates: Record<string, string> = {}
    for (const field of careerTextFields) {
      const source = document[field]?.id?.trim()
      if (source) {
        updates[`${field}.en`] = await translateText({
          text: source,
          sourceLocale: "id",
          targetLocale: "en",
        })
      }
    }

    for (const responsibility of document.responsibilities ?? []) {
      const source = responsibility.id?.trim()
      if (source) {
        const key = responsibility._key.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
        updates[`responsibilities[_key=="${key}"].en`] = await translateText({
          text: source,
          sourceLocale: "id",
          targetLocale: "en",
        })
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ translatedFields: 0 })
    }

    await client.patch(document._id).set(updates).commit()
    return NextResponse.json({ translatedFields: Object.keys(updates).length })
  } catch (error) {
    console.error(
      "Sanity career translation failed.",
      error instanceof Error ? error.message : "Unknown error"
    )
    return NextResponse.json(
      { error: "Translation or Sanity update failed." },
      { status: 502 }
    )
  }
}
