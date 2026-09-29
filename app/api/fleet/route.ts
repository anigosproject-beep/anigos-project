import {NextRequest, NextResponse} from "next/server"

import {getSanityFleetOptions} from "@/lib/sanity-fleet"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const fleet = await getSanityFleetOptions(lang)

  return NextResponse.json({lang, fleet}, {
    headers: {"Cache-Control": "no-store"},
  })
}
