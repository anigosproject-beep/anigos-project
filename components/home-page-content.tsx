"use client"

import Link from "@/components/site-link"
import { ArrowRight } from "lucide-react"

import {
  ArticleShowcase,
  FeatureImageSection,
  HomeHero,
  MarineFuelShowcase,
  PartnershipShowcase,
  ProductShowcase,
  ResourceGrid,
} from "@/components/sections"
import { CountUp } from "@/components/count-up"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import { translate, type Locale } from "@/lib/i18n"
import type { HomeContent } from "@/lib/sanity-content-types"
import {
  HomeContentProvider,
  useHomeContent,
} from "@/components/home-content-provider"

export function HomePageContent({
  initialContent,
  initialLocale,
}: {
  initialContent: HomeContent
  initialLocale: Locale
}) {
  const { locale } = useLocale()

  return (
    <HomeContentProvider
      locale={locale}
      initialLocale={initialLocale}
      initialContent={initialContent}
    >
      <HomePageContentView />
    </HomeContentProvider>
  )
}

function HomePageContentView() {
  const { locale } = useLocale()
  const home = useHomeContent()
  const aboutMedia = home?.mediaSlots?.find(
    (media) =>
      media?.page === "home" &&
      media.section === "tentang-kami" &&
      media.slot === "background"
  )?.image?.url
  const aspiration = home?.aspiration
  const about = home?.about
  const achievements = home?.achievements

  return (
    <div>
      <HomeHero />
      <ProductShowcase />
      <MarineFuelShowcase />

      {/* SECTION 01: Harapan & Cita-Cita Perusahaan */}
      <section
        id="harapan-cita-cita"
        className="border-b border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary">
              {aspiration?.badge ?? translate(locale, "aspirationsBadge")}
            </Badge>
            <Heading level={2} className="mt-5">
              {aspiration?.title ?? translate(locale, "aspirationsTitle")}
            </Heading>
            <Text variant="lead" className="mt-6">
              {aspiration?.lead ?? translate(locale, "aspirationsDescription")}
            </Text>
            <Text variant="body-muted" className="mt-5">
              {aspiration?.body ??
                translate(locale, "aspirationsSecondaryDescription")}
            </Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tentang-kami/harapan-cita-cita"
                className={buttonVariants()}
              >
                {aspiration?.links?.[0]?.label ??
                  translate(locale, "aspirationsAction")}
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                href="/tentang-kami/profil-perusahaan"
                className={buttonVariants({ variant: "outline" })}
              >
                {aspiration?.links?.[1]?.label ??
                  translate(locale, "companyProfileAction")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Tentang Kami */}
      <FeatureImageSection
        id="tentang-kami"
        eyebrow={about?.eyebrow ?? translate(locale, "aboutEyebrow")}
        title={about?.title ?? translate(locale, "aboutTitle")}
        description={
          about?.description ?? translate(locale, "aboutDescription")
        }
        image={aboutMedia ?? about?.image?.url ?? "/images/company/office.png"}
        primaryAction={{
          label: about?.actions?.[0]?.label ?? translate(locale, "aboutAction"),
          href: about?.actions?.[0]?.href ?? "/tentang-kami/profil-perusahaan",
        }}
        secondaryAction={{
          label:
            about?.actions?.[1]?.label ??
            translate(locale, "organizationAction"),
          href:
            about?.actions?.[1]?.href ?? "/tentang-kami/struktur-perusahaan",
          style: "text",
        }}
      />

      {/* SECTION 03: Pencapaian Perusahaan */}
      <section
        id="pencapaian-perusahaan"
        className="border-b border-border bg-muted/40 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <Badge variant="secondary">
                {achievements?.badge ?? translate(locale, "achievementsBadge")}
              </Badge>
              <Heading level={3} variant="card" className="mt-5 max-w-md">
                {translate(locale, "achievementsCardTitle")}
              </Heading>
              <Heading level={2} className="mt-4 max-w-xl">
                {achievements?.title ?? translate(locale, "achievementsTitle")}
              </Heading>
            </div>
            <div className="flex flex-col items-start lg:items-end lg:text-right">
              <Text variant="lead" className="max-w-2xl">
                {achievements?.description ??
                  translate(locale, "achievementsDescription")}
              </Text>
              <Link
                href={achievements?.cta?.href ?? "/keberlanjutan"}
                className={buttonVariants({ className: "mt-8" })}
              >
                {achievements?.cta?.label ??
                  translate(locale, "learnMoreAction")}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                {translate(locale, "establishedSince")}
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                <CountUp
                  value={Number(achievements?.stats?.[0]?.value ?? 2019)}
                />
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {achievements?.stats?.[0]?.description ??
                  translate(locale, "establishedDescription")}
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                {translate(locale, "branchNetwork")}
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                <CountUp value={Number(achievements?.stats?.[1]?.value ?? 5)} />{" "}
                <span className="text-3xl">{translate(locale, "point")}</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {achievements?.stats?.[1]?.description ??
                  translate(locale, "branchDescription")}
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                {translate(locale, "fleetCapacity")}
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                <CountUp value={Number(achievements?.stats?.[2]?.value ?? 6)} />{" "}
                <span className="text-3xl">{translate(locale, "choice")}</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {achievements?.stats?.[2]?.description ??
                  translate(locale, "fleetDescription")}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: Kemitraan */}
      <PartnershipShowcase />

      {/* SECTION 06: Keberlanjutan dan Publikasi */}
      <ResourceGrid />

      {/* SECTION 07: Artikel */}
      <ArticleShowcase />
    </div>
  )
}
