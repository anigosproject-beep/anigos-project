"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CircleAlert,
  Download,
  Handshake,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const partnershipPrinciples: Array<{
  title: TranslationKey
  description: TranslationKey
  icon: typeof Truck
}> = [
  {
    title: "principleConnectedTitle",
    description: "principleConnectedDescription",
    icon: Truck,
  },
  {
    title: "principleComplianceTitle",
    description: "principleComplianceDescription",
    icon: ShieldCheck,
  },
  {
    title: "principleLongTermTitle",
    description: "principleLongTermDescription",
    icon: Handshake,
  },
] as const

const transportLicense = [
  ["Nama badan usaha", "PT Masinton Nusa Perkasa"],
  ["Jenis izin usaha", "Pengangkutan Minyak dan Gas Bumi"],
  ["Jenis kegiatan", "Pengangkutan Bahan Bakar Minyak"],
  ["Jangka waktu izin", "Berlaku selama 5 (lima) tahun"],
  ["Tanggal terbit", "13 Juli 2020"],
  ["Diterbitkan oleh", "Kepala BKPM melalui Sertifikat Izin Usaha"],
] as const

export default function KemitraanPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "aboutSectionLabel")}
        title={translate(locale, "partnershipPageTitle")}
        description={translate(locale, "partnershipPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: translate(locale, "aboutSectionLabel"), href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div className="space-y-8">
            <SectionHeading
              eyebrow={translate(locale, "officialTransportPartnerEyebrow")}
              title={translate(locale, "officialTransportPartnerTitle")}
              description={translate(locale, "officialTransportPartnerDescription")}
            />
            <div className="max-w-sm rounded-2xl border border-border bg-muted/30 p-3">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background">
                <iframe
                  title="Preview dokumen kemitraan transportir"
                  src="/documents/company-profile-kemitraan-transportir.pdf#page=1&view=FitH"
                  className="size-full"
                />
              </div>
              <div className="px-1 pb-1 pt-4">
                <p className="text-sm font-medium">
                  {translate(locale, "transportDocumentTitle")}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {translate(locale, "transportDocumentDescription")}
                </p>
                <a
                  href="/documents/company-profile-kemitraan-transportir.pdf"
                  download="company-profile-kemitraan-transportir.pdf"
                  className={buttonVariants({
                    variant: "outline",
                    className: "mt-4 w-full",
                  })}
                >
                  {translate(locale, "downloadDocument")}
                  <Download data-icon="inline-end" />
                </a>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 p-0">
              <div className="overflow-hidden bg-muted/40">
              <Image
                src="/images/partnership/partnership-transportation.svg"
                alt="Ilustrasi kemitraan transportasi Petro Anigos"
                className="h-auto w-full"
                width={1200}
                height={675}
              />
              </div>
              <Text variant="body-muted" className="px-6 pb-6">
                {translate(locale, "transportPartnershipDescription")}
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "partnershipDetailEyebrow")}
            title={translate(locale, "partnershipDetailTitle")}
            description={translate(locale, "partnershipDetailDescription")}
          />
          <Card className="mt-12 overflow-hidden">
            <CardHeader className="border-b border-border bg-background">
              <Badge variant="secondary" className="w-fit">
                PT Masinton Nusa Perkasa
              </Badge>
              <CardTitle className="mt-4 text-2xl">
                {translate(locale, "transportLicenseTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-px bg-border p-0 md:grid-cols-2">
              {transportLicense.map(([label, value]) => (
                <div
                  key={label}
                  className="bg-background px-6 py-5"
                >
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="mt-5 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CircleAlert className="size-4 text-muted-foreground" />
                {translate(locale, "verificationNoteTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Text variant="body-muted" className="flex items-start gap-2">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                {translate(locale, "verificationNote")}
                </span>
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "howWePartnerEyebrow")}
            title={translate(locale, "howWePartnerTitle")}
            description={translate(locale, "howWePartnerDescription")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partnershipPrinciples.map((principle) => {
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

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              {translate(locale, "collaborationOpenLabel")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "collaborationTitle")}
            </Heading>
            <p className="mt-5 leading-7 text-background/70">
              {translate(locale, "collaborationDescription")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:anigospetro@gmail.com"
              className={buttonVariants({
                className: "bg-background text-foreground hover:bg-background/90",
              })}
            >
              {translate(locale, "contactUsAction")}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-background/30 text-background hover:bg-background/10 hover:text-background",
              })}
            >
              {translate(locale, "viewLegality")}
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-background/15" />
      </section>
    </main>
  )
}
