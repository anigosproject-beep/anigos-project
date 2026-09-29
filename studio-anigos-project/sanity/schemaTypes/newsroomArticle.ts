import { defineArrayMember, defineField, defineType } from "sanity"

import { NewsroomSubcategoryInput } from "../components/NewsroomSubcategoryInput"
import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"

export const newsroomArticle = defineType({
  name: "newsroomArticle",
  title: "Artikel",
  type: "document",
  groups: [
    { name: "main", title: "Informasi Artikel", default: true },
    { name: "media", title: "Media" },
    { name: "body", title: "Isi Artikel" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Judul artikel",
      type: "string",
      group: "main",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan artikel",
      type: "text",
      rows: 3,
      group: "main",
      description:
        "Tampil sebagai ringkasan pada daftar artikel dan di bawah judul halaman detail. Maksimal 280 karakter.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "newsroomCategory" }],
      group: "main",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subkategori",
      type: "string",
      group: "main",
      components: { input: NewsroomSubcategoryInput },
      description: "Pilihan akan mengikuti subkategori pada kategori terpilih.",
    }),
    defineField({
      name: "date",
      title: "Tanggal artikel",
      type: "date",
      group: "main",
      options: { dateFormat: "DD MMMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Estimasi waktu baca",
      type: "string",
      group: "main",
      description: 'Contoh: "5 menit".',
      validation: (rule) =>
        rule
          .required()
          .max(20)
          .regex(/^\d+\s+menit$/i, {
            name: "estimasi waktu baca",
            invert: false,
          }),
    }),
    defineField({
      name: "featured",
      title: "Tampilkan sebagai artikel unggulan",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Gambar utama artikel",
      type: "image",
      group: "media",
      components: { input: PageMediaImageInput },
      options: { hotspot: true },
      description:
        "Ditampilkan pada rasio 16:9 di halaman artikel. Hotspot/crop mengatur pembingkaian, bukan ukuran container.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "string",
          validation: (rule) => rule.max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video artikel (opsional)",
      type: "file",
      group: "media",
      components: { input: PageMediaVideoInput },
      options: { accept: "video/*" },
      description: "Jika diisi, video tampil setelah gambar utama.",
    }),
    defineField({
      name: "videoPoster",
      title: "Poster video (opsional)",
      type: "image",
      group: "media",
      components: { input: PageMediaImageInput },
      options: { hotspot: true },
      description: "Gambar pratinjau untuk video artikel.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "string",
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Isi artikel",
      type: "array",
      group: "body",
      description:
        "Tambahkan paragraf sesuai urutan tampil pada template detail artikel.",
      of: [
        defineArrayMember({
          name: "articleParagraph",
          title: "Paragraf",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Teks paragraf",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required().max(3000),
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({
              title: title
                ? `${title.slice(0, 90)}${title.length > 90 ? "…" : ""}`
                : "Paragraf kosong",
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      category: "category.name",
      media: "image",
    },
    prepare: ({ title, date, category, media }) => ({
      title: title || "Artikel tanpa judul",
      subtitle: [category, date].filter(Boolean).join(" · "),
      media,
    }),
  },
})
