"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  Check,
  Copy,
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
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
            <Card className="rounded-3xl border-border/80 bg-background/90 shadow-sm">
              <CardContent className="p-5 sm:p-7">
                <ContactRow
                  icon={Phone}
                  label={translate(locale, "contactPhoneLabel")}
                  detail={settings.phone}
                  href={phoneHref}
                  action={translate(locale, "contactCallAction")}
                  phoneNumber={settings.phone}
                  copyAction={translate(locale, "contactCopyAction")}
                  copiedAction={translate(locale, "contactCopiedAction")}
                  copyFailedAction={translate(locale, "contactCopyFailedAction")}
                />
                <Separator className="my-5" />
                <ContactRow
                  icon={Mail}
                  label={translate(locale, "contactEmailLabel")}
                  detail={settings.email}
                  href="/hubungi-kami/email"
                  action={translate(locale, "contactEmailAction")}
                />
                {whatsappNumber ? (
                  <>
                    <Separator className="my-5" />
                    <ContactRow
                      icon={MessageCircle}
                      label={translate(locale, "contactWhatsappLabel")}
                      detail={settings.whatsapp}
                      href={`https://wa.me/${whatsappNumber}`}
                      action={translate(locale, "contactWhatsappAction")}
                      external
                    />
                  </>
                ) : null}
                <Separator className="my-5" />
                <ContactRow
                  icon={MapPin}
                  label={translate(locale, "contactOfficeLabel")}
                  detail={settings.address}
                  href={mapHref}
                  action={translate(locale, "contactMapAction")}
                  external
                />
              </CardContent>
            </Card>

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

function ContactRow({
  icon: Icon,
  label,
  detail,
  href,
  action,
  external = false,
  phoneNumber,
  copyAction,
  copiedAction,
  copyFailedAction,
}: {
  icon: LucideIcon
  label: string
  detail: string
  href: string
  action: string
  external?: boolean
  phoneNumber?: string
  copyAction?: string
  copiedAction?: string
  copyFailedAction?: string
}) {
  const actionControl = phoneNumber && copyAction && copiedAction && copyFailedAction ? (
    <PhoneAction
      phoneNumber={phoneNumber}
      href={href}
      action={action}
      copyAction={copyAction}
      copiedAction={copiedAction}
      copyFailedAction={copyFailedAction}
    />
  ) : (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={buttonVariants({
        variant: "default",
        size: "sm",
        className: "w-fit shrink-0",
      })}
    >
      {action}
    </a>
  )

  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 break-words text-base leading-6 font-semibold tracking-tight sm:text-lg">
            {detail}
          </p>
        </div>
      </div>
      {actionControl}
    </div>
  )
}

function PhoneAction({
  phoneNumber,
  href,
  action,
  copyAction,
  copiedAction,
  copyFailedAction,
}: {
  phoneNumber: string
  href: string
  action: string
  copyAction: string
  copiedAction: string
  copyFailedAction: string
}) {
  const [supportsHover, setSupportsHover] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setSupportsHover(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (copyState === "idle") return
    const timeout = window.setTimeout(() => setCopyState("idle"), 2200)
    return () => window.clearTimeout(timeout)
  }, [copyState])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopyState("copied")
    } catch (error) {
      console.error("Failed to copy company phone number", error)
      setCopyState("failed")
    }
  }

  const className = buttonVariants({
    variant: "default",
    size: "sm",
    className: "w-fit shrink-0",
  })

  if (!supportsHover) {
    return (
      <a href={href} className={className}>
        {action}
      </a>
    )
  }

  const accessibleLabel =
    copyState === "copied"
      ? copiedAction
      : copyState === "failed"
        ? copyFailedAction
        : isRevealed
          ? copyAction
          : action

  return (
    <button
      type="button"
      className={className}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      onClick={() => void handleCopy()}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onFocus={() => setIsRevealed(true)}
      onBlur={() => setIsRevealed(false)}
      aria-live="polite"
    >
      {isRevealed ? (
        <Copy aria-hidden="true" className="size-4" />
      ) : copyState === "copied" ? (
        <Check aria-hidden="true" className="size-4" />
      ) : null}
      {accessibleLabel}
    </button>
  )
}
