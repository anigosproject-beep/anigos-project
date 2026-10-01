import { NextRequest, NextResponse } from "next/server"
import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

const MARINE_FUEL_MEDIA_QUERY = `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0]{
  "homeSlots": homeSlots[slotId in ["home-marine-fuel-background", "home-marine-fuel-video"]]{
    slotId,
    "image": image{"url": asset->url},
    "video": {"url": video.asset->url}
  },
  "productSlots": productsSlots[slotId in ["product-marine-fuel-background", "product-marine-fuel-video"]]{
    slotId,
    "image": image{"url": asset->url},
    "video": {"url": video.asset->url}
  }
}`

type MarineFuelMediaSlot = {
  slotId?: string
  image?: { url?: string }
  video?: { url?: string }
}

type MarineFuelMediaResult = {
  homeSlots?: MarineFuelMediaSlot[] | null
  productSlots?: MarineFuelMediaSlot[] | null
}

export async function GET(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get("variant")

  if (variant !== "home" && variant !== "product") {
    return NextResponse.json(
      { error: 'Query parameter "variant" must be "home" or "product".' },
      { status: 400 }
    )
  }

  const client = await getSanityClientForCurrentMode()
  const media = await client.fetch<MarineFuelMediaResult | null>(
    MARINE_FUEL_MEDIA_QUERY
  )
  const slots =
    variant === "home" ? media?.homeSlots : media?.productSlots
  const backgroundId = `${variant}-marine-fuel-background`
  const videoId = `${variant}-marine-fuel-video`

  return NextResponse.json(
    {
      variant,
      backgroundImage: slots?.find((slot) => slot.slotId === backgroundId)?.image
        ?.url,
      backgroundVideo: slots?.find((slot) => slot.slotId === videoId)?.video
        ?.url,
    },
    { headers: { "Cache-Control": "no-store" } }
  )
}
