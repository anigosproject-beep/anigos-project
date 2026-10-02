import { defineArrayMember, defineField, defineType } from "sanity"

import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"
import { PageMediaSelectionInput } from "../components/PageMediaSelectionInput"
import { PageMediaSlotsInput } from "../components/PageMediaSlotsInput"
import {
  pageMediaFieldNames,
  pageMediaMenus,
} from "../page-media-registry"
import { maxMarineFuelVideoBytes } from "../../../shared/sanity-content-contracts"

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
      type: "string",
      hidden: ({ parent }) => !isCoverageFlipcardSlot(parent),
      description: "Maksimal 120 karakter.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "image",
      title: "Tambah / ganti gambar",
      type: "image",
      components: { input: PageMediaImageInput },
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      description:
        "Kosongkan untuk mempertahankan media sebelumnya. Unggah media baru untuk menggantinya. Crop/hotspot hanya mengubah potongan, bukan rasio container halaman.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "string",
          validation: (rule) => rule.max(160),
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
      description:
        `Unggah atau ganti file video untuk slot ini. Video Marine Fuel tampil di pemutar pada segmen; gambar latar dikelola terpisah pada slot gambar. MP4 (H.264) disarankan; ukuran hingga ${Math.round(maxMarineFuelVideoBytes / 1024 / 1024)} MiB direkomendasikan.`,
    }),
  ],
  preview: {
    select: {
      sectionName: "sectionName",
      slotId: "slotId",
      mediaType: "mediaType",
      containerRatio: "containerRatio",
      currentSource: "currentSource",
      flipTitle: "flipTitle",
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
      image,
      video,
    }) => {
      const flipcardLabel = getFlipcardLabel(slotId)
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
          `${mediaType === "video" ? "Video" : "Gambar"} di ${sectionName ?? "Section"}`,
        subtitle:
          flipcardLabel && flipTitle
            ? `${assetStatus} · Judul: ${flipTitle}`
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
