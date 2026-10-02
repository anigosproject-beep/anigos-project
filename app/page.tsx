import { cookies } from "next/headers"

import { HomePageContent } from "@/components/home-page-content"
import { isSanityAvailabilityError } from "@/lib/sanity-client"
import { getSanityHomeContent } from "@/lib/sanity-home"
import type { Locale } from "@/lib/i18n"
import type { HomeContent } from "@/lib/sanity-content-types"

export default async function Page() {
  const cookieStore = await cookies()
  const initialLocale: Locale =
    cookieStore.get("locale")?.value === "en" ? "en" : "id"
  let initialContent: HomeContent = { mediaSlots: [] }

  try {
    initialContent = await getSanityHomeContent(initialLocale)
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Sanity Home content is unavailable; rendering local fallback content.",
        error
      )
    } else {
      console.error("Failed to render Sanity Home content.", error)
    }
  }

  return (
    <HomePageContent
      initialContent={initialContent}
      initialLocale={initialLocale}
    />
  )
}
