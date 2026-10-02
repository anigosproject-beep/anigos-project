"use client"

import * as React from "react"

import { type Locale } from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale)

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem("locale", nextLocale)
    document.cookie = `locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`
    document.documentElement.lang = nextLocale
  }, [])

  React.useEffect(() => {
    const storedLocale = window.localStorage.getItem("locale")
    const storedPreference: Locale = storedLocale === "en" ? "en" : "id"
    document.documentElement.lang = locale
    if (storedPreference !== locale)
      queueMicrotask(() => setLocale(storedPreference))
  }, [locale, setLocale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = React.useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider")
  }
  return context
}
