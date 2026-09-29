import {defineField} from 'sanity'
import {definePage, ROUTES} from '../../../lib/page'
import {localeField, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'

/* ------------------------------------------------------------------ */
/* 2 — Jangkauan                                                       */
/* ------------------------------------------------------------------ */

export const jangkauanPage = definePage({
  name: 'jangkauanPage',
  title: 'Jangkauan',
  route: ROUTES.jangkauan,
  subtitle: 'Wilayah layanan dan kapabilitas distribusi',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'intro',
      title: 'Pengantar coverage',
      type: 'introSection',
      group: 'content',
    } as never),

    defineField({
      name: 'serviceAreas',
      title: 'Area layanan',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul section', max: LIMIT.sectionTitle, strict: true}),
        defineField({
          name: 'areas',
          title: 'Kota / wilayah',
          type: 'array',
          description: 'Pilih dari daftar area layanan. Urutan di sini adalah urutan tampil.',
          of: [{type: 'reference', to: [{type: 'coverageArea'}]}],
          validation: (rule) => rule.min(1).unique(),
        }),
      ],
    } as never),

    defineField({
      name: 'capabilities',
      title: 'Kapabilitas distribusi',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul section', max: LIMIT.sectionTitle, strict: true}),
        defineField({
          name: 'items',
          title: 'Card kapabilitas',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'capability',
              title: 'Kapabilitas',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ikon',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                localeField({
                  name: 'title',
                  title: 'Judul',
                  max: LIMIT.cardTitleCompact,
                  strict: true,
                }),
                localeText({
                  name: 'body',
                  title: 'Deskripsi',
                  max: LIMIT.cardBodyCompact,
                  rows: 3,
                }),
              ],
              preview: {select: {title: 'title.id'}},
            },
          ],
          validation: (rule) => rule.min(3).max(6),
        }),
      ],
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 3–6 — Halaman berbasis CorporateTopicPage                           */
/* ------------------------------------------------------------------ */

/**
 * Keempat halaman ini memakai komponen yang sama di frontend
 * (`CorporateTopicPage`), jadi skemanya juga dibuat dari satu pabrik.
 * Menambah field di sini otomatis berlaku untuk keempatnya.
 */
function topicPage(opts: {
  name: string
  title: string
  route: string
  subtitle: string
  /** label field catatan agar sesuai konteks halaman */
  noteTitle: string
  topicHelp: string
}) {
  return definePage({
    name: opts.name,
    title: opts.title,
    route: opts.route,
    subtitle: opts.subtitle,
    fields: [
      defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

      defineField({
        name: 'intro',
        title: 'Pengantar',
        type: 'object',
        group: 'content',
        fields: [
          localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
          localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
          defineField({name: 'panel', title: 'Panel prinsip', type: 'principlePanel'}),
        ],
      } as never),

      defineField({
        name: 'topics',
        title: 'Topik utama',
        type: 'array',
        group: 'content',
        description: `${opts.topicHelp} Tepat 3 card — grid halaman ini 3 kolom.`,
        of: [{type: 'compactCard'}],
        validation: (rule) =>
          rule.required().length(3).error('Halaman topik memakai tepat 3 card.'),
      } as never),

      defineField({
        name: 'note',
        title: opts.noteTitle,
        type: 'note',
        group: 'content',
      } as never),

      defineField({
        name: 'closing',
        title: 'Panel ajakan',
        type: 'ctaPanel',
        group: 'closing',
      } as never),
    ],
  })
}

export const keberlanjutanPage = topicPage({
  name: 'keberlanjutanPage',
  title: 'Keberlanjutan',
  route: ROUTES.keberlanjutan,
  subtitle: 'Halaman induk keberlanjutan',
  noteTitle: 'Catatan transparansi',
  topicHelp: 'Cleaner energy, operational safety, social contribution.',
})

export const energiBerkelanjutanPage = definePage({
  name: 'energiBerkelanjutanPage',
  title: 'Energi Berkelanjutan',
  route: ROUTES.energiBerkelanjutan,
  subtitle: 'B40, biodiesel, dan spesifikasi',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),
    defineField({
      name: 'intro',
      title: 'Pengantar B40',
      type: 'introSection',
      group: 'content',
    } as never),
    defineField({
      name: 'components',
      title: 'Produk / komponen energi',
      type: 'array',
      group: 'content',
      description: 'Biodiesel 40, Diesel 60, dan spesifikasi. Tepat 3 card.',
      of: [{type: 'compactCard'}],
      validation: (rule) => rule.required().length(3),
    } as never),
    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

export const kemitraanTataKelolaPage = topicPage({
  name: 'kemitraanTataKelolaPage',
  title: 'Kemitraan & Tata Kelola',
  route: ROUTES.kemitraanTataKelola,
  subtitle: 'Relasi, tata kelola, integritas',
  noteTitle: 'Catatan tata kelola',
  topicHelp: 'Good relationships, governance, integrity.',
})

export const keselamatanOperasionalPage = topicPage({
  name: 'keselamatanOperasionalPage',
  title: 'Keselamatan Operasional',
  route: ROUTES.keselamatanOperasional,
  subtitle: 'Accident free, ketepatan, koordinasi rute',
  noteTitle: 'Catatan keselamatan',
  topicHelp: 'Accident free, punctuality, route coordination.',
})
