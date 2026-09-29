import type { PartnershipItem } from "@/lib/partnership-fallback"

export type GalleryCategory = "partnership" | "transport" | "distribution"
export type GalleryCategoryFilter = "all" | GalleryCategory
export type GallerySortBy = "none" | "date" | "year"
export type GalleryDateOrder = "newest" | "oldest"

export type GalleryEntry = {
  alt: string
  caption: string
  category: GalleryCategory
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

export const galleryCategories: Array<{
  id: GalleryCategory
  label: { id: string; en: string }
}> = [
  { id: "partnership", label: { id: "Kemitraan", en: "Partnerships" } },
  {
    id: "transport",
    label: { id: "Transportasi & Armada", en: "Transport & Fleet" },
  },
  {
    id: "distribution",
    label: { id: "Distribusi Energi", en: "Energy Distribution" },
  },
]

export const visibleGalleryCategories = galleryCategories.slice(0, 2)

export function isGalleryCategoryFilter(
  value: string
): value is GalleryCategoryFilter {
  return (
    value === "all" ||
    galleryCategories.some((category) => category.id === value)
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
