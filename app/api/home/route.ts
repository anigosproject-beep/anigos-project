import { NextRequest, NextResponse } from "next/server"
import { HOME_QUERY } from "@/lib/sanity-queries"
import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

const HOME_MEDIA_QUERY = `*[_type == "mediaAsset" && page == "home" && isActive != false]{
  page, section, slot, "image": {"url": image.asset->url}
}`

const HOME_SUPPORTING_MEDIA_QUERY = `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0].homeSlots[]{
  slotId,
  "image": image{"url": asset->url, "alt": alt}
}`

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const client = await getSanityClientForCurrentMode()
  const [home, legacyMediaSlots, supportingMediaSlots] = await Promise.all([
    client.fetch(HOME_QUERY, { lang }),
    client.fetch(HOME_MEDIA_QUERY),
    client.fetch(HOME_SUPPORTING_MEDIA_QUERY),
  ])
  const mappedSupportingMediaSlots = (
    supportingMediaSlots as Array<{
      slotId?: string
      image?: { url?: string; alt?: string }
    }> | null
  )
    ?.filter(({ image }) => Boolean(image?.url))
    .map(({ slotId, image }) => {
      const isAboutBackground = slotId === "home-about-background"
      const isMarineFuelBackground =
        slotId === "home-marine-fuel-background"

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
        image,
      }
    })
  const mediaSlots = [
    ...(mappedSupportingMediaSlots ?? []),
    ...((legacyMediaSlots as Array<Record<string, unknown>> | null) ?? []),
  ]

  return NextResponse.json(home ? { ...home, mediaSlots } : { mediaSlots }, {
    headers: { "Cache-Control": "no-store" },
  })
}
