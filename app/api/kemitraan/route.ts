import {NextRequest, NextResponse} from "next/server"

import {getSanityPartnershipPage} from "@/lib/sanity-partnership"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const page = await getSanityPartnershipPage(lang)

  return NextResponse.json(page ?? null, {
    headers: {"Cache-Control": "no-store"},
  })
}
