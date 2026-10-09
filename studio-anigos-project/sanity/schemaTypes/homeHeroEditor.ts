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
  recommendedHomeHeroVideoBytes,
} from "../../../shared/sanity-content-contracts"
import { getAllowedHomeHeroEmbedUrl } from "../../../shared/sanity-home-hero-embed"

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

function getParentPosition(parent: unknown): number | undefined {
  if (
    typeof parent === "object" &&
    parent !== null &&
    "position" in parent &&
    typeof parent.position === "number"
  ) {
    return parent.position
  }

  return undefined
}

function getParentVideoEmbedUrl(parent: unknown): string | undefined {
  if (
    typeof parent !== "object" ||
    parent === null ||
    !("position" in parent) ||
    parent.position !== 1 ||
    !("videoEmbedUrl" in parent)
  ) {
    return undefined
  }

  return getAllowedHomeHeroEmbedUrl(parent.videoEmbedUrl)
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
          type: "localizedMediaText",
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
          getParentMediaType(context.parent) === "video" &&
          !video &&
          !getParentVideoEmbedUrl(context.parent)
            ? "Tambahkan video atau URL embed valid untuk slide video."
            : true
        ),
      hidden: ({ parent }) => parent?.mediaType !== "video",
      description: `Video sampai ${Math.round(maxHomeHeroVideoBytes / 1024 / 1024)} MiB dapat diputar. Maksimal ${Math.round(recommendedHomeHeroVideoBytes / 1024 / 1024)} MiB disarankan agar pemutaran awal cepat.`,
    }),
    defineField({
      name: "videoEmbedUrl",
      title: "URL embed video (khusus slide 1)",
      type: "url",
      hidden: ({ parent }) =>
        parent?.mediaType !== "video" || parent?.position !== 1,
      description:
        "Opsional. URL player embed HTTPS YouTube, YouTube NoCookie, atau Vimeo (bukan markup iframe). Webhook harus menyimpan URL ke field ini; embed hanya ditampilkan jika slide posisi 1 aktif dan terbit.",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value == null || value === "") return true
          if (getParentMediaType(context.parent) !== "video") {
            return "URL embed hanya dapat digunakan pada slide video."
          }
          if (getParentPosition(context.parent) !== 1) {
            return "URL embed hanya dapat digunakan pada slide posisi 1."
          }
          return getAllowedHomeHeroEmbedUrl(value)
            ? true
            : "Gunakan URL embed HTTPS YouTube (/embed/ID), YouTube NoCookie (/embed/ID), atau Vimeo (/video/ID)."
        }),
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
    _key: "hero-primary-video",
    _type: "homeHeroSlide",
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
    mediaType: "video",
    video: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: "file-38459dac5103ee419775644080357842e5c062ed-webm",
      },
    },
    cta: {
      label: { id: "Kenali Produk", en: "Explore Products" },
      kind: "internal",
      route: "/produk/kenali-produk",
    },
  },
  {
    _key: "hero-product-image",
    _type: "homeHeroSlide",
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
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-99da3f440fd50a5aee37eccfa82bd48868480fef-4000x2252-jpg",
      },
    },
    cta: {
      label: { id: "Ajukan Penawaran", en: "Request an Offer" },
      kind: "internal",
      route: "/produk/penawaran",
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
