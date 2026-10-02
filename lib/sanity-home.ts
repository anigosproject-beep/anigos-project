import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"

import {
  sanityAvailabilityClient,
  sanityAvailabilityDraftClient,
} from "@/lib/sanity-client"
import type { HomeContent } from "@/lib/sanity-content-types"
import { HOME_PAGE_DATA_QUERY } from "@/lib/sanity-queries"
import type { Locale } from "@/lib/i18n"

export const SANITY_HOME_CONTENT_CACHE_TAG = "sanity-home-content"

export type HomeMediaSlot = {
  page?: string
  section?: string
  slot?: string
  slotId?: string
  name?: string
  description?: string
  image?: { url?: string; alt?: string }
  video?: { url?: string }
}

export type SanityHomePageData = {
  home: HomeContent | null
  legacyMediaSlots: HomeMediaSlot[] | null
  supportingMediaSlots: HomeMediaSlot[] | null
}

const getPublishedHomePageData = unstable_cache(
  (lang: Locale) =>
    sanityAvailabilityClient.fetch<SanityHomePageData>(HOME_PAGE_DATA_QUERY, {
      lang,
    }),
  ["sanity-home-page-data-v1"],
  {
    revalidate: 60,
    tags: [SANITY_HOME_CONTENT_CACHE_TAG],
  }
)

export async function getSanityHomePageData(lang: Locale) {
  const { isEnabled } = await draftMode()
  return isEnabled
    ? sanityAvailabilityDraftClient.fetch<SanityHomePageData>(
        HOME_PAGE_DATA_QUERY,
        { lang }
      )
    : getPublishedHomePageData(lang)
}

export async function getSanityHomeContent(lang: Locale): Promise<HomeContent> {
  const { home, legacyMediaSlots, supportingMediaSlots } =
    await getSanityHomePageData(lang)
  const mappedSupportingMediaSlots = supportingMediaSlots
    ?.filter(({ image, video }) => Boolean(image?.url || video?.url))
    .map(({ slotId, name, description, image, video }) => {
      const isAboutBackground = slotId === "home-about-background"
      const isMarineFuelBackground = [
        "home-marine-fuel-background",
        "home-marine-fuel-video",
      ].includes(slotId ?? "")

      return {
        page: "home",
        section: isAboutBackground
          ? "tentang-kami"
          : isMarineFuelBackground
            ? "marine-fuel"
            : "product-showcase",
        slot:
          isAboutBackground || isMarineFuelBackground ? "background" : slotId,
        slotId,
        name,
        description,
        image,
        video,
      }
    })

  return {
    ...home,
    mediaSlots: [
      ...(mappedSupportingMediaSlots ?? []),
      ...(legacyMediaSlots ?? []),
    ],
  }
}
