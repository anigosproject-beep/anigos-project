"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Handshake, ShieldCheck, Target, Timer } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const commitments: Array<{
  title: TranslationKey
  description: TranslationKey
  icon: typeof Handshake
}> = [
  {
    title: "commitmentLongTermTitle",
    description: "commitmentLongTermDescription",
    icon: Handshake,
  },
  {
    title: "commitmentSafeTitle",
    description: "commitmentSafeDescription",
    icon: Timer,
  },
  {
    title: "commitmentTransparentTitle",
    description: "commitmentTransparentDescription",
    icon: ShieldCheck,
  },
  {
    title: "commitmentPartnershipTitle",
    description: "commitmentPartnershipDescription",
    icon: Target,
  },
]

export default function HarapanCitaCitaPage() {
  const { locale } = useLocale()

  return (
    <>
      <PageHero
        eyebrow={translate(locale, "aboutSectionLabel")}
        title={translate(locale, "aspirationsPageTitle")}
        description={translate(locale, "aspirationsPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          {
            label: translate(locale, "aboutSectionLabel"),
            href: "/tentang-kami/profil-perusahaan",
          },
        ]}
      />

      <main>
        <section className="border-b border-border bg-background py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow={translate(locale, "aspirationsPageEyebrow")}
                title={translate(locale, "aspirationsPageIntroTitle")}
                description={translate(locale, "aspirationsPageIntroDescription")}
              />
              <div className="mt-8 space-y-5">
                <Text variant="body-muted">
                  {translate(locale, "aspirationsPageBody")}
                </Text>
                <Text variant="body-muted">
                  {translate(locale, "aspirationsPageSecondaryBody")}
                </Text>
              </div>
            </div>
            <div
              aria-label="Pattern visual harapan dan cita-cita Petro Anigos"
              className="relative isolate min-h-[22rem] overflow-hidden bg-muted/30 sm:min-h-[28rem] lg:min-h-[32rem]"
            >
              <Image
                src="/images/patterns/home-section-01/home-section-01-pattern.svg"
                alt="Pattern visual harapan dan cita-cita Petro Anigos"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-6 sm:p-10"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
            <div>
              <SectionHeading
                eyebrow={translate(locale, "aspirationsCompanyEyebrow")}
                title={translate(locale, "aspirationsCompanyTitle")}
              />
              <Text variant="lead" className="mt-6">
                {translate(locale, "aspirationsCompanyLead")}
              </Text>
              <Text variant="body-muted" className="mt-5">
                {translate(locale, "aspirationsCompanyBody")}
              </Text>
            </div>
            <Card className="bg-foreground text-background lg:mt-8">
              <CardHeader>
                <CardTitle className="text-background">
                  {translate(locale, "aspirationsStandardTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-8 text-background/75">
                  {translate(locale, "aspirationsStandardDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b border-border bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow={translate(locale, "aspirationsCommitmentEyebrow")}
              title={translate(locale, "aspirationsCommitmentTitle")}
              description={translate(locale, "aspirationsCommitmentDescription")}
            />
            <Separator className="my-10" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {commitments.map((commitment) => {
                const Icon = commitment.icon

                return (
                  <Card key={commitment.title} className="h-full">
                    <CardHeader>
                      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-muted">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>
                        {translate(locale, commitment.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text variant="small">
                        {translate(locale, commitment.description)}
                      </Text>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-24 text-background lg:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <Heading level={2} className="text-background">
              {translate(locale, "aspirationsTodayTitle")}
            </Heading>
            <Text variant="lead" className="mt-6 text-background/75">
              {translate(locale, "aspirationsTodayDescription")}
            </Text>
            <Text variant="body-muted" className="mt-5 text-background/65">
              {translate(locale, "aspirationsTodaySecondary")}
            </Text>
            <Link
              href="/tentang-kami/profil-perusahaan"
              className={buttonVariants({
                className: "mt-8 bg-background text-foreground hover:bg-background/90",
              })}
            >
              {translate(locale, "knowOurCompany")}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
