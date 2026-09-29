import {NextResponse} from "next/server"

import {getSanitySiteSettings} from "@/lib/sanity-site-settings"

export async function GET() {
  const settings = await getSanitySiteSettings()
  return NextResponse.json(settings, {headers: {"Cache-Control": "no-store"}})
}
