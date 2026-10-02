"use client"

import * as React from "react"
import type { Locale } from "@/lib/i18n"
import { isSanityObject, type HomeContent } from "@/lib/sanity-content-types"

const HomeContentContext = React.createContext<HomeContent | null>(null)

export function HomeContentProvider({
  locale,
  initialLocale,
  initialContent,
  children,
}: {
  locale: Locale
  initialLocale: Locale
  initialContent: HomeContent
  children: React.ReactNode
}) {
  const [content, setContent] = React.useState<HomeContent>(initialContent)
  const [contentLocale, setContentLocale] = React.useState(initialLocale)

  React.useEffect(() => {
    if (locale === contentLocale) return

    const controller = new AbortController()
    fetch(`/api/home?lang=${locale}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Home content request failed: ${response.status}`)
        return response.json() as Promise<unknown>
      })
      .then((value) => {
        if (!isSanityObject(value)) {
          throw new Error("Home content response must be an object.")
        }
        setContent(value as HomeContent)
        setContentLocale(locale)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load home content from Sanity", error)
      })

    return () => controller.abort()
  }, [contentLocale, locale])

  return (
    <HomeContentContext.Provider value={content}>
      {children}
    </HomeContentContext.Provider>
  )
}

export function useHomeContent() {
  return React.useContext(HomeContentContext)
}
