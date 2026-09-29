import {defineField, defineType} from 'sanity'
import {localeField, localeText} from '../../../lib/locale'
import {LIMIT} from '../../../lib/limits'
import {mediaField} from '../../../lib/media'

/**
 * Lowongan kerja.
 *
 * Slug, department, type, dan location adalah nilai API. Mapping menyatakan
 * nilai-nilai ini tidak boleh diterjemahkan, jadi semuanya dibuat string biasa
 * (bukan localeField) dan slug dikunci setelah publish.
 */
export const jobOpening = defineType({
  name: 'jobOpening',
  title: 'Lowongan',
  type: 'document',
  groups: [
    {name: 'content', title: 'Konten', default: true},
    {name: 'technical', title: 'Nilai API'},
  ],
  fields: [
    localeField({
      name: 'title',
      title: 'Nama posisi',
      max: LIMIT.jobTitle,
      strict: true,
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug posisi',
      type: 'slug',
      group: 'technical',
      readOnly: ({document}) => Boolean(document?._createdAt),
      description:
        'Dikirim sebagai query ?posisi=<slug> ke form lamaran. Mengubahnya memutus tautan lamaran yang sudah beredar.',
      options: {source: 'title.id', maxLength: 48},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Departemen',
      type: 'string',
      group: 'technical',
      description: 'Nilai API. Jangan diterjemahkan.',
      validation: (rule) => rule.required().max(LIMIT.jobMeta),
    }),
    defineField({
      name: 'employmentType',
      title: 'Tipe',
      type: 'string',
      group: 'technical',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokasi',
      type: 'string',
      group: 'technical',
      description: 'Nilai API. Jangan diterjemahkan.',
      validation: (rule) => rule.required().max(LIMIT.jobMeta),
    }),
    localeText({
      name: 'summary',
      title: 'Ringkasan posisi',
      max: LIMIT.jobSummary,
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'active',
      title: 'Masih dibuka',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Matikan untuk menyembunyikan dari halaman karir tanpa menghapus dokumen.',
    }),
    defineField({
      name: 'closingDate',
      title: 'Ditutup pada',
      type: 'date',
      group: 'content',
      options: {dateFormat: 'D MMMM YYYY'},
    }),
  ],
  preview: {
    select: {title: 'title.id', department: 'department', location: 'location', active: 'active'},
    prepare: ({title, department, location, active}) => ({
      title: title || 'Lowongan tanpa nama',
      subtitle: [active ? 'Dibuka' : 'Ditutup', department, location].filter(Boolean).join(' · '),
    }),
  },
})

/** Dokumen legal perusahaan. */
export const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Dokumen legal',
  type: 'document',
  fields: [
    localeField({name: 'title', title: 'Nama dokumen', max: LIMIT.sectionTitle, strict: true}),
    defineField({
      name: 'documentNumber',
      title: 'Nomor dokumen',
      type: 'string',
      description: 'Nomor legal tidak diterjemahkan dan tidak diformat ulang.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'issuer',
      title: 'Diterbitkan oleh',
      type: 'string',
      validation: (rule) => rule.max(LIMIT.jobMeta),
    }),
    defineField({
      name: 'issuedAt',
      title: 'Tanggal terbit',
      type: 'date',
      options: {dateFormat: 'D MMMM YYYY'},
    }),
    localeText({name: 'body', title: 'Keterangan', max: LIMIT.sectionLead, rows: 3}),
    mediaField({
      name: 'thumbnail',
      title: 'Thumbnail dokumen',
      preset: 'resourceThumbnail',
      description: 'Opsional. Gunakan pratinjau halaman pertama dokumen.',
    }),
    defineField({
      name: 'file',
      title: 'Berkas PDF',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
  orderings: [
    {name: 'byDate', title: 'Tanggal terbit', by: [{field: 'issuedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title.id', subtitle: 'documentNumber', media: 'thumbnail'},
  },
})
