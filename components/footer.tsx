"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

import { navigationItems } from "@/components/navigation-config"
import { MotionButtonLink } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type {SiteSettings} from "@/lib/sanity-site-settings"

const fallbackSettings: SiteSettings = {
  companyName: "PT. Anigos Jaya Perkasa",
  address: "Komplek Ruko Saung Bambu B3, Bekasi Utara, Kota Bekasi 17122",
  email: "anigospetro@gmail.com",
  phone: "021-88383549",
  whatsapp: "",
}

export function Footer() {
  const { locale } = useLocale()
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings)

  useEffect(() => {
    const controller = new AbortController()
    void fetch("/api/site-settings", {signal: controller.signal, cache: "no-store"})
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Gagal memuat identitas perusahaan.")))
      .then((value: SiteSettings | null) => {
        if (value) setSettings({...fallbackSettings, ...value})
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error(error)
      })
    return () => controller.abort()
  }, [])
  const companyLinks = navigationItems.find(
    (item) => item.label === "Tentang Kami"
  )
  const productLinks = navigationItems.find((item) => item.label === "Produk")
  const standaloneLinks = navigationItems.filter(
    (item) => !item.children && item.label !== "Beranda"
  )
  const informationLinks = [
    ...standaloneLinks,
    { label: "Kebijakan Data", href: "/kebijakan-data" },
    { label: "Ketentuan Cookies", href: "/ketentuan-cookies" },
  ]

  return (
    <footer id="kontak" className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo/petro%20anigos.svg"
                alt="PT. Anigos Jaya Perkasa"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-semibold tracking-tight">{settings.companyName}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              {translate(locale, "footerDescription")}
            </p>
            <MotionButtonLink
              href="/produk/penawaran"
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {translate(locale, "footerOffer")}
            </MotionButtonLink>
          </div>

          <FooterLinkGroup title={translate(locale, "footerCompany")} items={companyLinks?.children} />
          <FooterLinkGroup title={translate(locale, "products")} items={productLinks?.children} />
          <FooterLinkGroup title={translate(locale, "footerInformation")} items={informationLinks} />
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <address className="not-italic">
            {settings.address}
          </address>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`mailto:${settings.email}`} className="hover:text-foreground">
          {settings.email}
            </a>
            <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="hover:text-foreground">
          {settings.phone}
            </a>
          </div>
        </div>

        <div className="mt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} PT. Anigos Jaya Perkasa. {translate(locale, "footerCopyright")}
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  items,
}: {
  title: string
  items?: { label: string; href: string }[]
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
        {items?.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
