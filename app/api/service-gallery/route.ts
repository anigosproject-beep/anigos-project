import { NextResponse } from "next/server"

import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

type ServiceGalleryImage = {
  _key?: string
  url?: string
  width?: number
  height?: number
  uploadedAt?: string
}

type ServiceGallery = {
  images?: ServiceGalleryImage[] | null
}

export async function GET() {
  const client = await getSanityClientForCurrentMode()
  const gallery = await client.fetch<ServiceGallery | null>(
    `*[_type == "serviceGalleryEditor" && _id == "serviceGalleryEditor"][0]{
      images[]{
        _key,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "uploadedAt": asset->_createdAt
      }
    }`
  )

  const images = (gallery?.images ?? []).filter(
    (image): image is ServiceGalleryImage & { url: string } =>
      Boolean(image?.url)
  )

  return NextResponse.json(
    { images },
    { headers: { "Cache-Control": "no-store" } }
  )
}
