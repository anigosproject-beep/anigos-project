"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check, CircleAlert, Ship, Truck } from "lucide-react"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const fleetCapacities = [
  { id: "armada-5000", value: "5.000", note: "lightNeed", image: "/images/partnership/partnership-transportation.svg" },
  { id: "armada-8000", value: "8.000", note: "flexibleDistribution", image: "/images/partnership/partnership-distribution.svg" },
  { id: "armada-10000", value: "10.000", note: "regularOperations", image: "/images/partnership/partnership-business.svg" },
  { id: "armada-16000", value: "16.000", note: "mediumNeed", image: "/images/articles/article-operation.svg" },
  { id: "armada-24000", value: "24.000", note: "industrialScale", image: "/images/resources/resource-energy.svg" },
  { id: "armada-30000", value: "30.000", note: "largeLoad", image: "/images/articles/article-b40.svg" },
] as const
type FleetId = (typeof fleetCapacities)[number]["id"]

export default function ArmadaPage() {
  const { locale } = useLocale()
  const [selectedFleetId, setSelectedFleetId] = useState<FleetId>(fleetCapacities[0].id)
  const selectedFleet =
    fleetCapacities.find((fleet) => fleet.id === selectedFleetId) ?? fleetCapacities[0]

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "fleetPageEyebrow")}
        title={translate(locale, "fleetPageTitle")}
        description={translate(locale, "fleetPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: translate(locale, "products"), href: "/produk/kenali-produk" },
          { label: translate(locale, "fleet"), href: "/produk/armada" },
        ]}
      />

      <section id="armada-darat" className="relative isolate overflow-hidden border-b border-border bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.1] blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-20 size-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "fleetLandEyebrow")}
            title={translate(locale, "fleetLandTitle")}
            description={translate(locale, "fleetLandDescription")}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-4xl bg-foreground shadow-xl lg:aspect-[16/9]">
              <Image
                key={selectedFleet.image}
                src={selectedFleet.image}
                alt={`${translate(locale, "truckingFleet")} ${selectedFleet.value} ${translate(locale, "liter")}`}
                fill
                className="object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-background lg:inset-x-8 lg:bottom-8">
                <div className="mt-3 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-sm font-medium text-background/75">
                      {translate(locale, "truckingFleet")}
                    </p>
                    <p className="mt-1 text-4xl font-semibold tracking-tight">
                      {selectedFleet.value}{" "}
                      <span className="text-lg font-normal">
                        {translate(locale, "liter")}
                      </span>
                    </p>
                  </div>
                  <Truck className="hidden size-10 shrink-0 text-background/80 sm:block" />
                </div>
              </div>
            </div>

            <div>
              <Badge variant="secondary">
                {translate(locale, "fleetCapacity")}
              </Badge>
              <Heading level={2} className="mt-5">
                {translate(locale, "fleetCapacityTitle")}
              </Heading>
              <Text variant="lead" className="mt-5">
                {translate(locale, "fleetCapacityDescription")}
              </Text>
              <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {translate(locale, selectedFleet.note)}{" "}
                  {locale === "id" ? "dengan kapasitas" : "with a capacity of"}{" "}
                  {selectedFleet.value} {translate(locale, "liter")}.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border/70 pt-6">
            <p className="text-sm font-medium">
              {translate(locale, "availableVolume")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {fleetCapacities.map((fleet) => (
                <button
                  key={fleet.id}
                  id={fleet.id}
                  type="button"
                  onClick={() => setSelectedFleetId(fleet.id)}
                  aria-pressed={selectedFleetId === fleet.id}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedFleetId === fleet.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {fleet.value} {translate(locale, "liter")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="armada-laut" className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-8">
          <div className="relative min-h-80 overflow-hidden rounded-4xl bg-foreground">
            <Image
              src="/images/partnership/partnership-distribution.svg"
              alt={translate(locale, "distributionIllustration")}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/60" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-background lg:bottom-8 lg:left-8">
              <Ship className="size-7" />
              <span className="text-sm font-medium">
                {translate(locale, "interregionalDistribution")}
              </span>
            </div>
          </div>
          <div>
            <Badge variant="secondary">
              {translate(locale, "seaTransport")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "seaTransportTitle")}
            </Heading>
            <Text variant="lead" className="mt-5">
              {translate(locale, "seaTransportDescription")}
            </Text>
            <Text variant="body-muted" className="mt-5 flex items-start gap-2">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{translate(locale, "fleetAvailabilityNote")}</span>
            </Text>
          </div>
        </div>
      </section>

      <section id="armada-mitra" className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
          <div>
            <Badge variant="secondary">
              {translate(locale, "transportPartner")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "transportPartnerTitle")}
            </Heading>
            <Text variant="lead" className="mt-5">
              {translate(locale, "transportPartnerDescription")}
            </Text>
            <Link href="/tentang-kami/kemitraan" className={buttonVariants({ className: "mt-8" })}>
              {translate(locale, "partnershipDetailsAction")}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[2fr_3fr]">
            <div className="relative min-h-56 bg-foreground lg:min-h-full">
              <Image
                src="/images/partnership/partnership-business.svg"
                alt={translate(locale, "partnershipIllustration")}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6 lg:p-8">
              <CardHeader className="px-0">
                <CardTitle>
                  {translate(locale, "distributionSchemeTitle")}
                </CardTitle>
              </CardHeader>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {translate(locale, "unloadingPoint")}
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {translate(locale, "volumeSchedule")}
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {translate(locale, "fleetVerification")}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              {translate(locale, "readyToDiscuss")}
            </Badge>
            <Heading level={2} className="mt-5 text-background">
              {translate(locale, "fleetCtaTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              {translate(locale, "fleetCtaDescription")}
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
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
