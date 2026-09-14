"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const consentCookie = "petro_anigos_cookie_consent"
const consentMaxAge = 60 * 60 * 24 * 180

function readConsent() {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${consentCookie}=`))
    ?.split("=")[1]
}

export function CookieConsent() {
  const { locale } = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!readConsent()) setVisible(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  function saveConsent(value: "all" | "necessary") {
    document.cookie = `${consentCookie}=${value}; Max-Age=${consentMaxAge}; Path=/; SameSite=Lax`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      role="dialog"
      aria-label={translate(locale, "cookieConsentLabel")}
      className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl border border-border bg-background p-5 shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-lg sm:p-6"
    >
      <p className="text-sm font-semibold">{translate(locale, "cookieTitle")}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {translate(locale, "cookieDescription")}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {translate(locale, "cookieDetailsPrefix")}{" "}
        <Link href="/ketentuan-cookies" className="font-medium text-primary hover:underline">
          {locale === "id" ? "ketentuan cookies" : "cookie terms"}
        </Link>{" "}
        {translate(locale, "cookieDetailsSuffix")}
      </p>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => saveConsent("necessary")}>
          {translate(locale, "cookieNecessary")}
        </Button>
        <Button type="button" onClick={() => saveConsent("all")}>
          {translate(locale, "cookieAcceptAll")}
        </Button>
      </div>
    </aside>
  )
}
