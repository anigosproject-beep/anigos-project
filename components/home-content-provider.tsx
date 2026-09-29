"use client"

import * as React from "react"
import type {Locale} from "@/lib/i18n"
import {isSanityObject, type HomeContent} from "@/lib/sanity-content-types"

const HomeContentContext = React.createContext<HomeContent | null>(null)

export function HomeContentProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const [content, setContent] = React.useState<HomeContent | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/home?lang=${locale}`, {signal: controller.signal})
      .then((response) => {
        if (!response.ok) throw new Error(`Home content request failed: ${response.status}`)
        return response.json() as Promise<unknown>
      })
      .then((value) => setContent(isSanityObject(value) ? (value as HomeContent) : null))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load home content from Sanity", error)
      })

    return () => controller.abort()
  }, [locale])

  return (
    <HomeContentContext.Provider value={content}>
      {children}
    </HomeContentContext.Provider>
  )
}

export function useHomeContent() {
  return React.useContext(HomeContentContext)
}
