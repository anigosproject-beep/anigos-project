"use client"

import * as React from "react"

import { type Locale } from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("id")

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem("locale", nextLocale)
    document.documentElement.lang = nextLocale
  }, [])

  React.useEffect(() => {
    const storedLocale = window.localStorage.getItem("locale")
    const initialLocale: Locale = storedLocale === "en" ? "en" : "id"
    queueMicrotask(() => setLocale(initialLocale))
  }, [setLocale])

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
