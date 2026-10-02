import { createHash } from "node:crypto"
import { NextResponse } from "next/server"

import { getPageVisibilityState } from "@/lib/page-visibility"
import { isSanityAvailabilityError } from "@/lib/sanity-client"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const state = await getPageVisibilityState()
    const etag = `"${createHash("sha256")
      .update(JSON.stringify(state))
      .digest("base64url")}"`

    const headers = {
      ETag: etag,
      "Cache-Control": "private, no-cache, must-revalidate",
      "X-Page-Visibility-Source": state.configured ? "sanity" : "defaults",
    }

    if (requestHasMatchingEtag(request, etag)) {
      return new Response(null, { status: 304, headers })
    }

    return NextResponse.json(state, { headers })
  } catch (error: unknown) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Sanity page visibility timed out; the client will keep its last known configuration."
      )
      return NextResponse.json(
        { unavailable: true },
        {
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": "30",
            "X-Page-Visibility-Source": "unavailable",
          },
        }
      )
    } else {
      console.error(
        "Unable to load page visibility settings from Sanity.",
        error
      )
    }
    return NextResponse.json(
      { error: "Page visibility settings are temporarily unavailable." },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}

function requestHasMatchingEtag(request: Request, etag: string) {
  return request.headers
    .get("if-none-match")
    ?.split(",")
    .map((candidate) => candidate.trim())
    .some((candidate) => candidate === etag || candidate === "*")
}
