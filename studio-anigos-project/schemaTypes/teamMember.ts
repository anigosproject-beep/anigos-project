import { defineField, defineType } from "sanity"

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Posisi / Jabatan",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori card",
      type: "string",
      options: {
        list: [
          { title: "Komisaris", value: "komisaris" },
          { title: "Direksi", value: "direksi" },
          { title: "Operasional Distribusi", value: "operasional" },
          { title: "Armada & Logistik", value: "armada" },
          { title: "Kemitraan & Layanan", value: "kemitraan" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Deskripsi singkat",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Urutan dalam card",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "published",
      title: "Tampilkan di website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
})
