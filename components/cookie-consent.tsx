"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const consentCookie = "petro_anigos_cookie_consent"
const consentMaxAge = 60 * 60 * 24 * 180

function readConsent() {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${consentCookie}=`))
    ?.split("=")[1]
}

export function CookieConsent() {
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
      aria-label="Persetujuan cookies"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl border border-border bg-background p-5 shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-lg sm:p-6"
    >
      <p className="text-sm font-semibold">Kami menggunakan cookies</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Cookies esensial membantu website bekerja dengan baik dan menyimpan
        pilihanmu. Saat ini kami tidak mengaktifkan cookie iklan atau analitik
        pihak ketiga.
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Baca{" "}
        <Link href="/ketentuan-cookies" className="font-medium text-primary hover:underline">
          ketentuan cookies
        </Link>{" "}
        untuk detail penggunaan dan pengaturan.
      </p>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => saveConsent("necessary")}>
          Hanya yang diperlukan
        </Button>
        <Button type="button" onClick={() => saveConsent("all")}>
          Terima semua
        </Button>
      </div>
    </aside>
  )
}
