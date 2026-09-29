import { defineField, defineType } from "sanity"

export const localizedHeroText = defineType({
  name: "localizedHeroText",
  title: "Teks per bahasa",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Bahasa Indonesia",
      type: "string",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.max(500),
    }),
  ],
})
