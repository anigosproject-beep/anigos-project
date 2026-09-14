"use client"

import Link from "next/link"
import {
  ArrowRight,
  CircleCheck,
  Eye,
  Handshake,
  ShieldCheck,
  Target,
} from "lucide-react"

import { FeatureImageSection, PageHero } from "@/components/sections"
import { DistributionLinePattern } from "@/components/patterns/distribution-line-pattern"
import { Eyebrow, Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const principles: Array<{
  title: TranslationKey
  description: TranslationKey
  icon: typeof Target
}> = [
  {
    title: "principleGoalTitle",
    description: "principleGoalDescription",
    icon: Target,
  },
  {
    title: "principleEthicsTitle",
    description: "principleEthicsDescription",
    icon: Handshake,
  },
  {
    title: "principleObjectiveTitle",
    description: "principleObjectiveDescription",
    icon: ShieldCheck,
  },
  {
    title: "principleValueTitle",
    description: "principleValueDescription",
    icon: CircleCheck,
  },
] as const

const legalHighlights = [
  ["Berdiri", "18 Juli 2019"],
  ["Nomor akta", "11"],
  ["Kode izin usaha", "05.Nw.03.25.00.153"],
  ["Registrasi BPH Migas", "03/NRU/KABPH MIGAS/2020"],
] as const

export default function ProfilPerusahaanPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "aboutSectionLabel")}
        title={translate(locale, "profilePageTitle")}
        description={translate(locale, "profilePageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          {
            label: translate(locale, "aboutSectionLabel"),
            href: "/tentang-kami/profil-perusahaan",
          },
        ]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "aboutSectionLabel")}
            title={translate(locale, "profileIntroTitle")}
            description={translate(locale, "profileIntroDescription")}
          />
          <div className="space-y-6">
            <Text variant="lead">
              {translate(locale, "profileExperience")}
            </Text>
            <Text variant="body-muted">
              {translate(locale, "profileLegalHistory")}
            </Text>
            <Text variant="body-muted">
              {translate(locale, "profileProductStandard")}
            </Text>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({ variant: "outline", className: "mt-2" })}
            >
              {translate(locale, "profileLegalDetailAction")}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </section>

      <FeatureImageSection
        id="sejarah-perusahaan"
        eyebrow={translate(locale, "companyJourneyEyebrow")}
        title={translate(locale, "companyJourneyTitle")}
        description={translate(locale, "companyJourneyDescription")}
        image="/images/page-hero/tentang-kami.webp"
        imagePosition="center"
      />

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
            <SectionHeading
              eyebrow={translate(locale, "companyPurposeEyebrow")}
              title={translate(locale, "companyPurposeTitle")}
            />
            <div className="relative overflow-hidden rounded-4xl bg-foreground p-8 text-background sm:p-12">
              <DistributionLinePattern className="text-background opacity-[0.2] [mask-image:linear-gradient(135deg,black_0%,black_46%,transparent_88%)]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_42%),linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.16)_100%)]"
              />
              <div className="relative z-10">
                <Eye className="size-8 text-background/70" />
                <blockquote className="mt-8 text-2xl leading-relaxed font-medium tracking-tight sm:text-3xl">
                  “{translate(locale, "companyPurposeQuote")}”
                </blockquote>
                <p className="mt-8 text-sm text-background/60">
                  {translate(locale, "companyPurposeCaption")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "principlesEyebrow")}
            title={translate(locale, "principlesTitle")}
            description={translate(locale, "principlesDescription")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => {
              const Icon = principle.icon

              return (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-4">
                      {translate(locale, principle.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {translate(locale, principle.description)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <Card className="relative overflow-hidden bg-foreground text-background">
            <DistributionLinePattern className="text-background opacity-[0.18] [mask-image:linear-gradient(135deg,black_0%,black_42%,transparent_90%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_44%),linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.12)_100%)] backdrop-blur-[1px]"
            />
            <div className="relative z-10">
              <CardHeader>
                <Badge variant="outline" className="border-background/30 text-background">
                  {translate(locale, "visionLabel")}
                </Badge>
                <CardTitle className="mt-5 text-3xl leading-tight">
                  {translate(locale, "visionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-background/70">
                  {translate(locale, "visionDescription")}
                </p>
              </CardContent>
            </div>
          </Card>
          <Card className="relative overflow-hidden">
            <DistributionLinePattern className="text-foreground opacity-[0.12] [mask-image:linear-gradient(135deg,black_0%,black_40%,transparent_90%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_44%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.08)_100%)] backdrop-blur-[1px]"
            />
            <div className="relative z-10">
              <CardHeader>
                <Badge variant="secondary">
                  {translate(locale, "missionLabel")}
                </Badge>
                <CardTitle className="mt-5 text-3xl leading-tight">
                  {translate(locale, "missionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {translate(locale, "missionDescription")}
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>{translate(locale, "legalSnapshotEyebrow")}</Eyebrow>
              <Heading level={2} className="mt-3">
                {translate(locale, "legalSnapshotTitle")}
              </Heading>
            </div>
            <Link
              href="/tentang-kami/legalitas"
              className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              {translate(locale, "viewAllLegality")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <Separator className="my-10" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {legalHighlights.map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              {translate(locale, "nextStepLabel")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "nextStepTitle")}
            </Heading>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produk/kenali-produk"
              className={buttonVariants({ className: "bg-background text-foreground hover:bg-background/90" })}
            >
              {translate(locale, "productsOverview")}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({ variant: "outline", className: "border-background/30 text-background hover:bg-background/10 hover:text-background" })}
            >
              {translate(locale, "viewLegality")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
