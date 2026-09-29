import {defineField, defineType} from 'sanity'
import {localeField, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'
import {mediaField} from '../../../lib/media'

/**
 * Produk.
 *
 * Satu dokumen dipakai ulang di beranda, kenali produk, dan form penawaran.
 * Mengedit sekali di sini mengubah semua tempat yang memakainya.
 */
export const product = defineType({
  name: 'product',
  title: 'Produk',
  type: 'document',
  groups: [
    {name: 'content', title: 'Konten', default: true},
    {name: 'technical', title: 'Data teknis'},
  ],
  fields: [
    localeField({
      name: 'name',
      title: 'Nama produk',
      max: LIMIT.productName,
      strict: true,
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'technical',
      readOnly: ({document}) => Boolean(document?._createdAt),
      description: 'Identifier teknis. Jangan diterjemahkan atau diubah setelah dipublikasikan.',
      options: {source: 'name.id', maxLength: 48},
      validation: (rule) => rule.required(),
    }),
    localeText({
      name: 'description',
      title: 'Deskripsi',
      max: LIMIT.heroDescription,
      rows: 4,
      group: 'content',
    }),
    mediaField({
      name: 'artwork',
      title: 'Artwork produk',
      preset: 'productArtwork',
      required: true,
      group: 'content',
      description: 'Latar transparan. Asset ini tidak pernah dipotong.',
    }),
    defineField({
      name: 'specs',
      title: 'Spesifikasi',
      type: 'array',
      group: 'technical',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            localeField({name: 'label', title: 'Label', max: LIMIT.statLabel, strict: true}),
            defineField({
              name: 'value',
              title: 'Nilai',
              type: 'string',
              description: 'Angka dan satuan tidak diterjemahkan.',
              validation: (rule) => rule.required().max(40),
            }),
          ],
          preview: {select: {title: 'label.id', subtitle: 'value'}},
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'availableForQuote',
      title: 'Tampil di form penawaran',
      type: 'boolean',
      group: 'technical',
      initialValue: true,
    }),
    defineField({name: 'cta', title: 'Tombol', type: 'cta', group: 'content'}),
  ],
  preview: {
    select: {title: 'name.id', subtitle: 'slug.current', media: 'artwork'},
  },
})

/** Varian kapasitas armada. */
export const fleetVariant = defineType({
  name: 'fleetVariant',
  title: 'Varian kapasitas armada',
  type: 'document',
  fields: [
    defineField({
      name: 'capacity',
      title: 'Kapasitas',
      type: 'string',
      description: 'Contoh: 5.000 liter. Angka kapasitas tidak diterjemahkan.',
      validation: (rule) => rule.required().max(LIMIT.statLabel),
    }),
    localeField({
      name: 'label',
      title: 'Label selector',
      description: 'Teks pendek di tombol pemilih kapasitas.',
      max: LIMIT.statLabel,
      strict: true,
    }),
    localeText({name: 'summary', title: 'Ringkasan', max: LIMIT.cardBody, rows: 3}),
    mediaField({name: 'photo', title: 'Foto armada', preset: 'fleetPhoto', required: true}),
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
      description: 'Angka kecil tampil lebih dulu.',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {name: 'byOrder', title: 'Urutan tampil', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'capacity', subtitle: 'label.id', media: 'photo'},
  },
})

/** Kota / wilayah layanan. */
export const coverageArea = defineType({
  name: 'coverageArea',
  title: 'Area layanan',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'Nama kota / wilayah',
      type: 'string',
      description: `Nama tempat tidak diterjemahkan. Maksimal ${LIMIT.cityName} karakter.`,
      validation: (rule) => rule.required().max(LIMIT.cityName),
    }),
    defineField({
      name: 'province',
      title: 'Provinsi',
      type: 'string',
      validation: (rule) => rule.max(LIMIT.cityName),
    }),
    localeText({name: 'body', title: 'Keterangan layanan', max: LIMIT.cardBodyCoverage, rows: 3}),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      initialValue: 'map-pin',
    }),
    defineField({
      name: 'active',
      title: 'Sedang dilayani',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [{name: 'byCity', title: 'Nama kota', by: [{field: 'city', direction: 'asc'}]}],
  preview: {
    select: {title: 'city', subtitle: 'province'},
  },
})

/** Mitra / partnership. */
export const partnership = defineType({
  name: 'partnership',
  title: 'Mitra',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama mitra',
      type: 'string',
      description: 'Nama brand tidak diterjemahkan.',
      validation: (rule) => rule.required().max(LIMIT.cardTitle),
    }),
    localeText({name: 'body', title: 'Cerita kemitraan', max: LIMIT.sectionLead, rows: 4}),
    mediaField({
      name: 'image',
      title: 'Visual kemitraan',
      preset: 'showcaseSquare',
      required: true,
    }),
    defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
  ],
  preview: {select: {title: 'name', media: 'image'}},
})
