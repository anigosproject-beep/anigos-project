import { defineArrayMember, defineField, defineType } from "sanity"

import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"
import { PageMediaSelectionInput } from "../components/PageMediaSelectionInput"
import { PageMediaSlotsInput } from "../components/PageMediaSlotsInput"
import { pageHeroMenus } from "../page-hero-registry"
import { pageMediaFieldNames, pageMediaMenus } from "../page-media-registry"
import {
  maxMarineFuelVideoBytes,
  recommendedMarineFuelVideoBytes,
} from "../../../shared/sanity-content-contracts"

const pageHeroTargets = pageHeroMenus.flatMap((menu) =>
  menu.pages.map((page) => ({
    title: `${menu.title} — ${page.title}`,
    value: page.path,
  }))
)
const pageHeroTargetPaths = new Set(pageHeroTargets.map(({ value }) => value))

const selectionField = defineField({
  name: "selection",
  title: "Pilih lokasi media",
  type: "object",
  components: { input: PageMediaSelectionInput },
  fields: [
    defineField({
      name: "menu",
      title: "Menu",
      type: "string",
      options: {
        list: pageMediaMenus.map(({ value, title }) => ({ value, title })),
      },
    }),
    defineField({
      name: "page",
      title: "Halaman",
      type: "string",
    }),
  ],
})

const mediaSlot = defineArrayMember({
  name: "pageMediaSlot",
  title: "Elemen media",
  type: "object",
  fields: [
    defineField({
      name: "slotId",
      title: "ID lokasi",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pagePath",
      title: "Path halaman",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionName",
      title: "Nama section",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Tipe item",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Gambar", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "containerRatio",
      title: "Rasio container tetap",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fit",
      title: "Perilaku media pada container",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Cover dan crop", value: "cover" },
          { title: "Contain, tampilkan seluruh gambar", value: "contain" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "recommendedRatio",
      title: "Rasio sumber yang disarankan",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "currentSource",
      title: "Sumber yang sedang digunakan aplikasi",
      type: "string",
      readOnly: true,
      description:
        "Referensi media cadangan saat ini. Unggah media pada slot terkait untuk menggantinya setelah dipublikasikan.",
    }),
    defineField({
      name: "name",
      title: "Nama produk / layanan",
      type: "localizedHeroText",
      hidden: ({ parent }) => !isHomeProductLogoSlot(parent),
      description:
        "Ditampilkan di samping logo pada segmen Produk & Layanan di beranda. Bisa diisi dalam Bahasa Indonesia dan English.",
    }),
    defineField({
      name: "description",
      title: "Keterangan produk / layanan",
      type: "localizedHeroText",
      hidden: ({ parent }) => !isHomeProductLogoSlot(parent),
      description:
        "Keterangan singkat yang ditampilkan bersama logo. Bisa diisi dalam Bahasa Indonesia dan English.",
    }),
    defineField({
      name: "flipTitle",
      title: "Judul",
      type: "localizedMediaText",
      hidden: ({ parent }) => !isCoverageFlipcardSlot(parent),
      description: "Judul keterangan media, maksimal 120 karakter per bahasa.",
      validation: (rule) =>
        rule.custom((value) => {
          if (typeof value !== "object" || value === null) return true
          return [value.id, value.en].every(
            (text) => typeof text !== "string" || text.length <= 120
          )
            ? true
            : "Judul maksimal 120 karakter per bahasa."
        }),
    }),
    defineField({
      name: "linkedPagePath",
      title: "Halaman tujuan kartu",
      type: "string",
      options: { list: pageHeroTargets },
      hidden: ({ parent }) => !isHomeResourceCardSlot(parent),
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!isHomeResourceCardSlot(context.parent)) return true
          return typeof value === "string" && pageHeroTargetPaths.has(value)
            ? true
            : "Pilih halaman tujuan dari daftar."
        }),
      description:
        "Kartu akan membuka halaman ini. Nama dan keterangan otomatis mengikuti judul serta subjudul Page Hero, dan gambar mengikuti Page Hero tersebut. Jika gambar belum diatur, situs memakai gambar fallback.",
    }),
    defineField({
      name: "image",
      title: "Tambah / ganti gambar",
      type: "image",
      components: { input: PageMediaImageInput },
      options: { hotspot: true },
      hidden: ({ parent }) =>
        parent?.mediaType !== "image" || isHomeResourceCardSlot(parent),
      description:
        "Kosongkan untuk mempertahankan media sebelumnya. Unggah media baru untuk menggantinya. Crop/hotspot hanya mengubah potongan, bukan rasio container halaman.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "localizedMediaText",
        }),
      ],
    }),
    defineField({
      name: "flipDescription",
      title: "Keterangan",
      type: "text",
      rows: 4,
      hidden: ({ parent }) => !isCoverageFlipcardSlot(parent),
      description:
        "Maksimal 360 karakter agar keterangan tetap nyaman dibaca pada sisi belakang kartu.",
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: "video",
      title: "Tambah / ganti video",
      type: "file",
      components: { input: PageMediaVideoInput },
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      description: `Unggah atau ganti file video untuk slot ini. Video Marine Fuel tampil di pemutar pada segmen; gambar latar dikelola terpisah pada slot gambar. MP4 (H.264) hingga ${Math.round(recommendedMarineFuelVideoBytes / 1024 / 1024)} MiB disarankan (batas pemutaran ${Math.round(maxMarineFuelVideoBytes / 1024 / 1024)} MiB).`,
    }),
  ],
  preview: {
    select: {
      sectionName: "sectionName",
      slotId: "slotId",
      mediaType: "mediaType",
      containerRatio: "containerRatio",
      currentSource: "currentSource",
      flipTitle: "flipTitle.id",
      linkedPagePath: "linkedPagePath",
      image: "image",
      video: "video",
    },
    prepare: ({
      sectionName,
      slotId,
      mediaType,
      containerRatio,
      currentSource,
      flipTitle,
      linkedPagePath,
      image,
      video,
    }) => {
      const flipcardLabel = getFlipcardLabel(slotId)
      const resourceCardLabel = getHomeResourceCardLabel(slotId)
      const assetStatus =
        mediaType === "video"
          ? video?.asset?._ref
            ? `${containerRatio ?? ""} · Video tersedia · dapat diganti`
            : `${containerRatio ?? ""} · Sumber saat ini: ${currentSource ?? "belum ada"}`
          : image?.asset?._ref
            ? `${containerRatio ?? ""} · Gambar tersedia · dapat diganti`
            : `${containerRatio ?? ""} · Sumber saat ini: ${currentSource ?? "belum ada"}`
      return {
        title:
          flipcardLabel ??
          resourceCardLabel ??
          `${mediaType === "video" ? "Video" : "Gambar"} di ${sectionName ?? "Section"}`,
        subtitle:
          flipcardLabel && flipTitle
            ? `${assetStatus} · Judul: ${flipTitle}`
            : resourceCardLabel
              ? `${assetStatus} · Halaman tujuan: ${linkedPagePath ?? "belum dipilih"}`
              : assetStatus,
        media: image,
      }
    },
  },
})

function isCoverageFlipcardSlot(parent: unknown): boolean {
  if (typeof parent !== "object" || parent === null || !("slotId" in parent)) {
    return false
  }

  return (
    typeof parent.slotId === "string" &&
    parent.slotId.startsWith("coverage-work-flipcard-")
  )
}

function isHomeResourceCardSlot(parent: unknown): boolean {
  if (typeof parent !== "object" || parent === null || !("slotId" in parent)) {
    return false
  }

  return (
    typeof parent.slotId === "string" &&
    /^home-resource-card-[1-3]$/.test(parent.slotId)
  )
}

function isHomeProductLogoSlot(parent: unknown): boolean {
  if (typeof parent !== "object" || parent === null || !("slotId" in parent)) {
    return false
  }

  return (
    typeof parent.slotId === "string" &&
    /^home-product-logo-\d+$/.test(parent.slotId)
  )
}

function getFlipcardLabel(slotId: unknown): string | undefined {
  if (typeof slotId !== "string") return undefined
  const match = /^coverage-work-flipcard-(\d+)$/.exec(slotId)
  return match ? `Flipcard ${match[1]}` : undefined
}

function getHomeResourceCardLabel(slotId: unknown): string | undefined {
  if (typeof slotId !== "string") return undefined
  const labels: Record<string, string> = {
    "home-resource-card-1": "Kartu pintasan 1 — CSR",
    "home-resource-card-2": "Kartu pintasan 2 — Keselamatan Operasional",
    "home-resource-card-3": "Kartu pintasan 3 — Publikasi",
  }
  return labels[slotId]
}

const pageDefinitions = pageMediaMenus.flatMap((menu) =>
  menu.pages.map((page) => ({
    menu: menu.value,
    page,
  }))
)

function isSelectedPage(
  document: unknown,
  menu: string,
  page: string
): boolean {
  if (typeof document !== "object" || document === null) return false
  if (!("selection" in document)) return false

  const selection = document.selection
  if (typeof selection !== "object" || selection === null) return false
  if (!("menu" in selection) || !("page" in selection)) return false

  return selection.menu === menu && selection.page === page
}

const mediaFields = pageDefinitions.map(({ menu, page }) => {
  const fieldName = pageMediaFieldNames[page.value]

  return defineField({
    name: fieldName,
    title: `${page.title} — Elemen media`,
    type: "array",
    of: [mediaSlot],
    components: { input: PageMediaSlotsInput },
    options: {
      sortable: false,
      disableActions: [
        "add",
        "addBefore",
        "addAfter",
        "remove",
        "duplicate",
        "copy",
      ],
    },
    validation: (rule) =>
      rule.custom((value, context) => {
        if (!isSelectedPage(context.document, menu, page.value)) return true

        const currentSlots = Array.isArray(value) ? value : []
        const currentSlotIds = currentSlots
          .map((slot) =>
            typeof slot === "object" && slot !== null && "slotId" in slot
              ? slot.slotId
              : undefined
          )
          .filter((slotId): slotId is string => typeof slotId === "string")
        const expectedSlotIds = page.slots.map((slot) => slot.id)
        const duplicates = currentSlotIds.filter(
          (slotId, index) => currentSlotIds.indexOf(slotId) !== index
        )
        const unexpected = currentSlotIds.filter(
          (slotId) => !expectedSlotIds.includes(slotId)
        )
        const missing = expectedSlotIds.filter(
          (slotId) => !currentSlotIds.includes(slotId)
        )

        if (duplicates.length > 0) {
          return `ID slot duplikat: ${[...new Set(duplicates)].join(", ")}.`
        }
        if (unexpected.length > 0) {
          return `ID slot tidak terdaftar: ${[...new Set(unexpected)].join(", ")}.`
        }
        if (missing.length > 0) {
          return `Slot wajib hilang: ${missing.join(", ")}. Pulihkan slot melalui panel slot yang hilang sebelum publish.`
        }

        return true
      }),
    description: `Halaman ini memiliki ${page.slots.length} slot media tetap. Slot lama yang belum tersimpan dapat dipulihkan dari panel di bawah; media dapat diedit dan dipublikasikan tanpa melengkapi slot halaman lain.`,
    hidden: ({ document }) => !isSelectedPage(document, menu, page.value),
  })
})

const initialPageMedia = Object.fromEntries(
  pageDefinitions.map(({ page }) => [
    pageMediaFieldNames[page.value],
    page.slots.map((slot) => ({
      _key: slot.id,
      slotId: slot.id,
      pagePath: page.path,
      sectionName: slot.sectionName,
      mediaType: slot.mediaType,
      containerRatio: slot.container,
      fit: slot.fit,
      recommendedRatio: slot.expectedRatio,
      currentSource: slot.currentSource,
      ...("linkedPagePath" in slot
        ? { linkedPagePath: slot.linkedPagePath }
        : {}),
    })),
  ])
)

export const pageMediaEditor = defineType({
  name: "pageMediaEditor",
  title: "Media Pendukung",
  type: "document",
  fields: [selectionField, ...mediaFields],
  initialValue: {
    selection: { menu: "", page: "" },
    ...initialPageMedia,
  },
})
