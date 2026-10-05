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
      type: "localizedHeroText",
      group: "main",
      validation: (rule) =>
        rule.custom((value) => {
          const id = (value as { id?: unknown } | undefined)?.id
          return typeof id === "string" && id.trim()
            ? id.length <= 120 || "Judul maksimal 120 karakter."
            : "Judul Bahasa Indonesia wajib diisi."
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "main",
      options: { source: "title.id", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan artikel",
      type: "localizedArticleText",
      group: "main",
      description:
        "Tampil sebagai ringkasan pada daftar artikel dan di bawah judul halaman detail. Maksimal 280 karakter.",
      validation: (rule) =>
        rule.custom((value) => {
          const id = (value as { id?: unknown } | undefined)?.id
          return typeof id === "string" && id.trim()
            ? id.length <= 280 || "Ringkasan maksimal 280 karakter."
            : "Ringkasan Bahasa Indonesia wajib diisi."
        }),
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
      type: "localizedHeroText",
      group: "main",
      description: 'Contoh: "5 menit".',
      validation: (rule) =>
        rule.custom((value) => {
          const id = (value as { id?: unknown } | undefined)?.id
          return typeof id === "string" && /^\d+\s+menit$/i.test(id)
            ? true
            : 'Masukkan estimasi dalam Bahasa Indonesia, misalnya "5 menit".'
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
          type: "localizedMediaText",
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
          type: "localizedMediaText",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeri gambar artikel (opsional)",
      type: "array",
      group: "media",
      description:
        "Tambahkan beberapa gambar untuk ditampilkan di galeri setelah teks artikel. Urutan gambar mengikuti urutan di sini.",
      of: [
        defineArrayMember({
          name: "articleGalleryItem",
          title: "Gambar galeri",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Pilih gambar",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Teks alternatif",
                  type: "localizedMediaText",
                  validation: (rule) =>
                    rule.custom((value) => {
                      const id = (value as { id?: unknown } | undefined)?.id
                      return typeof id === "string" && id.trim()
                        ? true
                        : "Teks alternatif Bahasa Indonesia wajib diisi."
                    }),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Keterangan gambar (opsional)",
              type: "localizedMediaText",
            }),
          ],
          preview: {
            select: {
              title: "caption.id",
              alt: "image.alt.id",
              media: "image",
            },
            prepare: ({ title, alt, media }) => ({
              title: title || alt || "Gambar galeri artikel",
              media,
            }),
          },
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
              type: "localizedArticleText",
              validation: (rule) =>
                rule.custom((value) => {
                  const id = (value as { id?: unknown } | undefined)?.id
                  return typeof id === "string" && id.trim()
                    ? true
                    : "Teks paragraf Bahasa Indonesia wajib diisi."
                }),
            }),
          ],
          preview: {
            select: { title: "text.id" },
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
      title: "title.id",
      date: "date",
      category: "category.name.id",
      media: "image",
    },
    prepare: ({ title, date, category, media }) => ({
      title: title || "Artikel tanpa judul",
      subtitle: [category, date].filter(Boolean).join(" · "),
      media,
    }),
  },
})
