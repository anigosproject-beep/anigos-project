"use client"

import Image from "next/image"
import * as React from "react"
import { ArrowLeft } from "lucide-react"

import { GalleryLightbox } from "@/components/commissioner-gallery"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import { MotionButtonLink } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  filterAndSortGallery,
  galleryCategories,
  getGalleryEntries,
  getGalleryYears,
  type GalleryCategoryFilter,
  type GalleryDateOrder,
  type GalleryEntry,
  type GallerySortBy,
} from "@/lib/gallery"
import { mockActivePartners } from "@/lib/partnership-fallback"

export function GalleryCategoryListingPage() {
  const { locale } = useLocale()
  const [content, setContent] = React.useState<GalleryEntry[] | null>(null)
  const [loadedLocale, setLoadedLocale] = React.useState<string | null>(null)
  const [loadErrorLocale, setLoadErrorLocale] = React.useState<string | null>(
    null
  )
  const [selectedCategory, setSelectedCategory] =
    React.useState<GalleryCategoryFilter>("all")
  const [sortBy, setSortBy] = React.useState<GallerySortBy>("none")
  const [dateOrder, setDateOrder] = React.useState<GalleryDateOrder>("newest")
  const [selectedYear, setSelectedYear] = React.useState("")
  const categoryComboboxAnchor = React.useRef<HTMLDivElement>(null)
  const filterGridRef = React.useRef<HTMLDivElement>(null)
  const [categoryControlWidth, setCategoryControlWidth] = React.useState(320)

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
      .then((entries) => {
        setContent(entries ?? [])
        setLoadErrorLocale(null)
        setLoadedLocale(locale)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load categorized gallery", error)
        setLoadErrorLocale(locale)
        setLoadedLocale(locale)
      })

    return () => controller.abort()
  }, [locale])

  const images =
    content?.length
      ? content
      : getGalleryEntries(mockActivePartners)
  const availableYears = getGalleryYears(images, selectedCategory)
  const filteredImages = filterAndSortGallery(
    images,
    selectedCategory,
    sortBy,
    dateOrder,
    selectedYear
  )
  const isLoading = loadedLocale !== locale
  const hasLoadError = loadErrorLocale === locale
  const categoryOptions = React.useMemo(
    () => [
      translate(locale, "galleryAllCategories"),
      ...galleryCategories.map((category) => category.label[locale]),
    ],
    [locale]
  )
  React.useEffect(() => {
    const input = categoryComboboxAnchor.current?.querySelector("input")
    const filterGrid = filterGridRef.current
    if (!input || !filterGrid) return

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) {
      console.error("Unable to measure gallery category labels")
      return
    }

    context.font = window.getComputedStyle(input).font
    const longestLabelWidth = Math.max(
      ...categoryOptions.map((label) => context.measureText(label).width)
    )
    const desiredWidth = Math.max(320, Math.ceil(longestLabelWidth + 72))
    const updateWidth = () => {
      const maxCategoryWidth = filterGrid.clientWidth - 512 - 24
      setCategoryControlWidth(
        Math.max(240, Math.min(desiredWidth, maxCategoryWidth))
      )
    }

    const observer = new ResizeObserver(updateWidth)
    observer.observe(filterGrid)
    updateWidth()

    return () => observer.disconnect()
  }, [categoryOptions])

  const selectedCategoryLabel =
    selectedCategory === "all"
      ? categoryOptions[0]
      : galleryCategories.find((category) => category.id === selectedCategory)
          ?.label[locale]

  return (
    <main>
      <section className="border-b border-border bg-muted/40 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MotionButtonLink
            href="/artikel/publikasi"
            variant="outline"
            className="mb-8 rounded-full"
          >
            <ArrowLeft aria-hidden="true" />
            {translate(locale, "galleryBackToList")}
          </MotionButtonLink>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {translate(locale, "galleryVisualDocumentation")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {translate(locale, "galleryByCategoryTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {translate(locale, "galleryByCategoryDescription")}
          </p>
        </div>
      </section>

      <section
        className="py-12 lg:py-16"
        aria-label={
          translate(locale, "galleryFilters")
        }
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            ref={filterGridRef}
            style={
              {
                "--category-control-width": `${categoryControlWidth}px`,
              } as React.CSSProperties
            }
            className="grid grid-cols-1 gap-5 border-y border-border/70 py-5 sm:grid-cols-[minmax(15rem,var(--category-control-width))_minmax(12rem,32rem)] sm:items-end sm:gap-x-6 sm:gap-y-4"
          >
            <div className="flex min-w-0 flex-col gap-2 sm:col-start-1 sm:row-start-1">
              <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {translate(locale, "galleryChooseCategory")}
              </label>
              <Combobox
                items={categoryOptions}
                value={selectedCategoryLabel}
                onValueChange={(value) => {
                  if (value === null) return
                  const selectedIndex = categoryOptions.indexOf(value)
                  const nextCategory =
                    selectedIndex === 0
                      ? "all"
                      : galleryCategories[selectedIndex - 1]?.id
                  if (!nextCategory) return

                  setSelectedCategory(nextCategory)
                  const categoryYears = getGalleryYears(images, nextCategory)
                  setSelectedYear(
                    sortBy === "year" && categoryYears.length > 0
                      ? String(categoryYears[0])
                      : ""
                  )
                }}
              >
                <div ref={categoryComboboxAnchor} className="w-full">
                  <ComboboxInput
                    aria-label={
                      translate(locale, "galleryChooseCategory")
                    }
                    placeholder={
                      translate(locale, "gallerySearchCategories")
                    }
                    className="h-11 w-full rounded-xl border-border bg-background px-3.5 text-sm shadow-none hover:border-foreground/30 focus-within:ring-3 focus-within:ring-ring/30"
                  />
                </div>
                <ComboboxContent
                  anchor={categoryComboboxAnchor}
                  className="w-(--anchor-width) min-w-0 max-w-[calc(100vw-2rem)] rounded-xl"
                >
                  <ComboboxEmpty>
                    {translate(locale, "galleryCategoryNotFound")}
                  </ComboboxEmpty>
                  <ComboboxList className="max-h-48">
                    {(item) => (
                      <ComboboxItem
                        key={item}
                        value={item}
                        className="rounded-lg py-1.5"
                      >
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:col-start-2 sm:row-start-1">
              <label
                htmlFor="gallery-sort-by"
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {translate(locale, "gallerySortBy")}
              </label>
              <div className="grid min-w-0 grid-cols-2 gap-3">
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    if (
                      value === "none" ||
                      value === "date" ||
                      value === "year"
                    ) {
                      setSortBy(value)
                      if (value === "year") {
                        setSelectedYear(
                          availableYears.length > 0
                            ? String(availableYears[0])
                            : ""
                        )
                      }
                    }
                  }}
                >
                  <SelectTrigger
                    id="gallery-sort-by"
                    className="data-[size=default]:h-11 w-full min-w-0 rounded-xl px-3.5 shadow-none"
                  >
                    <SelectValue>
                      {sortBy === "none"
                        ? translate(locale, "galleryDefaultOrder")
                        : sortBy === "date"
                          ? translate(locale, "galleryUploadDate")
                          : translate(locale, "galleryUploadYear")}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    className="min-w-0 rounded-xl p-1"
                  >
                    <SelectItem value="none" className="rounded-lg py-1.5">
                      {translate(locale, "galleryNoSorting")}
                    </SelectItem>
                    <SelectItem value="date" className="rounded-lg py-1.5">
                      {translate(locale, "galleryUploadDate")}
                    </SelectItem>
                    <SelectItem value="year" className="rounded-lg py-1.5">
                      {translate(locale, "galleryUploadYear")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {sortBy === "date" && (
                  <Select
                    value={dateOrder}
                    onValueChange={(value) => {
                      if (value === "newest" || value === "oldest")
                        setDateOrder(value)
                    }}
                  >
                    <SelectTrigger
                      id="gallery-date-order"
                      aria-label={
                        translate(locale, "galleryDateOrder")
                      }
                      className="data-[size=default]:h-11 w-full min-w-0 rounded-xl px-3.5 shadow-none"
                    >
                      <SelectValue>
                        {dateOrder === "newest"
                          ? translate(locale, "galleryNewest")
                          : translate(locale, "galleryOldest")}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      className="min-w-0 rounded-xl p-1"
                    >
                      <SelectItem
                        value="newest"
                        className="rounded-lg py-1.5"
                      >
                        {translate(locale, "galleryNewest")}
                      </SelectItem>
                      <SelectItem
                        value="oldest"
                        className="rounded-lg py-1.5"
                      >
                        {translate(locale, "galleryOldest")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {sortBy === "year" && (
                  <Select
                    value={selectedYear || null}
                    onValueChange={(value) => {
                      if (value) setSelectedYear(value)
                    }}
                    disabled={availableYears.length === 0}
                  >
                    <SelectTrigger
                      id="gallery-upload-year"
                      aria-label={translate(locale, "galleryChooseUploadYear")}
                      className="data-[size=default]:h-11 w-full min-w-0 rounded-xl px-3.5 shadow-none"
                    >
                      <SelectValue
                        placeholder={
                          translate(locale, "galleryUploadDatesUnavailable")
                        }
                      />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      className="min-w-0 rounded-xl p-1"
                    >
                      {availableYears.map((year) => (
                        <SelectItem
                          key={year}
                          value={String(year)}
                          className="rounded-lg py-1.5"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          {sortBy !== "none" && (
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              {translate(locale, "gallerySortMetadataNote")}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">
              {translate(locale, "galleryPhotoDocumentation")}
            </h2>
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {filteredImages.length} {translate(locale, "fleetPhotoCount")}
            </p>
          </div>

          {isLoading ? (
            <div
              className="mt-6 flex min-h-56 items-center justify-center rounded-2xl border border-border bg-muted/30 text-sm text-muted-foreground"
              role="status"
            >
              {translate(locale, "galleryLoading")}
            </div>
          ) : hasLoadError ? (
            <div
              className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center text-sm text-muted-foreground"
              role="alert"
            >
              {translate(locale, "galleryLoadError")}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center text-sm text-muted-foreground">
              {sortBy !== "none"
                ? translate(locale, "galleryNoPhotosForSelection")
                : translate(locale, "galleryNoPhotosInCategory")}
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((image, index) => (
                <Dialog key={`${image.src}-${index}`}>
                  <DialogTrigger
                    render={
                      <button
                        type="button"
                        className="group block w-full text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                        aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${image.alt}`}
                      />
                    }
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="pt-3">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {image.partnerName}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 font-medium">
                        {image.caption}
                      </p>
                      {image.uploadedAt && (
                        <time
                          className="mt-3 block text-xs text-muted-foreground"
                          dateTime={image.uploadedAt}
                        >
                          {new Intl.DateTimeFormat(
                            locale === "id" ? "id-ID" : "en",
                            {
                              dateStyle: "medium",
                            }
                          ).format(new Date(image.uploadedAt))}
                        </time>
                      )}
                    </div>
                  </DialogTrigger>
                  <GalleryLightbox image={image} />
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
