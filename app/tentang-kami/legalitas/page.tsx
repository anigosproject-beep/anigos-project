"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CircleAlert, Download, Eye, FileCheck2, FileText } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentActions,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import type {CompanyDocument} from "@/lib/sanity-company-documents"

const legalHighlights = [
  {
    title: "incorporationDeed",
    value: "Nomor 11 · 18 Juli 2019",
    description: "notary",
  },
  {
    title: "ministryApproval",
    value: "AHU-0035830.Ah.01.01",
    description: "year2019",
  },
  {
    title: "generalTradingLicense",
    value: "05.Nw.03.25.00.153",
    description: "directorateOilGas",
  },
  {
    title: "bphMigasRegistration",
    value: "03/NRU/KABPH MIGAS/2020",
    description: "bphMigasBusinessRegistration",
  },
  {
    title: "trademark",
    value: "PT. Anigos Jaya Perkasa",
    description: "alsoKnownAsAnigosPetro",
  },
  {
    title: "transportPartnerLicense",
    value: "PT Masinton Nusa Perkasa",
    description: "fuelTransportation",
  },
] satisfies Array<{
  title: TranslationKey
  value: string
  description: TranslationKey
}>

export default function LegalitasPage() {
  const { locale } = useLocale()
  const [documents, setDocuments] = useState<CompanyDocument[]>([])

  useEffect(() => {
    const controller = new AbortController()
    void fetch("/api/company-documents?type=legalitas", {signal: controller.signal, cache: "no-store"})
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Gagal memuat dokumen legalitas.")))
      .then((value: CompanyDocument[]) => setDocuments(value))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error(error)
      })
    return () => controller.abort()
  }, [])
  const availableDocuments = documents.filter((document) => document.href)

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "aboutSectionLabel")}
        title={translate(locale, "legalityPageTitle")}
        description={translate(locale, "legalityPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="legalitas"
        breadcrumbs={[{ label: translate(locale, "aboutSectionLabel"), href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "legalBasisEyebrow")}
            title={translate(locale, "legalBasisTitle")}
            description={translate(locale, "legalBasisDescription")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {legalHighlights.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                    <FileCheck2 className="size-5" />
                  </div>
                  <CardTitle className="mt-4 text-base">
                    {translate(locale, item.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {translate(locale, item.description)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "legalDocumentsEyebrow")}
            title={translate(locale, "legalDocumentsTitle")}
            description={translate(locale, "legalDocumentsDescription")}
          />
          {availableDocuments.length > 0 ? (
            <AttachmentGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availableDocuments.map((document) => (
                <Attachment key={document.title} orientation="vertical" className="w-full">
                  <AttachmentMedia variant="icon">
                    <FileText />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{document.title}</AttachmentTitle>
                    <AttachmentDescription>
                      {document.description}
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <a
                      href={document.href!}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${translate(locale, "documentView")} ${document.title}`}
                      title={translate(locale, "documentView")}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon-xs",
                      })}
                    >
                      <Eye />
                    </a>
                    <a
                      href={document.href!}
                      download={document.title || undefined}
                      aria-label={`${translate(locale, "documentDownload")} ${document.title}`}
                      title={translate(locale, "documentDownload")}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon-xs",
                      })}
                    >
                      <Download />
                    </a>
                  </AttachmentActions>
                </Attachment>
              ))}
            </AttachmentGroup>
          ) : (
            <Empty className="mt-12 border border-dashed border-border bg-background">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CircleAlert />
                </EmptyMedia>
                <EmptyTitle>
                  {translate(locale, "documentsUnavailableTitle")}
                </EmptyTitle>
                <EmptyDescription>
                  {translate(locale, "documentsUnavailableDescription")}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-foreground lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-border text-foreground">
              {translate(locale, "informationTransparency")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "publicDocumentsTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-muted-foreground">
              {translate(locale, "publicDocumentsDescription")}
            </Text>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tentang-kami/client"
              className={buttonVariants({
                className: "bg-base-color text-base-color-foreground hover:bg-base-color/90",
              })}
            >
              {translate(locale, "viewPartnership")}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="mailto:anigospetro@gmail.com"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-border text-foreground hover:bg-base-color/10 hover:text-base-color",
              })}
            >
              {translate(locale, "contactUsAction")}
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-border" />
      </section>
    </main>
  )
}
