import {defineField, defineType} from 'sanity'
import {localeField, localeText} from '../../lib/locale'
import {LIMIT} from '../../lib/limits'
import {heroVideoField, mediaField} from '../../lib/media'

/** Daftar ikon yang benar-benar ada di komponen frontend. */
export const ICON_OPTIONS = [
  {title: 'Tetesan bahan bakar', value: 'droplet'},
  {title: 'Truk tangki', value: 'truck'},
  {title: 'Kapal', value: 'ship'},
  {title: 'Peta / lokasi', value: 'map-pin'},
  {title: 'Perisai keselamatan', value: 'shield'},
  {title: 'Daun keberlanjutan', value: 'leaf'},
  {title: 'Jam ketepatan', value: 'clock'},
  {title: 'Jabat tangan', value: 'handshake'},
  {title: 'Dokumen', value: 'file-text'},
  {title: 'Sertifikat', value: 'badge-check'},
  {title: 'Grafik', value: 'chart'},
  {title: 'Orang / tim', value: 'users'},
  {title: 'Bola dunia', value: 'globe'},
  {title: 'Gembok', value: 'lock'},
  {title: 'Bohlam ide', value: 'lightbulb'},
  {title: 'Gerigi operasional', value: 'settings'},
]

const iconField = defineField({
  name: 'icon',
  title: 'Ikon',
  type: 'string',
  options: {list: ICON_OPTIONS},
  validation: (rule) => rule.required(),
})

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

/** Satu slide carousel hero beranda. Gambar atau video. */
export const homeHeroSlide = defineType({
  name: 'homeHeroSlide',
  title: 'Slide hero',
  type: 'object',
  groups: [
    {name: 'text', title: 'Teks', default: true},
    {name: 'media', title: 'Media'},
    {name: 'settings', title: 'Pengaturan'},
  ],
  fields: [
    localeField({
      name: 'eyebrow',
      title: 'Label kecil di atas judul',
      max: LIMIT.eyebrow,
      strict: true,
      group: 'text',
    }),
    localeField({
      name: 'title',
      title: 'Judul slide',
      max: LIMIT.heroTitle,
      strict: true,
      group: 'text',
    }),
    localeText({
      name: 'description',
      title: 'Deskripsi',
      max: LIMIT.heroDescription,
      rows: 3,
      group: 'text',
    }),
    defineField({name: 'cta', title: 'Tombol', type: 'cta', group: 'text'}),
    localeField({
      name: 'progressLabel',
      title: 'Label progress carousel',
      description: 'Teks pendek penanda slide di indikator bawah.',
      max: LIMIT.linkLabel,
      strict: true,
      required: false,
      group: 'text',
    }),
    defineField({
      name: 'mediaType',
      title: 'Jenis media',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Gambar', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      group: 'settings',
    }),
    mediaField({
      name: 'image',
      title: 'Gambar latar',
      preset: 'homeHero',
      required: false,
      group: 'media',
    }),
    heroVideoField('video', 'media'),
    mediaField({
      name: 'videoPoster',
      title: 'Gambar poster video',
      preset: 'homeHero',
      description: 'Tampil sebelum video selesai dimuat. Wajib jika slide memakai video.',
      group: 'media',
    }),
  ],
  validation: (rule) =>
    rule.custom((value: Record<string, unknown> | undefined) => {
      if (!value) return true
      if (value.mediaType === 'video' && !value.video) return 'Slide video butuh file video.'
      if (value.mediaType === 'video' && !value.videoPoster)
        return 'Slide video butuh gambar poster agar tidak kosong saat loading.'
      if (value.mediaType !== 'video' && !value.image) return 'Slide gambar butuh gambar latar.'
      return true
    }),
  preview: {
    select: {title: 'title.id', media: 'image', type: 'mediaType'},
    prepare: ({title, media, type}) => ({
      title: title || 'Slide tanpa judul',
      subtitle: type === 'video' ? 'Slide video' : 'Slide gambar',
      media,
    }),
  },
})

/** Hero halaman dalam (PageHero). */
export const pageHero = defineType({
  name: 'pageHero',
  title: 'Hero halaman',
  type: 'object',
  fields: [
    localeField({name: 'eyebrow', title: 'Label kecil', max: LIMIT.eyebrow, strict: true}),
    localeField({name: 'title', title: 'Judul', max: LIMIT.heroTitle, strict: true}),
    localeText({name: 'description', title: 'Deskripsi', max: LIMIT.heroDescription, rows: 3}),
    mediaField({name: 'image', title: 'Gambar latar', preset: 'pageHero', required: true}),
  ],
  preview: {
    select: {title: 'title.id', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Hero', subtitle: 'Hero halaman', media}),
  },
})

/* ------------------------------------------------------------------ */
/* SECTION TEKS                                                        */
/* ------------------------------------------------------------------ */

/** Pengantar/intro section: eyebrow, judul, lead, body opsional. */
export const introSection = defineType({
  name: 'introSection',
  title: 'Pengantar',
  type: 'object',
  fields: [
    localeField({
      name: 'eyebrow',
      title: 'Label kecil',
      max: LIMIT.eyebrow,
      strict: true,
      required: false,
    }),
    localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
    localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
    localeText({
      name: 'body',
      title: 'Paragraf pendukung',
      max: LIMIT.bodySupport,
      rows: 5,
      required: false,
    }),
  ],
  preview: {
    select: {title: 'title.id'},
    prepare: ({title}) => ({title: title || 'Pengantar', subtitle: 'Section teks'}),
  },
})

/** FeatureImageSection: teks di atas gambar full-bleed, maksimal 2 tombol. */
export const featureSection = defineType({
  name: 'featureSection',
  title: 'Section gambar penuh',
  type: 'object',
  fields: [
    localeField({name: 'eyebrow', title: 'Label kecil', max: LIMIT.eyebrow, strict: true}),
    localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
    localeText({name: 'description', title: 'Deskripsi', max: LIMIT.sectionLead, rows: 3}),
    defineField({
      name: 'actions',
      title: 'Tombol',
      type: 'array',
      of: [{type: 'cta'}],
      validation: (rule) => rule.max(2).warning('Layout hanya menampung 2 tombol berdampingan.'),
    }),
    mediaField({
      name: 'image',
      title: 'Gambar latar',
      preset: 'featureFullBleed',
      required: true,
    }),
  ],
  preview: {
    select: {title: 'title.id', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Section gambar', media}),
  },
})

/** Panel prinsip: satu blok gelap berisi heading + body panjang. */
export const principlePanel = defineType({
  name: 'principlePanel',
  title: 'Panel prinsip',
  type: 'object',
  fields: [
    localeField({name: 'title', title: 'Judul panel', max: LIMIT.sectionTitleShort, strict: true}),
    localeText({name: 'body', title: 'Isi panel', max: LIMIT.bodyPanel, rows: 5}),
  ],
  preview: {
    select: {title: 'title.id'},
    prepare: ({title}) => ({title: title || 'Panel', subtitle: 'Panel prinsip'}),
  },
})

/** Blok CTA penutup halaman. */
export const ctaPanel = defineType({
  name: 'ctaPanel',
  title: 'Panel ajakan',
  type: 'object',
  fields: [
    localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitleShort, strict: true}),
    localeText({name: 'body', title: 'Kalimat pendukung', max: LIMIT.cardBody, rows: 2}),
    defineField({
      name: 'actions',
      title: 'Tombol',
      type: 'array',
      of: [{type: 'cta'}],
      validation: (rule) => rule.min(1).max(2),
    }),
  ],
  preview: {
    select: {title: 'title.id'},
    prepare: ({title}) => ({title: title || 'Panel ajakan', subtitle: 'CTA penutup'}),
  },
})

/* ------------------------------------------------------------------ */
/* CARD                                                                */
/* ------------------------------------------------------------------ */

/** Card ikon standar. Dipakai topik, prinsip, benefit, kapabilitas. */
export const iconCard = defineType({
  name: 'iconCard',
  title: 'Card ikon',
  type: 'object',
  fields: [
    iconField,
    localeField({name: 'title', title: 'Judul card', max: LIMIT.cardTitle, strict: true}),
    localeText({name: 'body', title: 'Deskripsi', max: LIMIT.cardBody, rows: 3}),
  ],
  preview: {
    select: {title: 'title.id', subtitle: 'body.id'},
    prepare: ({title, subtitle}) => ({title: title || 'Card', subtitle}),
  },
})

/** Card ikon ringkas untuk grid 3 kolom yang padat. */
export const compactCard = defineType({
  name: 'compactCard',
  title: 'Card ringkas',
  type: 'object',
  fields: [
    iconField,
    localeField({name: 'title', title: 'Judul card', max: LIMIT.cardTitleCompact, strict: true}),
    localeText({name: 'body', title: 'Deskripsi', max: LIMIT.cardBody, rows: 3}),
  ],
  preview: {
    select: {title: 'title.id', subtitle: 'body.id'},
    prepare: ({title, subtitle}) => ({title: title || 'Card', subtitle}),
  },
})

/** Card dengan thumbnail 3:2 dan link keluar. */
export const resourceCard = defineType({
  name: 'resourceCard',
  title: 'Card resource',
  type: 'object',
  fields: [
    localeField({name: 'title', title: 'Judul', max: LIMIT.cardTitle, strict: true}),
    localeText({name: 'description', title: 'Deskripsi', max: LIMIT.cardBody, rows: 3}),
    mediaField({name: 'thumbnail', title: 'Thumbnail', preset: 'resourceThumbnail', required: true}),
    defineField({name: 'link', title: 'Tautan', type: 'cta'}),
  ],
  preview: {
    select: {title: 'title.id', media: 'thumbnail'},
    prepare: ({title, media}) => ({title: title || 'Resource', media}),
  },
})

/** Langkah bernomor. Urutan mengikuti posisi di array. */
export const numberedStep = defineType({
  name: 'numberedStep',
  title: 'Langkah',
  type: 'object',
  fields: [
    localeField({name: 'title', title: 'Judul langkah', max: LIMIT.cardTitle, strict: true}),
    localeText({name: 'body', title: 'Penjelasan', max: LIMIT.cardBody, rows: 3}),
  ],
  preview: {
    select: {title: 'title.id'},
    prepare: ({title}) => ({title: title || 'Langkah'}),
  },
})

/** Blok statistik: angka + label + keterangan. */
export const statBlock = defineType({
  name: 'statBlock',
  title: 'Statistik',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Angka',
      type: 'string',
      description: `Termasuk satuan dan simbol. Contoh: "12 kota", "99,8%". Maksimal ${LIMIT.statValue} karakter agar tidak turun baris.`,
      validation: (rule) => rule.required().max(LIMIT.statValue),
    }),
    localeField({name: 'label', title: 'Label', max: LIMIT.statLabel, strict: true}),
    localeText({
      name: 'description',
      title: 'Keterangan',
      max: LIMIT.statDescription,
      rows: 2,
      required: false,
    }),
  ],
  preview: {
    select: {value: 'value', label: 'label.id'},
    prepare: ({value, label}) => ({title: `${value ?? '—'} · ${label ?? ''}`}),
  },
})
