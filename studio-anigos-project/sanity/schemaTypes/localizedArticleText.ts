import { defineField, defineType } from "sanity"

export const localizedArticleText = defineType({
  name: "localizedArticleText",
  title: "Teks artikel per bahasa",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Bahasa Indonesia",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(3000),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 6,
      validation: (rule) => rule.max(3000),
    }),
    defineField({
      name: "translationSourceHash",
      title: "Translation source hash",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "translationTargetHash",
      title: "Translation target hash",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
  ],
})
