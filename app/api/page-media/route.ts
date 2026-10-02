import { NextRequest, NextResponse } from "next/server"

import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

const videoSlotFields = {
  "home-marine-fuel-video": "homeSlots",
  "company-profile-story-video": "companyProfileSlots",
  "product-marine-fuel-video": "productsSlots",
  "product-introduction-video": "productsSlots",
} as const

type VideoSlotId = keyof typeof videoSlotFields

function isVideoSlotId(value: string): value is VideoSlotId {
  return Object.hasOwn(videoSlotFields, value)
}

export async function GET(request: NextRequest) {
  const slotId = request.nextUrl.searchParams.get("slotId")

  if (!slotId || !isVideoSlotId(slotId)) {
    return NextResponse.json(
      { error: 'Query parameter "slotId" must identify a supported video slot.' },
      { status: 400 }
    )
  }

  const slotsField = videoSlotFields[slotId]
  const client = await getSanityClientForCurrentMode()
  const slot = await client.fetch<{ videoUrl?: string } | null>(
    `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0].${slotsField}[slotId == $slotId][0]{
      "videoUrl": video.asset->url
    }`,
    { slotId }
  )

  return NextResponse.json(
    { slotId, videoUrl: slot?.videoUrl },
    { headers: { "Cache-Control": "no-store" } }
  )
}
