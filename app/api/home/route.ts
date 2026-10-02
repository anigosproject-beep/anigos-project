import { NextRequest, NextResponse } from "next/server"
import { getSanityHomeContent } from "@/lib/sanity-home"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const content = await getSanityHomeContent(lang)
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  })
}
