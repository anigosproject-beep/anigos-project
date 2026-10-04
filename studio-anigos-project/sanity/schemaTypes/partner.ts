import { defineArrayMember, defineField, defineType } from "sanity"

const partnershipBackgroundMaxCharacters = 10_000

const partnershipBackground = defineField({
  name: "partnershipBackground",
  title: "Isi Latar Belakang Kemitraan",
  type: "array",
  group: "background",
  description:
    "Teks panjang, maksimal 10.000 karakter. Format mendukung paragraf, heading, kutipan, daftar, bold, italic, underline, coret, dan tautan.",
  of: [
    {
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
          { title: "Kode", value: "code" },
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
                  rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          },
        ],
      },
    },
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const length = countPortableTextCharacters(value)
      return (
        length <= partnershipBackgroundMaxCharacters ||
        `Maksimal ${partnershipBackgroundMaxCharacters.toLocaleString("id-ID")} karakter. Saat ini ${length.toLocaleString("id-ID")}.`
      )
    }),
})

function countPortableTextCharacters(value: unknown): number {
  if (!Array.isArray(value)) return 0

  return value.reduce((total, block) => {
    if (typeof block !== "object" || block === null || !("children" in block)) {
      return total
    }
    if (!Array.isArray(block.children)) return total

    const blockTextLength = block.children.reduce(
      (length: number, child: unknown): number => {
        if (
          typeof child === "object" &&
          child !== null &&
          "text" in child &&
          typeof child.text === "string"
        ) {
          return length + child.text.length
        }
        return length
      },
      0
    )

    return total + blockTextLength
  }, 0)
}

export const partner = defineType({
  name: "partner",
  title: "Mitra",
  type: "document",
  groups: [
    { name: "overview", title: "Informasi Perusahaan", default: true },
    { name: "client", title: "Data Portofolio" },
    { name: "gallery", title: "Galeri Perusahaan" },
    { name: "portfolio", title: "Portofolio Kemitraan" },
    { name: "background", title: "Detail Kemitraan" },
    { name: "closing", title: "Penutup" },
  ],
  fields: [
    defineField({
      name: "isActive",
      title: "Mitra aktif",
      type: "boolean",
      group: "overview",
      initialValue: true,
      description:
        "Mitra aktif dapat tampil pada logo Beranda. Untuk menampilkannya juga sebagai client pada halaman Kemitraan, aktifkan Tampilkan sebagai client dan lengkapi Data Client.",
    }),
    defineField({
      name: "isClient",
      title: "Tampilkan di Portofolio",
      type: "boolean",
      group: "client",
      initialValue: false,
      description:
        "Perusahaan aktif akan tampil pada tabel portofolio dan kategori galeri. Pengaturan ini tidak mengubah logo mitra di Beranda.",
    }),
    defineField({
      name: "clientLocation",
      title: "Lokasi perusahaan",
      type: "localizedHeroText",
      group: "client",
      hidden: ({ document }) => document?.isClient !== true,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isClient !== true) return true
          if (typeof value !== "object" || value === null) {
            return "Lokasi wajib diisi dalam Bahasa Indonesia dan Inggris."
          }
          const localizedValue = value as { id?: unknown; en?: unknown }
          return typeof localizedValue.id === "string" &&
            localizedValue.id.trim() &&
            typeof localizedValue.en === "string" &&
            localizedValue.en.trim()
            ? true
            : "Lokasi wajib diisi dalam Bahasa Indonesia dan Inggris."
        }),
    }),
    defineField({
      name: "clientProducts",
      title: "Layanan (produk yang digunakan)",
      type: "array",
      group: "client",
      hidden: ({ document }) => document?.isClient !== true,
      description:
        "Tambahkan produk yang digunakan perusahaan dalam Bahasa Indonesia dan Inggris. Nilai ini ditampilkan pada kolom Layanan.",
      of: [
        defineArrayMember({
          name: "clientProduct",
          title: "Produk yang digunakan",
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Produk / layanan",
              type: "localizedHeroText",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "product.id", subtitle: "product.en" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Produk yang digunakan",
              subtitle,
            }),
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isClient !== true) return true
          if (!Array.isArray(value) || value.length === 0) {
            return "Tambahkan minimal satu produk yang digunakan."
          }
          const hasIncompleteProduct = value.some((item) => {
            if (typeof item !== "object" || item === null || !("product" in item)) {
              return true
            }
            const product = item.product
            if (typeof product !== "object" || product === null) return true
            return !(
              "id" in product &&
              typeof product.id === "string" &&
              product.id.trim() &&
              "en" in product &&
              typeof product.en === "string" &&
              product.en.trim()
            )
          })
          return hasIncompleteProduct
            ? "Isi setiap produk yang digunakan dalam Bahasa Indonesia dan Inggris."
            : true
        }),
    }),
    defineField({
      name: "clientYear",
      title: "Tahun layanan",
      type: "number",
      group: "client",
      hidden: ({ document }) => document?.isClient !== true,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isClient !== true) return true
          return Number.isInteger(value) && value >= 1900 && value <= 2100
            ? true
            : "Masukkan tahun layanan antara 1900 dan 2100."
        }),
    }),
    defineField({
      name: "companyName",
      title: "Nama Perusahaan",
      type: "string",
      group: "overview",
      description: "Maksimal 80 karakter.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "overview",
      title: "Sekilas tentang perusahaan",
      type: "text",
      rows: 4,
      group: "overview",
      description:
        "Maksimal 360 karakter. Batas ini mengikuti area ringkasan pada template detail mitra.",
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: "logo",
      title: "Logo perusahaan",
      type: "image",
      group: "overview",
      options: { hotspot: true },
      description:
        "Logo digunakan pada template detail mitra dan segmen kemitraan di Beranda.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "string",
          description: "Maksimal 160 karakter.",
          validation: (rule) => rule.max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "partnerSince",
      title: "Tanggal bermitra",
      type: "date",
      group: "overview",
      options: { dateFormat: "DD MMMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "partnershipType",
      title: "Bentuk kemitraan",
      type: "text",
      rows: 3,
      group: "overview",
      description:
        "Maksimal 240 karakter. Teks ini juga menjadi deskripsi portofolio pada template detail.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "gallery",
      title: "Foto galeri perusahaan",
      type: "array",
      group: "gallery",
      description:
        "Foto ini menjadi dokumentasi perusahaan dan otomatis masuk ke kategori galeri portofolio jika Tampilkan di Portofolio aktif.",
      of: [
        defineArrayMember({
          name: "partnershipGalleryItem",
          title: "Foto Galeri",
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
                  type: "localizedMediaText",
                  description: "Jelaskan isi foto untuk aksesibilitas.",
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Keterangan foto (opsional)",
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
              title: title || alt || "Foto galeri",
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "portfolioDocument",
      title: "Portofolio kemitraan",
      type: "file",
      group: "portfolio",
      options: {
        accept:
          ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      description: "Unggah satu file PDF atau DOCX.",
    }),
    defineField({
      name: "partnershipBackgroundTitle",
      title: "Judul latar belakang kemitraan",
      type: "string",
      group: "background",
      initialValue: "Latar belakang kemitraan.",
      description: "Default tersedia dan dapat diedit. Maksimal 120 karakter.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "partnershipBackgroundSubtitle",
      title: "Subjudul latar belakang kemitraan",
      type: "text",
      rows: 2,
      group: "background",
      initialValue:
        "Penjelasan lengkap mengenai alasan, ruang lingkup, dan arah kerja sama.",
      description: "Default tersedia dan dapat diedit. Maksimal 240 karakter.",
      validation: (rule) => rule.required().max(240),
    }),
    partnershipBackground,
    defineField({
      name: "partnershipClosing",
      title: "Penutup",
      type: "text",
      rows: 3,
      group: "closing",
      description: "Maksimal 320 karakter.",
      validation: (rule) => rule.max(320),
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      isActive: "isActive",
      media: "logo",
    },
    prepare: ({ title, isActive, media }) => ({
      title: title || "Mitra tanpa nama",
      subtitle: isActive ? "Mitra aktif" : "Arsip mitra",
      media,
    }),
  },
})
