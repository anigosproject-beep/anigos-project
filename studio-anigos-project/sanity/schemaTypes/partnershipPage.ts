import { defineArrayMember, defineField, defineType } from "sanity"

const localizedText = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "localizedHeroText",
    validation: (rule) => (required ? rule.required() : rule),
  })

const pageSection = defineField({
  name: "section",
  title: "Section halaman",
  type: "object",
  fields: [
    localizedText("eyebrow", "Label kecil"),
    localizedText("title", "Judul", true),
    localizedText("body", "Isi"),
    defineField({
      name: "image",
      title: "Gambar section",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "localizedHeroText",
        }),
      ],
    }),
  ],
})

export const partnershipPage = defineType({
  name: "partnershipPage",
  title: "Halaman Kemitraan",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        localizedText("eyebrow", "Label kecil"),
        localizedText("title", "Judul", true),
        localizedText("description", "Deskripsi"),
        defineField({
          name: "image",
          title: "Gambar latar",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Teks alternatif",
              type: "localizedHeroText",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "intro",
      title: "Pengantar",
      type: "object",
      fields: [
        localizedText("eyebrow", "Label kecil"),
        localizedText("title", "Judul", true),
        localizedText("lead", "Ringkasan"),
        localizedText("body", "Isi"),
      ],
    }),
    defineField({
      name: "sections",
      title: "Section halaman",
      type: "array",
      of: [defineArrayMember(pageSection)],
    }),
    defineField({
      name: "process",
      title: "Proses kemitraan",
      type: "array",
      of: [
        defineArrayMember({
          name: "partnershipProcessStep",
          title: "Tahap proses",
          type: "object",
          fields: [
            defineField({
              name: "order",
              title: "Urutan",
              type: "number",
              validation: (rule) => rule.required().integer().min(1),
            }),
            localizedText("title", "Judul", true),
            localizedText("body", "Penjelasan"),
          ],
          preview: {
            select: { title: "title.id", order: "order" },
            prepare: ({ title, order }) => ({
              title: `${String(order ?? "?").padStart(2, "0")} · ${title ?? "Tahap baru"}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "partnerships",
      title: "Mitra yang ditampilkan",
      type: "array",
      description:
        "Referensi hanya ke Konten Kemitraan baru. Tidak mengubah daftar Mitra lama yang dipakai Beranda.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "partnership" }],
        }),
      ],
    }),
    defineField({
      name: "closing",
      title: "Penutup",
      type: "object",
      fields: [
        localizedText("title", "Judul"),
        localizedText("body", "Isi"),
      ],
    }),
  ],
})
