import { defineField, defineType } from "sanity"

export const galleryCategory = defineType({
  name: "galleryCategory",
  title: "Kategori Galeri",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama kategori",
      type: "localizedMediaText",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "object" &&
            value !== null &&
            "id" in value &&
            typeof value.id === "string" &&
            value.id.trim()
              ? true
              : "Isi nama kategori dalam Bahasa Indonesia."
          ),
    }),
  ],
  preview: {
    select: { title: "title.id" },
    prepare: ({ title }) => ({ title: title || "Kategori baru" }),
  },
})
