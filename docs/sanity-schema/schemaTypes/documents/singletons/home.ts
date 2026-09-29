import {defineField} from 'sanity'
import {definePage, ROUTES} from '../../../lib/page'
import {localeField, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'

/**
 * Beranda — `/`
 * Sumber: app/page.tsx, components/sections/home-hero.tsx
 *
 * Urutan segmen dikunci oleh skema, bukan oleh editor. Setiap segmen punya
 * field tetap sehingga halaman tidak mungkin kehilangan struktur.
 */
export const homePage = definePage({
  name: 'homePage',
  title: 'Beranda',
  route: ROUTES.home,
  subtitle: 'Hero carousel, aspirasi, tentang kami, pencapaian, produk, kemitraan, publikasi',
  fields: [
    /* 1 — Hero carousel */
    defineField({
      name: 'heroSlides',
      title: 'Slide hero',
      type: 'array',
      group: 'hero',
      description:
        'Tepat 4 slide. Slide pertama boleh video. Slide gambar berpindah lewat timer carousel, slide video berpindah saat video selesai.',
      of: [{type: 'homeHeroSlide'}],
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(4)
          .custom((slides) => {
            const videoCount = Array.isArray(slides)
              ? slides.filter(
                  (slide) =>
                    typeof slide === 'object' &&
                    slide !== null &&
                    'mediaType' in slide &&
                    (slide as {mediaType?: unknown}).mediaType === 'video',
                ).length
              : 0
            return videoCount <= 1 ? true : 'Carousel hanya boleh memiliki satu slide video.'
          })
          .error('Carousel dirancang untuk 3–4 slide. Di luar itu indikator progress tidak muat.'),
    } as never),

    /* 2 — Harapan & Cita-Cita */
    defineField({
      name: 'aspiration',
      title: 'Harapan & Cita-Cita',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: false},
      fields: [
        localeField({name: 'badge', title: 'Badge', max: LIMIT.badge, strict: true}),
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'lead', title: 'Kalimat pembuka', max: LIMIT.sectionLead, rows: 3}),
        localeText({name: 'body', title: 'Paragraf pendukung', max: LIMIT.bodyPanel, rows: 4}),
        defineField({
          name: 'links',
          title: 'Tautan',
          type: 'array',
          of: [{type: 'cta'}],
          description: 'Tepat 2 tautan.',
          validation: (rule) => rule.min(2).max(2),
        }),
      ],
    } as never),

    /* 3 — Tentang Kami */
    defineField({
      name: 'about',
      title: 'Tentang Kami',
      type: 'featureSection',
      group: 'content',
      options: {collapsible: true, collapsed: true},
    } as never),

    /* 4 — Pencapaian Perusahaan */
    defineField({
      name: 'achievements',
      title: 'Pencapaian Perusahaan',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: true},
      fields: [
        localeField({name: 'badge', title: 'Badge', max: LIMIT.badge, strict: true}),
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'description', title: 'Deskripsi', max: LIMIT.sectionLead, rows: 3}),
        defineField({
          name: 'stats',
          title: 'Statistik',
          type: 'array',
          of: [{type: 'statBlock'}],
          description: 'Tepat 3 blok. Grid dirancang untuk 3 kolom.',
          validation: (rule) => rule.required().length(3).error('Section ini butuh tepat 3 statistik.'),
        }),
        defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
      ],
    } as never),

    /* 5 — Produk */
    defineField({
      name: 'productShowcase',
      title: 'Showcase Produk',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: true},
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'description', title: 'Deskripsi', max: LIMIT.sectionLead, rows: 3}),
        defineField({
          name: 'products',
          title: 'Produk yang ditampilkan',
          type: 'array',
          description:
            'Pilih dari katalog produk. Urutan di sini menentukan urutan carousel. 2–6 produk.',
          of: [{type: 'reference', to: [{type: 'product'}]}],
          validation: (rule) => rule.min(2).max(6).unique(),
        }),
        defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
      ],
    } as never),

    /* 6 — Kemitraan */
    defineField({
      name: 'partnershipShowcase',
      title: 'Showcase Kemitraan',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: true},
      fields: [
        localeField({name: 'eyebrow', title: 'Label kecil', max: LIMIT.eyebrow, strict: true}),
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 3}),
        defineField({
          name: 'partners',
          title: 'Mitra yang ditampilkan',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'partnership'}]}],
          validation: (rule) => rule.min(1).max(6).unique(),
        }),
        defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
      ],
    } as never),

    /* 7 — Keberlanjutan / Publikasi */
    defineField({
      name: 'resources',
      title: 'Keberlanjutan & Publikasi',
      type: 'object',
      group: 'closing',
      options: {collapsible: true, collapsed: true},
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'description', title: 'Deskripsi', max: LIMIT.sectionLead, rows: 3}),
        defineField({
          name: 'cards',
          title: 'Card publikasi',
          type: 'array',
          of: [{type: 'resourceCard'}],
          description: 'Grid menampung 3 atau 6 card dengan rapi.',
          validation: (rule) => rule.min(3).max(6),
        }),
        defineField({name: 'link', title: 'Tautan lanjutan', type: 'cta'}),
      ],
    } as never),
  ],
})
