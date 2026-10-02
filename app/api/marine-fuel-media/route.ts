import { NextRequest, NextResponse } from "next/server"

import {
  getSanityMarineFuelMedia,
} from "@/lib/sanity-marine-fuel"
import { isSanityAvailabilityError } from "@/lib/sanity-client"
import { maxMarineFuelVideoBytes } from "@/shared/sanity-content-contracts"

export async function GET(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get("variant")

  if (variant !== "home" && variant !== "product") {
    return NextResponse.json(
      { error: 'Query parameter "variant" must be "home" or "product".' },
      { status: 400 }
    )
  }

  try {
    const media = await getSanityMarineFuelMedia()
    const slots = variant === "home" ? media?.homeSlots : media?.productSlots
    const backgroundId = `${variant}-marine-fuel-background`
    const videoId = `${variant}-marine-fuel-video`
    const videoSlot = slots?.find((slot) => slot.slotId === videoId)
    const videoSize =
      typeof videoSlot?.videoSize === "number" ? videoSlot.videoSize : undefined
    const oversizedVideo =
      videoSize !== undefined && videoSize > maxMarineFuelVideoBytes

    return NextResponse.json(
      {
        variant,
        backgroundImage: slots?.find((slot) => slot.slotId === backgroundId)
          ?.imageUrl,
        backgroundVideo: oversizedVideo ? undefined : videoSlot?.videoUrl,
        oversizedVideo,
        missingAssets:
          !slots?.some(
            (slot) =>
              slot.slotId === backgroundId ||
              (slot.slotId === videoId && slot.videoUrl)
          ),
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Source": media ? "sanity" : "fallback",
        },
      }
    )
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Sanity Marine Fuel media is unavailable; using local media.",
        error
      )
      return NextResponse.json(
        {
          variant,
          backgroundImage: null,
          backgroundVideo: null,
          missingAssets: true,
        },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-Content-Source": "fallback",
          },
        }
      )
    }

    console.error("Failed to load Sanity Marine Fuel media.", error)
    return NextResponse.json(
      { error: "Gagal memuat media Marine Fuel." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }
}
