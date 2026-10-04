import { defineArrayMember, defineField, defineType } from "sanity"

export const newsroomCategory = defineType({
  name: "newsroomCategory",
  title: "Kategori Artikel",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama kategori",
      type: "localizedHeroText",
      validation: (rule) =>
        rule.custom((value) => {
          const id = (value as { id?: unknown } | undefined)?.id
          return typeof id === "string" && id.trim()
            ? id.length <= 60 || "Nama kategori maksimal 60 karakter."
            : "Nama kategori Bahasa Indonesia wajib diisi."
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug kategori",
      type: "slug",
      options: { source: "name.id", maxLength: 72 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi kategori",
      type: "localizedArticleText",
      validation: (rule) =>
        rule.custom((value) => {
          const id = (value as { id?: unknown } | undefined)?.id
          return typeof id === "string" && id.trim()
            ? id.length <= 240 || "Deskripsi maksimal 240 karakter."
            : "Deskripsi Bahasa Indonesia wajib diisi."
        }),
    }),
    defineField({
      name: "subcategories",
      title: "Subkategori",
      type: "array",
      of: [
        defineArrayMember({
          name: "newsroomSubcategory",
          title: "Subkategori",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nama subkategori",
              type: "localizedHeroText",
              validation: (rule) =>
                rule.custom((value) => {
                  const id = (value as { id?: unknown } | undefined)?.id
                  return typeof id === "string" && id.trim()
                    ? id.length <= 60 ||
                        "Nama subkategori maksimal 60 karakter."
                    : "Nama subkategori Bahasa Indonesia wajib diisi."
                }),
            }),
            defineField({
              name: "slug",
              title: "Slug subkategori",
              type: "slug",
              options: { source: "name.id", maxLength: 72 },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "name.id", subtitle: "slug.current" },
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: "name.id",
      subtitle: "slug.current",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Kategori tanpa nama",
      subtitle: subtitle ? `/${subtitle}` : "Slug belum dibuat",
    }),
  },
})
