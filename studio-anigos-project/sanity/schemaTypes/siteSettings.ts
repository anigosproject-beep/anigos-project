import { defineField, defineType } from "sanity"

import { ThemeColorInput } from "../components/ThemeColorInput"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Dukungan",
  type: "document",
  fields: [
    defineField({
      name: "uiTheme",
      title: "Warna aplikasi",
      type: "object",
      fields: [
        defineField({
          name: "baseColor",
          title: "Warna dasar",
          type: "string",
          initialValue: "#0f0f0f",
          components: { input: ThemeColorInput },
          description:
            "Warna ini diterapkan sebagai warna dasar aplikasi dan warna utama tombol/aksen. Masukkan nilai HEX 6 digit.",
          validation: (rule) =>
            rule.required().regex(/^#[0-9a-f]{6}$/i, {
              name: "kode warna HEX",
              invert: false,
            }),
        }),
      ],
    }),
  ],
})
