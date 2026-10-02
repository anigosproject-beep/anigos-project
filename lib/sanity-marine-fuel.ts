import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"

import {
  sanityAvailabilityClient,
  sanityAvailabilityDraftClient,
} from "@/lib/sanity-client"

export const SANITY_MARINE_FUEL_MEDIA_CACHE_TAG = "sanity-marine-fuel-media"

export const MARINE_FUEL_MEDIA_QUERY = `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0]{
  "homeSlots": homeSlots[slotId in ["home-marine-fuel-background", "home-marine-fuel-video"] && (
    slotId == "home-marine-fuel-background" && defined(image.asset) ||
    slotId == "home-marine-fuel-video" && defined(video.asset)
  )]{
    slotId,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    "videoSize": video.asset->size
  },
  "productSlots": productsSlots[slotId in ["product-marine-fuel-background", "product-marine-fuel-video"] && (
    slotId == "product-marine-fuel-background" && defined(image.asset) ||
    slotId == "product-marine-fuel-video" && defined(video.asset)
  )]{
    slotId,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    "videoSize": video.asset->size
  }
}`

export type MarineFuelMediaSlot = {
  slotId?: string
  imageUrl?: string
  videoUrl?: string
  videoSize?: number
}

export type MarineFuelMediaResult = {
  homeSlots?: MarineFuelMediaSlot[] | null
  productSlots?: MarineFuelMediaSlot[] | null
}

const getPublishedMarineFuelMedia = unstable_cache(
  () =>
    sanityAvailabilityClient.fetch<MarineFuelMediaResult | null>(
      MARINE_FUEL_MEDIA_QUERY
    ),
  ["sanity-marine-fuel-media-v1"],
  {
    revalidate: 60,
    tags: [SANITY_MARINE_FUEL_MEDIA_CACHE_TAG],
  }
)

export async function getSanityMarineFuelMedia() {
  const { isEnabled } = await draftMode()
  return isEnabled
    ? sanityAvailabilityDraftClient.fetch<MarineFuelMediaResult | null>(
        MARINE_FUEL_MEDIA_QUERY
      )
    : getPublishedMarineFuelMedia()
}
