"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "@/components/site-link"

import { getVisibleNavigationItems } from "@/components/navigation-config"
import { MotionButtonLink } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import type { SiteSettings } from "@/lib/sanity-site-settings"
import { usePageVisibility } from "@/components/page-visibility-provider"

const fallbackSettings: SiteSettings = {
  companyName: "PT. Anigos Jaya Perkasa",
  address: "Komplek Ruko Saung Bambu B3, Bekasi Utara, Kota Bekasi 17122",
  email: "anigospetro@gmail.com",
  phone: "021-88383549",
  whatsapp: "",
}

export function Footer() {
  const { locale } = useLocale()
  const { visibility } = usePageVisibility()
  const navigationItems = getVisibleNavigationItems(visibility)
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings)

  useEffect(() => {
    const controller = new AbortController()
    void fetch("/api/site-settings", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("Gagal memuat identitas perusahaan."))
      )
      .then((value: SiteSettings | null) => {
        if (value) setSettings({ ...fallbackSettings, ...value })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error(error)
      })
    return () => controller.abort()
  }, [])
  const companyLinks = navigationItems.find((item) => item.labelKey === "about")
  const productLinks = navigationItems.find(
    (item) => item.labelKey === "products"
  )
  const standaloneLinks = navigationItems.filter(
    (item) => !item.children && item.labelKey !== "home"
  )
  const footerLinks = (items: typeof navigationItems): FooterLink[] =>
    items.map(({ href, labelKey }) => ({ href, labelKey }))
  const informationLinks = [
    ...footerLinks(standaloneLinks),
    ...(visibility.dataPolicy
      ? [{ labelKey: "dataPolicy" as const, href: "/kebijakan-data" }]
      : []),
    ...(visibility.cookieTerms
      ? [{ labelKey: "cookieTerms" as const, href: "/ketentuan-cookies" }]
      : []),
  ]
  const footerGroups = [
    {
      title: translate(locale, "footerCompany"),
      items: companyLinks?.children
        ? footerLinks(companyLinks.children)
        : undefined,
    },
    {
      title: translate(locale, "products"),
      items: productLinks?.children
        ? footerLinks(productLinks.children)
        : undefined,
    },
    { title: translate(locale, "footerInformation"), items: informationLinks },
  ].filter((group) => group.items?.length)
  const footerGridColumns: Record<number, string> = {
    0: "lg:grid-cols-[1.4fr]",
    1: "lg:grid-cols-[1.4fr_1fr]",
    2: "lg:grid-cols-[1.4fr_1fr_1fr]",
    3: "lg:grid-cols-[1.4fr_1fr_1fr_1fr]",
  }

  return (
    <footer id="kontak" className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          className={`grid gap-12 ${footerGridColumns[footerGroups.length] ?? footerGridColumns[3]}`}
        >
          <div>
            {visibility.home !== false ? (
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo/petro%20anigos.svg"
                  alt="PT. Anigos Jaya Perkasa"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-semibold tracking-tight">
                  {settings.companyName}
                </span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-3">
                <Image
                  src="/logo/petro%20anigos.svg"
                  alt="PT. Anigos Jaya Perkasa"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-semibold tracking-tight">
                  {settings.companyName}
                </span>
              </div>
            )}
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              {translate(locale, "footerDescription")}
            </p>
            {visibility.productOffers !== false && (
              <MotionButtonLink
                href="/produk/penawaran"
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {translate(locale, "footerOffer")}
              </MotionButtonLink>
            )}
          </div>

          {footerGroups.map((group) => (
            <FooterLinkGroup
              key={group.title}
              title={group.title}
              items={group.items}
              locale={locale}
            />
          ))}
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <address className="not-italic">{settings.address}</address>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-foreground"
            >
              {settings.email}
            </a>
            <a
              href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
              className="hover:text-foreground"
            >
              {settings.phone}
            </a>
          </div>
        </div>

        <div className="mt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} PT. Anigos Jaya Perkasa.{" "}
          {translate(locale, "footerCopyright")}
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  items,
  locale,
}: {
  title: string
  items?: FooterLink[]
  locale: "id" | "en"
}) {
  if (!items?.length) return null

  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-foreground"
          >
            {translate(locale, item.labelKey)}
          </Link>
        ))}
      </nav>
    </div>
  )
}

type FooterLink = {
  labelKey: TranslationKey
  href: string
}
