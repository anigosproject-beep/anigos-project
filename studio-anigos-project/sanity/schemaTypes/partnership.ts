import { defineArrayMember, defineField, defineType } from "sanity"

const localizedText = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "localizedHeroText",
    validation: (rule) => (required ? rule.required() : rule),
  })

const partnershipImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Teks alternatif",
        type: "localizedHeroText",
      }),
    ],
  })

export const partnership = defineType({
  name: "partnership",
  title: "Konten Kemitraan",
  type: "document",
  groups: [
    { name: "overview", title: "Informasi" },
    { name: "media", title: "Media" },
    { name: "documents", title: "Dokumen" },
    { name: "publication", title: "Publikasi", default: true },
  ],
  fields: [
    localizedText("name", "Nama mitra", true),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "overview",
      options: { source: "name.id", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    localizedText("summary", "Ringkasan", true),
    localizedText("body", "Deskripsi kemitraan"),
    defineField({
      name: "partnerSince",
      title: "Tanggal bermitra",
      type: "date",
      group: "overview",
    }),
    partnershipImage("logo", "Logo mitra"),
    partnershipImage("image", "Gambar utama mitra"),
    defineField({
      name: "gallery",
      title: "Galeri dokumentasi",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          name: "partnershipGalleryItem",
          title: "Foto galeri",
          type: "object",
          fields: [
            partnershipImage("image", "Foto"),
            defineField({
              name: "caption",
              title: "Keterangan",
              type: "localizedHeroText",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "portfolioDocument",
      title: "Dokumen portofolio",
      type: "file",
      group: "documents",
      options: {
        accept:
          ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    }),
    defineField({
      name: "documentation",
      title: "Dokumen pendukung",
      type: "file",
      group: "documents",
      options: {
        accept:
          ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      group: "publication",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "isPublished",
      title: "Tampilkan di halaman Kemitraan",
      type: "boolean",
      group: "publication",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name.id",
      slug: "slug.current",
      isPublished: "isPublished",
      media: "logo",
    },
    prepare: ({ title, slug, isPublished, media }) => ({
      title: title || "Konten kemitraan baru",
      subtitle: `${isPublished ? "Terbit" : "Draft"}${slug ? ` · /${slug}` : ""}`,
      media,
    }),
  },
})
