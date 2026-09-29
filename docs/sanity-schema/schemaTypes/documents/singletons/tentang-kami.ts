import {defineField} from 'sanity'
import {definePage, ROUTES} from '../../../lib/page'
import {localeField, localeParagraphs, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'
import {mediaField} from '../../../lib/media'

/* ------------------------------------------------------------------ */
/* 13 — Profil Perusahaan                                              */
/* ------------------------------------------------------------------ */

export const profilPerusahaanPage = definePage({
  name: 'profilPerusahaanPage',
  title: 'Profil Perusahaan',
  route: ROUTES.profilPerusahaan,
  subtitle: 'Sejarah, prinsip kerja, dan fakta perusahaan',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'intro',
      title: 'Pengenalan perusahaan',
      type: 'introSection',
      group: 'content',
    } as never),

    defineField({
      name: 'feature',
      title: 'Feature perusahaan',
      type: 'featureSection',
      group: 'content',
      options: {collapsible: true},
    } as never),

    defineField({
      name: 'principles',
      title: 'Prinsip kerja',
      type: 'array',
      group: 'content',
      of: [{type: 'iconCard'}],
      validation: (rule) => rule.min(3).max(6),
    } as never),

    defineField({
      name: 'facts',
      title: 'Fakta perusahaan',
      type: 'array',
      group: 'content',
      description: 'Angka penting. Grid nyaman di 3 atau 4 blok.',
      of: [{type: 'statBlock'}],
      validation: (rule) => rule.min(3).max(4),
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 14 — Harapan & Cita-Cita                                            */
/* ------------------------------------------------------------------ */

export const harapanCitaCitaPage = definePage({
  name: 'harapanCitaCitaPage',
  title: 'Harapan & Cita-Cita',
  route: ROUTES.harapanCitaCita,
  subtitle: 'Aspirasi, standar perusahaan, empat komitmen',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'aspiration',
      title: 'Intro aspirasi',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeParagraphs({
          name: 'paragraphs',
          title: 'Paragraf konteks',
          max: LIMIT.bodySupport,
          min: 2,
          maxItems: 2,
          description: 'Tepat dua paragraf.',
        }),
      ],
    } as never),

    mediaField({
      name: 'pattern',
      title: 'Pattern visual aspirasi',
      preset: 'decorativePattern',
      allowSvg: true,
      decorative: true,
      group: 'content',
      description: 'Dekoratif, tanpa teks. Dirender object-contain.',
    }),

    defineField({
      name: 'standards',
      title: 'Standar perusahaan',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitleShort, strict: true}),
        localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
        defineField({name: 'panel', title: 'Panel gelap', type: 'principlePanel'}),
      ],
    } as never),

    defineField({
      name: 'commitments',
      title: 'Komitmen',
      type: 'array',
      group: 'content',
      description: 'Tepat 4 card — layout dua baris dua kolom.',
      of: [{type: 'iconCard'}],
      validation: (rule) => rule.required().length(4).error('Section komitmen memakai tepat 4 card.'),
    } as never),

    defineField({
      name: 'closing',
      title: 'Penutup',
      type: 'object',
      group: 'closing',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
        localeText({name: 'body', title: 'Paragraf', max: LIMIT.bodyPanel, rows: 4}),
        defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
      ],
    } as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 15 — Kemitraan                                                      */
/* ------------------------------------------------------------------ */

export const kemitraanPage = definePage({
  name: 'kemitraanPage',
  title: 'Kemitraan',
  route: ROUTES.kemitraan,
  subtitle: 'Nilai, showcase, dan proses kemitraan',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'intro',
      title: 'Pengantar',
      type: 'introSection',
      group: 'content',
    } as never),

    defineField({
      name: 'showcase',
      title: 'Partnership showcase',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: [{type: 'partnership'}]}],
      validation: (rule) => rule.min(1).unique(),
    } as never),

    defineField({
      name: 'process',
      title: 'Proses & persyaratan',
      type: 'array',
      group: 'content',
      of: [{type: 'numberedStep'}],
      validation: (rule) => rule.min(2).max(6),
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 16 — Legalitas                                                      */
/* ------------------------------------------------------------------ */

export const legalitasPage = definePage({
  name: 'legalitasPage',
  title: 'Legalitas',
  route: ROUTES.legalitas,
  subtitle: 'Highlight legal, daftar dokumen, pernyataan kepatuhan',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'highlights',
      title: 'Legal highlights',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'legalHighlight',
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
              max: LIMIT.cardTitleMedium,
              strict: true,
            }),
            localeText({name: 'body', title: 'Deskripsi', max: LIMIT.cardBody, rows: 3}),
          ],
          preview: {select: {title: 'title.id'}},
        },
      ],
      validation: (rule) => rule.min(2).max(6),
    } as never),

    defineField({
      name: 'documents',
      title: 'Dokumen legal',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: [{type: 'legalDocument'}]}],
      validation: (rule) => rule.min(1).unique(),
    } as never),

    defineField({
      name: 'statement',
      title: 'Pernyataan legal',
      type: 'object',
      group: 'closing',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.bodyPanel, rows: 5}),
      ],
    } as never),

    defineField({
      name: 'closingLinks',
      title: 'Tautan lanjutan',
      type: 'array',
      group: 'closing',
      of: [{type: 'cta'}],
      validation: (rule) => rule.max(2),
    } as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 17 — Karir                                                          */
/* ------------------------------------------------------------------ */

export const karirPage = definePage({
  name: 'karirPage',
  title: 'Karir',
  route: ROUTES.karir,
  subtitle: 'Employer brand, benefit, lowongan aktif',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'workingValues',
      title: 'Nilai bekerja',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul section', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 4}),
        defineField({name: 'panel', title: 'Panel gelap', type: 'principlePanel'}),
      ],
    } as never),

    defineField({
      name: 'benefits',
      title: 'Benefit',
      type: 'array',
      group: 'content',
      description:
        'Purpose, culture, learning, safety, collaboration, growth. Tepat 6 card — grid 3x2.',
      of: [{type: 'iconCard'}],
      validation: (rule) => rule.required().length(6).error('Section benefit memakai tepat 6 card.'),
    } as never),

    defineField({
      name: 'openingsIntro',
      title: 'Judul section lowongan',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({
          name: 'emptyState',
          title: 'Teks saat tidak ada lowongan',
          max: LIMIT.cardBody,
          rows: 2,
        }),
      ],
    } as never),

    defineField({
      name: 'applyCta',
      title: 'Label tombol lamar',
      type: 'object',
      group: 'closing',
      description: 'Tombol ini otomatis membawa slug posisi ke form lamaran.',
      fields: [
        localeField({name: 'label', title: 'Label', max: LIMIT.cta, strict: true}),
      ],
    } as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 18 — Form Lamaran                                                   */
/* ------------------------------------------------------------------ */

export const lamaranPage = definePage({
  name: 'lamaranPage',
  title: 'Form Lamaran',
  route: ROUTES.lamaran,
  subtitle: 'Salinan teks form lamaran kerja',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'applicantFields',
      title: 'Identitas pelamar',
      type: 'array',
      group: 'content',
      description: 'Nama lengkap, email, nomor telepon.',
      of: [
        {
          type: 'object',
          name: 'applicantField',
          fields: [
            defineField({
              name: 'key',
              title: 'Nama field di kode',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            localeField({name: 'label', title: 'Label', max: LIMIT.formLabel, strict: true}),
            localeField({
              name: 'placeholder',
              title: 'Placeholder',
              max: LIMIT.formPlaceholder,
              strict: true,
              required: false,
            }),
          ],
          preview: {select: {title: 'label.id', subtitle: 'key'}},
        },
      ],
      validation: (rule) => rule.length(3),
    } as never),

    defineField({
      name: 'positionField',
      title: 'Pilihan posisi',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'label', title: 'Label', max: LIMIT.formLabel, strict: true}),
        localeField({
          name: 'placeholder',
          title: 'Teks pilihan kosong',
          max: LIMIT.formOption,
          strict: true,
        }),
      ],
    } as never),

    defineField({
      name: 'messageField',
      title: 'Pesan singkat',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'label', title: 'Label', max: LIMIT.formLabel, strict: true}),
        localeText({name: 'helper', title: 'Teks bantuan', max: LIMIT.formHelper, rows: 2}),
      ],
    } as never),

    defineField({
      name: 'uploadField',
      title: 'Unggah CV',
      type: 'object',
      group: 'content',
      description: 'Batas teknis PDF/DOC/DOCX maksimal 5 MB diatur di kode, bukan di sini.',
      fields: [
        localeField({name: 'label', title: 'Label', max: LIMIT.formLabel, strict: true}),
        localeText({
          name: 'instruction',
          title: 'Instruksi unggah',
          max: LIMIT.formInstruction,
          rows: 3,
        }),
        localeText({name: 'error', title: 'Pesan error unggah', max: LIMIT.formError, rows: 2}),
        localeField({
          name: 'removeLabel',
          title: 'Label hapus file',
          max: LIMIT.ariaLabel,
          strict: true,
        }),
      ],
    } as never),

    defineField({
      name: 'submit',
      title: 'Tombol & status kirim',
      type: 'object',
      group: 'closing',
      fields: [
        localeField({name: 'label', title: 'Label tombol', max: LIMIT.cta, strict: true}),
        localeField({name: 'sending', title: 'Sedang mengirim', max: LIMIT.formStatus, strict: true}),
        localeText({name: 'success', title: 'Pesan berhasil', max: LIMIT.formStatus, rows: 2}),
        localeText({name: 'failure', title: 'Pesan gagal', max: LIMIT.formError, rows: 2}),
      ],
    } as never),
  ],
})
