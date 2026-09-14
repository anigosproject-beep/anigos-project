"use client"

import Link from "next/link"
import {
  ArrowRight,
  CircleAlert,
  MapPin,
  Ship,
  Truck,
} from "lucide-react"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const coverageAreas = [
  {
    city: "Bekasi",
    province: "Jawa Barat",
    island: "Jawa",
    description: "bekasiCoverageDescription",
    modes: ["landMode", "truckingMode"],
  },
  {
    city: "Palembang",
    province: "Sumatera Selatan",
    island: "Sumatera",
    description: "palembangCoverageDescription",
    modes: ["landMode", "interregionalMode"],
  },
  {
    city: "Medan",
    province: "Sumatera Utara",
    island: "Sumatera",
    description: "medanCoverageDescription",
    modes: ["landMode", "interregionalMode"],
  },
  {
    city: "Palangka Raya",
    province: "Kalimantan Tengah",
    island: "Kalimantan",
    description: "palangkaRayaCoverageDescription",
    modes: ["landMode", "interregionalMode"],
  },
  {
    city: "Sulawesi Utara",
    province: "Sulawesi Utara",
    island: "Sulawesi",
    description: "northSulawesiCoverageDescription",
    modes: ["interregionalMode", "seaMode"],
  },
  {
    city: "Sulawesi Selatan",
    province: "Sulawesi Selatan",
    island: "Sulawesi",
    description: "southSulawesiCoverageDescription",
    modes: ["interregionalMode", "seaMode"],
  },
] as const

const islandGroups = ["Jawa", "Sumatera", "Kalimantan", "Sulawesi"] as const

export default function JangkauanPage() {
  const { locale } = useLocale()
  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "reachPageEyebrow")}
        title={translate(locale, "reachPageTitle")}
        description={translate(locale, "reachPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
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
                  <p className="text-3xl font-semibold text-primary">6</p>
                  <p className="mt-1 text-sm text-muted-foreground">{translate(locale, "servicePoints")}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/75 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-primary">4</p>
                  <p className="mt-1 text-sm text-muted-foreground">{translate(locale, "mainRegions")}</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-4xl border border-border bg-foreground p-6 text-background shadow-xl sm:p-8">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,hsl(var(--background))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background))_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative flex h-full min-h-68 flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-background/70">{translate(locale, "coverageMap")}</p>
                    <p className="mt-1 text-xl font-semibold">Indonesia</p>
                  </div>
                  <MapPin className="size-7 text-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {islandGroups.map((island) => (
                    <div key={island} className="rounded-xl border border-background/15 bg-background/10 p-3 backdrop-blur-sm">
                      <p className="text-xs text-background/60">{translate(locale, "regionLabel")}</p>
                      <p className="mt-1 text-sm font-medium">{island}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "servedAreasEyebrow")}
            title={translate(locale, "servedAreasTitle")}
            description={translate(locale, "servedAreasDescription")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coverageAreas.map((area, index) => (
              <Card key={area.city} className="group h-full transition-transform duration-300 hover:-translate-y-1">
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
                    {translate(locale, area.description as TranslationKey)}
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
            {[
              ["01", "reviewLocation", "reviewLocationDescription"],
              ["02", "chooseMode", "chooseModeDescription"],
              ["03", "confirmPlan", "confirmPlanDescription"],
            ].map(([number, title, description]) => (
              <Card key={number} className="h-full">
                <CardContent className="p-6">
                  <span className="text-sm font-semibold tracking-[0.18em] text-primary">{number}</span>
                  <CardTitle className="mt-5 text-base">{translate(locale, title as TranslationKey)}</CardTitle>
                  <Text variant="small" className="mt-3">{translate(locale, description as TranslationKey)}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              {translate(locale, "areaVerification")}
            </Badge>
            <Heading level={2} className="mt-5 text-background">
              {translate(locale, "locationNotFoundTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              {translate(locale, "locationNotFoundDescription")}
            </Text>
            <div className="mt-5 flex items-start gap-2 text-sm text-background/60">
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{translate(locale, "coverageNotice")}</span>
            </div>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({ className: "bg-background text-foreground hover:bg-background/90" })}
          >
            {translate(locale, "submitRequirement")}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </main>
  )
}
