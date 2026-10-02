"use client"

import Link from "@/components/site-link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react"

import { PageHero } from "@/components/sections"
import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type { SiteSettings } from "@/lib/sanity-site-settings"

const fallbackSettings: SiteSettings = {
  companyName: "PT. Anigos Jaya Perkasa",
  address: "Komplek Ruko Saung Bambu B3, Bekasi Utara, Kota Bekasi 17122",
  email: "anigospetro@gmail.com",
  phone: "021-88383549",
  whatsapp: "",
}

export default function ContactPage() {
  const { locale } = useLocale()
  const [settings, setSettings] = useState(fallbackSettings)

  useEffect(() => {
    const controller = new AbortController()
    void fetch("/api/site-settings", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Site settings request failed: ${response.status}`)
        }
        return response.json() as Promise<SiteSettings | null>
      })
      .then((value) => {
        if (value) setSettings({ ...fallbackSettings, ...value })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load company contact details", error)
      })

    return () => controller.abort()
  }, [])

  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`
  const whatsappNumber = settings.whatsapp.replace(/\D/g, "")
  const mapHref =
    settings.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "contactPageEyebrow")}
        title={translate(locale, "contactPageTitle")}
        description={translate(locale, "contactPageDescription")}
        image="/images/company/office.png"
        pageKey="hubungi-kami"
        breadcrumbs={[
          { label: translate(locale, "home"), href: "/" },
          { label: translate(locale, "contact"), href: "/hubungi-kami" },
        ]}
      />

      <SectionShell className="relative isolate overflow-hidden bg-muted/40 py-16 sm:py-20 lg:py-24">
        <SectionContainer className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="grid gap-4">
              <ContactCard
                icon={Phone}
                label={translate(locale, "contactPhoneLabel")}
                detail={settings.phone}
                href={phoneHref}
                action={translate(locale, "contactCallAction")}
              />
              <ContactCard
                icon={Mail}
                label={translate(locale, "contactEmailLabel")}
                detail={settings.email}
                href="/hubungi-kami/email"
                action={translate(locale, "contactEmailAction")}
              />
              {whatsappNumber ? (
                <ContactCard
                  icon={MessageCircle}
                  label={translate(locale, "contactWhatsappLabel")}
                  detail={settings.whatsapp}
                  href={`https://wa.me/${whatsappNumber}`}
                  action={translate(locale, "contactWhatsappAction")}
                  external
                />
              ) : null}
              <ContactCard
                icon={MapPin}
                label={translate(locale, "contactOfficeLabel")}
                detail={settings.address}
                href={mapHref}
                action={translate(locale, "contactMapAction")}
                external
              />
            </div>

            <div className="max-w-xl lg:pl-2">
              <Badge variant="secondary">
                {translate(locale, "contactChannelsEyebrow")}
              </Badge>
              <Heading level={2} className="mt-5">
                {translate(locale, "contactChannelsTitle")}
              </Heading>
              <Text variant="lead" className="mt-4">
                {translate(locale, "contactChannelsDescription")}
              </Text>
            </div>
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="bg-background py-16 sm:py-20 lg:py-24">
        <SectionContainer className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-muted text-foreground">
              <Clock3 aria-hidden="true" className="size-5" />
            </div>
            <Heading level={2} className="mt-5">
              {translate(locale, "contactNextStepTitle")}
            </Heading>
            <Text variant="lead" className="mt-3">
              {translate(locale, "contactNextStepDescription")}
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({ className: "w-fit" })}
          >
            {translate(locale, "contactOfferAction")}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </SectionContainer>
      </SectionShell>
    </main>
  )
}

function ContactCard({
  icon: Icon,
  label,
  detail,
  href,
  action,
  external = false,
}: {
  icon: LucideIcon
  label: string
  detail: string
  href: string
  action: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-28 items-center gap-4 rounded-2xl border border-border/80 bg-background/90 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-6"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block break-words text-base leading-6 font-semibold tracking-tight sm:text-lg">
          {detail}
        </span>
        <span className="mt-2 block text-sm font-medium text-primary">
          {action}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
      />
    </a>
  )
}
