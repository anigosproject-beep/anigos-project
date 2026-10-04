import { defineArrayMember, defineField, defineType } from "sanity"

export const serviceGalleryEditor = defineType({
  name: "serviceGalleryEditor",
  title: "Halaman Layanan",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Foto layanan",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
