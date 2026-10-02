import { NextRequest, NextResponse } from "next/server"

import { isSanityAvailabilityError } from "@/lib/sanity-client"
import { getCareerOpenings } from "@/lib/sanity-careers"

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"

  try {
    const openings = await getCareerOpenings(locale)
    return NextResponse.json(
      { openings },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn("Sanity career openings are temporarily unavailable.", error)
    } else {
      console.error("Failed to load career openings from Sanity.", error)
    }
    return NextResponse.json(
      { errorCode: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }
}
