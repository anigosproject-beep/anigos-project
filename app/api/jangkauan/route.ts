import { NextRequest, NextResponse } from "next/server"
import type { CoveragePageResponse } from "@/lib/sanity-content-types"
import { COVERAGE_MEDIA_QUERY, JANGKAUAN_QUERY } from "@/lib/sanity-queries"
import { sanityClient } from "@/lib/sanity-client"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const [page, coverageMedia] = await Promise.all([
    sanityClient.fetch<CoveragePageResponse | null>(JANGKAUAN_QUERY, { lang }),
    sanityClient.fetch<CoveragePageResponse | null>(COVERAGE_MEDIA_QUERY, {
      lang,
    }),
  ])

  return NextResponse.json(
    { ...page, ...coverageMedia },
    {
      headers: { "Cache-Control": "no-store" },
    }
  )
}
