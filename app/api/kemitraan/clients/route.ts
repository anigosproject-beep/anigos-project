import { NextRequest, NextResponse } from "next/server"

import { getSanityClientForCurrentMode } from "@/lib/sanity-client"
import { CLIENT_PORTFOLIO_QUERY } from "@/lib/sanity-queries"
import type { SanityClientPortfolioEntry } from "@/lib/sanity-content-types"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const client = await getSanityClientForCurrentMode()
  const clients = await client.fetch<SanityClientPortfolioEntry[]>(
    CLIENT_PORTFOLIO_QUERY,
    { lang }
  )

  return NextResponse.json(clients, {
    headers: { "Cache-Control": "no-store" },
  })
}
