import { defineField, defineType } from "sanity"
import { mediaLibrarySeed } from "./mediaLibrarySeed"

const groupMeta = {
  hero: {
    key: "homepage",
    label: "Homepage",
    description: "Hero dan media utama untuk halaman depan.",
  },
  pageHero: {
    key: "page-heroes",
    label: "Page heroes",
    description: "Hero untuk halaman internal dan newsroom.",
  },
  sectionBackground: {
    key: "section-backgrounds",
    label: "Section backgrounds",
    description: "Background dan media dekoratif untuk section halaman.",
  },
  card: {
    key: "cards",
    label: "Cards",
    description: "Ilustrasi dan gambar untuk card resource.",
  },
  article: {
    key: "articles",
    label: "Articles",
    description: "Gambar dan ilustrasi untuk artikel newsroom.",
  },
  partnership: {
    key: "partnerships",
    label: "Partnerships",
    description: "Media untuk kemitraan, armada, dan distribusi.",
  },
  team: {
    key: "team",
    label: "Team",
    description: "Portrait dan media struktur perusahaan.",
  },
  pattern: {
    key: "patterns",
    label: "Patterns",
    description: "Pattern, texture, dan elemen dekoratif.",
  },
  brand: {
    key: "brand",
    label: "Brand",
    description: "Logo dan asset identitas brand.",
  },
} as const

const seededGroups = Object.values(groupMeta).map((group) => ({
  ...group,
  items: mediaLibrarySeed
    .filter((item) => groupMeta[item.role].key === group.key)
    .map((item) => ({
      key: item.key,
      label: item.label,
      role: item.role,
      routePaths: item.routePaths,
      publicPath: item.publicPath,
      recommendedPath: item.recommendedPath,
      description: item.description,
      technicalNotes: item.technicalNotes,
    })),
}))

const mediaItemFields = [
  defineField({
    name: "key",
    title: "Media key",
    type: "string",
    description: "Stable identifier used by the application. Use lowercase kebab-case.",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "label",
    title: "Display name",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "role",
    title: "Media role",
    type: "string",
    options: {
      list: [
        { title: "Homepage hero", value: "hero" },
        { title: "Page hero", value: "pageHero" },
        { title: "Section background", value: "sectionBackground" },
        { title: "Card illustration", value: "card" },
        { title: "Article image", value: "article" },
        { title: "Partnership image", value: "partnership" },
        { title: "Team portrait", value: "team" },
        { title: "Pattern / texture", value: "pattern" },
        { title: "Brand asset", value: "brand" },
      ],
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "routePaths",
    title: "Used by routes",
    type: "array",
    of: [{ type: "string" }],
    description: "Route paths where this media appears, for example / and /artikel/anigos-news.",
  }),
  defineField({
    name: "publicPath",
    title: "Current public path",
    type: "string",
    description: "Current local public path kept for migration and fallback reference.",
  }),
  defineField({
    name: "recommendedPath",
    title: "Recommended storage path",
    type: "string",
    description: "Canonical folder/key for the media when it is managed through Sanity.",
  }),
  defineField({
    name: "asset",
    title: "Sanity asset",
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        validation: (rule) => rule.required(),
      }),
    ],
  }),
  defineField({
    name: "description",
    title: "Usage description",
    type: "text",
    rows: 3,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "technicalNotes",
    title: "Technical notes",
    type: "text",
    rows: 3,
    description: "Recommended ratio, minimum dimensions, focal point, and accessibility notes.",
  }),
]

const mediaItem = {
  type: "object",
  fields: mediaItemFields,
  preview: {
    select: { title: "label", subtitle: "publicPath", media: "asset" },
  },
}

export const mediaLibrary = defineType({
  name: "mediaLibrary",
  title: "Media Library",
  type: "document",
  initialValue: {
    title: "Petro Anigos Media Library",
    description:
      "Central catalog for homepage, page hero, section, card, article, partnership, pattern, team, and brand media.",
    groups: seededGroups,
  },
  fields: [
    defineField({
      name: "title",
      title: "Library title",
      type: "string",
      initialValue: "Petro Anigos Media Library",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Library description",
      type: "text",
      rows: 3,
      initialValue:
        "Central catalog for homepage, page hero, section, card, article, partnership, pattern, team, and brand media.",
    }),
    defineField({
      name: "groups",
      title: "Media groups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Group key",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Group name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "description", title: "Group description", type: "text", rows: 2 }),
            defineField({ name: "items", title: "Media items", type: "array", of: [mediaItem] }),
          ],
          preview: { select: { title: "label", subtitle: "key" } },
          options: { collapsible: true },
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
})
