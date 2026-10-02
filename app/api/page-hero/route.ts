import { NextRequest, NextResponse } from "next/server"

import { isSanityAvailabilityError, sanityImageUrl } from "@/lib/sanity-client"
import { getSanityPageHeroDocument } from "@/lib/sanity-hero"

type PageHeroContent = {
  image?: string
  eyebrow?: string
  title?: string
  description?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function localizedValue(value: unknown, lang: "id" | "en"): string | undefined {
  if (!isRecord(value)) return undefined

  const selected = value[lang]
  const fallback = value.id
  if (typeof selected === "string" && selected.trim()) return selected
  if (typeof fallback === "string" && fallback.trim()) return fallback
  return undefined
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page")
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  if (!page) {
    return NextResponse.json(
      { error: "Page key wajib diisi." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    )
  }

  if (page.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page)) {
    return NextResponse.json(
      { error: "Page key tidak valid." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    )
  }

  const fieldName = `pageHero_${page.replaceAll("-", "_")}`
  let document: Record<string, unknown> | null
  try {
    document = await getSanityPageHeroDocument()
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Sanity Page Hero is unavailable; using the page fallback.",
        error
      )
      return NextResponse.json(null, {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Source": "fallback",
        },
      })
    }

    console.error("Failed to load Sanity Page Hero.", error)
    return NextResponse.json(
      { error: "Gagal memuat konten Page Hero." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }

  const hero = document?.[fieldName]

  if (!isRecord(hero)) {
    return NextResponse.json(null, { headers: { "Cache-Control": "no-store" } })
  }

  const image = isRecord(hero.image) ? hero.image : undefined
  const asset = image && isRecord(image.asset) ? image.asset : undefined
  const assetRef =
    asset && typeof asset._ref === "string" ? asset._ref : undefined
  const imageUrl = assetRef
    ? sanityImageUrl({ asset: { _ref: assetRef } })
    : undefined
  const content: PageHeroContent = {
    image: imageUrl,
    eyebrow: localizedValue(hero.pageName, lang),
    title: localizedValue(hero.title, lang),
    description: localizedValue(hero.subtitle, lang),
  }

  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  })
}
