"use client"

import Image from "next/image"
import Link from "@/components/site-link"
import * as React from "react"

import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"

import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
import { useLocale } from "@/components/locale-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { translate } from "@/lib/i18n"
import type { PartnershipItem } from "@/lib/partnership-fallback"
import type { PartnershipPageResponse } from "@/lib/sanity-content-types"

function getPartnerLogo(partner: PartnershipItem) {
  return partner.logo?.url ?? partner.image?.url
}

function PartnerLogo({ partner }: { partner: PartnershipItem }) {
  const logo = getPartnerLogo(partner)
  if (!logo) return null

  return (
    <div
      role="listitem"
      className="partnership-logo-item flex h-24 w-32 shrink-0 items-center justify-center px-2 sm:h-28 sm:w-40"
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              tabIndex={0}
              className="flex h-full w-full items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            />
          }
        >
          <Image
            src={logo}
            alt={partner.logo?.alt ?? partner.name ?? "Logo mitra"}
            width={220}
            height={120}
            sizes="(min-width: 640px) 160px, 128px"
            className="h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24"
          />
        </TooltipTrigger>
        <TooltipContent>{partner.name ?? "Mitra"}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function PartnershipShowcase() {
  const { locale } = useLocale()
  const [partners, setPartners] = React.useState<PartnershipItem[]>([])
  const [showAllPartners, setShowAllPartners] = React.useState(false)

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

  const partnerLogos = partners.flatMap((partner) => {
    const logo = getPartnerLogo(partner)
    return logo ? [{ partner, logo }] : []
  })

  return (
    <SectionShell
      id="kemitraan"
      className="border-b border-border bg-background py-14 sm:py-16 lg:py-20"
    >
      <SectionContainer className="flex flex-col items-center gap-5 sm:gap-6">
        <h2 className="text-center text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
          {translate(locale, "partnershipTrustHeading")}
        </h2>

        {partnerLogos.length > 0 && !showAllPartners ? (
          <div
            id="partnership-all-logos"
            className="partnership-marquee w-full overflow-hidden"
            role="region"
            aria-label={translate(locale, "partnershipCarouselLabel")}
          >
            <div className="partnership-marquee-track flex w-max">
              <div
                className="partnership-marquee-group flex w-max min-w-full items-center justify-around gap-1 px-2 sm:gap-3 sm:px-4"
                role="list"
              >
                {partnerLogos.map(({ partner }) => (
                  <PartnerLogo key={partner._id} partner={partner} />
                ))}
              </div>
              <div
                className="partnership-marquee-group partnership-marquee-copy flex w-max min-w-full items-center justify-around gap-1 px-2 sm:gap-3 sm:px-4"
                aria-hidden="true"
              >
                {partnerLogos.map(({ partner, logo }) => (
                  <div
                    key={`copy-${partner._id}`}
                    className="flex h-24 w-32 shrink-0 items-center justify-center px-2 sm:h-28 sm:w-40"
                  >
                    <Image
                      src={logo}
                      alt=""
                      width={220}
                      height={120}
                      sizes="(min-width: 640px) 160px, 128px"
                      className="h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {showAllPartners && partnerLogos.length > 0 ? (
          <div
            id="partnership-all-logos"
            className="partnership-logo-grid flex w-full flex-wrap items-center justify-center gap-1 sm:gap-3"
            role="list"
            aria-label={translate(locale, "partnershipCarouselLabel")}
          >
            {partnerLogos.map(({ partner }) => (
              <PartnerLogo key={partner._id} partner={partner} />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
          <Link
            href="/tentang-kami/client"
            className={buttonVariants()}
          >
            {translate(locale, "partnershipAction")}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
          {partnerLogos.length > 0 ? (
            <button
              type="button"
              aria-expanded={showAllPartners}
              aria-controls="partnership-all-logos"
              onClick={() => setShowAllPartners((isShowing) => !isShowing)}
              className={buttonVariants({ variant: "outline" })}
            >
              {translate(
                locale,
                showAllPartners
                  ? "partnershipCloseLogos"
                  : "partnershipShowAll"
              )}
              {showAllPartners ? (
                <ChevronUp data-icon="inline-end" aria-hidden="true" />
              ) : (
                <ChevronDown data-icon="inline-end" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
