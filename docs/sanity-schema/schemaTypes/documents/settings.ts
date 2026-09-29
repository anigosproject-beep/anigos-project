import {defineField, defineType} from 'sanity'
import {localeField, localeText} from '../../lib/locale'
import {LIMIT} from '../../lib/limits'
import {mediaField} from '../../lib/media'

/** Identitas perusahaan dan kontak yang dipakai lintas halaman. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Identitas & Kontak',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identitas', default: true},
    {name: 'contact', title: 'Kontak'},
    {name: 'seo', title: 'SEO default'},
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nama perusahaan',
      type: 'string',
      group: 'identity',
      description: 'Nama brand tidak diterjemahkan.',
      validation: (rule) => rule.required().max(60),
    }),
    localeText({
      name: 'tagline',
      title: 'Tagline',
      max: LIMIT.sectionLead,
      rows: 2,
      group: 'identity',
      required: false,
    }),
    mediaField({
      name: 'logo',
      title: 'Logo',
      preset: 'logo',
      allowSvg: true,
      group: 'identity',
      description: 'SVG transparan. Dipakai di header dan footer.',
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telepon',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: 'socials',
      title: 'Media sosial',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          name: 'social',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Instagram', 'LinkedIn', 'YouTube', 'Facebook', 'X', 'TikTok'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO default',
      type: 'seo',
      group: 'seo',
      description: 'Dipakai saat halaman tidak mengisi SEO sendiri.',
    }),
  ],
  preview: {prepare: () => ({title: 'Identitas & Kontak'})},
})

/** Menu header. Kedalaman dibatasi dua tingkat, sesuai komponen navigasi. */
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigasi',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Menu utama',
      type: 'array',
      description: 'Maksimal 6 item tingkat pertama agar header tidak turun baris.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Item menu',
          fields: [
            localeField({name: 'label', title: 'Label', max: LIMIT.linkLabel, strict: true}),
            defineField({name: 'link', title: 'Tujuan', type: 'cta'}),
            defineField({
              name: 'children',
              title: 'Submenu',
              type: 'array',
              description: 'Maksimal 6 submenu per item.',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    localeField({
                      name: 'label',
                      title: 'Label',
                      max: LIMIT.linkLabel,
                      strict: true,
                    }),
                    localeText({
                      name: 'description',
                      title: 'Deskripsi singkat',
                      max: LIMIT.cardBodyCompact,
                      rows: 2,
                      required: false,
                    }),
                    defineField({name: 'link', title: 'Tujuan', type: 'cta'}),
                  ],
                  preview: {select: {title: 'label.id'}},
                },
              ],
              validation: (rule) => rule.max(6),
            }),
          ],
          preview: {
            select: {title: 'label.id', children: 'children'},
            prepare: ({title, children}) => ({
              title: title || 'Item menu',
              subtitle: children?.length ? `${children.length} submenu` : 'Tautan langsung',
            }),
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'headerCta',
      title: 'Tombol di header',
      type: 'cta',
    }),
  ],
  preview: {prepare: () => ({title: 'Navigasi'})},
})

/** Footer: kolom tautan, teks hukum, dan tautan kebijakan. */
export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    localeText({
      name: 'blurb',
      title: 'Paragraf pengantar',
      max: LIMIT.cardBody,
      rows: 3,
      required: false,
    }),
    defineField({
      name: 'columns',
      title: 'Kolom tautan',
      type: 'array',
      description: 'Maksimal 4 kolom, masing-masing maksimal 6 tautan.',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          fields: [
            localeField({name: 'title', title: 'Judul kolom', max: LIMIT.linkLabel, strict: true}),
            defineField({
              name: 'links',
              title: 'Tautan',
              type: 'array',
              of: [{type: 'cta'}],
              validation: (rule) => rule.max(6),
            }),
          ],
          preview: {select: {title: 'title.id'}},
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    localeField({
      name: 'copyright',
      title: 'Teks hak cipta',
      description: 'Tahun ditambahkan otomatis oleh frontend.',
      max: LIMIT.linkLabel,
      strict: true,
      required: false,
    }),
    defineField({
      name: 'legalLinks',
      title: 'Tautan kebijakan',
      type: 'array',
      of: [{type: 'cta'}],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})

/**
 * Banner cookie.
 *
 * Kategori consent harus cocok dengan `cookieTypes` di halaman Ketentuan
 * Cookies, jadi teksnya dikelola bersama di satu dokumen.
 */
export const cookieBanner = defineType({
  name: 'cookieBanner',
  title: 'Banner Cookie',
  type: 'document',
  fields: [
    localeText({name: 'message', title: 'Pesan banner', max: LIMIT.cardBodyComplex, rows: 3}),
    localeField({name: 'acceptLabel', title: 'Tombol terima', max: LIMIT.cta, strict: true}),
    localeField({name: 'rejectLabel', title: 'Tombol tolak', max: LIMIT.cta, strict: true}),
    localeField({name: 'settingsLabel', title: 'Tombol atur', max: LIMIT.cta, strict: true}),
    defineField({name: 'policyLink', title: 'Tautan ketentuan', type: 'cta'}),
  ],
  preview: {prepare: () => ({title: 'Banner Cookie'})},
})
