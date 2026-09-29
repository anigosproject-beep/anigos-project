import {defineField, defineType} from 'sanity'
import {localeField, localeText} from '../../lib/locale'
import {LIMIT} from '../../lib/limits'
import {mediaField} from '../../lib/media'
import {ROUTE_OPTIONS} from '../../lib/page'

/**
 * Tombol / link.
 *
 * `href` sengaja dipisah antara route internal (dropdown terkunci) dan URL
 * eksternal, supaya editor tidak bisa mengetik route yang tidak ada.
 */
export const cta = defineType({
  name: 'cta',
  title: 'Tombol',
  type: 'object',
  fields: [
    localeField({
      name: 'label',
      title: 'Label tombol',
      description: 'Tulis aksinya, bukan "Selengkapnya". Contoh: "Ajukan penawaran".',
      max: LIMIT.cta,
      strict: true,
      required: true,
    }),
    defineField({
      name: 'kind',
      title: 'Tujuan',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          {title: 'Halaman di situs ini', value: 'internal'},
          {title: 'URL luar', value: 'external'},
          {title: 'Anchor di halaman yang sama', value: 'anchor'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'route',
      title: 'Halaman tujuan',
      type: 'string',
      hidden: ({parent}) => parent?.kind !== 'internal',
      options: {list: ROUTE_OPTIONS},
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as {kind?: string})?.kind === 'internal' && !value
            ? 'Pilih halaman tujuan.'
            : true,
        ),
    }),
    defineField({
      name: 'url',
      title: 'URL luar',
      type: 'url',
      hidden: ({parent}) => parent?.kind !== 'external',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
    defineField({
      name: 'anchor',
      title: 'ID anchor',
      type: 'string',
      description: 'Tanpa tanda pagar. Contoh: kontak',
      hidden: ({parent}) => parent?.kind !== 'anchor',
    }),
    defineField({
      name: 'variant',
      title: 'Gaya tombol',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Utama', value: 'primary'},
          {title: 'Sekunder', value: 'secondary'},
          {title: 'Teks saja', value: 'link'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {label: 'label.id', route: 'route', url: 'url', variant: 'variant'},
    prepare: ({label, route, url, variant}) => ({
      title: label || 'Tombol tanpa label',
      subtitle: [variant, route || url].filter(Boolean).join(' · '),
    }),
  },
})

/** Metadata mesin pencari dan pratinjau berbagi tautan. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO & berbagi tautan',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    localeField({
      name: 'metaTitle',
      title: 'Judul di hasil pencarian',
      description: 'Google memotong sekitar 60 karakter.',
      max: LIMIT.seoTitle,
      strict: true,
      required: false,
    }),
    localeText({
      name: 'metaDescription',
      title: 'Deskripsi di hasil pencarian',
      max: LIMIT.seoDescription,
      strict: true,
      required: false,
    }),
    mediaField({
      name: 'ogImage',
      title: 'Gambar pratinjau tautan',
      preset: 'resourceThumbnail',
      description: 'Muncul saat halaman dibagikan di WhatsApp, LinkedIn, atau X.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Sembunyikan dari mesin pencari',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

/**
 * Identitas halaman.
 *
 * `breadcrumbLabel` hanya menyimpan label ruas terakhir. Jalur lengkapnya
 * dibangun frontend dari struktur route, jadi editor tidak pernah bisa
 * membuat breadcrumb yang tidak cocok dengan URL.
 */
export const pageMeta = defineType({
  name: 'pageMeta',
  title: 'Identitas halaman',
  type: 'object',
  fields: [
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
      readOnly: true,
      description: 'Ditetapkan sistem. Mengubah route dilakukan lewat kode, bukan CMS.',
    }),
    localeField({
      name: 'breadcrumbLabel',
      title: 'Label breadcrumb',
      description: 'Nama ruas terakhir saja. Jalur di atasnya dibuat otomatis.',
      max: LIMIT.breadcrumb,
      strict: true,
      required: true,
    }),
    localeField({
      name: 'navLabel',
      title: 'Label di menu navigasi',
      max: LIMIT.linkLabel,
      strict: true,
      required: false,
    }),
  ],
})

/** Catatan pendek tanpa judul: safety note, governance note, availability note. */
export const note = defineType({
  name: 'note',
  title: 'Catatan',
  type: 'object',
  fields: [
    localeText({
      name: 'body',
      title: 'Isi catatan',
      max: LIMIT.note,
      rows: 3,
      required: false,
    }),
  ],
  preview: {
    select: {title: 'body.id'},
    prepare: ({title}) => ({title: title || 'Catatan kosong'}),
  },
})
