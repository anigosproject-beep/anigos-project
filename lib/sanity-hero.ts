import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"

import {
  sanityAvailabilityClient,
  sanityAvailabilityDraftClient,
} from "@/lib/sanity-client"

export const SANITY_HERO_CACHE_TAG = "sanity-hero"

const homeHeroQuery = `*[_type == "homePage"][0].heroSlides[isActive != false] | order(position asc, _key asc) {
  position,
  mediaType,
  videoEmbedUrl,
  eyebrow,
  title,
  description,
  progressLabel,
  "image": select(mediaType == "image" => image{"url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, crop}),
  "videoUrl": select(mediaType == "video" => video.asset->url),
  "videoSize": select(mediaType == "video" => video.asset->size),
  cta
}`

type HeroImage = {
  url?: string
  width?: number
  height?: number
  crop?: { top?: number; bottom?: number; left?: number; right?: number }
}

export type SanityHomeHeroSlide = {
  position?: number
  mediaType?: "image" | "video"
  videoEmbedUrl?: string
  image?: HeroImage
  videoUrl?: string
  videoSize?: number
  [key: string]: unknown
}

const getPublishedHomeHeroSlides = unstable_cache(
  async () =>
    sanityAvailabilityClient.fetch<SanityHomeHeroSlide[]>(homeHeroQuery),
  ["sanity-home-hero-v3"],
  { revalidate: 60, tags: [SANITY_HERO_CACHE_TAG] }
)

const getPublishedPageHero = unstable_cache(
  async () =>
    sanityAvailabilityClient.fetch<Record<string, unknown> | null>(
      `*[_id == "pageHeroEditor"][0]`
    ),
  ["sanity-page-hero-v1"],
  { revalidate: 60, tags: [SANITY_HERO_CACHE_TAG] }
)

export async function getSanityHomeHeroSlides() {
  const { isEnabled } = await draftMode()
  return isEnabled
    ? sanityAvailabilityDraftClient.fetch<SanityHomeHeroSlide[]>(homeHeroQuery)
    : getPublishedHomeHeroSlides()
}

export async function getSanityPageHeroDocument() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return getPublishedPageHero()

  return sanityAvailabilityDraftClient.fetch<Record<string, unknown> | null>(
    `*[_id == "pageHeroEditor"][0]`
  )
}
