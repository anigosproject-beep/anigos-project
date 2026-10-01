import { NextRequest, NextResponse } from "next/server"

import { getSanityPartnershipPage } from "@/lib/sanity-partnership"
import { getSanityTeam } from "@/lib/sanity-team"
import { getSanityClientForCurrentMode } from "@/lib/sanity-client"
import {
  FLEET_OPTIONS_QUERY,
  JANGKAUAN_QUERY,
  PRODUCT_QUERY,
} from "@/lib/sanity-queries"
import { getGalleryEntries, type GalleryCategory, type GalleryEntry } from "@/lib/gallery"
import type { PartnershipItem } from "@/lib/partnership-fallback"
import type {
  CoveragePageResponse,
  PartnershipPageResponse,
  SanityFleetOption,
  SanityProduct,
} from "@/lib/sanity-content-types"

type SourceImage = {
  url?: string
  alt?: string
  width?: number
  height?: number
  uploadedAt?: string
}

type MediaSlot = {
  slotId?: string
  sectionName?: string
  flipTitle?: string
  image?: SourceImage
}

type MediaSlots = {
  coverageSlots?: MediaSlot[] | null
  productsSlots?: MediaSlot[] | null
}

function toGalleryEntry({
  image,
  category,
  sourceName,
  caption,
  storyBody = "",
}: {
  image?: SourceImage
  category: GalleryCategory
  sourceName: string
  caption?: string
  storyBody?: string
}): GalleryEntry | null {
  const src = image?.url
  if (!src) return null

  const alt = image.alt?.trim() || caption || sourceName
  const title = caption?.trim() || alt
  const extension = src.split(".").pop()?.split("?")[0]?.toUpperCase() || "IMAGE"

  return {
    src,
    alt,
    caption: title,
    category,
    fileName: src.split("/").pop() ?? "gallery-image",
    format: extension,
    partnerName: sourceName,
    resolution:
      image.width && image.height
        ? `${image.width} × ${image.height} px`
        : "Resolusi asli",
    storyTitle: title,
    storyBody,
    uploadedAt: image.uploadedAt,
  }
}

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "id"
  const client = await getSanityClientForCurrentMode()
  const [partnershipPage, team, coveragePage, fleetOptions, products, mediaSlots] =
    await Promise.all([
      getSanityPartnershipPage(lang),
      getSanityTeam(),
      client.fetch<CoveragePageResponse | null>(JANGKAUAN_QUERY, { lang }),
      client.fetch<SanityFleetOption[]>(FLEET_OPTIONS_QUERY, { lang }),
      client.fetch<SanityProduct[]>(PRODUCT_QUERY, { lang }),
      client.fetch<MediaSlots | null>(`*[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0]{
        coverageSlots[]{
          slotId,
          sectionName,
          flipTitle,
          "image": image{
            "url": asset->url,
            "alt": alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "uploadedAt": asset->_createdAt
          }
        },
        productsSlots[]{
          slotId,
          sectionName,
          flipTitle,
          "image": image{
            "url": asset->url,
            "alt": alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "uploadedAt": asset->_createdAt
          }
        }
      }`),
    ])

  const partners =
    (partnershipPage as PartnershipPageResponse | null)?.showcase?.filter(
      (item): item is PartnershipItem => Boolean(item?.name)
    ) ?? []
  const entries = getGalleryEntries(partners)

  for (const [category, members] of [
    ["leadership", team.komisaris],
    ["leadership", team.direksi],
  ] as const) {
    for (const member of members) {
      const profilePhoto = toGalleryEntry({
        image: {
          url: member.image,
          alt: `Foto profil ${member.name}`,
          uploadedAt: member.imageUploadedAt,
        },
        category,
        sourceName: `${member.name} · ${member.role}`,
        caption: `Foto profil ${member.name}`,
        storyBody: member.description,
      })
      if (profilePhoto) entries.push(profilePhoto)

      for (const photo of member.gallery ?? []) {
        const entry = toGalleryEntry({
          image: {
            url: photo.src,
            alt: photo.alt,
            uploadedAt: photo.uploadedAt,
          },
          category,
          sourceName: `${member.name} · ${member.role}`,
          caption: photo.caption,
          storyBody: member.description,
        })
        if (entry) entries.push(entry)
      }
    }
  }

  for (const area of coveragePage?.serviceAreas?.areas ?? []) {
    if (area.active === false) continue
    const location = [area.city, area.province].filter(Boolean).join(", ")
    const entry = toGalleryEntry({
      image: area.image,
      category: "coverage",
      sourceName: location || "Jangkauan layanan",
      caption: location || area.image?.alt || "Area layanan",
      storyBody: area.body ?? "",
    })
    if (entry) entries.push(entry)
  }

  for (const slot of mediaSlots?.coverageSlots ?? []) {
    const entry = toGalleryEntry({
      image: slot.image,
      category: "coverage",
      sourceName: "Halaman Jangkauan",
      caption: slot.flipTitle || slot.sectionName || "Dokumentasi jangkauan",
    })
    if (entry) entries.push(entry)
  }

  for (const slot of mediaSlots?.productsSlots ?? []) {
    const entry = toGalleryEntry({
      image: slot.image,
      category: "services",
      sourceName: "Halaman Produk & Layanan",
      caption: slot.flipTitle || slot.sectionName || "Dokumentasi layanan",
    })
    if (entry) entries.push(entry)
  }

  for (const option of fleetOptions ?? []) {
    const sourceName = option.label || "Armada"
    const vehicleImages = [
      option.image,
      ...(option.gallery ?? []).flatMap((item) => (item?.image ? [item.image] : [])),
    ]
    for (const image of vehicleImages) {
      const entry = toGalleryEntry({
        image,
        category: "transport",
        sourceName,
        caption: image?.alt || `Dokumentasi ${sourceName}`,
        storyBody: option.note ?? "",
      })
      if (entry) entries.push(entry)
    }
  }

  for (const product of products ?? []) {
    const entry = toGalleryEntry({
      image: product.artwork,
      category: "services",
      sourceName: product.name || "Produk & Layanan",
      caption: product.name || product.description || "Dokumentasi produk",
      storyBody: product.description ?? "",
    })
    if (entry) entries.push(entry)
  }

  const seen = new Set<string>()
  const uniqueEntries = entries.filter((entry) => {
    const key = `${entry.category}:${entry.src}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return NextResponse.json(uniqueEntries, {
    headers: { "Cache-Control": "no-store" },
  })
}
