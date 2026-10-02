import { defineField, defineType } from "sanity"

import { pageVisibilityGroups } from "../../../shared/page-visibility-registry"

export const pageVisibilitySettings = defineType({
  name: "pageVisibilitySettings",
  title: "Pengaturan Halaman",
  type: "document",
  fields: [
    defineField({
      name: "groups",
      title: "Menu situs",
      type: "object",
      fields: pageVisibilityGroups.map((group) =>
        defineField({
          name: group.key,
          title: group.title,
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: group.pages.map((page) =>
            defineField({
              name: page.key,
              title: page.title,
              type: "boolean",
              initialValue: true,
              description: `Aktifkan untuk menampilkan halaman di situs: ${page.path}`,
            })
          ),
        })
      ),
    }),
  ],
  initialValue: {
    groups: Object.fromEntries(
      pageVisibilityGroups.map((group) => [
        group.key,
        Object.fromEntries(group.pages.map((page) => [page.key, true])),
      ])
    ),
  },
})
