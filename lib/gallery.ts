import type { PartnershipItem } from "@/lib/partnership-fallback"
import { galleryCategories } from "@/shared/gallery-categories"

export { galleryCategories } from "@/shared/gallery-categories"

export type GalleryCategory = string
export type GalleryCategoryFilter = "all" | GalleryCategory
export type GallerySortBy = "none" | "date" | "year"
export type GalleryDateOrder = "newest" | "oldest"
type GalleryCategoryOption = {
  id: GalleryCategory
  label: { id: string; en: string }
}

export type GalleryEntry = {
  alt: string
  caption: string
  category: GalleryCategory
  categoryLabel?: { id: string; en: string }
  fileName: string
  format: string
  partnerName: string
  resolution: string
  src: string
  storyTitle: string
  storyBody: string
  storyDate?: string
  uploadedAt?: string
}

export function getGalleryCategories(images: GalleryEntry[]) {
  const categories: GalleryCategoryOption[] = [...galleryCategories]
  const seen = new Set(categories.map(({ id }) => id))

  for (const image of images) {
    if (
      !image.category.startsWith("custom-") ||
      seen.has(image.category) ||
      !image.categoryLabel
    ) {
      continue
    }

    categories.push({
      id: image.category,
      label: image.categoryLabel,
    })
    seen.add(image.category)
  }

  return categories
}

export function isGalleryCategoryFilter(
  value: string,
  images: GalleryEntry[] = []
): value is GalleryCategoryFilter {
  return (
    value === "all" ||
    getGalleryCategories(images).some((category) => category.id === value)
  )
}

export function getGalleryYears(
  images: GalleryEntry[],
  category: GalleryCategoryFilter
) {
  return Array.from(
    new Set(
      images
        .filter((image) => category === "all" || image.category === category)
        .flatMap((image) => {
          if (!image.uploadedAt) return []
          const date = new Date(image.uploadedAt)
          return Number.isNaN(date.getTime()) ? [] : [date.getFullYear()]
        })
    )
  ).sort((first, second) => second - first)
}

export function filterAndSortGallery(
  images: GalleryEntry[],
  category: GalleryCategoryFilter,
  sortBy: GallerySortBy,
  dateOrder: GalleryDateOrder,
  year: string
) {
  const categoryImages = images.filter(
    (image) => category === "all" || image.category === category
  )
  if (sortBy === "none") return categoryImages

  const datedImages = categoryImages.filter((image) => {
    if (!image.uploadedAt) return false
    return !Number.isNaN(new Date(image.uploadedAt).getTime())
  })

  if (sortBy === "year") {
    return datedImages.filter(
      (image) => new Date(image.uploadedAt!).getFullYear().toString() === year
    )
  }

  return datedImages.sort((first, second) => {
    const difference =
      new Date(first.uploadedAt!).getTime() -
      new Date(second.uploadedAt!).getTime()
    return dateOrder === "newest" ? -difference : difference
  })
}

function getGalleryCategory(src: string, alt: string): GalleryCategory {
  const searchableText = `${src} ${alt}`.toLowerCase()

  if (/\b(transport|transportation|armada|fleet)\b/.test(searchableText))
    return "transport"
  if (/\b(distribusi|distribution|delivery|pengiriman)\b/.test(searchableText))
    return "distribution"
  return "partnership"
}

function richTextToPlainText(
  value: PartnershipItem["partnershipBackground"]
): string | undefined {
  if (typeof value === "string") return value
  if (!Array.isArray(value)) return undefined

  const plainText = value
    .map((block) =>
      block.children
        ?.map((child) => child.text ?? "")
        .join("")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n")

  return plainText || undefined
}

export function getGalleryEntries(partners: PartnershipItem[]): GalleryEntry[] {
  return partners.flatMap((partner) => {
    const partnerName = partner.name ?? "Dokumentasi kemitraan"
    const images = partner.gallery?.filter((image) => image?.url) ?? []

    return images.map((image, index) => {
      const src = image?.url ?? ""
      const extension =
        src.split(".").pop()?.split("?")[0]?.toUpperCase() ?? "IMAGE"

      return {
        src,
        partnerName,
        alt: image?.alt ?? `${partnerName} — dokumentasi kemitraan`,
        caption: image?.alt ?? `Dokumentasi kemitraan ${partnerName}.`,
        storyTitle:
          image?.storyTitle ??
          image?.alt ??
          `Dokumentasi kemitraan ${partnerName}.`,
        category: getGalleryCategory(src, image?.alt ?? ""),
        uploadedAt: image?.uploadedAt,
        storyDate: image?.storyDate ?? image?.uploadedAt,
        storyBody:
          image?.storyBody ??
          richTextToPlainText(partner.partnershipBackground) ??
          partner.body ??
          partner.portfolio ??
          "",
        fileName: src.split("/").pop() ?? `dokumentasi-${index + 1}`,
        format: extension,
        resolution:
          image?.width && image?.height
            ? `${image.width} × ${image.height} px`
            : "Resolusi asli",
      }
    })
  })
}
