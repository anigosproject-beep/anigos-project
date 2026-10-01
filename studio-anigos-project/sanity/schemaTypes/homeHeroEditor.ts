import { defineArrayMember, defineField, defineType } from "sanity"

import { HomeHeroRouteInput } from "../components/HomeHeroRouteInput"
import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"
import { HomeHeroSlidesInput } from "../components/HomeHeroSlidesInput"

const heroSlide = defineArrayMember({
  name: "homeHeroSlide",
  title: "Slide Home Hero",
  type: "object",
  fields: [
    defineField({
      name: "position",
      title: "Urutan slide",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(8),
    }),
    defineField({
      name: "eyebrow",
      title: "Nama slide",
      type: "localizedHeroText",
      description: "Ditampilkan sebagai label kecil di atas judul slide.",
    }),
    defineField({
      name: "title",
      title: "Judul slide",
      type: "localizedHeroText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Subjudul",
      type: "localizedHeroText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "progressLabel",
      title: "Teks di bawah bar progress",
      type: "localizedHeroText",
      description:
        "Gunakan teks singkat agar pas di bawah bar progress pada tampilan Home Hero.",
    }),
    defineField({
      name: "mediaType",
      title: "Jenis media",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "IMG — Gambar", value: "image" },
          { title: "VID — Video", value: "video" },
        ],
      },
      initialValue: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Tambah / ganti gambar",
      type: "image",
      components: { input: PageMediaImageInput },
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
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
      name: "video",
      title: "Tambah / ganti video",
      type: "file",
      components: { input: PageMediaVideoInput },
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      description: "Video Home Hero ditampilkan dalam frame full-screen.",
    }),
    defineField({
      name: "cta",
      title: "Tombol (opsional)",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Teks tombol",
          type: "localizedHeroText",
        }),
        defineField({
          name: "kind",
          title: "Jenis tujuan",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Pilih halaman dalam web", value: "internal" },
              { title: "Masukkan link", value: "external" },
            ],
          },
        }),
        defineField({
          name: "route",
          title: "Pilih menu dan halaman",
          type: "string",
          components: { input: HomeHeroRouteInput },
          hidden: ({ parent }) => parent?.kind !== "internal",
        }),
        defineField({
          name: "url",
          title: "URL eksternal",
          type: "url",
          hidden: ({ parent }) => parent?.kind !== "external",
          validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      position: "position",
      title: "eyebrow.id",
      heading: "title.id",
      mediaType: "mediaType",
      image: "image",
    },
    prepare: ({ position, title, heading, mediaType, image }) => ({
      title: `${String(position ?? "?").padStart(2, "0")} — ${title ?? "Slide tanpa nama"}`,
      subtitle: heading ?? (mediaType === "video" ? "Video" : "Gambar"),
      media: image,
    }),
  },
})

const initialHeroSlides = [
  {
    position: 1,
    eyebrow: { id: "Petro Anigos", en: "Petro Anigos" },
    progressLabel: { id: "Distribusi andal", en: "Reliable distribution" },
    title: {
      id: "Distributor bahan bakar industri terpercaya di Indonesia.",
      en: "A trusted industrial fuel distributor in Indonesia.",
    },
    description: {
      id: "Melayani kebutuhan distribusi BBM berkualitas untuk kebutuhan industri dengan jangkauan operasional yang terus berkembang.",
      en: "Serving quality fuel distribution needs for industries with a continuously expanding operational reach.",
    },
    mediaType: "image",
    cta: {
      label: { id: "Kenali Produk", en: "Explore Products" },
      kind: "internal",
      route: "/produk/kenali-produk",
    },
  },
  {
    position: 2,
    eyebrow: { id: "Produk Berkualitas", en: "Quality Products" },
    progressLabel: { id: "Produk berkualitas", en: "Quality products" },
    title: {
      id: "Solusi energi yang sesuai dengan kebutuhan bisnis Anda.",
      en: "Energy solutions tailored to your business needs.",
    },
    description: {
      id: "Produk dan layanan Petro Anigos dirancang untuk mendukung kebutuhan operasional dari berbagai skala.",
      en: "Petro Anigos products and services are designed to support operational needs across different scales.",
    },
    mediaType: "image",
    cta: {
      label: { id: "Ajukan Penawaran", en: "Request an Offer" },
      kind: "internal",
      route: "/produk/penawaran",
    },
  },
  {
    position: 3,
    eyebrow: { id: "Distribusi Terpercaya", en: "Trusted Distribution" },
    progressLabel: { id: "Jangkauan luas", en: "Wide-reaching service" },
    title: {
      id: "Dukungan armada untuk distribusi yang aman dan tepat waktu.",
      en: "Fleet support for safe and on-time distribution.",
    },
    description: {
      id: "Didukung pilihan kapasitas armada dan mitra transportir untuk menjangkau kebutuhan distribusi ant wilayah.",
      en: "Supported by flexible fleet capacities and transport partners to reach distribution needs across regions.",
    },
    mediaType: "image",
    cta: {
      label: { id: "Lihat Armada", en: "View Fleet" },
      kind: "internal",
      route: "/produk/armada",
    },
  },
  {
    position: 4,
    eyebrow: { id: "Bersama untuk Masa Depan", en: "Together for the Future" },
    progressLabel: {
      id: "Kemitraan berkelanjutan",
      en: "Sustainable partnerships",
    },
    title: {
      id: "Membangun kemitraan energi yang berkelanjutan.",
      en: "Building sustainable energy partnerships.",
    },
    description: {
      id: "Kami terbuka untuk membangun hubungan bisnis yang profesional, transparan, dan saling menguntungkan.",
      en: "We are open to building professional, transparent, and mutually beneficial business relationships.",
    },
    mediaType: "image",
    cta: {
      label: { id: "Lihat Client", en: "Explore Clients" },
      kind: "internal",
      route: "/tentang-kami/client",
    },
  },
]

const productLogoItem = defineArrayMember({
  name: "productLogoItem",
  title: "Logo Produk",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nama produk",
      type: "localizedHeroText",
    }),
    defineField({
      name: "description",
      title: "Keterangan produk",
      type: "localizedHeroText",
    }),
    defineField({
      name: "logo",
      title: "Logo produk",
      type: "image",
      options: { hotspot: true },
      description:
        "PNG disarankan agar logo tampil jelas. Format gambar lain tetap dapat diterbitkan.",
      fields: [
        defineField({
          name: "alt",
          title: "Teks alternatif",
          type: "string",
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.id",
      image: "logo",
    },
    prepare: ({ title, image }) => ({
      title: title || "Produk tanpa nama",
      media: image,
    }),
  },
})

export const homeHeroEditor = defineType({
  name: "homePage",
  title: "Home Hero",
  type: "document",
  initialValue: {
    heroSlides: initialHeroSlides,
    productShowcase: {
      logoItems: Array.from({ length: 4 }, () => ({})),
    },
  },
  fields: [
    defineField({
      name: "heroSlides",
      title: "Slide Home Hero",
      type: "array",
      of: [heroSlide],
      components: { input: HomeHeroSlidesInput },
      description:
        "Pilih slide dari dropdown untuk membuka dan mengedit nama, judul, subjudul, teks progress, media, dan tombolnya.",
    }),
    defineField({
      name: "productShowcase",
      title: "Logo Produk Beranda",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Judul segmen produk",
          type: "localizedHeroText",
        }),
        defineField({
          name: "description",
          title: "Keterangan segmen produk",
          type: "localizedHeroText",
        }),
        defineField({
          name: "logoItems",
          title: "Empat logo produk",
          type: "array",
          of: [productLogoItem],
          initialValue: Array.from({ length: 4 }, () => ({})),
          validation: (rule) => rule.max(4),
          description:
            "Kelola hingga empat produk. Nama dan keterangan mendukung Bahasa Indonesia dan English. PNG disarankan untuk logo, tetapi format gambar lain tidak menghalangi publikasi.",
        }),
      ],
      initialValue: {
        logoItems: Array.from({ length: 4 }, () => ({})),
      },
    }),
  ],
})
