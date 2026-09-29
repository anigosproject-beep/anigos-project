import {defineField} from 'sanity'
import {definePage, ROUTES} from '../../../lib/page'
import {localeField, localeParagraphs, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'

/* ------------------------------------------------------------------ */
/* 7 — Kebijakan Data                                                  */
/* ------------------------------------------------------------------ */

export const kebijakanDataPage = definePage({
  name: 'kebijakanDataPage',
  title: 'Kebijakan Data',
  route: ROUTES.kebijakanData,
  subtitle: 'Prinsip dan detail perlindungan data',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'summary',
      title: 'Ringkasan kebijakan',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'badge', title: 'Badge', max: LIMIT.badge, strict: true}),
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
      ],
    } as never),

    defineField({
      name: 'policies',
      title: 'Prinsip kebijakan',
      type: 'array',
      group: 'content',
      description: 'Satu card per prinsip. Card kebijakan boleh sampai 300 karakter.',
      of: [
        {
          type: 'object',
          name: 'policyCard',
          fields: [
            localeField({name: 'title', title: 'Judul', max: LIMIT.cardTitle, strict: true}),
            localeText({name: 'body', title: 'Isi', max: LIMIT.cardBodyLegal, rows: 5}),
          ],
          preview: {select: {title: 'title.id'}},
        },
      ],
      validation: (rule) => rule.min(3).max(8),
    } as never),

    defineField({
      name: 'details',
      title: 'Detail kebijakan',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeParagraphs({
          name: 'paragraphs',
          title: 'Paragraf penjelasan',
          max: LIMIT.legalParagraph,
          min: 1,
          maxItems: 8,
        }),
      ],
    } as never),

    defineField({
      name: 'update',
      title: 'Status pembaruan',
      type: 'object',
      group: 'closing',
      fields: [
        defineField({
          name: 'effectiveDate',
          title: 'Berlaku sejak',
          type: 'date',
          options: {dateFormat: 'D MMMM YYYY'},
          validation: (rule) => rule.required(),
        }),
        localeText({
          name: 'statement',
          title: 'Pernyataan pembaruan',
          max: LIMIT.statement,
          rows: 4,
        }),
        defineField({name: 'link', title: 'Tautan', type: 'cta'}),
      ],
    } as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 8 — Ketentuan Cookies                                               */
/* ------------------------------------------------------------------ */

export const ketentuanCookiesPage = definePage({
  name: 'ketentuanCookiesPage',
  title: 'Ketentuan Cookies',
  route: ROUTES.ketentuanCookies,
  subtitle: 'Jenis cookie, retensi, dan pembaruan ketentuan',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'summary',
      title: 'Ringkasan cookies',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'badge', title: 'Badge', max: LIMIT.badge, strict: true}),
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'body', title: 'Penjelasan', max: LIMIT.sectionLead, rows: 3}),
      ],
    } as never),

    defineField({
      name: 'cookieTypes',
      title: 'Jenis cookies',
      type: 'array',
      group: 'content',
      description: 'Tepat 3 card: necessary, preference, analytics/advertising.',
      of: [
        {
          type: 'object',
          name: 'cookieType',
          fields: [
            defineField({
              name: 'key',
              title: 'Kategori teknis',
              type: 'string',
              description: 'Dipakai banner consent. Jangan diterjemahkan.',
              options: {
                list: [
                  {title: 'Necessary', value: 'necessary'},
                  {title: 'Preference', value: 'preference'},
                  {title: 'Analytics & advertising', value: 'analytics'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            localeField({name: 'title', title: 'Judul', max: LIMIT.cardTitle, strict: true}),
            localeText({name: 'body', title: 'Penjelasan', max: LIMIT.cardBodyComplex, rows: 4}),
            localeField({
              name: 'status',
              title: 'Label status',
              description: 'Contoh: "Selalu aktif".',
              max: LIMIT.cta,
              strict: true,
            }),
          ],
          preview: {select: {title: 'title.id', subtitle: 'key'}},
        },
      ],
      validation: (rule) => rule.required().length(3),
    } as never),

    defineField({
      name: 'retention',
      title: 'Durasi & retensi',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeParagraphs({
          name: 'paragraphs',
          title: 'Paragraf',
          max: LIMIT.cookieParagraph,
          min: 3,
          maxItems: 3,
          description: 'Tepat tiga paragraf: penyimpanan, penghapusan, kontrol pengguna.',
        }),
      ],
    } as never),

    defineField({
      name: 'update',
      title: 'Pembaruan ketentuan',
      type: 'object',
      group: 'closing',
      fields: [
        localeField({name: 'label', title: 'Label update', max: LIMIT.linkLabel, strict: true}),
        localeText({name: 'quote', title: 'Kutipan', max: LIMIT.quote, rows: 4}),
        defineField({name: 'policyLink', title: 'Tautan kebijakan', type: 'cta'}),
      ],
    } as never),
  ],
})
