"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize2,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import {
  GalleryLightbox,
  type GalleryImage,
} from "@/components/commissioner-gallery"
import { PageHero } from "@/components/sections/page-hero"
import { Heading, SectionHeading } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type { SanityCsrPage, SanityCsrYear } from "@/lib/sanity-csr"

const MOCK_CSR_YEARS = [2026, 2025, 2024]
type CsrGalleryImage = GalleryImage & {
  dateLabel: string
  description: string
}

function localize(
  value: { id?: string; en?: string } | undefined,
  locale: "id" | "en"
) {
  return value?.[locale] || value?.id || ""
}

function formatActivityDate(date: string | undefined, locale: "id" | "en") {
  if (!date) return ""
  const parsed = new Date(`${date}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return ""

  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed)
}

function CsrGallery({
  year,
  selectedYear,
  locale,
}: {
  year: SanityCsrYear | undefined
  selectedYear: number
  locale: "id" | "en"
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const images: CsrGalleryImage[] = (year?.activities ?? []).flatMap(
    (activity, index) => {
      const src = activity.image?.url
      if (!src) return []

      const title = localize(activity.title, locale)
      const caption =
        title || translate(locale, "csrActivityFallback")

      return [
        {
          src,
          alt: activity.image?.alt || title || caption,
          caption,
          dateLabel: formatActivityDate(activity.date, locale),
          description: localize(activity.description, locale),
          fileName:
            src.split("/").pop() ??
            `csr-${year?.year ?? "activity"}-${index + 1}`,
          format: src.split(".").pop()?.split("?")[0]?.toUpperCase() ?? "IMAGE",
          resolution: "Resolusi asli",
        },
      ]
    }
  )
  const activeImage = images[selectedIndex] ?? images[0]

  const selectImage = (index: number) => {
    if (!images.length) return
    const nextIndex = (index + images.length) % images.length
    setSelectedIndex(nextIndex)
    api?.scrollTo(nextIndex)
  }

  return (
    <section
      aria-label={translate(locale, "csrGallery")}
      className="border-b border-border bg-muted/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={translate(locale, "csrGallerySectionEyebrow")}
          title={translate(locale, "csrGallery")}
          description={translate(locale, "csrGalleryYearDescription").replace("{year}", String(selectedYear))}
        />

        {activeImage ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-stretch">
            <Dialog>
              <DialogTrigger
                render={
                  <button
                    type="button"
                    className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-muted/20 text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                    aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${activeImage.alt}`}
                  />
                }
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/15 group-focus-visible:bg-foreground/15">
                  <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-5" aria-hidden="true" />
                  </span>
                </span>
              </DialogTrigger>
              <GalleryLightbox image={activeImage} />
            </Dialog>

            <div className="flex min-w-0 flex-col">
              <div
                aria-live="polite"
                className="min-h-16 text-sm leading-6 text-muted-foreground"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeImage.src}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-medium text-foreground">
                      {activeImage.caption}
                    </p>
                    {activeImage.dateLabel ? (
                      <p className="text-xs">{activeImage.dateLabel}</p>
                    ) : null}
                    {activeImage.description ? (
                      <p className="mt-2 line-clamp-5">
                        {activeImage.description}
                      </p>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
              <Carousel
                setApi={setApi}
                opts={{ align: "start", containScroll: "trimSnaps" }}
                aria-label={
                  translate(locale, "csrActivityPhotos")
                }
                className="relative mt-auto pb-10"
              >
                <CarouselContent className="!ml-0 gap-3 px-2">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={`${image.src}-${index}`}
                      className="basis-1/4 !pl-0 sm:basis-1/5 lg:basis-1/4"
                    >
                      <button
                        type="button"
                        aria-label={`${translate(locale, "galleryShowPhoto")} ${index + 1}`}
                        aria-pressed={index === selectedIndex}
                        onClick={() => selectImage(index)}
                        className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 bg-background transition-[border-color,opacity,box-shadow] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none ${
                          index === selectedIndex
                            ? "border-foreground shadow-md"
                            : "border-foreground/20 opacity-75 hover:border-foreground/60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 15vw, 20vw"
                          className="object-cover"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <button
                  type="button"
                  aria-label={
                    translate(locale, "previousPhoto")
                  }
                  onClick={() => selectImage(selectedIndex - 1)}
                  className="absolute bottom-0 left-0 z-20 flex size-7 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={
                    translate(locale, "nextPhoto")
                  }
                  onClick={() => selectImage(selectedIndex + 1)}
                  className="absolute bottom-0 left-9 z-20 flex size-7 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
                <p
                  aria-live="polite"
                  className="absolute bottom-0 left-[4.75rem] z-20 flex h-7 items-center text-xs text-muted-foreground"
                >
                  {translate(locale, "galleryPhotoPosition")
                    .replace("{current}", String(selectedIndex + 1))
                    .replace("{total}", String(images.length))}
                </p>
              </Carousel>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-12 text-center text-sm text-muted-foreground">
            {translate(locale, "csrYearPhotosUnavailable")}
          </div>
        )}
      </div>
    </section>
  )
}

function CsrBackground({
  title,
  description,
  locale,
}: {
  title: string
  description: string
  locale: "id" | "en"
}) {
  return (
    <section className="border-b border-border bg-background py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            {translate(locale, "csrSectionEyebrow")}
          </p>
          <Heading level={2} className="mt-3 text-2xl sm:text-3xl">
            {translate(locale, "csrBackgroundTitle")}
          </Heading>
        </div>
        <div>
          <Heading level={3} className="max-w-3xl text-2xl sm:text-3xl">
            {title}
          </Heading>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

function CsrDocuments({
  year,
  locale,
}: {
  year: SanityCsrYear | undefined
  locale: "id" | "en"
}) {
  const activitiesWithDocuments = (year?.activities ?? []).filter(
    (activity) => activity.document?.url
  )

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={translate(locale, "csrDocumentsEyebrow")}
          title={translate(locale, "csrDocumentsTitle")}
          description={translate(locale, "csrDocumentsDescription")}
        />
        {activitiesWithDocuments.length ? (
          <div className="mt-8 flex max-w-3xl flex-col gap-3">
            {activitiesWithDocuments.map((activity, index) => {
              const activityTitle = localize(activity.title, locale)
              const filename =
                activity.document?.originalFilename ||
                activityTitle ||
                translate(locale, "csrDocumentFallback")

              return (
                <Item
                  key={activity._key ?? `${year?.year}-document-${index}`}
                  variant="outline"
                >
                  <ItemMedia variant="icon">
                    <FileText
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{filename}</ItemTitle>
                    <ItemDescription>
                      {activityTitle ||
                        translate(locale, "csrActivityYear").replace("{year}", String(year?.year ?? ""))}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<a href={activity.document!.url} download />}
                    >
                      <Download data-icon="inline-start" />
                      {translate(locale, "partnershipDownload")}
                    </Button>
                  </ItemActions>
                </Item>
              )
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-sm text-muted-foreground">
            {translate(locale, "csrYearDocumentsUnavailable")}
          </div>
        )}
      </div>
    </section>
  )
}

export function CsrPage({ content }: { content: SanityCsrPage | null }) {
  const { locale } = useLocale()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const years = [...(content?.years ?? [])].sort((a, b) => b.year - a.year)
  const yearOptions = years.length
    ? years.map(({ year }) => year)
    : MOCK_CSR_YEARS
  const activeYear = yearOptions.includes(selectedYear ?? Number.NaN)
    ? selectedYear!
    : yearOptions[0]
  const activeYearContent = years.find(({ year }) => year === activeYear)
  const introTitle =
    localize(content?.intro?.title, locale) ||
    translate(locale, "csrIntroTitle")
  const introDescription =
    localize(content?.intro?.description, locale) ||
    translate(locale, "csrIntroDescription")

  return (
    <main>
      <PageHero
        pageKey="energi-berkelanjutan"
        eyebrow={translate(locale, "csrEyebrow")}
        title={translate(locale, "csrTitle")}
        description={translate(locale, "csrDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          {
            label: translate(locale, "sustainability"),
            href: "/keberlanjutan",
          },
        ]}
      />

      <nav
        aria-label={translate(locale, "csrYearNavigation")}
        className="border-b border-border bg-background"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
          <span className="shrink-0 py-5 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {translate(locale, "csrYearNavigation")}
          </span>
          <div className="flex min-w-max items-center gap-6">
            {yearOptions.map((year) => {
              const isActive = year === activeYear

              return (
                <button
                  key={year}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedYear(year)}
                  className={`border-b-2 py-5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    isActive
                      ? "border-base-color font-bold text-base-color"
                      : "border-transparent font-medium text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {year}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      <CsrGallery
        key={activeYear}
        year={activeYearContent}
        selectedYear={activeYear}
        locale={locale}
      />

      <CsrBackground
        title={introTitle}
        description={
          localize(activeYearContent?.summary, locale) || introDescription
        }
        locale={locale}
      />

      <CsrDocuments year={activeYearContent} locale={locale} />
    </main>
  )
}
