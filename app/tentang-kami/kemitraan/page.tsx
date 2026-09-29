"use client"

import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CircleAlert,
  Download,
  Handshake,
  MoreHorizontal,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { PdfThumbnail } from "@/components/pdf-thumbnail"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import type { PartnershipPageResponse } from "@/lib/sanity-content-types"
import type { PartnershipItem } from "@/lib/partnership-fallback"

type PartnershipTableRow = {
  id: string
  company: string
  partnerSince?: string
  partner: PartnershipItem
}

const partnershipColumns = [
  { key: "company", labelId: "company" },
  { key: "partnerSince", labelId: "partnerSince" },
] as const

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

function formatPartnerSince(value: string | undefined, locale: "id" | "en") {
  if (!value) return null

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    dateStyle: "long",
  }).format(date)
}

function PartnershipPdfPanel({
  file,
  title,
  description,
  emptyLabel,
  actionLabel,
  downloadLabel,
}: {
  file?: { url?: string; originalFilename?: string }
  title: string
  description?: string
  emptyLabel: string
  actionLabel: string
  downloadLabel: string
}) {
  const openDocument = () => {
    if (!file?.url) return
    window.open(file.url, "_blank", "noopener,noreferrer")
  }

  const downloadDocument = () => {
    if (!file?.url) return
    const anchor = document.createElement("a")
    anchor.href = file.url
    anchor.rel = "noopener noreferrer"
    anchor.download = file.originalFilename || title || "document.pdf"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  return (
    <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-stretch sm:p-5">
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl border border-border bg-muted/50 sm:w-28 md:w-32">
        {file?.url ? (
          <PdfThumbnail
            src={file.url}
            title={file.originalFilename ?? actionLabel}
          />
        ) : (
          <div aria-hidden="true" className="size-full" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden">
        <Badge variant="secondary" className="w-fit">
          PDF
        </Badge>
        <h3 className="mt-3 line-clamp-2 text-lg leading-6 font-medium">
          {title}
        </h3>
        <Text
          variant="body-muted"
          className="mt-2 line-clamp-3 max-w-3xl leading-6"
        >
          {description ?? emptyLabel}
        </Text>
        {file?.url && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openDocument}
              className={buttonVariants({ className: "w-fit shrink-0" })}
            >
              {actionLabel}
            </button>
            <button
              type="button"
              onClick={downloadDocument}
              className={buttonVariants({
                variant: "outline",
                className: "w-fit shrink-0",
              })}
            >
              <Download data-icon="inline-start" />
              {downloadLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function KemitraanPage() {
  const { locale } = useLocale()
  const router = useRouter()
  const [partnership, setPartnership] =
    React.useState<PartnershipPageResponse | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()
    void fetch(`/api/kemitraan?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Partnership request failed: ${response.status}`)
        return response.json() as Promise<PartnershipPageResponse | null>
      })
      .then(setPartnership)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity partnership content", error)
      })

    return () => controller.abort()
  }, [locale])

  const sanityPartners =
    partnership?.showcase?.filter((item): item is PartnershipItem =>
      Boolean(item?.name)
    ) ?? []
  const partners = sanityPartners
  const partnerRows: PartnershipTableRow[] = partners.map((partner) => ({
    id: partner._id,
    company: partner.name ?? "Unnamed partner",
    partnerSince: partner.partnerSince,
    partner,
  }))
  const [selectedPartnerId, setSelectedPartnerId] = React.useState<
    string | null
  >(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 6

  const selectedPartner =
    partners.find((item) => item?._id === selectedPartnerId) ?? partners[0]
  const totalPages = Math.max(1, Math.ceil(partnerRows.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const visiblePartnerRows = partnerRows.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  )
  const pageNumbers =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : [
          1,
          safeCurrentPage > 3 ? -1 : 2,
          safeCurrentPage > 3 && safeCurrentPage < totalPages - 2
            ? safeCurrentPage
            : 3,
          safeCurrentPage < totalPages - 2 ? -1 : totalPages - 1,
          totalPages,
        ]

  const process = partnership?.process?.filter(
    (step): step is { title?: string; body?: string } =>
      Boolean(step?.title || step?.body)
  )
  const closingActions = partnership?.closing?.actions?.filter(
    (action) => action?.href && action?.label
  )

  return (
    <main>
      <PageHero
        eyebrow={
          partnership?.hero?.eyebrow ?? translate(locale, "aboutSectionLabel")
        }
        title={
          partnership?.hero?.title ?? translate(locale, "partnershipPageTitle")
        }
        description={
          partnership?.hero?.description ??
          translate(locale, "partnershipPageDescription")
        }
        image={
          partnership?.hero?.image?.url ?? "/images/page-hero/tentang-kami.webp"
        }
        pageKey="kemitraan"
        breadcrumbs={[
          {
            label: translate(locale, "aboutSectionLabel"),
            href: "/tentang-kami/profil-perusahaan",
          },
        ]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow={
                partnership?.intro?.eyebrow ??
                translate(locale, "officialTransportPartnerEyebrow")
              }
              title={
                partnership?.intro?.title ??
                translate(locale, "officialTransportPartnerTitle")
              }
              description={
                partnership?.intro?.lead ??
                partnership?.intro?.body ??
                translate(locale, "officialTransportPartnerDescription")
              }
            />
            <div className="mt-8 flex items-center gap-3 border-l-2 border-foreground/15 pl-5">
              <Handshake className="size-5 shrink-0 text-muted-foreground" />
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {translate(locale, "partnershipSelectionHint")}
              </p>
            </div>
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-muted/40">
            <Image
              src="/images/partnership/partnership-transportation.svg"
              alt={translate(locale, "partnershipTransportationAlt")}
              className="size-full object-cover"
              width={1200}
              height={675}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "partnershipDetailEyebrow")}
            title={translate(locale, "partnershipDetailTitle")}
            description={translate(locale, "partnershipDetailDescription")}
            className="max-w-3xl"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3 sm:px-6">
              <p className="text-sm font-medium text-foreground">
                {translate(locale, "partnerCompanyData")}
              </p>
              {partnerRows.length > 0 && (
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {partnerRows.length}
                </span>
              )}
            </div>

            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 hover:bg-muted/10">
                    {partnershipColumns.map((column) => (
                      <TableHead
                        key={column.key}
                        className={
                          column.key === "company"
                            ? "px-4 py-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:px-5"
                            : "hidden py-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:table-cell"
                        }
                      >
                        {column.labelId === "company"
                          ? translate(locale, "company")
                          : translate(locale, "partnershipStartDate")}
                      </TableHead>
                    ))}
                    <TableHead className="w-24 px-4 py-3 text-right text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:px-5">
                      {translate(locale, "dataDetails")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visiblePartnerRows.length ? (
                    visiblePartnerRows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        className="transition-colors hover:bg-muted/20"
                      >
                        <TableCell className="px-4 py-3.5 align-middle sm:px-5">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full border border-border bg-muted/40 text-[11px] font-semibold text-muted-foreground">
                              {String(
                                (safeCurrentPage - 1) * pageSize + index + 1
                              ).padStart(2, "0")}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">
                                {row.company}
                              </p>
                              <span className="mt-1 block text-xs text-muted-foreground sm:hidden">
                                {formatPartnerSince(row.partnerSince, locale) ??
                                  translate(locale, "partnerDateUnavailable")}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden py-3.5 text-sm text-muted-foreground sm:table-cell">
                          {formatPartnerSince(row.partnerSince, locale) ??
                            translate(locale, "partnershipUnavailable")}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-right sm:px-5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() =>
                              router.push(`/tentang-kami/kemitraan/${row.id}`)
                            }
                            className="rounded-full"
                            aria-label={`${translate(locale, "viewPartnerDetails")} ${row.company}`}
                          >
                            <MoreHorizontal
                              className="size-4"
                              aria-hidden="true"
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="px-5 py-10 text-center text-sm text-muted-foreground"
                      >
                        {translate(locale, "noPublishedPartners")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {partnerRows.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-muted-foreground">
                  {translate(locale, "partnersShowing")
                    .replace("{from}", String(Math.min((safeCurrentPage - 1) * pageSize + 1, partnerRows.length)))
                    .replace("{to}", String(Math.min(safeCurrentPage * pageSize, partnerRows.length)))
                    .replace("{count}", String(partnerRows.length))}
                </p>

                <Pagination
                  className="mx-0 w-auto justify-end"
                  aria-label={
                    translate(locale, "paginationLabel")
                  }
                >
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={
                          safeCurrentPage > 1
                            ? `?page=${safeCurrentPage - 1}`
                            : undefined
                        }
                        onClick={(event) => {
                          event.preventDefault()
                          setCurrentPage((page) => Math.max(1, page - 1))
                        }}
                        aria-disabled={safeCurrentPage === 1}
                        tabIndex={safeCurrentPage === 1 ? -1 : undefined}
                        className={
                          safeCurrentPage === 1
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                        text={translate(locale, "previousPageShort")}
                      />
                    </PaginationItem>

                    {pageNumbers.map((pageNumber, index) =>
                      pageNumber === -1 ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={`?page=${pageNumber}`}
                            isActive={pageNumber === safeCurrentPage}
                            aria-label={`${translate(locale, "pageNumber")} ${pageNumber}`}
                            onClick={(event) => {
                              event.preventDefault()
                              setCurrentPage(pageNumber)
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href={
                          safeCurrentPage < totalPages
                            ? `?page=${safeCurrentPage + 1}`
                            : undefined
                        }
                        onClick={(event) => {
                          event.preventDefault()
                          setCurrentPage((page) =>
                            Math.min(totalPages, page + 1)
                          )
                        }}
                        aria-disabled={safeCurrentPage === totalPages}
                        tabIndex={
                          safeCurrentPage === totalPages ? -1 : undefined
                        }
                        className={
                          safeCurrentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                        text={translate(locale, "nextPageShort")}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          <Dialog
            open={Boolean(selectedPartnerId)}
            onOpenChange={(open) => {
              if (!open) setSelectedPartnerId(null)
            }}
          >
            {selectedPartner ? (
              <DialogContent className="h-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] !max-w-5xl overflow-x-hidden overflow-y-auto rounded-[28px] border border-border/70 bg-background p-0 sm:gap-0 sm:p-0">
                <div className="border-b border-border/80 bg-muted/30 px-5 py-4 sm:px-6">
                  <DialogHeader className="space-y-2">
                    <DialogTitle className="text-xl sm:text-2xl">
                      {selectedPartner.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      {translate(locale, "partnerPortfolioDescription")}
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.05fr_1.35fr]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-4">
                      <div className="flex aspect-[16/9] w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2 sm:w-36">
                        <Image
                          src={
                            selectedPartner.logo?.url ??
                            selectedPartner.image?.url ??
                            "/images/partnership/partnership-transportation.svg"
                          }
                          alt={
                            selectedPartner.logo?.alt ??
                            `Logo ${selectedPartner.name}`
                          }
                          className="block h-auto max-h-full w-auto max-w-full object-contain"
                          width={320}
                          height={180}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                          {translate(locale, "partnerSince")}
                        </p>
                        <p className="mt-1 font-medium text-foreground">
                          {formatPartnerSince(
                            selectedPartner.partnerSince,
                            locale
                          ) ??
                            translate(locale, "partnershipUnavailable")}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-4">
                      <h3 className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {translate(locale, "additionalDetails")}
                      </h3>
                      <Text variant="body-muted" className="mt-3 leading-7">
                        {selectedPartner.body ??
                          translate(locale, "transportPartnershipDescription")}
                      </Text>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <Tabs defaultValue="portfolio" className="h-full">
                      <TabsList className="w-full justify-start bg-muted/40 p-1">
                        <TabsTrigger
                          value="portfolio"
                          className="flex-1 sm:flex-none"
                        >
                          {translate(locale, "portfolio")}
                        </TabsTrigger>
                        <TabsTrigger
                          value="documentation"
                          className="flex-1 sm:flex-none"
                        >
                          {translate(locale, "documentation")}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="portfolio"
                        className="mt-4 rounded-2xl border border-border bg-muted/20 p-0"
                      >
                        <PartnershipPdfPanel
                          file={selectedPartner.portfolioDocument}
                          title={
                            translate(locale, "partnershipPortfolioPdfTitle")
                          }
                          description={selectedPartner.portfolio}
                          emptyLabel={
                            translate(locale, "partnershipPortfolioPdfUnavailable")
                          }
                          actionLabel={
                            translate(locale, "partnershipOpenPortfolioPdf")
                          }
                          downloadLabel={translate(locale, "partnershipDownload")}
                        />
                      </TabsContent>

                      <TabsContent
                        value="documentation"
                        className="mt-4 rounded-2xl border border-border bg-muted/20 p-0"
                      >
                        <PartnershipPdfPanel
                          file={selectedPartner.documentation}
                          title={
                            translate(locale, "partnershipDocumentationPdfTitle")
                          }
                          description={selectedPartner.body}
                          emptyLabel={
                            translate(locale, "partnershipDocumentationPdfUnavailable")
                          }
                          actionLabel={
                            translate(locale, "partnershipOpenDocumentationPdf")
                          }
                          downloadLabel={translate(locale, "partnershipDownload")}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </DialogContent>
            ) : null}
          </Dialog>

          <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span>{translate(locale, "verificationNoteTitle")}:</span>
              <HoverCard>
                <HoverCardTrigger className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted">
                  {translate(locale, "viewNote")}
                </HoverCardTrigger>
                <HoverCardContent
                  side="bottom"
                  align="start"
                  className="max-w-xs"
                >
                  <p className="text-sm leading-6 text-foreground">
                    {translate(locale, "verificationNote")}
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
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
            {(process?.length ? process : partnershipPrinciples).map(
              (item, index) => {
                const fallback =
                  partnershipPrinciples[index % partnershipPrinciples.length]
                const Icon = fallback.icon

                return (
                  <Card key={item.title ?? fallback.title} className="h-full">
                    <CardHeader>
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="mt-4">
                        {"title" in item && item.title
                          ? item.title
                          : translate(locale, fallback.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {"body" in item && item.body
                          ? item.body
                          : translate(locale, fallback.description)}
                      </p>
                    </CardContent>
                  </Card>
                )
              }
            )}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-foreground lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-border text-foreground">
              {translate(locale, "collaborationOpenLabel")}
            </Badge>
            <Heading level={2} className="mt-5">
              {partnership?.closing?.title ??
                translate(locale, "collaborationTitle")}
            </Heading>
            <p className="mt-5 leading-7 text-muted-foreground">
              {partnership?.closing?.body ??
                translate(locale, "collaborationDescription")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {(closingActions?.length
              ? closingActions
              : [
                  {
                    href: "mailto:anigospetro@gmail.com",
                    label: translate(locale, "contactUsAction"),
                  },
                  {
                    href: "/tentang-kami/legalitas",
                    label: translate(locale, "viewLegality"),
                    variant: "outline" as const,
                  },
                ]
            ).map((action, index) => (
              <Link
                key={`${action.href}-${index}`}
                href={action.href ?? "#"}
                className={buttonVariants({
                  variant:
                    action.variant === "outline" || index > 0
                      ? "outline"
                      : "default",
                  className:
                    index === 0
                      ? "bg-base-color text-base-color-foreground hover:bg-base-color/90"
                      : "border-border text-foreground hover:bg-base-color/10 hover:text-base-color",
                })}
              >
                {action.label}
                {index === 0 && <ArrowRight data-icon="inline-end" />}
              </Link>
            ))}
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-border" />
      </section>
    </main>
  )
}
