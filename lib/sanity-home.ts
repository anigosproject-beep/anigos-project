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
  linkedPagePath?: string
  name?: string
  description?: string
  cardTitle?: string
  cardDescription?: string
  image?: { url?: string; alt?: string }
  video?: { url?: string }
}

export type SanityHomePageData = {
  home: HomeContent | null
  legacyMediaSlots: HomeMediaSlot[] | null
  supportingMediaSlots: HomeMediaSlot[] | null
  pageHeroImages: Record<
    string,
    {
      title?: string
      description?: string
      image?: HomeMediaSlot["image"]
    } | null
  > | null
}

const getPublishedHomePageData = unstable_cache(
  (lang: Locale) =>
    sanityAvailabilityClient.fetch<SanityHomePageData>(HOME_PAGE_DATA_QUERY, {
      lang,
    }),
  ["sanity-home-page-data-v2"],
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
  const { home, legacyMediaSlots, supportingMediaSlots, pageHeroImages } =
    await getSanityHomePageData(lang)
  const mappedSupportingMediaSlots = supportingMediaSlots
    ?.filter(({ image, video, linkedPagePath, slotId }) =>
      Boolean(
        image?.url ||
          video?.url ||
          linkedPagePath ||
          slotId?.startsWith("home-resource-card-")
      )
    )
    .map(({ slotId, linkedPagePath, name, description, image, video }) => {
      const isAboutBackground = slotId === "home-about-background"
      const isMarineFuelBackground = [
        "home-marine-fuel-background",
        "home-marine-fuel-video",
      ].includes(slotId ?? "")
      const isResourceCard = slotId?.startsWith("home-resource-card-") ?? false

      return {
        page: "home",
        section: isAboutBackground
          ? "tentang-kami"
          : isMarineFuelBackground
            ? "marine-fuel"
            : isResourceCard
              ? "resource-shortcuts"
              : "product-showcase",
        slot:
          isAboutBackground || isMarineFuelBackground ? "background" : slotId,
        slotId,
        linkedPagePath,
        name,
        description,
        cardTitle: linkedPagePath
          ? pageHeroImages?.[linkedPagePath]?.title
          : undefined,
        cardDescription: linkedPagePath
          ? pageHeroImages?.[linkedPagePath]?.description
          : undefined,
        image:
          (linkedPagePath
            ? pageHeroImages?.[linkedPagePath]?.image
            : undefined) ?? image,
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
