import { timingSafeEqual } from "node:crypto"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { PAGE_VISIBILITY_CACHE_TAG } from "@/lib/page-visibility"
import { SANITY_HERO_CACHE_TAG } from "@/lib/sanity-hero"
import { SANITY_HOME_CONTENT_CACHE_TAG } from "@/lib/sanity-home"
import { SANITY_MARINE_FUEL_MEDIA_CACHE_TAG } from "@/lib/sanity-marine-fuel"
import { SITE_SETTINGS_CACHE_TAG } from "@/lib/sanity-site-settings"

export const runtime = "nodejs"

const maxBodyBytes = 8 * 1024
const revalidationTargets = [
  {
    documentType: "pageVisibilitySettings",
    documentId: "pageVisibilitySettings",
    cacheTags: [PAGE_VISIBILITY_CACHE_TAG],
    profile: { expire: 0 },
  },
  {
    documentType: "homePage",
    documentId: "homePage",
    cacheTags: [SANITY_HERO_CACHE_TAG, SANITY_HOME_CONTENT_CACHE_TAG],
    profile: "max",
  },
  {
    documentType: "pageHeroEditor",
    documentId: "pageHeroEditor",
    cacheTags: [SANITY_HERO_CACHE_TAG],
    profile: "max",
  },
  {
    documentType: "pageMediaEditor",
    documentId: "pageMediaEditor",
    cacheTags: [
      SANITY_MARINE_FUEL_MEDIA_CACHE_TAG,
      SANITY_HOME_CONTENT_CACHE_TAG,
    ],
    profile: "max",
  },
  {
    documentType: "mediaAsset",
    cacheTags: [SANITY_HOME_CONTENT_CACHE_TAG],
    profile: "max",
  },
  {
    documentType: "siteSettings",
    cacheTags: [SITE_SETTINGS_CACHE_TAG],
    profile: "max",
  },
] as const

type WebhookPayload = {
  _id?: unknown
  _type?: unknown
}

function hasValidAuthorization(request: Request, secret: string) {
  const authorization = request.headers.get("authorization") ?? ""
  const expected = Buffer.from(`Bearer ${secret}`)
  const received = Buffer.from(authorization)

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  )
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_PAGE_VISIBILITY_WEBHOOK_SECRET
  if (!secret) {
    console.error("Sanity page visibility webhook secret is not configured.")
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 }
    )
  }

  if (!hasValidAuthorization(request, secret)) {
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
    const body = await request.text()
    if (Buffer.byteLength(body, "utf8") > maxBodyBytes) {
      return NextResponse.json(
        { error: "Webhook body is too large." },
        { status: 413 }
      )
    }
    payload = JSON.parse(body) as WebhookPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (typeof payload._type !== "string" || typeof payload._id !== "string") {
    return NextResponse.json(
      { error: "Unsupported Sanity document." },
      { status: 400 }
    )
  }

  const target = revalidationTargets.find(
    (entry) =>
      entry.documentType === payload._type &&
      (!("documentId" in entry) || entry.documentId === payload._id)
  )
  if (!target)
    return NextResponse.json(
      { error: "Unsupported Sanity document." },
      { status: 400 }
    )

  for (const cacheTag of target.cacheTags) {
    revalidateTag(cacheTag, target.profile)
  }

  return NextResponse.json({ revalidationScheduled: true })
}
