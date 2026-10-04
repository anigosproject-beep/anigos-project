"use client"

import Image from "next/image"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

import { GalleryLightbox } from "@/components/commissioner-gallery"
import { GalleryThumbnailSelector } from "@/components/gallery-thumbnail-selector"
import { PageHero } from "@/components/sections"
import { useLocale } from "@/components/locale-provider"
import { translate, type Locale } from "@/lib/i18n"
import { MotionButtonLink } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  filterAndSortGallery,
  getGalleryCategories,
  getGalleryEntries,
  isGalleryCategoryFilter,
  type GalleryCategoryFilter,
  type GalleryDateOrder,
  type GalleryEntry,
  type GallerySortBy,
} from "@/lib/gallery"
import { mockActivePartners } from "@/lib/partnership-fallback"

function CategoryGalleryCarousel({
  images,
  locale,
}: {
  images: GalleryEntry[]
  locale: Locale
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const updateSelectedIndex = () => setSelectedIndex(api.selectedScrollSnap())
    updateSelectedIndex()
    api.on("select", updateSelectedIndex)
    api.on("reInit", updateSelectedIndex)

    return () => {
      api.off("select", updateSelectedIndex)
      api.off("reInit", updateSelectedIndex)
    }
  }, [api])

  const selectImage = (index: number) => {
    if (images.length === 0) return
    api?.scrollTo((index + images.length) % images.length)
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      aria-label={translate(locale, "galleryByCategoryCarousel")}
      className="relative pb-10"
    >
      <CarouselContent className="-ml-4">
        {images.map((image, index) => (
          <CarouselItem
            key={`${image.src}-${index}`}
            className="basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <Dialog>
              <DialogTrigger
                render={
                  <button
                    type="button"
                    className="group/card relative block w-full overflow-hidden rounded-2xl border border-border bg-background text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                    aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${image.alt}`}
                  />
                }
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 82vw"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-80" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span className="block text-xs font-medium text-white/75">
                      {image.partnerName}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-5 font-semibold">
                      {image.caption}
                    </span>
                  </span>
                </div>
              </DialogTrigger>
              <GalleryLightbox image={image} />
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-0 flex h-7 items-center gap-2">
        <button
          type="button"
          aria-label={translate(locale, "galleryPreviousCategoryPhoto")}
          onClick={() => selectImage(selectedIndex - 1)}
          className="flex size-7 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <p
          aria-live="polite"
          className="flex h-7 items-center text-xs text-muted-foreground"
        >
          {translate(locale, "galleryPhotoPosition")
            .replace("{current}", String(selectedIndex + 1))
            .replace("{total}", String(images.length))}
        </p>
        <button
          type="button"
          aria-label={
            translate(locale, "galleryNextCategoryPhoto")
          }
          onClick={() => selectImage(selectedIndex + 1)}
          className="flex size-7 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </Carousel>
  )
}

function GalleryCategoryPanel({
  images,
  category,
  sortBy,
  dateOrder,
  year,
  locale,
}: {
  images: GalleryEntry[]
  category: GalleryCategoryFilter
  sortBy: GallerySortBy
  dateOrder: GalleryDateOrder
  year: string
  locale: Locale
}) {
  const filteredImages = filterAndSortGallery(
    images,
    category,
    sortBy,
    dateOrder,
    year
  )

  if (filteredImages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center text-sm text-muted-foreground">
        {translate(locale, "galleryNoPhotosForDates")}
      </div>
    )
  }

  return <CategoryGalleryCarousel images={filteredImages} locale={locale} />
}

export function PublicationGalleryPage() {
  const { locale } = useLocale()
  const [content, setContent] = React.useState<GalleryEntry[] | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedCategory, setSelectedCategory] =
    React.useState<GalleryCategoryFilter>("all")

  React.useEffect(() => {
    const controller = new AbortController()

    void fetch(`/api/galeri?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Gallery request failed: ${response.status}`)
        return response.json() as Promise<GalleryEntry[] | null>
      })
      .then((entries) => setContent(entries ?? []))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load gallery content", error)
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [locale])

  const images =
    content?.length
      ? content
      : getGalleryEntries(mockActivePartners)
  const categories = getGalleryCategories(images)
  const activeImage = images[selectedIndex] ?? images[0]

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "publicGalleryEyebrow")}
        title={translate(locale, "galleryPageTitle")}
        description={translate(locale, "galleryPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="publikasi"
        breadcrumbs={[
          {
            label: translate(locale, "articles"),
            href: "/artikel/anigos-news",
          },
          {
            label: translate(locale, "publications"),
            href: "/artikel/publikasi",
          },
        ]}
      />

      <section className="border-b border-border bg-muted/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                {translate(locale, "galleryVisualDocumentation")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {translate(locale, "galleryMainSectionTitle")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              {translate(locale, "galleryMainSectionDescription")}
            </p>
          </div>

          {isLoading ? (
            <div
              className="mt-10 flex min-h-96 items-center justify-center rounded-3xl border border-border bg-background text-sm text-muted-foreground"
              role="status"
            >
              {translate(locale, "galleryLoading")}
            </div>
          ) : activeImage ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-stretch">
              <Dialog>
                <DialogTrigger
                  render={
                    <button
                      type="button"
                      className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-muted/20 text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                      aria-label={`${translate(locale, "galleryOpenImage")} ${activeImage.alt}`}
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
                <div className="h-20 overflow-hidden text-sm leading-6 text-muted-foreground">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.p
                      key={activeImage.src}
                      className="line-clamp-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="font-medium text-foreground">
                        {activeImage.partnerName}
                      </span>
                      <br />
                      {activeImage.caption}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <GalleryThumbnailSelector
                  images={images}
                  selectedIndex={selectedIndex}
                  onSelect={setSelectedIndex}
                  photoLabel={(index) =>
                    `${translate(locale, "galleryShowPhoto")} ${index}`
                  }
                  previousLabel={translate(locale, "previousPhoto")}
                  nextLabel={translate(locale, "nextPhoto")}
                  positionLabel={translate(locale, "galleryPhotoPosition")}
                  className="relative mt-auto pb-10"
                  maskedEdges
                  accent="primary"
                />
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-12 text-center text-sm text-muted-foreground">
              {translate(locale, "galleryNoDocuments")}
            </div>
          )}
        </div>
      </section>

      {!isLoading && images.length > 0 && (
        <section
          className="border-b border-border py-16 lg:py-24"
          aria-labelledby="categorized-gallery-title"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  {translate(locale, "galleryCollections")}
                </p>
                <h2
                  id="categorized-gallery-title"
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {translate(locale, "galleryExploreCategoryTitle")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {translate(locale, "galleryExploreCategoryDescription")}
              </p>
            </div>

            <Tabs
              value={selectedCategory}
              onValueChange={(value) => {
                if (isGalleryCategoryFilter(value, images))
                  setSelectedCategory(value)
              }}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <TabsList
                  aria-label={
                    translate(locale, "galleryCategories")
                  }
                  className="h-auto flex-wrap gap-1 bg-transparent p-0"
                >
                  <TabsTrigger
                    value="all"
                    className="rounded-full border border-border px-4 py-2 data-active:border-base-color data-active:bg-base-color data-active:text-base-color-foreground"
                  >
                    {translate(locale, "galleryAll")}
                    <span className="ml-1 text-xs opacity-70">
                      {images.length}
                    </span>
                  </TabsTrigger>
                  {categories.map((category) => {
                    const count = images.filter(
                      (image) => image.category === category.id
                    ).length
                    if (count === 0) return null

                    return (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="rounded-full border border-border px-4 py-2 data-active:border-base-color data-active:bg-base-color data-active:text-base-color-foreground"
                      >
                        {locale === "id"
                          ? category.label.id
                          : category.label.en}
                        <span className="ml-1 text-xs opacity-70">{count}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
                <MotionButtonLink
                  href="/artikel/publikasi/kategori"
                  variant="outline"
                  className="rounded-full"
                >
                  {translate(locale, "galleryBrowseCategories")}
                </MotionButtonLink>
              </div>
              <TabsContent value="all" className="mt-6">
                <GalleryCategoryPanel
                  images={images}
                  category="all"
                  sortBy="none"
                  dateOrder="newest"
                  year=""
                  locale={locale}
                />
              </TabsContent>
              {categories.map((category) => {
                if (images.every((image) => image.category !== category.id))
                  return null

                return (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-6"
                  >
                    <GalleryCategoryPanel
                      images={images}
                      category={category.id}
                      sortBy="none"
                      dateOrder="newest"
                      year=""
                      locale={locale}
                    />
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </section>
      )}

      {!isLoading && images.length > 0 && (
        <section
          className="border-b border-border bg-muted/30 py-16 lg:py-24"
          aria-labelledby="gallery-stories-title"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                {translate(locale, "galleryStories")}
              </p>
              <h2
                id="gallery-stories-title"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {translate(locale, "galleryStoryTitle")}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {translate(locale, "galleryStoryDescription")}
              </p>
            </div>

            <div className="divide-y divide-border">
              {images.map((image, index) => {
                const imageOnRight = index % 2 === 1
                const storyDate = image.storyDate
                  ? new Date(image.storyDate)
                  : null
                const formattedDate =
                  storyDate && !Number.isNaN(storyDate.getTime())
                    ? new Intl.DateTimeFormat(
                        locale === "id" ? "id-ID" : "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      ).format(storyDate)
                    : translate(locale, "galleryDateUnavailable")
                const storyParagraphs = image.storyBody
                  .split(/\n{2,}/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)

                return (
                  <article
                    key={`${image.src}-story-${index}`}
                    className={`grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-flow-row lg:items-center lg:gap-10 ${
                      imageOnRight
                        ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]"
                        : "lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]"
                    }`}
                  >
                    <div
                      className={`lg:row-start-1 ${
                        imageOnRight ? "lg:col-start-2" : "lg:col-start-1"
                      }`}
                    >
                      <Dialog>
                        <DialogTrigger
                          render={
                            <button
                              type="button"
                              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none lg:aspect-[4/5]"
                              aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${image.caption}`}
                            />
                          }
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1024px) 30vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/15 group-focus-visible:bg-foreground/15">
                            <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                              <Maximize2
                                className="size-5"
                                aria-hidden="true"
                              />
                            </span>
                          </span>
                        </DialogTrigger>
                        <GalleryLightbox image={image} />
                      </Dialog>
                    </div>

                    <div
                      className={`min-w-0 lg:row-start-1 ${
                        imageOnRight ? "lg:col-start-1" : "lg:col-start-2"
                      }`}
                    >
                      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                        {image.partnerName}
                      </p>
                      <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                        {image.storyTitle}
                      </h3>
                      <time
                        className="mt-4 block text-sm text-muted-foreground"
                        dateTime={image.storyDate}
                      >
                        {formattedDate}
                      </time>
                      <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                        {storyParagraphs.length > 0 ? (
                          storyParagraphs.map((paragraph, paragraphIndex) => (
                            <p key={`${image.src}-paragraph-${paragraphIndex}`}>
                              {paragraph}
                            </p>
                          ))
                        ) : (
                          <p>
                            {translate(locale, "galleryStoryUnavailable")}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
