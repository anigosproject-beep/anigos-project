import {NextResponse} from "next/server"

import { isSanityAvailabilityError } from "@/lib/sanity-client"
import {getSanitySiteSettings} from "@/lib/sanity-site-settings"

export async function GET() {
  try {
    const settings = await getSanitySiteSettings()
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Source": settings ? "sanity" : "fallback",
      },
    })
  } catch (error: unknown) {
    if (isSanityAvailabilityError(error)) {
      console.warn("Sanity site settings are temporarily unavailable; using defaults.")
      return NextResponse.json(null, {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Source": "fallback",
        },
      })
    }

    console.error("Unable to load site settings from Sanity", error)
    return NextResponse.json(
      { error: "Company settings could not be loaded." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }
}
