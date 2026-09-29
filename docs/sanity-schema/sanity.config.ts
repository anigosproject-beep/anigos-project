import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {languageFilter} from '@sanity/language-filter'

import {schemaTypes, SINGLETON_TYPES} from './schemaTypes'
import {structure} from './structure'
import {LANGUAGES} from './lib/locale'

const singletons = new Set<string>(SINGLETON_TYPES)

export default defineConfig({
  name: 'petro-anigos',
  title: 'Petro Anigos',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',

  plugins: [
    structureTool({structure}),

    /**
     * Tombol bahasa di atas form. Editor bisa menyembunyikan kolom English
     * saat menulis draft Indonesia, lalu menyalakannya untuk terjemahan.
     */
    languageFilter({
      supportedLanguages: LANGUAGES.map((l) => ({id: l.id, title: l.title})),
      defaultLanguages: ['id'],
      documentTypes: schemaTypes.filter((t) => t.type === 'document').map((t) => t.name),
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') ||
        selectedLanguageIds.includes(member.name),
    }),

    /** Media library dengan tag dan pencarian — penting karena asset situs ini banyak. */
    media(),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    /** Singleton tidak boleh dibuat lewat tombol "+" global. */
    templates: (prev) => prev.filter((t) => !singletons.has(t.schemaType)),
  },

  document: {
    /** Singleton tidak bisa dihapus, diduplikasi, atau diubah ID-nya. */
    actions: (prev, {schemaType}) =>
      singletons.has(schemaType)
        ? prev.filter(
            (action) =>
              !['delete', 'duplicate', 'unpublish'].includes(action.action ?? ''),
          )
        : prev,

    /** Tombol pratinjau ke halaman aslinya. */
    productionUrl: async (prev, {document}) => {
      const route = (document as {meta?: {route?: string}}).meta?.route
      if (!route) return prev
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      return `${base}/api/draft?slug=${encodeURIComponent(route)}`
    },
  },
})
