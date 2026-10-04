import { defineField, defineType } from "sanity"

export const localizedMediaText = defineType({
  name: "localizedMediaText",
  title: "Keterangan media per bahasa",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Bahasa Indonesia",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.max(160),
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
