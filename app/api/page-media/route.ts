import { NextRequest, NextResponse } from "next/server"

import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

const videoSlotFields = {
  "home-marine-fuel-video": "homeSlots",
  "company-profile-story-video": "companyProfileSlots",
  "product-marine-fuel-video": "productsSlots",
  "product-introduction-video": "productsSlots",
} as const

const imageSlotFields = {
  "company-profile-journey-background": "companyProfileSlots",
} as const

type VideoSlotId = keyof typeof videoSlotFields
type ImageSlotId = keyof typeof imageSlotFields

function isVideoSlotId(value: string): value is VideoSlotId {
  return Object.hasOwn(videoSlotFields, value)
}

function isImageSlotId(value: string): value is ImageSlotId {
  return Object.hasOwn(imageSlotFields, value)
}

export async function GET(request: NextRequest) {
  const slotId = request.nextUrl.searchParams.get("slotId")

  if (!slotId || (!isVideoSlotId(slotId) && !isImageSlotId(slotId))) {
    return NextResponse.json(
      { error: 'Query parameter "slotId" must identify a supported media slot.' },
      { status: 400 }
    )
  }

  const client = await getSanityClientForCurrentMode()

  if (isImageSlotId(slotId)) {
    const slotsField = imageSlotFields[slotId]
    const slot = await client.fetch<{ imageUrl?: string } | null>(
      `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0].${slotsField}[slotId == $slotId][0]{
        "imageUrl": image.asset->url
      }`,
      { slotId }
    )

    return NextResponse.json(
      { slotId, imageUrl: slot?.imageUrl },
      { headers: { "Cache-Control": "no-store" } }
    )
  }

  const slotsField = videoSlotFields[slotId]
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
