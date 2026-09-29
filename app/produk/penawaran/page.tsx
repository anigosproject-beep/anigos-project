"use client"

import Link from "next/link"
import {
  ArrowRight,
  CircleAlert,
  ClipboardCheck,
  FileText,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Truck,
} from "lucide-react"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const preparationItems = [
  {
    title: "productTypePreparation",
    description: "productTypePreparationDescription",
    icon: PackageCheck,
  },
  {
    title: "volumePreparation",
    description: "volumePreparationDescription",
    icon: ClipboardCheck,
  },
  {
    title: "locationSchedulePreparation",
    description: "locationSchedulePreparationDescription",
    icon: MapPin,
  },
  {
    title: "distributionModePreparation",
    description: "distributionModePreparationDescription",
    icon: Truck,
  },
] as const

const offerSteps = [
  {
    number: "01",
    title: "offerStepOne",
    description: "offerStepOneDescription",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "offerStepTwo",
    description: "offerStepTwoDescription",
    icon: FileText,
  },
  {
    number: "03",
    title: "offerStepThree",
    description: "offerStepThreeDescription",
    icon: ArrowRight,
  },
] as const

export default function PenawaranPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "offerPageEyebrow")}
        title={translate(locale, "offerPageTitle")}
        description={translate(locale, "offerPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="penawaran"
        breadcrumbs={[
          { label: translate(locale, "products"), href: "/produk/kenali-produk" },
          { label: translate(locale, "offer"), href: "/produk/penawaran" },
        ]}
      />

      <SectionShell className="relative isolate overflow-hidden bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.1] blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 size-80 rounded-full bg-primary/10 blur-3xl"
        />
        <SectionContainer className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <Badge variant="secondary">{translate(locale, "needsBasedOffer")}</Badge>
            <SectionHeading
              className="mt-5"
              eyebrow={translate(locale, "beforeSubmitting")}
              title={translate(locale, "offerPreparationTitle")}
              description={translate(locale, "offerPreparationDescription")}
            />
            <Link href="/produk/penawaran/ajukan" className={buttonVariants({ className: "mt-8" })}>
              {translate(locale, "submitRequirement")}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <Card className="bg-background/85 shadow-lg backdrop-blur-md">
            <CardHeader>
              <CardTitle>{translate(locale, "prepareForOffer")}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              {preparationItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="space-y-3">
                    <Icon className="size-5 text-primary" />
                    <div>
                      <p className="font-medium">{translate(locale, item.title)}</p>
                      <Text variant="small" className="mt-1">
                        {translate(locale, item.description)}
                      </Text>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="bg-background py-24 lg:py-32">
        <SectionContainer>
          <SectionHeading
            eyebrow={translate(locale, "offerFlowEyebrow")}
            title={translate(locale, "offerFlowTitle")}
            description={translate(locale, "offerFlowDescription")}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {offerSteps.map((step) => {
              const Icon = step.icon

              return (
                <Card key={step.number} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                        {step.number}
                      </span>
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-5">{translate(locale, step.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body-muted">{translate(locale, step.description)}</Text>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="bg-muted/40 py-24 lg:py-32">
        <SectionContainer className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <SectionHeading
            eyebrow={translate(locale, "discussionScopeEyebrow")}
            title={translate(locale, "discussionScopeTitle")}
            description={translate(locale, "discussionScopeDescription")}
          />
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <Text variant="small">
              {translate(locale, "offerScopeNotice")}
            </Text>
          </div>
          <Card>
            <CardContent className="p-6 lg:p-8">
              <div className="space-y-6">
                <div>
                  <p className="font-medium">{translate(locale, "commercialTerms")}</p>
                  <Text variant="body-muted" className="mt-2">
                    {translate(locale, "offerCommercialDescription")}
                  </Text>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">{translate(locale, "distributionDetails")}</p>
                  <Text variant="body-muted" className="mt-2">
                    {translate(locale, "offerDistributionDescription")}
                  </Text>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">{translate(locale, "supportingData")}</p>
                  <Text variant="body-muted" className="mt-2">
                    {translate(locale, "supportingDataDescription")}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="border-b-0 bg-base-color py-24 text-base-color-foreground lg:py-32">
        <SectionContainer className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-base-color-foreground/30 text-base-color-foreground">
              {translate(locale, "offerCtaEyebrow")}
            </Badge>
            <Heading level={2} className="mt-5 text-base-color-foreground">
              {translate(locale, "offerCtaTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-base-color-foreground/70">
              {translate(locale, "offerCtaDescription")}
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
            })}
          >
            {translate(locale, "requestOffer")}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </SectionContainer>
      </SectionShell>
    </main>
  )
}
