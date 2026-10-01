"use client"

import Image from "next/image"
import * as React from "react"

import { PageHero } from "@/components/sections"
import { SectionHeading } from "@/components/typography"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type { SanityClientPortfolioEntry } from "@/lib/sanity-content-types"

function getClientGallery(client: SanityClientPortfolioEntry) {
  return client.gallery?.filter(
    (image): image is NonNullable<typeof image> => Boolean(image?.url)
  ) ?? []
}

export default function ClientPortfolioPage() {
  const { locale } = useLocale()
  const [clients, setClients] = React.useState<SanityClientPortfolioEntry[]>([])
  const [loadedLocale, setLoadedLocale] = React.useState<string | null>(null)
  const [loadErrorLocale, setLoadErrorLocale] = React.useState<string | null>(
    null
  )
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(
    null
  )

  React.useEffect(() => {
    const controller = new AbortController()

    void fetch(`/api/kemitraan/clients?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Client request failed: ${response.status}`)
        }
        return response.json() as Promise<SanityClientPortfolioEntry[]>
      })
      .then((data) => {
        setClients(data)
        setLoadErrorLocale(null)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity client records", error)
        setLoadErrorLocale(locale)
      })
      .finally(() => setLoadedLocale(locale))

    return () => controller.abort()
  }, [locale])

  const isLoading = loadedLocale !== locale
  const hasLoadError = loadErrorLocale === locale
  const visibleClients =
    loadedLocale === locale && !hasLoadError ? clients : []
  const selectedClient =
    visibleClients.find((client) => client._id === selectedClientId) ??
    visibleClients[0]
  const selectedGallery = selectedClient ? getClientGallery(selectedClient) : []

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "clientPageEyebrow")}
        title={translate(locale, "clientPageTitle")}
        description={translate(locale, "clientPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
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
              eyebrow={translate(locale, "clientIntroEyebrow")}
              title={translate(locale, "clientIntroTitle")}
              description={translate(locale, "clientIntroDescription")}
            />
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
            eyebrow={translate(locale, "clientTableEyebrow")}
            title={translate(locale, "clientTableTitle")}
            description={translate(locale, "clientTableDescription")}
            className="max-w-3xl"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3 sm:px-6">
              <p className="text-sm font-medium text-foreground">
                {translate(locale, "clientTableTitle")}
              </p>
              {!isLoading && !hasLoadError && visibleClients.length > 0 ? (
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {visibleClients.length}
                </span>
              ) : null}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 hover:bg-muted/10">
                    <TableHead className="min-w-52 px-4 py-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:px-5">
                      {translate(locale, "clientCompanyColumn")}
                    </TableHead>
                    <TableHead className="min-w-44 py-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                      {translate(locale, "clientLocationColumn")}
                    </TableHead>
                    <TableHead className="min-w-56 py-3 pr-4 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:pr-5">
                      {translate(locale, "clientProductsColumn")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleClients.map((client) => {
                    const products =
                      client.productsUsed
                        ?.map((product) => product?.name?.trim())
                        .filter((name): name is string => Boolean(name)) ?? []

                    return (
                      <TableRow key={client._id}>
                        <TableCell className="px-4 py-4 font-medium text-foreground sm:px-5">
                          <div className="flex items-center gap-3">
                            {client.logo?.url ? (
                              <div className="relative h-10 w-16 shrink-0">
                                <Image
                                  src={client.logo.url}
                                  alt={
                                    client.logo.alt ||
                                    `${client.companyName} logo`
                                  }
                                  fill
                                  sizes="64px"
                                  className="object-contain"
                                />
                              </div>
                            ) : null}
                            <span>{client.companyName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">
                          {client.location ||
                            translate(locale, "partnershipUnavailable")}
                        </TableCell>
                        <TableCell className="py-4 pr-4 text-sm text-muted-foreground sm:pr-5">
                          {products.length
                            ? products.join(", ")
                            : translate(locale, "clientProductUnavailable")}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {!isLoading && !hasLoadError && visibleClients.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="px-5 py-12 text-center text-sm text-muted-foreground"
                      >
                        {translate(locale, "clientEmpty")}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="px-5 py-12 text-center text-sm text-muted-foreground"
                      >
                        {translate(locale, "clientLoading")}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {hasLoadError ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="px-5 py-12 text-center text-sm text-destructive"
                      >
                        {translate(locale, "clientLoadError")}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "clientGalleryEyebrow")}
            title={translate(locale, "clientGalleryTitle")}
            description={translate(locale, "clientGalleryDescription")}
            className="max-w-3xl"
          />

          {visibleClients.length > 0 ? (
            <>
              <div
                className="mt-8 flex flex-wrap gap-2"
                role="tablist"
                aria-label={translate(locale, "clientGalleryTitle")}
              >
                {visibleClients.map((client) => (
                  <button
                    key={client._id}
                    id={`client-tab-${client._id}`}
                    type="button"
                    role="tab"
                    aria-selected={selectedClient?._id === client._id}
                    aria-controls={`client-gallery-${client._id}`}
                    onClick={() => setSelectedClientId(client._id)}
                    className={
                      selectedClient?._id === client._id
                        ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        : "rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    }
                  >
                    {client.companyName}
                  </button>
                ))}
              </div>

              {selectedClient ? (
                <div
                  id={`client-gallery-${selectedClient._id}`}
                  className="mt-8"
                  role="tabpanel"
                  aria-labelledby={`client-tab-${selectedClient._id}`}
                  tabIndex={0}
                >
                  {selectedGallery.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedGallery.map((photo, index) => (
                        <figure
                          key={photo._key ?? `${photo.url}-${index}`}
                          className="overflow-hidden rounded-2xl border border-border bg-background"
                        >
                          <div className="relative aspect-[4/3] bg-muted">
                            <Image
                              src={photo.url ?? ""}
                              alt={
                                photo.alt ||
                                `${selectedClient.companyName} — dokumentasi client`
                              }
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                          {photo.caption ? (
                            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                              {photo.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                      {translate(locale, "clientGalleryEmpty")}
                    </div>
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              {isLoading
                ? translate(locale, "clientLoading")
                : hasLoadError
                  ? translate(locale, "clientLoadError")
                  : translate(locale, "clientGalleryNoClients")}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
