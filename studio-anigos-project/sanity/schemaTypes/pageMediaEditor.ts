import { defineArrayMember, defineField, defineType } from "sanity"

import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"
import { PageMediaSelectionInput } from "../components/PageMediaSelectionInput"
import { PageMediaSlotsInput } from "../components/PageMediaSlotsInput"
import { pageMediaMenus } from "../page-media-registry"

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
        "Referensi media lokal saat ini. Media Sanity akan dapat dipilih setelah koneksi diaktifkan.",
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
        "Kosongkan untuk mempertahankan media sebelumnya. Unggah video baru untuk menggantinya. Frame pemutar tetap mengikuti rasio container halaman.",
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

const pageFieldNames = {
  home: "homeSlots",
  "company-profile": "companyProfileSlots",
  aspirations: "aspirationsSlots",
  partnership: "partnershipSlots",
  "product-overview": "productsSlots",
  coverage: "coverageSlots",
} as const

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
  const fieldName = pageFieldNames[page.value]

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
    description: `Slot media halaman ini bersifat tetap (${page.slots.length} slot). Media dan teks yang diizinkan tetap dapat diedit; slot tidak dapat dihapus, ditambah, disalin, diduplikasi, atau dipindahkan.`,
    hidden: ({ document }) => !isSelectedPage(document, menu, page.value),
    validation: (rule) => rule.length(page.slots.length),
  })
})

const initialPageMedia = Object.fromEntries(
  pageDefinitions.map(({ page }) => [
    pageFieldNames[page.value],
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
