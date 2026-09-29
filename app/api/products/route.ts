import {NextRequest, NextResponse} from "next/server"

import {getSanityProducts} from "@/lib/sanity-products"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const products = await getSanityProducts(lang)

  return NextResponse.json({lang, products}, {
    headers: {"Cache-Control": "no-store"},
  })
}
