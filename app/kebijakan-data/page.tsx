"use client"

import Link from "@/components/site-link"
import { BarChart3, CloudSun, Clock3, ShieldCheck } from "lucide-react"

import { PageHero } from "@/components/sections"
import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const policies = [
  {
    title: "weatherInformation",
    description: "weatherInformationDescription",
    icon: CloudSun,
  },
  {
    title: "marketInformation",
    description: "marketInformationDescription",
    icon: BarChart3,
  },
  {
    title: "dataTimeStatus",
    description: "dataTimeStatusDescription",
    icon: Clock3,
  },
  {
    title: "responsibleUse",
    description: "responsibleUseDescription",
    icon: ShieldCheck,
  },
]

export default function KebijakanDataPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        pageKey="kebijakan-data"
        eyebrow={translate(locale, "dataPolicy")}
        title={translate(locale, "dataPolicyTitle")}
        description={translate(locale, "dataPolicyDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: translate(locale, "dataPolicy"), href: "/kebijakan-data" }]}
      />

      <SectionShell className="bg-background py-20 lg:py-28">
        <SectionContainer>
          <div className="max-w-3xl">
            <Badge variant="secondary">{translate(locale, "informationTransparency")}</Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "contextualDataTitle")}
            </Heading>
            <Text variant="lead" className="mt-5">
              {translate(locale, "contextualDataDescription")}
            </Text>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {policies.map((policy) => {
              const Icon = policy.icon
              return (
                <Card key={policy.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-4">{translate(locale, policy.title as TranslationKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {translate(locale, policy.description as TranslationKey)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="bg-muted/40 py-20 lg:py-28">
        <SectionContainer className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow={translate(locale, "referenceSources")}
            title={translate(locale, "attributionTitle")}
            description={translate(locale, "attributionDescription")}
          />
          <div className="space-y-4">
            <a
              href="https://data.bmkg.go.id/prakiraan-cuaca/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-semibold">{translate(locale, "bmkgWeather")}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {translate(locale, "bmkgWeatherDescription")}
              </p>
            </a>
            <a
              href="https://www.idx.co.id/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-semibold">{translate(locale, "idxMarket")}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {translate(locale, "idxMarketDescription")}
              </p>
            </a>
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="border-b-0 bg-background py-16 lg:py-20">
        <SectionContainer>
          <div className="rounded-4xl bg-base-color p-8 text-base-color-foreground sm:p-12">
            <p className="text-sm font-medium text-base-color-foreground/60">{translate(locale, "disclaimer")}</p>
            <blockquote className="mt-5 max-w-4xl text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
              {translate(locale, "dataDisclaimer")}
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-base-color-foreground/70">
              <span>{translate(locale, "ribbonStatus")}</span>
              <span aria-hidden="true">·</span>
              <Link href="/produk/penawaran" className="text-base-color-foreground hover:underline">
                {translate(locale, "contactPetroAnigos")}
              </Link>
            </div>
          </div>
        </SectionContainer>
      </SectionShell>
    </main>
  )
}
