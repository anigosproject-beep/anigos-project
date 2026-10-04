import { defineField, defineType } from "sanity"

import { galleryCategories } from "../../../shared/gallery-categories"

const localizedRequiredIndonesianText = (value: unknown) =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  typeof value.id === "string" &&
  value.id.trim()
    ? true
    : "Isi teks dalam Bahasa Indonesia."

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Foto Galeri",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "localizedMediaText",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "object",
      fields: [
        defineField({
          name: "kind",
          title: "Pilihan kategori",
          type: "string",
          initialValue: "existing",
          options: {
            layout: "radio",
            list: [
              { title: "Pilih kategori yang sudah ada", value: "existing" },
              { title: "Pilih atau buat kategori baru", value: "custom" },
            ],
          },
        }),
        defineField({
          name: "existingCategory",
          title: "Kategori",
          type: "string",
          options: {
            list: galleryCategories.map(({ id, label }) => ({
              value: id,
              title: label.id,
            })),
          },
          hidden: ({ parent }) => parent?.kind !== "existing",
          validation: (rule) =>
            rule.custom((value, context) => {
              if (context.parent?.kind !== "existing") return true
              return galleryCategories.some(({ id }) => id === value)
                ? true
                : "Pilih kategori dari daftar."
            }),
        }),
        defineField({
          name: "customCategory",
          title: "Kategori baru atau kategori buatan",
          type: "reference",
          to: [{ type: "galleryCategory" }],
          hidden: ({ parent }) => parent?.kind !== "custom",
          validation: (rule) =>
            rule.custom((value, context) =>
              context.parent?.kind !== "custom" || value
                ? true
                : "Pilih kategori yang sudah ada atau buat kategori baru."
            ),
        }),
      ],
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== "object" || value === null) {
            return "Pilih kategori foto."
          }
          if (value.kind === "existing" && value.existingCategory) return true
          if (value.kind === "custom" && value.customCategory?._ref) return true
          return "Pilih kategori foto."
        }),
    }),
    defineField({
      name: "title",
      title: "Judul",
      type: "localizedMediaText",
      validation: (rule) =>
        rule.required().custom(localizedRequiredIndonesianText),
    }),
    defineField({
      name: "caption",
      title: "Keterangan",
      type: "localizedMediaText",
      validation: (rule) =>
        rule.required().custom(localizedRequiredIndonesianText),
    }),
  ],
  preview: {
    select: {
      title: "title.id",
      media: "image",
      category: "category.existingCategory",
    },
    prepare: ({ title, category, media }) => ({
      title: title || "Foto galeri baru",
      subtitle:
        galleryCategories.find((item) => item.id === category)?.label.id ??
        "Galeri",
      media,
    }),
  },
})
