"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  ArticleShowcase,
  FeatureImageSection,
  HomeHero,
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
import { translate } from "@/lib/i18n"

export default function Page() {
  const { locale } = useLocale()

  return (
    <div>
      <HomeHero />

      {/* SECTION 01: Harapan & Cita-Cita Perusahaan */}
      <section
        id="harapan-cita-cita"
        className="border-b border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-16 lg:px-8">
          <div
            aria-label="Pattern visual cita-cita Petro Anigos"
            className="relative isolate min-h-[22rem] overflow-hidden bg-background lg:min-h-[30rem]"
          >
            <Image
              src="/images/patterns/home-section-01/home-section-01-pattern.svg"
              alt="Pattern visual cita-cita Petro Anigos"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-contain"
            />
          </div>

          <div className="max-w-3xl">
            <Badge variant="secondary">
              {translate(locale, "aspirationsBadge")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "aspirationsTitle")}
            </Heading>
            <Text variant="lead" className="mt-6">
              {translate(locale, "aspirationsDescription")}
            </Text>
            <Text variant="body-muted" className="mt-5">
              {translate(locale, "aspirationsSecondaryDescription")}
            </Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tentang-kami/harapan-cita-cita"
                className={buttonVariants()}
              >
                {translate(locale, "aspirationsAction")}
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                href="/tentang-kami/profil-perusahaan"
                className={buttonVariants({ variant: "outline" })}
              >
                {translate(locale, "companyProfileAction")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Tentang Kami */}
      <FeatureImageSection
        id="tentang-kami"
        eyebrow={translate(locale, "aboutEyebrow")}
        title={translate(locale, "aboutTitle")}
        description={translate(locale, "aboutDescription")}
        image="/images/page-hero/tentang-kami.webp"
        primaryAction={{
          label: translate(locale, "aboutAction"),
          href: "/tentang-kami/profil-perusahaan",
        }}
        secondaryAction={{
          label: translate(locale, "organizationAction"),
          href: "/tentang-kami/struktur-perusahaan",
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
                {translate(locale, "achievementsBadge")}
              </Badge>
              <Heading level={3} variant="card" className="mt-5 max-w-md">
                {translate(locale, "achievementsCardTitle")}
              </Heading>
              <Heading level={2} className="mt-4 max-w-xl">
                {translate(locale, "achievementsTitle")}
              </Heading>
            </div>
            <div className="flex flex-col items-start lg:items-end lg:text-right">
              <Text variant="lead" className="max-w-2xl">
                {translate(locale, "achievementsDescription")}
              </Text>
              <Link
                href="/keberlanjutan/pencapaian-perusahaan"
                className={buttonVariants({ className: "mt-8" })}
              >
                {translate(locale, "learnMoreAction")}
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
                <CountUp value={2019} />
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {translate(locale, "establishedDescription")}
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                {translate(locale, "branchNetwork")}
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                <CountUp value={5} />{" "}
                <span className="text-3xl">{translate(locale, "point")}</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {translate(locale, "branchDescription")}
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                {translate(locale, "fleetCapacity")}
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                <CountUp value={6} />{" "}
                <span className="text-3xl">{translate(locale, "choice")}</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                {translate(locale, "fleetDescription")}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: Produk */}
      <ProductShowcase />

      {/* SECTION 05: Kemitraan */}
      <PartnershipShowcase />

      {/* SECTION 06: Keberlanjutan dan Publikasi */}
      <ResourceGrid />

      {/* SECTION 07: Artikel */}
      <ArticleShowcase />
    </div>
  )
}
