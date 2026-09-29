import { NextResponse } from "next/server"
import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

type CroppedImage = {
  url?: string
  width?: number
  height?: number
  crop?: { top?: number; bottom?: number; left?: number; right?: number }
}

function applySanityCrop(image: CroppedImage | null | undefined) {
  if (!image?.url || !image.width || !image.height || !image.crop) {
    return image?.url
  }

  const left = image.crop.left ?? 0
  const top = image.crop.top ?? 0
  const right = image.crop.right ?? 0
  const bottom = image.crop.bottom ?? 0
  const width = Math.max(1, Math.round(image.width * (1 - left - right)))
  const height = Math.max(1, Math.round(image.height * (1 - top - bottom)))
  const x = Math.round(image.width * left)
  const y = Math.round(image.height * top)
  const url = new URL(image.url)
  url.searchParams.set("rect", `${x},${y},${width},${height}`)
  return url.toString()
}

const homeHeroQuery = `*[_type == "homePage"][0].heroSlides | order(position asc, _key asc) {
  position,
  mediaType,
  eyebrow,
  title,
  description,
  progressLabel,
  "image": select(mediaType == "image" => image{"url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, crop}),
  "videoUrl": select(mediaType == "video" => video.asset->url),
  cta
}`

export async function GET() {
  const client = await getSanityClientForCurrentMode()
  const slides = (await client.fetch(homeHeroQuery)) as Array<{
    image?: CroppedImage
    videoUrl?: string
    [key: string]: unknown
  }> | null
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
}
