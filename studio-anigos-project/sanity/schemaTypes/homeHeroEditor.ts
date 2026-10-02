import { defineArrayMember, defineField, defineType } from "sanity"

import { HomeHeroRouteInput } from "../components/HomeHeroRouteInput"
import {
  PageMediaImageInput,
  PageMediaVideoInput,
} from "../components/PageMediaImageInput"
import { HomeHeroSlidesInput } from "../components/HomeHeroSlidesInput"
import {
  maxHomeHeroSlides,
  maxHomeHeroVideoBytes,
} from "../../../shared/sanity-content-contracts"

function getParentMediaType(parent: unknown): string | undefined {
  if (
    typeof parent === "object" &&
    parent !== null &&
    "mediaType" in parent &&
    typeof parent.mediaType === "string"
  ) {
    return parent.mediaType
  }

  return undefined
}

function hasLocalizedValue(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false
  if (!("id" in value) || !("en" in value)) return false

  return [value.id, value.en].some(
    (text) => typeof text === "string" && text.trim().length > 0
  )
}

const heroSlide = defineArrayMember({
  name: "homeHeroSlide",
  title: "Slide Home Hero",
  type: "object",
  fields: [
    defineField({
      name: "isActive",
      title: "Tampilkan slide",
      type: "boolean",
      initialValue: true,
      description:
        "Hanya slide aktif yang ditampilkan di homepage. Slide nonaktif tetap tersimpan di Studio.",
    }),
    defineField({
      name: "position",
      title: "Urutan slide",
      type: "number",
      validation: (rule) =>
        rule.required().integer().min(1).max(maxHomeHeroSlides),
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
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasLocalizedValue(value)
              ? true
              : "Isi judul minimal dalam satu bahasa."
          ),
    }),
    defineField({
      name: "description",
      title: "Subjudul",
      type: "localizedHeroText",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasLocalizedValue(value)
              ? true
              : "Isi subjudul minimal dalam satu bahasa."
          ),
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
      validation: (rule) =>
        rule.custom((image, context) =>
          getParentMediaType(context.parent) === "image" && !image
            ? "Tambahkan gambar untuk slide dengan jenis media gambar."
            : true
        ),
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
      validation: (rule) =>
        rule.custom((video, context) =>
          getParentMediaType(context.parent) === "video" && !video
            ? "Tambahkan video untuk slide dengan jenis media video."
            : true
        ),
      hidden: ({ parent }) => parent?.mediaType !== "video",
      description: `Gunakan video web teroptimasi maksimal ${Math.round(maxHomeHeroVideoBytes / 1024 / 1024)} MiB. Aplikasi menampilkan gambar fallback, bukan mengunduh video yang lebih besar.`,
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
          validation: (rule) =>
            rule
              .required()
              .custom((value) =>
                hasLocalizedValue(value)
                  ? true
                  : "Isi teks tombol minimal dalam satu bahasa."
              ),
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
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "route",
          title: "Pilih menu dan halaman",
          type: "string",
          components: { input: HomeHeroRouteInput },
          hidden: ({ parent }) => parent?.kind !== "internal",
          validation: (rule) =>
            rule.custom((route, context) => {
              const parent = context.parent
              return typeof parent === "object" &&
                parent !== null &&
                "kind" in parent &&
                parent.kind === "internal" &&
                typeof route !== "string"
                ? "Pilih halaman tujuan tombol."
                : true
            }),
        }),
        defineField({
          name: "url",
          title: "URL eksternal",
          type: "url",
          hidden: ({ parent }) => parent?.kind !== "external",
          validation: (rule) =>
            rule.uri({ scheme: ["http", "https"] }).custom((url, context) => {
              const parent = context.parent
              return typeof parent === "object" &&
                parent !== null &&
                "kind" in parent &&
                parent.kind === "external" &&
                typeof url !== "string"
                ? "Masukkan URL eksternal tombol."
                : true
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      position: "position",
      title: "eyebrow.id",
      heading: "title.id",
      isActive: "isActive",
      mediaType: "mediaType",
      image: "image",
    },
    prepare: ({ position, title, heading, isActive, mediaType, image }) => ({
      title: `${String(position ?? "?").padStart(2, "0")} — ${title ?? "Slide tanpa nama"}`,
      subtitle: `${isActive === false ? "Nonaktif" : "Aktif"} · ${heading ?? (mediaType === "video" ? "Video" : "Gambar")}`,
      media: image,
    }),
  },
})

const initialHeroSlides = [
  {
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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

export const homeHeroEditor = defineType({
  name: "homePage",
  title: "Home Hero",
  type: "document",
  initialValue: {
    heroSlides: initialHeroSlides,
  },
  fields: [
    defineField({
      name: "heroSlides",
      title: "Slide Home Hero",
      type: "array",
      of: [heroSlide],
      components: { input: HomeHeroSlidesInput },
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(maxHomeHeroSlides)
          .custom((slides) => {
            if (!Array.isArray(slides)) return true

            const positions = slides
              .map((slide) =>
                typeof slide === "object" &&
                slide !== null &&
                "position" in slide &&
                typeof slide.position === "number"
                  ? slide.position
                  : null
              )
              .filter((position): position is number => position !== null)

            return new Set(positions).size === positions.length
              ? true
              : "Setiap slide harus memiliki urutan yang berbeda."
          }),
      description:
        "Kelola 1–4 slide. Pilih slide dari dropdown untuk mengedit nama, judul, subjudul, teks progress, media, dan tombol. Urutan harus unik.",
    }),
  ],
})
