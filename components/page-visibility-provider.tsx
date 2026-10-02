"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { useLocale } from "@/components/locale-provider"
import {
  isPagePathVisible,
  type PageVisibilityMap,
} from "@/shared/page-visibility-registry"

type PageVisibilityContextValue = {
  visibility: PageVisibilityMap
  isVisible: (path: string) => boolean
  refreshVisibility: () => Promise<void>
}

const PageVisibilityContext = createContext<PageVisibilityContextValue | null>(
  null
)

async function fetchPageVisibility(signal?: AbortSignal, etag?: string) {
  const headers = new Headers()
  if (etag) headers.set("If-None-Match", etag)

  const response = await fetch("/api/page-visibility", {
    signal,
    cache: "no-store",
    headers,
  })
  if (response.status === 304) {
    return { notModified: true as const, etag }
  }
  if (!response.ok) {
    throw new Error(`Page visibility request failed: ${response.status}`)
  }
  const payload = (await response.json()) as {
    unavailable?: boolean
    visibility?: PageVisibilityMap
  }
  if (payload.unavailable) {
    return { notModified: true as const, etag }
  }
  if (!payload.visibility) {
    throw new Error(
      "Page visibility response did not include a visibility map."
    )
  }

  return {
    notModified: false as const,
    visibility: payload.visibility,
    etag: response.headers.get("etag") ?? undefined,
  }
}

export function PageVisibilityProvider({
  initialVisibility,
  children,
}: {
  initialVisibility: PageVisibilityMap
  children: ReactNode
}) {
  const [visibility, setVisibility] = useState(initialVisibility)
  const etag = useRef<string | undefined>(undefined)
  const lastRefreshFailed = useRef(false)
  const inFlightRefresh = useRef<Promise<void> | null>(null)

  const refreshVisibility = useCallback((signal?: AbortSignal) => {
    if (inFlightRefresh.current) return inFlightRefresh.current

    const refresh = async () => {
      try {
        const result = await fetchPageVisibility(signal, etag.current)
        if (!result.notModified) {
          etag.current = result.etag
          setVisibility(result.visibility)
        }
        lastRefreshFailed.current = false
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") return
        if (!lastRefreshFailed.current) {
          console.warn(
            "Unable to refresh page visibility settings; keeping the last known status."
          )
        }
        lastRefreshFailed.current = true
      } finally {
        inFlightRefresh.current = null
      }
    }

    inFlightRefresh.current = refresh()
    return inFlightRefresh.current
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    void refreshVisibility(controller.signal)

    return () => controller.abort()
  }, [refreshVisibility])

  useEffect(() => {
    const controller = new AbortController()
    const refresh = () => void refreshVisibility(controller.signal)
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refresh()
    }
    const interval = window.setInterval(refresh, 30_000)

    window.addEventListener("focus", refresh)
    document.addEventListener("visibilitychange", refreshWhenVisible)

    return () => {
      controller.abort()
      window.clearInterval(interval)
      window.removeEventListener("focus", refresh)
      document.removeEventListener("visibilitychange", refreshWhenVisible)
    }
  }, [refreshVisibility])

  const isVisible = useCallback(
    (path: string) => isPagePathVisible(path, visibility),
    [visibility]
  )

  return (
    <PageVisibilityContext.Provider
      value={{ visibility, isVisible, refreshVisibility }}
    >
      {children}
    </PageVisibilityContext.Provider>
  )
}

export function usePageVisibility() {
  const context = useContext(PageVisibilityContext)
  if (!context) {
    throw new Error(
      "usePageVisibility must be used within PageVisibilityProvider."
    )
  }
  return context
}

export function PageVisibilityGate({
  children,
  bypass = false,
}: {
  children: ReactNode
  bypass?: boolean
}) {
  const pathname = usePathname() ?? "/"
  const { locale } = useLocale()
  const { isVisible } = usePageVisibility()

  if (bypass) return children

  if (!isVisible(pathname)) {
    return (
      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          {locale === "id" ? "Halaman tidak tersedia" : "Page unavailable"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {locale === "id"
            ? "Halaman ini sedang dinonaktifkan. Silakan kembali ke beranda."
            : "This page is currently disabled. Please return to the homepage."}
        </p>
        {isVisible("/") && (
          <Link className="mt-6 underline underline-offset-4" href="/">
            {locale === "id" ? "Kembali ke beranda" : "Return to homepage"}
          </Link>
        )}
      </section>
    )
  }

  return children
}
