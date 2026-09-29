import {defineField} from 'sanity'
import {definePage, ROUTES} from '../../../lib/page'
import {localeField, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'
import {mediaField} from '../../../lib/media'

/* ------------------------------------------------------------------ */
/* 9 — Kenali Produk                                                   */
/* ------------------------------------------------------------------ */

export const kenaliProdukPage = definePage({
  name: 'kenaliProdukPage',
  title: 'Kenali Produk',
  route: ROUTES.kenaliProduk,
  subtitle: 'Katalog produk, alur pemilihan, dukungan armada',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'intro',
      title: 'Pengenalan kategori',
      type: 'introSection',
      group: 'content',
    } as never),

    defineField({
      name: 'products',
      title: 'Produk utama',
      type: 'array',
      group: 'content',
      description: 'Pilih dari katalog produk. Urutan di sini adalah urutan tampil.',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      validation: (rule) => rule.required().min(1).unique(),
    } as never),

    defineField({
      name: 'selectionFlow',
      title: 'Alur pemilihan',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul section', max: LIMIT.sectionTitle, strict: true}),
        defineField({
          name: 'steps',
          title: 'Langkah',
          type: 'array',
          of: [{type: 'numberedStep'}],
          description: 'Saat ini 3 langkah. Maksimal 5 agar penomoran tetap satu baris.',
          validation: (rule) => rule.min(3).max(5),
        }),
      ],
    } as never),

    defineField({
      name: 'fleetSupport',
      title: 'Armada & dukungan distribusi',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.cardTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 4}),
        mediaField({name: 'image', title: 'Visual', preset: 'showcaseSquare'}),
        defineField({name: 'cta', title: 'Tombol', type: 'cta'}),
      ],
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 10 — Armada                                                         */
/* ------------------------------------------------------------------ */

export const armadaPage = definePage({
  name: 'armadaPage',
  title: 'Armada',
  route: ROUTES.armada,
  subtitle: 'Land fleet, 6 opsi kapasitas, transportasi laut',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'landFleetIntro',
      title: 'Pengantar land fleet',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 4}),
        mediaField({name: 'image', title: 'Foto armada', preset: 'fleetPhoto', required: true}),
      ],
    } as never),

    defineField({
      name: 'capacityOptions',
      title: 'Pilihan kapasitas',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        localeField({name: 'title', title: 'Judul section', max: LIMIT.sectionTitle, strict: true}),
        defineField({
          name: 'variants',
          title: 'Varian kapasitas',
          type: 'array',
          description:
            'Selector saat ini dirancang untuk 6 opsi. Menambah lebih dari 6 membuat selector turun baris.',
          of: [{type: 'reference', to: [{type: 'fleetVariant'}]}],
          validation: (rule) =>
            rule
              .required()
              .min(4)
              .max(6)
              .unique()
              .error('Selector kapasitas dirancang untuk 4–6 opsi.'),
        }),
      ],
    } as never),

    defineField({
      name: 'seaTransport',
      title: 'Transportasi laut',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      description: 'Panel opsional. Kosongkan bila tidak ditampilkan.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Tampilkan panel ini',
          type: 'boolean',
          initialValue: true,
        }),
        localeField({name: 'title', title: 'Judul', max: LIMIT.cardTitle, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 4}),
        mediaField({name: 'image', title: 'Visual', preset: 'resourceThumbnail'}),
      ],
    } as never),

    defineField({
      name: 'availabilityNote',
      title: 'Catatan ketersediaan',
      type: 'note',
      group: 'content',
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 11 — Penawaran                                                      */
/* ------------------------------------------------------------------ */

export const penawaranPage = definePage({
  name: 'penawaranPage',
  title: 'Penawaran',
  route: ROUTES.penawaran,
  subtitle: 'Persiapan dan proses pengajuan penawaran',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero', group: 'hero'} as never),

    defineField({
      name: 'preparation',
      title: 'Persiapan penawaran',
      type: 'object',
      group: 'content',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.sectionTitleShort, strict: true}),
        localeText({name: 'body', title: 'Isi', max: LIMIT.sectionLead, rows: 4}),
      ],
    } as never),

    defineField({
      name: 'checklist',
      title: 'Checklist persiapan',
      type: 'array',
      group: 'content',
      description: 'Informasi yang perlu disiapkan calon pelanggan sebelum menghubungi tim.',
      of: [
        {
          type: 'object',
          name: 'checklistItem',
          title: 'Item checklist',
          fields: [
            localeField({
              name: 'title',
              title: 'Judul',
              max: LIMIT.cardTitleMedium,
              strict: true,
            }),
            localeText({name: 'body', title: 'Penjelasan', max: LIMIT.cardBody, rows: 3}),
          ],
          preview: {select: {title: 'title.id'}},
        },
      ],
      validation: (rule) => rule.min(3).max(8),
    } as never),

    defineField({
      name: 'process',
      title: 'Proses & informasi pendukung',
      type: 'array',
      group: 'content',
      of: [{type: 'numberedStep'}],
      validation: (rule) => rule.min(2).max(6),
    } as never),

    defineField({name: 'closing', title: 'Panel ajakan', type: 'ctaPanel', group: 'closing'} as never),
  ],
})

/* ------------------------------------------------------------------ */
/* 12 — Ajukan Penawaran (form)                                        */
/* ------------------------------------------------------------------ */

/**
 * Halaman ini hanya menyimpan SALINAN TEKS form.
 * Nama field, perhitungan PBBKB, dan endpoint tetap di kode — CMS tidak boleh
 * bisa mengubah logika, hanya kata-katanya.
 */
export const ajukanPenawaranPage = definePage({
  name: 'ajukanPenawaranPage',
  title: 'Form Ajukan Penawaran',
  route: ROUTES.ajukanPenawaran,
  subtitle: 'Salinan teks form penawaran',
  fields: [
    defineField({
      name: 'intro',
      title: 'Pengantar form',
      type: 'object',
      group: 'hero',
      fields: [
        localeField({name: 'title', title: 'Judul', max: LIMIT.heroTitle, strict: true}),
        localeText({
          name: 'description',
          title: 'Deskripsi proses tindak lanjut',
          max: LIMIT.heroDescription,
          rows: 3,
        }),
      ],
    } as never),

    defineField({
      name: 'fieldGroups',
      title: 'Kelompok field',
      type: 'array',
      group: 'content',
      description:
        'Tiga kelompok: identitas pelanggan, kebutuhan produk, perhitungan penawaran. Nama teknis field tidak diubah di sini.',
      of: [
        {
          type: 'object',
          name: 'formGroup',
          title: 'Kelompok',
          fields: [
            defineField({
              name: 'key',
              title: 'Kunci teknis',
              type: 'string',
              description: 'Harus sama dengan kunci di kode. Jangan diterjemahkan.',
              options: {
                list: [
                  {title: 'Identitas pelanggan', value: 'customer'},
                  {title: 'Kebutuhan produk', value: 'requirement'},
                  {title: 'Perhitungan penawaran', value: 'calculation'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            localeField({
              name: 'legend',
              title: 'Judul kelompok',
              max: LIMIT.formLabel,
              strict: true,
            }),
            defineField({
              name: 'fields',
              title: 'Label & helper per field',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'formField',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'Nama field di kode',
                      type: 'string',
                      description: 'Contoh: companyName. Jangan diterjemahkan.',
                      validation: (rule) =>
                        rule
                          .required()
                          .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, {name: 'camelCase tanpa spasi'}),
                    }),
                    localeField({
                      name: 'label',
                      title: 'Label',
                      max: LIMIT.formLabel,
                      strict: true,
                    }),
                    localeField({
                      name: 'placeholder',
                      title: 'Placeholder',
                      max: LIMIT.formPlaceholder,
                      strict: true,
                      required: false,
                    }),
                    localeText({
                      name: 'helper',
                      title: 'Teks bantuan',
                      max: LIMIT.formHelper,
                      rows: 2,
                      required: false,
                    }),
                    localeText({
                      name: 'error',
                      title: 'Pesan error',
                      max: LIMIT.formError,
                      rows: 2,
                      required: false,
                    }),
                  ],
                  preview: {select: {title: 'label.id', subtitle: 'key'}},
                },
              ],
            }),
          ],
          preview: {select: {title: 'legend.id', subtitle: 'key'}},
        },
      ],
      validation: (rule) => rule.length(3),
    } as never),

    defineField({
      name: 'disclaimer',
      title: 'Catatan & disclaimer',
      type: 'object',
      group: 'closing',
      fields: [
        localeText({
          name: 'body',
          title: 'Penjelasan penggunaan data dan proses email',
          max: LIMIT.legalParagraph,
          rows: 6,
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
        localeField({
          name: 'sending',
          title: 'Status sedang mengirim',
          max: LIMIT.formStatus,
          strict: true,
        }),
        localeText({name: 'success', title: 'Pesan berhasil', max: LIMIT.formStatus, rows: 2}),
        localeText({name: 'failure', title: 'Pesan gagal', max: LIMIT.formError, rows: 2}),
      ],
    } as never),
  ],
})
