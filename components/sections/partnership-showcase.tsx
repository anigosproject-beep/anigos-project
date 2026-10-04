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
import type { SanityClientPortfolioEntry } from "@/lib/sanity-content-types"

function getClientLogo(client: SanityClientPortfolioEntry) {
  return client.logo?.url
}

function ClientLogo({ client }: { client: SanityClientPortfolioEntry }) {
  const logo = getClientLogo(client)
  if (!logo) return null

  return (
    <div
      role="listitem"
      className="partnership-logo-item flex h-24 w-24 shrink-0 items-center justify-center px-1 sm:h-28 sm:w-32"
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
            alt={client.logo?.alt ?? client.companyName ?? "Logo perusahaan"}
            width={220}
            height={120}
            sizes="(min-width: 640px) 160px, 128px"
            className="h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24"
          />
        </TooltipTrigger>
        <TooltipContent>{client.companyName ?? "Perusahaan"}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function PartnershipShowcase() {
  const { locale } = useLocale()
  const [clients, setClients] = React.useState<SanityClientPortfolioEntry[]>([])
  const [showAllClients, setShowAllClients] = React.useState(false)
  const [sequencesPerLoop, setSequencesPerLoop] = React.useState(1)
  const marqueeRef = React.useRef<HTMLDivElement>(null)
  const logoSequenceRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/kemitraan/clients?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Client portfolio request failed: ${response.status}`
          )
        }
        return response.json() as Promise<SanityClientPortfolioEntry[]>
      })
      .then((data) => {
        setClients(
          data.filter(
            (client) => Boolean(client?._id && getClientLogo(client))
          )
        )
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load client logos from Sanity", error)
      })

    return () => controller.abort()
  }, [locale])

  const clientLogos = React.useMemo(
    () =>
      clients.flatMap((client) => {
        const logo = getClientLogo(client)
        return logo ? [{ client, logo }] : []
      }),
    [clients]
  )

  React.useEffect(() => {
    const marquee = marqueeRef.current
    const logoSequence = logoSequenceRef.current
    if (!marquee || !logoSequence) return

    const updateSequenceCount = () => {
      const sequenceWidth = logoSequence.getBoundingClientRect().width
      if (sequenceWidth <= 0) return

      const visibleWidth = marquee.getBoundingClientRect().width
      const nextCount = Math.ceil(visibleWidth / sequenceWidth) + 1
      setSequencesPerLoop((currentCount) =>
        currentCount === nextCount ? currentCount : nextCount
      )
    }

    updateSequenceCount()
    const resizeObserver = new ResizeObserver(updateSequenceCount)
    resizeObserver.observe(marquee)
    resizeObserver.observe(logoSequence)

    return () => resizeObserver.disconnect()
  }, [clientLogos, showAllClients])

  const renderLogoSequences = (isCopy: boolean) =>
    Array.from({ length: sequencesPerLoop }, (_, sequenceIndex) => (
      <div
        key={`sequence-${sequenceIndex}`}
        ref={
          !isCopy && sequenceIndex === 0 ? logoSequenceRef : undefined
        }
        className="flex w-max shrink-0 items-center gap-0 pr-1 sm:gap-1 sm:pr-2"
        role="list"
      >
        {clientLogos.map(({ client }) => (
          <ClientLogo
            key={`${sequenceIndex}-${client._id}`}
            client={client}
          />
        ))}
      </div>
    ))

  return (
    <SectionShell
      id="kemitraan"
      className="border-b border-border bg-background py-14 sm:py-16 lg:py-20"
    >
      <SectionContainer className="flex flex-col items-center gap-5 sm:gap-6">
        <h2 className="text-center text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
          {translate(locale, "partnershipTrustHeading")}
        </h2>

        {clientLogos.length > 0 && !showAllClients ? (
          <div
            ref={marqueeRef}
            id="partnership-all-logos"
            className="partnership-marquee w-full overflow-hidden"
            role="region"
            aria-label={translate(locale, "partnershipCarouselLabel")}
          >
            <div className="partnership-marquee-track flex w-max">
              <div
                className="partnership-marquee-group flex w-max shrink-0 items-center"
              >
                {renderLogoSequences(false)}
              </div>
              <div
                className="partnership-marquee-group partnership-marquee-copy flex w-max shrink-0 items-center"
                aria-hidden="true"
              >
                {renderLogoSequences(true)}
              </div>
            </div>
          </div>
        ) : null}

        {showAllClients && clientLogos.length > 0 ? (
          <div
            id="partnership-all-logos"
            className="partnership-logo-grid flex w-full flex-wrap items-center justify-center gap-1 sm:gap-3"
            role="list"
            aria-label={translate(locale, "partnershipCarouselLabel")}
          >
            {clientLogos.map(({ client }) => (
              <ClientLogo key={client._id} client={client} />
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
          {clientLogos.length > 0 ? (
            <button
              type="button"
              aria-expanded={showAllClients}
              aria-controls="partnership-all-logos"
              onClick={() => setShowAllClients((isShowing) => !isShowing)}
              className={buttonVariants({ variant: "outline" })}
            >
              {translate(
                locale,
                showAllClients
                  ? "partnershipCloseLogos"
                  : "partnershipShowAll"
              )}
              {showAllClients ? (
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
