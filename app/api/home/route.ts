import { NextRequest, NextResponse } from "next/server"
import { HOME_QUERY } from "@/lib/sanity-queries"
import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

const HOME_MEDIA_QUERY = `*[_type == "mediaAsset" && page == "home" && isActive != false]{
  page, section, slot, "image": {"url": image.asset->url}
}`

const HOME_SUPPORTING_MEDIA_QUERY = `*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0].homeSlots[]{
  slotId,
  "image": image{"url": asset->url, "alt": alt},
  "video": {"url": video.asset->url}
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
      video?: { url?: string }
    }> | null
  )
    ?.filter(({ image, video }) => Boolean(image?.url || video?.url))
    .map(({ slotId, image, video }) => {
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
        image,
        video,
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
