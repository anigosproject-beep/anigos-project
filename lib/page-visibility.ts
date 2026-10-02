import { unstable_cache } from "next/cache"

import {
  createPageVisibilityMap,
  type PageVisibilityGroups,
} from "@/shared/page-visibility-registry"
import { sanityAvailabilityClient } from "@/lib/sanity-client"

export const PAGE_VISIBILITY_CACHE_TAG = "page-visibility"

export type PageVisibilityState = {
  visibility: ReturnType<typeof createPageVisibilityMap>
  configured: boolean
}

const getPublishedPageVisibilityState = unstable_cache(
  async (): Promise<PageVisibilityState> => {
    const settings = await sanityAvailabilityClient.fetch<{
      _id: string
      groups?: PageVisibilityGroups | null
    } | null>(
      '*[_type == "pageVisibilitySettings" && _id == "pageVisibilitySettings"][0]{_id, groups}',
    )

    return {
      visibility: createPageVisibilityMap(settings?.groups),
      configured: Boolean(settings),
    }
  },
  ["published-page-visibility-groups"],
  {
    revalidate: 300,
    tags: [PAGE_VISIBILITY_CACHE_TAG],
  }
)

export async function getPageVisibilityState() {
  return getPublishedPageVisibilityState()
}

export async function getPageVisibilityMap() {
  const { visibility } = await getPageVisibilityState()
  return visibility
}
