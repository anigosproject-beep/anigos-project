import { defineArrayMember, defineField, defineType } from "sanity"

const biographyBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Paragraf", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Kutipan", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Number", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Coret", value: "strike-through" },
    ],
    annotations: [
      {
        name: "link",
        title: "Tautan",
        type: "object",
        fields: [
          defineField({
            name: "href",
            title: "URL",
            type: "url",
            validation: (rule) =>
              rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
          }),
        ],
      },
    ],
  },
})

const galleryItem = defineArrayMember({
  name: "teamGalleryItem",
  title: "Foto galeri",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
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
      name: "caption",
      title: "Keterangan foto",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "caption", alt: "image.alt", media: "image" },
    prepare: ({ title, alt, media }) => ({
      title: title || alt || "Foto galeri",
      media,
    }),
  },
})

export const teamMember = defineType({
  name: "teamMember",
  title: "Anggota Struktur Perusahaan",
  type: "document",
  groups: [
    { name: "profile", title: "Profil", default: true },
    { name: "biography", title: "Biografi" },
    { name: "gallery", title: "Galeri foto" },
  ],
  fields: [
    defineField({
      name: "structuralClass",
      title: "Bagian struktur",
      type: "string",
      group: "profile",
      options: {
        list: [
          { title: "Komisaris", value: "komisaris" },
          { title: "Direksi", value: "direksi" },
          { title: "Tim dan Divisi", value: "tim-divisi" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nama",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "photo",
      title: "Foto profil",
      type: "image",
      group: "profile",
      options: { hotspot: true },
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
      name: "quote",
      title: "Kutipan",
      type: "text",
      rows: 3,
      group: "profile",
      hidden: ({ document }) => document?.structuralClass === "tim-divisi",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "directorPosition",
      title: "Jabatan Direksi",
      type: "string",
      group: "profile",
      hidden: ({ document }) => document?.structuralClass !== "direksi",
      options: {
        list: [
          { title: "Direktur Utama", value: "Direktur Utama" },
          { title: "Direktur Operasional", value: "Direktur Operasional" },
          { title: "Direktur Keuangan", value: "Direktur Keuangan" },
          { title: "Direktur Komersial", value: "Direktur Komersial" },
          {
            title: "Direktur Pengembangan Bisnis",
            value: "Direktur Pengembangan Bisnis",
          },
          { title: "Lainnya", value: "other" },
        ],
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.structuralClass !== "direksi" || value
            ? true
            : "Pilih jabatan Direksi."
        ),
    }),
    defineField({
      name: "customDirectorPosition",
      title: "Jabatan Direksi lainnya",
      type: "string",
      group: "profile",
      hidden: ({ document }) =>
        document?.structuralClass !== "direksi" ||
        document?.directorPosition !== "other",
      validation: (rule) =>
        rule.max(100).custom((value, context) =>
          context.document?.directorPosition !== "other" ||
          value?.trim()
            ? true
            : "Isi jabatan Direksi lainnya."
        ),
    }),
    defineField({
      name: "division",
      title: "Divisi",
      type: "reference",
      to: [{ type: "teamDivision" }],
      group: "profile",
      hidden: ({ document }) => document?.structuralClass !== "tim-divisi",
      options: {
        filter: "isActive != false",
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.document?.structuralClass !== "tim-divisi" || value)
            ? true
            : "Pilih divisi."
        ),
    }),
    defineField({
      name: "divisionRole",
      title: "Jabatan dalam divisi",
      type: "string",
      group: "profile",
      hidden: ({ document }) => document?.structuralClass !== "tim-divisi",
      options: {
        list: [
          { title: "Anggota", value: "anggota" },
          { title: "Kepala divisi", value: "kepala-divisi" },
          { title: "Lainnya", value: "other" },
        ],
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.structuralClass !== "tim-divisi" || value
            ? true
            : "Pilih jabatan dalam divisi."
        ),
    }),
    defineField({
      name: "customDivisionRole",
      title: "Jabatan lainnya",
      type: "string",
      group: "profile",
      hidden: ({ document }) =>
        document?.structuralClass !== "tim-divisi" ||
        document?.divisionRole !== "other",
      validation: (rule) =>
        rule.max(100).custom((value, context) =>
          context.document?.divisionRole !== "other" || value?.trim()
            ? true
            : "Isi jabatan lainnya."
        ),
    }),
    defineField({
      name: "biography",
      title: "Biografi",
      type: "array",
      group: "biography",
      hidden: ({ document }) => document?.structuralClass === "tim-divisi",
      description:
        "Teks mendukung bold, italic, daftar, kutipan, dan tautan.",
      of: [biographyBlock],
    }),
    defineField({
      name: "description",
      title: "Kutipan lama",
      type: "text",
      group: "biography",
      hidden: true,
    }),
    defineField({
      name: "gallery",
      title: "Foto galeri",
      type: "array",
      group: "gallery",
      description: "Tambahkan satu atau beberapa foto dokumentasi profil.",
      of: [galleryItem],
      options: { sortable: true },
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      group: "profile",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "isPublished",
      title: "Tampilkan di halaman",
      type: "boolean",
      group: "profile",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      structuralClass: "structuralClass",
      directorPosition: "directorPosition",
      divisionRole: "divisionRole",
      division: "division.name",
      media: "photo",
    },
    prepare: ({
      title,
      structuralClass,
      directorPosition,
      divisionRole,
      division,
      media,
    }) => ({
      title: title || "Anggota tanpa nama",
      subtitle:
        structuralClass === "komisaris"
          ? "Komisaris"
          : structuralClass === "direksi"
            ? directorPosition || "Direksi"
            : [
                divisionRole === "kepala-divisi"
                  ? "Kepala divisi"
                  : divisionRole === "other"
                    ? "Jabatan lainnya"
                    : "Anggota",
                division,
              ]
                .filter(Boolean)
                .join(" · "),
      media,
    }),
  },
})
