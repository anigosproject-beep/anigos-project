"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { careerBenefits, careerOpenings } from "@/lib/careers-data"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const benefitKeys = [
  ["purposeAtWork", "purposeAtWorkDescription"],
  ["supportiveCulture", "supportiveCultureDescription"],
  ["fieldLearning", "fieldLearningDescription"],
  ["safeWorkStandards", "safeWorkStandardsDescription"],
  ["crossRoleCollaboration", "crossRoleCollaborationDescription"],
  ["roomToGrow", "roomToGrowDescription"],
] as const

const openingKeys = {
  "staff-operasional-distribusi": ["distributionOperationsStaff", "distributionOperationsSummary", "operations"],
  "sales-account-executive": ["salesAccountExecutive", "salesAccountSummary", "commercial"],
} as const

export default function KarirPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "careersEyebrow")}
        title={translate(locale, "careersTitle")}
        description={translate(locale, "careersDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: translate(locale, "about"), href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "whyPetroAnigos")}
            title={translate(locale, "meaningfulWorkTitle")}
            description={translate(locale, "meaningfulWorkDescription")}
          />
          <div className="rounded-4xl bg-foreground p-8 text-background shadow-xl sm:p-12">
            <Badge variant="secondary" className="bg-background/10 text-background">
              {translate(locale, "growingTogether")}
            </Badge>
            <Heading level={2} className="mt-6 text-background">
              {translate(locale, "professionalHumanTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              {translate(locale, "professionalHumanDescription")}
            </Text>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "workExperience")}
            title={translate(locale, "sharedStandardsTitle")}
            description={translate(locale, "sharedStandardsDescription")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              const [titleKey, descriptionKey] = benefitKeys[index]
              return (
                <Card key={benefit.title} className="h-full bg-background transition-transform duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <CardTitle className="mt-5">{translate(locale, titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{translate(locale, descriptionKey)}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="lowongan" className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={translate(locale, "careerOpenings")}
              title={translate(locale, "careerOpeningsTitle")}
              description={translate(locale, "careerOpeningsDescription")}
            />
            <Badge variant="outline" className="w-fit">{careerOpenings.length} {translate(locale, "positionsAvailable")}</Badge>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {careerOpenings.map((opening) => {
              const [titleKey, summaryKey, departmentKey] = openingKeys[opening.slug as keyof typeof openingKeys]
              return (
              <Card key={opening.slug} className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{translate(locale, departmentKey)}</Badge>
                    <span className="text-xs text-muted-foreground">{translate(locale, "fullTime")}</span>
                  </div>
                  <CardTitle className="mt-4 text-2xl">{translate(locale, titleKey)}</CardTitle>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" /> {opening.location}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{translate(locale, summaryKey)}</p>
                  <Link href={`/tentang-kami/karir/lamar?posisi=${opening.slug}`} className={buttonVariants({ className: "mt-7 w-fit" })}>
                    {translate(locale, "viewAndApply")} <ArrowRight data-icon="inline-end" />
                  </Link>
                </CardContent>
              </Card>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
