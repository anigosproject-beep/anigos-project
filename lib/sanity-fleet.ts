import {getSanityClientForCurrentMode} from "@/lib/sanity-client"
import {FLEET_OPTIONS_QUERY} from "@/lib/sanity-queries"
import type {SanityFleetOption} from "@/lib/sanity-content-types"

export async function getSanityFleetOptions(lang: "id" | "en") {
  const client = await getSanityClientForCurrentMode()
  const options = await client.fetch<SanityFleetOption[]>(FLEET_OPTIONS_QUERY, {lang})

  return options.filter((option) => option._id && option.capacity && (option.gallery?.some((item) => item?.image?.url) || option.image?.url))
}
