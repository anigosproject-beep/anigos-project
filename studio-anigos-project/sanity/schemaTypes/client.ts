import { defineArrayMember, defineField, defineType } from "sanity"

const firstClientYear = 1980
const currentYear = new Date().getFullYear()

const serviceOptions = [
  { title: "Solar Industri / HSD", value: "solar-hsd" },
  { title: "Biosolar B35", value: "biosolar-b35" },
  { title: "Biosolar B40", value: "biosolar-b40" },
  { title: "Dexlite", value: "dexlite" },
  { title: "Pertamina Dex", value: "pertamina-dex" },
  { title: "Marine Fuel Oil (MFO)", value: "marine-fuel-oil" },
  { title: "Lainnya", value: "other" },
]

const serviceLabels: Record<string, string> = Object.fromEntries(
  serviceOptions.map(({ value, title }) => [value, title])
)

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  groups: [
    { name: "company", title: "Informasi Client", default: true },
    { name: "services", title: "Layanan" },
    { name: "gallery", title: "Galeri" },
  ],
  fields: [
    defineField({
      name: "sourcePartnerId",
      title: "ID Mitra Sumber",
      type: "string",
      group: "company",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "companyName",
      title: "Nama perusahaan",
      type: "string",
      group: "company",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "company",
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
      name: "location",
      title: "Lokasi",
      type: "localizedHeroText",
      group: "company",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (
            context.document?.sourcePartnerId &&
            (typeof value !== "object" || value === null)
          ) {
            return true
          }
          if (typeof value !== "object" || value === null) {
            return "Lokasi wajib diisi dalam Bahasa Indonesia dan Inggris."
          }
          const location = value as { id?: unknown; en?: unknown }
          return typeof location.id === "string" &&
            location.id.trim() &&
            typeof location.en === "string" &&
            location.en.trim()
            ? true
            : "Lokasi wajib diisi dalam Bahasa Indonesia dan Inggris."
        }),
    }),
    defineField({
      name: "serviceYear",
      title: "Tahun layanan",
      type: "number",
      group: "company",
      options: {
        list: Array.from(
          { length: currentYear - firstClientYear + 1 },
          (_, index) => currentYear - index
        ).map((year) => ({ title: String(year), value: year })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Client aktif",
      type: "boolean",
      group: "company",
      initialValue: true,
      description:
        "Client aktif akan tampil pada portofolio publik. Matikan untuk memindahkannya ke arsip.",
    }),
    defineField({
      name: "services",
      title: "Jenis layanan",
      type: "array",
      group: "services",
      description:
        "Pilih satu atau lebih jenis BBM industri. Pilih Lainnya untuk memasukkan layanan secara manual.",
      of: [
        defineArrayMember({
          name: "clientService",
          title: "Layanan",
          type: "object",
          fields: [
            defineField({
              name: "serviceType",
              title: "Jenis layanan",
              type: "string",
              options: { list: serviceOptions },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "otherService",
              title: "Nama layanan lainnya",
              type: "string",
              hidden: ({ parent }) => parent?.serviceType !== "other",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as
                    | { serviceType?: string }
                    | undefined
                  if (parent?.serviceType !== "other") return true
                  return typeof value === "string" && value.trim()
                    ? true
                    : "Isi nama layanan lainnya."
                }),
            }),
          ],
          preview: {
            select: {
              serviceType: "serviceType",
              otherService: "otherService",
            },
            prepare: ({ serviceType, otherService }) => ({
              title:
                serviceType === "other"
                  ? otherService || "Layanan lainnya"
                  : serviceLabels[serviceType] || "Layanan belum dipilih",
            }),
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!Array.isArray(value) || value.length === 0) {
            return "Pilih minimal satu jenis layanan."
          }
          const selectedTypes = value.map((item) =>
            typeof item === "object" && item !== null && "serviceType" in item
              ? item.serviceType
              : undefined
          )
          if (selectedTypes.some((serviceType) => typeof serviceType !== "string")) {
            return "Pilih jenis layanan untuk setiap item."
          }
          return new Set(selectedTypes).size === selectedTypes.length
            ? true
            : "Jenis layanan yang sama tidak boleh dipilih lebih dari sekali."
        }),
    }),
    defineField({
      name: "gallery",
      title: "Foto galeri",
      type: "array",
      group: "gallery",
      description:
        "Tambahkan beberapa foto. Setiap foto dapat memiliki keterangan sendiri.",
      of: [
        defineArrayMember({
          name: "clientGalleryItem",
          title: "Foto",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Pilih foto",
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
              title: "Keterangan",
              type: "string",
              validation: (rule) => rule.max(160),
            }),
          ],
          preview: {
            select: { title: "caption", alt: "image.alt", media: "image" },
            prepare: ({ title, alt, media }) => ({
              title: title || alt || "Foto client",
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "companyName", isActive: "isActive", media: "logo" },
    prepare: ({ title, isActive, media }) => ({
      title: title || "Client tanpa nama",
      subtitle: isActive ? "Client aktif" : "Arsip client",
      media,
    }),
  },
})
