import { defineField, defineType } from "sanity"

export const newsroomCategory = defineType({
  name: "newsroomCategory",
  title: "Newsroom Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "name", subtitle: "slug.current" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "slug.current" } },
})
