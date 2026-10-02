"use client"

import Link from "@/components/site-link"
import Image from "next/image"
import {
  ArrowRight,
  CircleAlert,
  MapPin,
  Ship,
  Truck,
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero, VideoFeatureSection } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate, type Locale, type TranslationKey } from "@/lib/i18n"
import type {
  CoveragePageResponse,
} from "@/lib/sanity-content-types"

type CoverageArea = {
  city: string
  province: string
  island: string
  image?: string
  description: string
  modes: string[]
}

function CoverageStepCard({
  image,
  number,
  title,
  description,
  locale,
}: {
  image: string
  number: string
  title: string
  description: string
  locale: Locale
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const isFlipped = isHovered || isPinned

  const toggleCard = () => setIsPinned((current) => !current)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${title}. ${isFlipped ? description : translate(locale, "reachCardInstruction")}`}
      aria-expanded={isFlipped}
      onClick={toggleCard}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          toggleCard()
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/step h-full cursor-pointer rounded-4xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
    >
      <div
        className="relative h-full min-h-[18.25rem] rounded-4xl transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none group-hover/step:[transform:rotateY(180deg)]"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 overflow-hidden rounded-4xl bg-card shadow-md ring-1 ring-foreground/10 [backface-visibility:hidden]"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 17vw, (min-width: 640px) 30vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover/step:scale-105 motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <span className="text-sm font-semibold tracking-[0.18em] text-white/75">
              {number}
            </span>
            <span className="mt-3 block font-heading text-lg leading-snug font-semibold">
              {title}
            </span>
            <span className="mt-5 block text-xs font-medium text-white/75">
              {translate(locale, "coverageCardHint")}
            </span>
          </div>
        </div>

        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-4xl bg-base-color p-6 text-base-color-foreground shadow-md ring-1 ring-base-color-foreground/10 [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-sm font-semibold tracking-[0.18em] text-base-color-foreground/60">
            {number}
          </span>
          <span className="mt-5 block font-heading text-lg leading-snug font-semibold">
            {title}
          </span>
          <span className="mt-4 block text-sm leading-6 text-base-color-foreground/80">
            {description}
          </span>
          <span className="mt-auto pt-5 text-xs font-medium text-base-color-foreground/60">
            {translate(locale, "coverageCardReturnHint")}
          </span>
        </div>
      </div>
    </div>
  )
}

// Start from a neutral, nationwide default to avoid implying service is limited to specific cities.
// Live data from Sanity (fetched below) will populate detailed areas when available.
const coverageAreas: CoverageArea[] = []

const coverageSteps: Array<{
  number: string
  title: TranslationKey
  description: TranslationKey
  image: string
}> = [
  {
    number: "01",
    title: "reviewLocation",
    description: "reviewLocationDescription",
    image: "/images/distribution/distribution-map.png",
  },
  {
    number: "02",
    title: "chooseMode",
    description: "chooseModeDescription",
    image: "/images/distribution/fuel-distribution.png",
  },
  {
    number: "03",
    title: "confirmPlan",
    description: "confirmPlanDescription",
    image: "/images/partnership/transport-carrier.png",
  },
]

export default function JangkauanPage() {
  const { locale } = useLocale()
  const [areas, setAreas] = useState(coverageAreas)

  useEffect(() => {
    const controller = new AbortController()
    void fetch(`/api/jangkauan?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Coverage request failed: ${response.status}`)
        return response.json() as Promise<CoveragePageResponse | null>
      })
      .then((page) => {
        const remoteAreas: CoverageArea[] | undefined = page?.serviceAreas?.areas
          ?.filter((area) => area.active !== false && area.city && area.island)
          .map((area) => ({
            city: area.city as string,
            province: area.province ?? "",
            island: area.island as string,
            image: area.image?.url,
            description: area.body ?? "",
            modes: area.modes?.length ? area.modes : ["landMode"],
          }))

        if (remoteAreas?.length) setAreas(remoteAreas)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity coverage areas", error)
      })

    return () => controller.abort()
  }, [locale])

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "reachPageEyebrow")}
        title={translate(locale, "reachPageTitle")}
        description={translate(locale, "reachPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="jangkauan"
        breadcrumbs={[{ label: translate(locale, "reach"), href: "/jangkauan" }]}
      />

      <section className="relative isolate overflow-hidden border-b border-border bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.1] blur-[2px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <Badge variant="secondary">{translate(locale, "operationalNetwork")}</Badge>
              <Heading level={2} className="mt-5">
                {translate(locale, "coverageOverviewTitle")}
              </Heading>
              <Text variant="lead" className="mt-5">
                {translate(locale, "coverageOverviewDescription")}
              </Text>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
                <div className="rounded-2xl border border-border bg-background/75 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-primary">{translate(locale, "reachNational")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{translate(locale, "servicePoints")}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/75 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-primary">{translate(locale, "reachB2B")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{translate(locale, "mainRegions")}</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-4xl border border-base-color-foreground/10 bg-base-color p-6 text-base-color-foreground shadow-xl sm:p-8">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative flex h-full min-h-68 flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-base-color-foreground/70">{translate(locale, "coverageMap")}</p>
                    <p className="mt-1 text-xl font-semibold">{translate(locale, "nationwideIndonesia")}</p>
                  </div>
                  <MapPin className="size-7 text-primary" />
                </div>

                <motion.div
                  className="relative mt-4 min-h-44 flex-1"
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.45, ease: "easeOut"}}
                  >
                    <Image
                      src="/animated/Peta%20Indonesia.svg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="coverage-map-artwork object-cover opacity-90 brightness-0 invert"
                      aria-hidden="true"
                    />
                  </motion.div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-base-color-foreground/15 bg-base-color-foreground/10 p-3">
                    <p className="text-xs text-base-color-foreground/60">{translate(locale, "coverageOverviewTitle")}</p>
                    <p className="mt-1 text-sm font-medium">{translate(locale, "coverageOverviewDescription")}</p>
                  </div>
                  <div className="rounded-2xl border border-base-color-foreground/15 bg-base-color-foreground/10 p-3">
                    <p className="text-xs text-base-color-foreground/60">{translate(locale, "mainRegions")}</p>
                    <p className="mt-1 text-sm font-medium">{translate(locale, "coverageNotice")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoFeatureSection
        eyebrow={{id: "Jaringan distribusi nasional", en: "National distribution network"}}
        title={{id: "Mendukung kebutuhan industri di seluruh Indonesia.", en: "Supporting industrial requirements across Indonesia."}}
        description={{id: "Pelajari bagaimana Petro Anigos mengoordinasikan kebutuhan BBM industri, pilihan moda distribusi, dan jadwal pengiriman untuk pelanggan bisnis di seluruh Indonesia.", en: "Learn how Petro Anigos coordinates industrial fuel requirements, distribution modes, and delivery schedules for business customers across Indonesia."}}
        videoTitle={{id: "Video jangkauan distribusi PT. Anigos Jaya Perkasa", en: "PT. Anigos Jaya Perkasa distribution coverage video"}}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "servedAreasEyebrow")}
            title={translate(locale, "servedAreasTitle")}
            description={translate(locale, "servedAreasDescription")}
          />
          {areas.length > 0 ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {areas.map((area, index) => (
                <Card key={area.city} className="group h-full transition-transform duration-300 hover:-translate-y-1">
                  {area.image ? (
                    <div className="relative aspect-[3/2] overflow-hidden rounded-t-xl">
                      <Image
                        src={area.image}
                        alt={`Foto area layanan ${area.city}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Badge variant="outline">{area.island}</Badge>
                    </div>
                    <CardTitle className="mt-5">{area.city}</CardTitle>
                    <p className="text-sm text-muted-foreground">{area.province}</p>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body-muted">
                      {area.description.startsWith("coverage")
                        ? translate(locale, area.description as TranslationKey)
                        : area.description}
                    </Text>
                    <Separator className="my-5" />
                    <div className="flex flex-wrap gap-2">
                      {area.modes.map((mode) => (
                        <span key={mode} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
                          {mode === "seaMode" ? <Ship className="size-3.5" /> : <Truck className="size-3.5" />}
                          {translate(locale, mode as TranslationKey)}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-4xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                {translate(locale, "reachAreasUnavailable")}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "coverageWorkEyebrow")}
            title={translate(locale, "coverageWorkTitle")}
            description={translate(locale, "coverageWorkDescription")}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {coverageSteps.map((step) => (
              <CoverageStepCard
                key={step.number}
                image={step.image}
                number={step.number}
                title={translate(locale, step.title)}
                description={translate(locale, step.description)}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-base-color px-6 py-24 text-base-color-foreground lg:px-8 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{backgroundImage: 'url("/images/distribution/distribution-map.png")'}}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 backdrop-blur-[1px] bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.58)_52%,rgba(0,0,0,0.42)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-black/70 via-black/35 to-transparent"
        />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-base-color-foreground/30 text-base-color-foreground">
              {translate(locale, "areaVerification")}
            </Badge>
            <Heading level={2} className="mt-5 text-base-color-foreground">
              {translate(locale, "locationNotFoundTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-base-color-foreground/70">
              {translate(locale, "locationNotFoundDescription")}
            </Text>
            <div className="mt-5 flex items-start gap-2 text-sm text-base-color-foreground/60">
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{translate(locale, "coverageNotice")}</span>
            </div>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "shadow-lg",
            })}
          >
            {translate(locale, "submitRequirement")}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </main>
  )
}
