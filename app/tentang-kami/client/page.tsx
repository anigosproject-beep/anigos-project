"use client"

import Image from "next/image"
import * as React from "react"

import {
  GalleryLightbox,
  type GalleryImage,
} from "@/components/commissioner-gallery"
import { PageHero } from "@/components/sections"
import { SectionHeading } from "@/components/typography"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
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

const VISIBLE_CLIENT_CATEGORY_COUNT = 5

function getClientGallery(client: SanityClientPortfolioEntry) {
  return (
    client.gallery?.filter((image): image is NonNullable<typeof image> =>
      Boolean(image?.url)
    ) ?? []
  )
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
  const [showAllClientCategories, setShowAllClientCategories] =
    React.useState(false)

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
  const visibleClients = loadedLocale === locale && !hasLoadError ? clients : []
  const selectedClient = visibleClients.find(
    (client) => client._id === selectedClientId
  )
  const allClientGallery = visibleClients.flatMap((client) =>
    getClientGallery(client).map((photo, index) => ({
      client,
      photo,
      key: `${client._id}-${photo._key ?? photo.url}-${index}`,
    }))
  )
  const selectedGallery = selectedClient
    ? allClientGallery.filter((item) => item.client._id === selectedClient._id)
    : allClientGallery
  const selectedTabId = selectedClient
    ? `client-tab-${selectedClient._id}`
    : "client-tab-all"
  const galleryPanelId = selectedClient
    ? `client-gallery-${selectedClient._id}`
    : "client-gallery-all"
  const visibleClientCategories = showAllClientCategories
    ? visibleClients
    : visibleClients.slice(0, VISIBLE_CLIENT_CATEGORY_COUNT)
  const hiddenClientCategoryCount =
    visibleClients.length - VISIBLE_CLIENT_CATEGORY_COUNT

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
                        .filter(
                          (name): name is string =>
                            Boolean(name) && name !== "-" && name !== "—"
                        ) ?? []

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
                          {products.length ? (
                            <ul className="flex flex-wrap gap-1.5">
                              {products.map((product) => (
                                <li
                                  key={product}
                                  className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs leading-4 text-foreground"
                                >
                                  {product}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            translate(locale, "clientProductUnavailable")
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {!isLoading &&
                  !hasLoadError &&
                  visibleClients.length === 0 ? (
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
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <div
                  id="client-category-tabs"
                  className="contents"
                  role="tablist"
                  aria-label={translate(locale, "clientGalleryTitle")}
                >
                  <button
                    id="client-tab-all"
                    type="button"
                    role="tab"
                    aria-selected={!selectedClient}
                    aria-controls="client-gallery-all"
                    onClick={() => setSelectedClientId(null)}
                    className={
                      !selectedClient
                        ? "min-h-11 w-fit max-w-full rounded-xl bg-primary px-4 py-2.5 text-left text-sm font-medium text-primary-foreground"
                        : "min-h-11 w-fit max-w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
                    }
                  >
                    {translate(locale, "clientGalleryAll")}
                  </button>
                  {visibleClientCategories.map((client) => (
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
                          ? "min-h-11 w-fit max-w-full rounded-xl bg-primary px-4 py-2.5 text-left text-sm font-medium text-primary-foreground"
                          : "min-h-11 w-fit max-w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
                      }
                    >
                      {client.companyName}
                    </button>
                  ))}
                </div>
                {hiddenClientCategoryCount > 0 ? (
                  <button
                    type="button"
                    aria-expanded={showAllClientCategories}
                    aria-controls="client-category-tabs"
                    onClick={() => {
                      if (showAllClientCategories) {
                        setShowAllClientCategories(false)
                        setSelectedClientId(null)
                      } else {
                        setShowAllClientCategories(true)
                      }
                    }}
                    className="min-h-11 w-fit max-w-full rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-left text-sm font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {showAllClientCategories ? (
                      translate(locale, "clientGalleryShowFewerCategories")
                    ) : (
                      <span>
                        +{hiddenClientCategoryCount}{" "}
                        {translate(locale, "clientGalleryOtherCategories")}
                      </span>
                    )}
                  </button>
                ) : null}
              </div>

              <div
                id={galleryPanelId}
                className="mt-8"
                role="tabpanel"
                aria-labelledby={selectedTabId}
                aria-live="polite"
                tabIndex={0}
              >
                  {selectedGallery.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedGallery.map(({ client, photo, key }) => {
                        const alt =
                          photo.alt ||
                          `${client.companyName} — dokumentasi client`
                        const src = photo.url ?? ""
                        const fileName =
                          src.split("/").pop()?.split("?")[0] || "image"
                        const format =
                          fileName.split(".").pop()?.toUpperCase() || "IMAGE"
                        const previewImage: GalleryImage = {
                          src,
                          alt,
                          caption: photo.caption || client.companyName || "",
                          fileName,
                          format,
                          resolution:
                            photo.width && photo.height
                              ? `${photo.width} × ${photo.height} px`
                              : "—",
                        }

                        return (
                          <figure
                            key={key}
                            className="overflow-hidden rounded-2xl border border-border bg-background"
                          >
                            <Dialog>
                              <DialogTrigger
                                render={
                                  <button
                                    type="button"
                                    className="group block w-full cursor-zoom-in text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                                    aria-label={`${translate(locale, "publicationImagePreview")}: ${alt}`}
                                  />
                                }
                              >
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                  <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                  />
                                </div>
                              </DialogTrigger>
                              <GalleryLightbox image={previewImage} />
                            </Dialog>
                            {!selectedClient || photo.caption ? (
                              <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-sm text-muted-foreground">
                                {!selectedClient ? (
                                  <span className="font-medium text-foreground">
                                    {client.companyName}
                                  </span>
                                ) : null}
                                {photo.caption ? <span>{photo.caption}</span> : null}
                              </figcaption>
                            ) : null}
                          </figure>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                      {translate(locale, "clientGalleryEmpty")}
                    </div>
                  )}
              </div>
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
