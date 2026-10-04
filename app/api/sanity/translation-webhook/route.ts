import { createClient } from "@sanity/client"
import { NextResponse } from "next/server"

import {
  isSupportedTranslationDocumentType,
  translateSanityDocument,
} from "@/lib/sanity-translation"
import { assertSanityTarget, sanityTarget } from "@/shared/sanity-target"

export const runtime = "nodejs"

assertSanityTarget(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_DATASET
)
const { projectId, dataset } = sanityTarget

const maxBodyBytes = 8 * 1024

type WebhookPayload = {
  _id?: unknown
  _type?: unknown
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_TRANSLATION_WEBHOOK_SECRET
  if (!secret) {
    console.error("Sanity translation webhook secret is not configured.")
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 }
    )
  }

  if (!matchesWebhookAuthorization(request, secret)) {
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

  let body: string
  try {
    body = await request.text()
  } catch {
    return NextResponse.json(
      { error: "Unable to read webhook body." },
      { status: 400 }
    )
  }
  if (new TextEncoder().encode(body).byteLength > maxBodyBytes) {
    return NextResponse.json(
      { error: "Webhook body is too large." },
      { status: 413 }
    )
  }

  let payload: WebhookPayload
  try {
    payload = JSON.parse(body) as WebhookPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (
    typeof payload._id !== "string" ||
    payload._id.length === 0 ||
    payload._id.startsWith("drafts.") ||
    !isSupportedTranslationDocumentType(payload._type)
  ) {
    return NextResponse.json(
      { error: "Unsupported Sanity document." },
      { status: 400 }
    )
  }

  const token = process.env.SANITY_AUTH_TOKEN
  if (!token) {
    console.error(
      "Sanity translation webhook write configuration is incomplete."
    )
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
    const document = await client.fetch<{
      _id: string
      _type: string
      _rev: string
      [key: string]: unknown
    } | null>(
      '*[_id == $id && _type == $type && !(_id in path("drafts.**"))][0]',
      { id: payload._id, type: payload._type }
    )

    if (!document) {
      return NextResponse.json(
        { error: "Document not found." },
        { status: 404 }
      )
    }

    const result = await translateSanityDocument(client, document)
    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error(
      "Sanity document translation failed.",
      error instanceof Error ? error.message : "Unknown error"
    )
    return NextResponse.json(
      { error: "Translation or Sanity update failed." },
      { status: 502 }
    )
  }
}

function matchesWebhookAuthorization(request: Request, secret: string) {
  const expected = `Bearer ${secret}`
  const provided = request.headers.get("authorization") ?? ""
  if (provided.length !== expected.length) return false

  let mismatch = 0
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= expected.charCodeAt(index) ^ provided.charCodeAt(index)
  }
  return mismatch === 0
}
