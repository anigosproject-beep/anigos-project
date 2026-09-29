import {getSanityClientForCurrentMode} from "@/lib/sanity-client"
import {PARTNERSHIP_PAGE_QUERY} from "@/lib/sanity-queries"
import type {PartnershipPageResponse} from "@/lib/sanity-content-types"

export async function getSanityPartnershipPage(lang: "id" | "en") {
  const client = await getSanityClientForCurrentMode()
  return client.fetch<PartnershipPageResponse | null>(PARTNERSHIP_PAGE_QUERY, {lang})
}
