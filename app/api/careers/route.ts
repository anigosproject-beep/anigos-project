import { NextRequest, NextResponse } from "next/server"

import { getCareerOpenings } from "@/lib/sanity-careers"

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const openings = await getCareerOpenings(locale)

  return NextResponse.json(
    { openings },
    { headers: { "Cache-Control": "no-store" } }
  )
}
