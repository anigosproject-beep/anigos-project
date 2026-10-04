import { defineField, defineType } from "sanity"

export const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media Statis",
  type: "document",
  initialValue: {
    page: "home",
    section: "marine-fuel",
    slot: "background",
    slotKey: "media-slot-home-marine-fuel-background",
    label: "Latar Belakang Marine Fuel",
    isActive: true,
  },
  fields: [
    defineField({
      name: "label",
      title: "Nama media",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slotKey",
      title: "Kunci media",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Halaman",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "section",
      title: "Segmen",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slot",
      title: "Elemen media",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Tambah / ganti gambar",
      type: "image",
      options: { hotspot: true },
      description:
        "Gambar ini menjadi latar segmen Marine Fuel dan akan dipotong responsif mengikuti layar.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "localizedMediaText",
        }),
      ],
    }),
    defineField({
      name: "notes",
      title: "Catatan",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isActive",
      title: "Tampilkan di website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "label",
      page: "page",
      section: "section",
      image: "image",
    },
    prepare: ({ title, page, section, image }) => ({
      title: title || "Media statis",
      subtitle: [page, section].filter(Boolean).join(" · "),
      media: image,
    }),
  },
})
