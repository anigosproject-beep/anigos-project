import { defineField, defineType } from "sanity"

import { PageMediaImageInput } from "../components/PageMediaImageInput"
import { PageHeroSelectionInput } from "../components/PageHeroSelectionInput"
import { PageHeroSlotInput } from "../components/PageHeroSlotInput"
import {
  pageHeroFieldName,
  pageHeroMenus,
} from "../page-hero-registry"

const selectionField = defineField({
  name: "selection",
  title: "Pilih lokasi Page Hero",
  type: "object",
  components: { input: PageHeroSelectionInput },
  fields: [
    defineField({
      name: "menu",
      title: "Menu",
      type: "string",
      options: {
        list: pageHeroMenus.map(({ value, title }) => ({ value, title })),
      },
    }),
    defineField({
      name: "page",
      title: "Halaman",
      type: "string",
    }),
  ],
})

function isSelectedPage(
  document: unknown,
  menuValue: string,
  pageValue: string
): boolean {
  if (typeof document !== "object" || document === null) return false
  if (!("selection" in document)) return false
  const selection = document.selection
  if (typeof selection !== "object" || selection === null) return false
  if (!("menu" in selection) || !("page" in selection)) return false

  return selection.menu === menuValue && selection.page === pageValue
}

const pageDefinitions = pageHeroMenus.flatMap((menu) =>
  menu.pages.map((page) => ({ menu, page }))
)

const pageHeroFields = pageDefinitions.map(({ menu, page }) =>
  defineField({
    name: pageHeroFieldName(page.value),
    title: `${page.title} — Page Hero`,
    type: "object",
    components: { input: PageHeroSlotInput },
    validation: (rule) =>
      rule.custom((value, context) => {
        if (!isSelectedPage(context.document, menu.value, page.value)) {
          return true
        }
        return value &&
          typeof value === "object" &&
          !Array.isArray(value)
          ? true
          : "Slot Page Hero hilang. Pulihkan metadata slot sebelum memublikasikan."
      }),
    hidden: ({ document }) => !isSelectedPage(document, menu.value, page.value),
    fields: [
      defineField({
        name: "pageKey",
        title: "ID halaman aplikasi",
        type: "string",
        readOnly: true,
        initialValue: page.pageKey,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "pagePath",
        title: "Path halaman",
        type: "string",
        readOnly: true,
        initialValue: page.path,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "containerInfo",
        title: "Ukuran dan perilaku container",
        type: "string",
        readOnly: true,
        initialValue:
          "Full-bleed overlay; min-height min(34rem, 65svh); gambar cover dan center; tinggi mengikuti viewport.",
      }),
      defineField({
        name: "recommendedRatio",
        title: "Rasio sumber gambar yang disarankan",
        type: "string",
        readOnly: true,
        initialValue: "8:3 (sekitar 1920 × 720 px); rasio container responsif.",
      }),
      defineField({
        name: "pageName",
        title: "Nama halaman (teks kecil di atas judul)",
        type: "localizedHeroText",
        validation: (rule) => rule.required(),
        initialValue: page.pageName,
      }),
      defineField({
        name: "title",
        title: "Judul besar Hero",
        type: "localizedHeroText",
        validation: (rule) => rule.required(),
        initialValue: page.heading,
      }),
      defineField({
        name: "subtitle",
        title: "Subjudul Hero",
        type: "localizedHeroText",
        validation: (rule) => rule.required(),
        initialValue: page.subtitle,
      }),
      defineField({
        name: "currentSource",
        title: "Gambar fallback yang digunakan aplikasi saat ini",
        type: "string",
        readOnly: true,
        initialValue: page.currentSource,
      }),
      defineField({
        name: "image",
        title: "Tambah / ganti gambar overlay",
        type: "image",
        components: { input: PageMediaImageInput },
        options: { hotspot: true },
        description:
          "Jika belum ada gambar, tambahkan gambar di sini. Unggah gambar baru untuk mengganti gambar sebelumnya. Crop/hotspot tidak mengubah ukuran container Hero.",
        fields: [
          defineField({
            name: "alt",
            title: "Teks alternatif",
            type: "string",
            validation: (rule) => rule.max(160),
          }),
        ],
      }),
    ],
    initialValue: {
      pageKey: page.pageKey,
      pagePath: page.path,
      containerInfo:
        "Full-bleed overlay; min-height min(34rem, 65svh); gambar cover dan center; tinggi mengikuti viewport.",
      recommendedRatio:
        "8:3 (sekitar 1920 × 720 px); rasio container responsif.",
      pageName: page.pageName,
      title: page.heading,
      subtitle: page.subtitle,
      currentSource: page.currentSource,
    },
  })
)

const initialHeroValues = Object.fromEntries(
  pageDefinitions.map(({ page }) => [
    pageHeroFieldName(page.value),
    {
      pageKey: page.pageKey,
      pagePath: page.path,
      containerInfo:
        "Full-bleed overlay; min-height min(34rem, 65svh); gambar cover dan center; tinggi mengikuti viewport.",
      recommendedRatio:
        "8:3 (sekitar 1920 × 720 px); rasio container responsif.",
      pageName: page.pageName,
      title: page.heading,
      subtitle: page.subtitle,
      currentSource: page.currentSource,
    },
  ])
)

export const pageHeroEditor = defineType({
  name: "pageHeroEditor",
  title: "Page Hero",
  type: "document",
  fields: [selectionField, ...pageHeroFields],
  initialValue: {
    selection: { menu: "", page: "" },
    ...initialHeroValues,
  },
})
