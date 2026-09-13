import { defineField, defineType } from "sanity"

export const newsroomArticle = defineType({
  name: "newsroomArticle",
  title: "Newsroom Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "newsroomCategory" }], validation: (rule) => rule.required() }),
    defineField({ name: "subcategory", title: "Subcategory slug", type: "string" }),
    defineField({ name: "date", title: "Publication date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "readTime", title: "Read time", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "content",
      title: "Content paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.name", media: "image" },
  },
})
