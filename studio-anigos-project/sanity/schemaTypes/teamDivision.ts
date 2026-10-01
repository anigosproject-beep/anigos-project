import { defineField, defineType } from "sanity"

export const teamDivision = defineType({
  name: "teamDivision",
  title: "Divisi",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama divisi",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "description",
      title: "Deskripsi divisi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Divisi aktif",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Divisi tanpa nama",
      subtitle,
    }),
  },
})
