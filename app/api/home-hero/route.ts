import { NextResponse } from "next/server"
import { isSanityAvailabilityError } from "@/lib/sanity-client"
import { getSanityHomeHeroSlides } from "@/lib/sanity-hero"

type CroppedImage = {
  url?: string
  width?: number
  height?: number
  crop?: { top?: number; bottom?: number; left?: number; right?: number }
}

function applySanityCrop(image: CroppedImage | null | undefined) {
  if (!image?.url) return undefined

  const url = new URL(image.url)
  if (image.width && image.height && image.crop) {
    const left = image.crop.left ?? 0
    const top = image.crop.top ?? 0
    const right = image.crop.right ?? 0
    const bottom = image.crop.bottom ?? 0
    const width = Math.max(1, Math.round(image.width * (1 - left - right)))
    const height = Math.max(1, Math.round(image.height * (1 - top - bottom)))
    const x = Math.round(image.width * left)
    const y = Math.round(image.height * top)
    url.searchParams.set("rect", `${x},${y},${width},${height}`)
  }
  url.searchParams.set("w", "1920")
  url.searchParams.set("fit", "max")
  url.searchParams.set("auto", "format")
  url.searchParams.set("q", "80")
  return url.toString()
}

export async function GET() {
  try {
    const slides = await getSanityHomeHeroSlides()
    const mappedSlides = (slides ?? []).map((slide) => ({
      ...slide,
      image: { url: applySanityCrop(slide.image) },
    }))
    return NextResponse.json(
      { slides: mappedSlides },
      {
        headers: { "Cache-Control": "no-store" },
      }
    )
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Sanity Home Hero is unavailable; the app will use its local fallback.",
        error
      )
      return NextResponse.json(
        { slides: [] },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-Content-Source": "fallback",
          },
        }
      )
    }

    console.error("Failed to load Sanity Home Hero.", error)
    return NextResponse.json(
      { error: "Gagal memuat konten Home Hero." },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}
