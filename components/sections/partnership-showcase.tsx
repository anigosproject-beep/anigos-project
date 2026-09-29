"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { ArrowRight } from "lucide-react"

import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { MotionButtonLink, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SectionContainer,
  SectionShell,
} from "@/components/layout/section-shell"
import { useLocale } from "@/components/locale-provider"
import { useHomeContent } from "@/components/home-content-provider"
import { translate } from "@/lib/i18n"
import type { PartnershipItem } from "@/lib/partnership-fallback"
import type { SiteSettings } from "@/lib/sanity-site-settings"
import type { PartnershipPageResponse } from "@/lib/sanity-content-types"

function getPartnerLogo(partner: PartnershipItem) {
  return partner.logo?.url ?? partner.image?.url
}

export function PartnershipShowcase() {
  const { locale } = useLocale()
  const home = useHomeContent()
  const configured = home?.partnershipShowcase
  const [partners, setPartners] = React.useState<PartnershipItem[]>([])
  const [contactEmail, setContactEmail] = React.useState("")

  React.useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/kemitraan?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Partnership content request failed: ${response.status}`
          )
        }
        return response.json() as Promise<PartnershipPageResponse | null>
      })
      .then((page) => {
        const sanityPartners = (page?.showcase ?? []).filter(
          (partner): partner is PartnershipItem =>
            Boolean(partner?._id && getPartnerLogo(partner))
        )
        setPartners(sanityPartners)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load partnership content from Sanity", error)
      })

    return () => controller.abort()
  }, [locale])

  React.useEffect(() => {
    const controller = new AbortController()

    fetch("/api/site-settings", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Site settings request failed: ${response.status}`)
        }
        return response.json() as Promise<SiteSettings | null>
      })
      .then((settings) => setContactEmail(settings?.email?.trim() ?? ""))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load contact settings from Sanity", error)
      })

    return () => controller.abort()
  }, [])

  const partnershipEmail = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(
        "Permohonan Informasi Kemitraan PT. Anigos Jaya Perkasa"
      )}&body=${encodeURIComponent(
        "Halo PT. Anigos Jaya Perkasa,\r\n\r\nSaya ingin mendapatkan informasi lebih lanjut mengenai peluang kemitraan.\r\n\r\nNama:\r\nPerusahaan/Instansi:\r\nNomor telepon:\r\nKebutuhan kemitraan:\r\n\r\nTerima kasih."
      )}`
    : undefined

  return (
    <SectionShell
      id="kemitraan"
      className="border-b border-border bg-background py-24 lg:py-32"
    >
      <SectionContainer className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-20">
        <div className="min-w-0 lg:pr-2">
          <div className="grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-10">
            {partners.map((partner) => {
              const logo = getPartnerLogo(partner)
              if (!logo) return null

              return (
                <Link
                  key={partner._id}
                  href={`/tentang-kami/kemitraan/${partner._id}`}
                  className="group flex min-h-28 min-w-0 flex-col items-center justify-center rounded-md px-2 py-3 text-center transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
                  aria-label={`Lihat detail ${partner.name ?? "mitra"}`}
                >
                  <Image
                    src={logo}
                    alt={partner.logo?.alt ?? partner.name ?? "Logo mitra"}
                    width={220}
                    height={120}
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 20vw, 40vw"
                    className="h-auto max-h-24 w-auto max-w-full object-contain"
                  />
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className="mt-3 line-clamp-2 max-w-full text-xs leading-4 break-words text-muted-foreground" />
                      }
                    >
                      {partner.name ?? "Mitra"}
                    </TooltipTrigger>
                    <TooltipContent>{partner.name ?? "Mitra"}</TooltipContent>
                  </Tooltip>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="min-w-0 border-t border-border pt-12 lg:max-w-xl lg:border-t-0 lg:border-l lg:py-4 lg:pt-4 lg:pl-14">
          <Badge variant="secondary">
            {configured?.eyebrow ??
              translate(locale, "partnershipSectionLabel")}
          </Badge>
          <Heading level={2} className="mt-5 text-balance">
            {configured?.title ?? translate(locale, "partnershipTitle")}
          </Heading>
          <Text variant="lead" className="mt-6 text-pretty">
            {configured?.body ?? translate(locale, "partnershipDescription")}
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={configured?.cta?.href ?? "/tentang-kami/kemitraan"}
              className={buttonVariants()}
            >
              {configured?.cta?.label ?? translate(locale, "partnershipAction")}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            {partnershipEmail ? (
              <MotionButtonLink href={partnershipEmail} variant="outline">
                {translate(locale, "contact")}
              </MotionButtonLink>
            ) : (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span
                      tabIndex={0}
                      className="inline-flex rounded-4xl focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
                    />
                  }
                >
                  <button
                    type="button"
                    disabled
                    className={buttonVariants({
                      variant: "outline",
                      className: "cursor-not-allowed opacity-50",
                    })}
                  >
                    Hubungi Kami
                  </button>
                </TooltipTrigger>
                <TooltipContent>{translate(locale, "partnershipContactUnavailable")}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
