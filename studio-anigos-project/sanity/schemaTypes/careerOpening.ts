import { defineArrayMember, defineField, defineType } from "sanity"

function hasIndonesianText(value: unknown) {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    value.id.trim().length > 0
  )
}

export const careerOpening = defineType({
  name: "careerOpening",
  title: "Lowongan Karir",
  type: "document",
  groups: [
    { name: "details", title: "Informasi Lowongan", default: true },
    { name: "responsibilities", title: "Tanggung Jawab" },
  ],
  fields: [
    defineField({
      name: "isActive",
      title: "Lowongan aktif",
      type: "boolean",
      group: "details",
      initialValue: true,
      description: "Lowongan aktif ditampilkan pada halaman Karir dan form lamaran.",
    }),
    defineField({
      name: "title",
      title: "Nama posisi",
      type: "localizedHeroText",
      group: "details",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasIndonesianText(value)
              ? true
              : "Isi nama posisi dalam Bahasa Indonesia."
          ),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "details",
      options: { source: "title.id", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "department",
      title: "Departemen",
      type: "localizedHeroText",
      group: "details",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasIndonesianText(value)
              ? true
              : "Isi departemen dalam Bahasa Indonesia."
          ),
    }),
    defineField({
      name: "location",
      title: "Lokasi kerja",
      type: "localizedHeroText",
      group: "details",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasIndonesianText(value)
              ? true
              : "Isi lokasi kerja dalam Bahasa Indonesia."
          ),
    }),
    defineField({
      name: "employmentType",
      title: "Jenis pekerjaan",
      type: "localizedHeroText",
      group: "details",
      description: "Contoh: Full-time, Kontrak, atau Magang.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasIndonesianText(value)
              ? true
              : "Isi jenis pekerjaan dalam Bahasa Indonesia."
          ),
    }),
    defineField({
      name: "summary",
      title: "Ringkasan lowongan",
      type: "localizedHeroText",
      group: "details",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            hasIndonesianText(value)
              ? true
              : "Isi ringkasan dalam Bahasa Indonesia."
          ),
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      group: "details",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "responsibilities",
      title: "Daftar tanggung jawab",
      type: "array",
      group: "responsibilities",
      of: [defineArrayMember({ type: "localizedHeroText" })],
      description:
        "Tambahkan tanggung jawab dalam Bahasa Indonesia; terjemahan Inggris bersifat opsional.",
    }),
  ],
  preview: {
    select: {
      title: "title.id",
      department: "department.id",
      isActive: "isActive",
    },
    prepare: ({ title, department, isActive }) => ({
      title: title || "Lowongan tanpa nama",
      subtitle: [department, isActive === false ? "Diarsipkan" : "Aktif"]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
