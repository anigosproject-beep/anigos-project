import {defineField, defineType} from 'sanity'
import type {FieldDefinition, FieldGroupDefinition} from 'sanity'

/**
 * Tab yang sama di setiap halaman, supaya editor selalu menemukan hal yang
 * sama di tempat yang sama.
 */
export const PAGE_GROUPS: FieldGroupDefinition[] = [
  {name: 'hero', title: 'Hero', default: true},
  {name: 'content', title: 'Isi halaman'},
  {name: 'closing', title: 'Penutup'},
  {name: 'seo', title: 'SEO'},
]

/**
 * Field dasar setiap halaman: identitas (route + breadcrumb) dan SEO.
 * `route` dikunci agar CMS tidak pernah mengubah URL yang dirender kode.
 */
export function pageBaseFields(route: string): FieldDefinition[] {
  return [
    defineField({
      name: 'meta',
      title: 'Identitas halaman',
      type: 'pageMeta',
      group: 'hero',
      initialValue: {route},
      validation: (rule) => rule.required(),
    } as never),
    defineField({
      name: 'seo',
      title: 'SEO & berbagi tautan',
      type: 'seo',
      group: 'seo',
    } as never),
  ]
}

type PageOptions = {
  name: string
  title: string
  route: string
  /** field spesifik halaman, sudah termasuk group-nya masing-masing */
  fields: FieldDefinition[]
  /** subtitle di daftar dokumen */
  subtitle?: string
}

/** Membuat satu dokumen singleton halaman. */
export function definePage(opts: PageOptions) {
  const {name, title, route, fields, subtitle} = opts

  return defineType({
    name,
    title,
    type: 'document',
    groups: PAGE_GROUPS,
    fields: [...pageBaseFields(route), ...fields],
    preview: {
      prepare: () => ({title, subtitle: subtitle ?? route}),
    },
  } as never)
}

/** Daftar seluruh route halaman, dipakai struktur desk dan validasi CTA. */
export const ROUTES = {
  home: '/',
  jangkauan: '/jangkauan',
  keberlanjutan: '/keberlanjutan',
  energiBerkelanjutan: '/keberlanjutan/energi-berkelanjutan',
  kemitraanTataKelola: '/keberlanjutan/kemitraan-tata-kelola',
  keselamatanOperasional: '/keberlanjutan/keselamatan-operasional',
  kenaliProduk: '/produk/kenali-produk',
  armada: '/produk/armada',
  penawaran: '/produk/penawaran',
  ajukanPenawaran: '/produk/penawaran/ajukan',
  profilPerusahaan: '/tentang-kami/profil-perusahaan',
  harapanCitaCita: '/tentang-kami/harapan-cita-cita',
  kemitraan: '/tentang-kami/kemitraan',
  legalitas: '/tentang-kami/legalitas',
  karir: '/tentang-kami/karir',
  lamaran: '/tentang-kami/karir/lamar',
  kebijakanData: '/kebijakan-data',
  ketentuanCookies: '/ketentuan-cookies',
} as const

export const ROUTE_OPTIONS = [
  {title: 'Beranda', value: ROUTES.home},
  {title: 'Jangkauan', value: ROUTES.jangkauan},
  {title: 'Keberlanjutan', value: ROUTES.keberlanjutan},
  {title: 'Energi Berkelanjutan', value: ROUTES.energiBerkelanjutan},
  {title: 'Kemitraan & Tata Kelola', value: ROUTES.kemitraanTataKelola},
  {title: 'Keselamatan Operasional', value: ROUTES.keselamatanOperasional},
  {title: 'Kenali Produk', value: ROUTES.kenaliProduk},
  {title: 'Armada', value: ROUTES.armada},
  {title: 'Penawaran', value: ROUTES.penawaran},
  {title: 'Ajukan Penawaran', value: ROUTES.ajukanPenawaran},
  {title: 'Profil Perusahaan', value: ROUTES.profilPerusahaan},
  {title: 'Harapan & Cita-Cita', value: ROUTES.harapanCitaCita},
  {title: 'Kemitraan', value: ROUTES.kemitraan},
  {title: 'Legalitas', value: ROUTES.legalitas},
  {title: 'Karir', value: ROUTES.karir},
  {title: 'Form Lamaran', value: ROUTES.lamaran},
  {title: 'Kebijakan Data', value: ROUTES.kebijakanData},
  {title: 'Ketentuan Cookies', value: ROUTES.ketentuanCookies},
] as const
