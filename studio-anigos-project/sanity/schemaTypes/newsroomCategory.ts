import { defineArrayMember, defineField, defineType } from "sanity"

export const newsroomCategory = defineType({
  name: "newsroomCategory",
  title: "Kategori Artikel",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama kategori",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug kategori",
      type: "slug",
      options: { source: "name", maxLength: 72 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi kategori",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
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
              type: "string",
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: "slug",
              title: "Slug subkategori",
              type: "slug",
              options: { source: "name", maxLength: 72 },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "slug.current" },
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Kategori tanpa nama",
      subtitle: subtitle ? `/${subtitle}` : "Slug belum dibuat",
    }),
  },
})
