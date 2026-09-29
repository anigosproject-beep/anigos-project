import {defineField, defineType} from 'sanity'
import type {FieldDefinition, Rule} from 'sanity'
import {characterCountInput} from '../components/CharacterCount'
import {hardLimit} from './limits'

/**
 * Bahasa situs. `id` adalah bahasa sumber dan wajib diisi.
 * `en` opsional; frontend jatuh kembali ke `id` bila kosong.
 *
 * Mapping menyatakan versi English biasanya lebih panjang, jadi batas
 * karakter yang sama diterapkan ke KEDUA bahasa. English yang lolos batas
 * berarti Indonesia pasti aman.
 */
export const LANGUAGES = [
  {id: 'id', title: 'Indonesia', required: true},
  {id: 'en', title: 'English', required: false},
] as const

export type LanguageId = (typeof LANGUAGES)[number]['id']

export const DEFAULT_LANGUAGE: LanguageId = 'id'

type LocaleFieldOptions = {
  name: string
  title: string
  /** Batas aman layout, ambil dari LIMIT.* */
  max: number
  description?: string
  group?: string
  fieldset?: string
  /** true = wajib diisi dalam bahasa Indonesia */
  required?: boolean
  /**
   * true  → melewati batas langsung error (judul, CTA, label, eyebrow)
   * false → melewati batas hanya warning, error di batas keras (deskripsi, body)
   */
  strict?: boolean
  /** jumlah baris textarea; bila diisi, field memakai tipe `text` */
  rows?: number
  /** contoh isi yang sudah sesuai panjangnya, ditampilkan sebagai placeholder */
  placeholder?: string
}

function subField(
  lang: (typeof LANGUAGES)[number],
  opts: LocaleFieldOptions,
): FieldDefinition {
  const {max, strict = false, rows, required = true, placeholder} = opts
  const hard = strict ? max : hardLimit(max)
  const isText = typeof rows === 'number'

  const base = {
    name: lang.id,
    title: lang.title,
    type: isText ? ('text' as const) : ('string' as const),
    ...(isText ? {rows} : {}),
    placeholder,
    components: {input: characterCountInput(max, hard)},
    validation: (rule: Rule) => {
      const rules = [
        rule
          .max(hard)
          .error(
            `Maksimal ${hard} karakter. Batas aman layout ${max} karakter — teks sepanjang ini akan merusak tata letak.`,
          ),
      ]

      if (!strict) {
        rules.push(
          rule
            .max(max)
            .warning(
              `Batas aman layout ${max} karakter. Di atas ini teks akan memanjang dan tinggi section berubah.`,
            ),
        )
      }

      if (lang.required && required) {
        rules.push(rule.required().error('Versi Indonesia wajib diisi.'))
      }

      return rules
    },
  }

  return defineField(base as never)
}

/**
 * Membuat satu field dwibahasa (ID + EN) lengkap dengan penghitung karakter
 * dan validasi panjang per bahasa.
 */
export function localeField(opts: LocaleFieldOptions): FieldDefinition {
  const {name, title, description, group, fieldset, max, strict = false} = opts
  const hard = strict ? max : hardLimit(max)

  const hint = strict
    ? `Maksimal ${max} karakter.`
    : `Batas aman ${max} karakter, maksimal mutlak ${hard}.`

  return defineField({
    name,
    title,
    ...(group ? {group} : {}),
    ...(fieldset ? {fieldset} : {}),
    type: 'object',
    description: description ? `${description} ${hint}` : hint,
    options: {columns: 1},
    fields: LANGUAGES.map((lang) => subField(lang, opts)),
    preview: {
      select: {id: 'id', en: 'en'},
      prepare: ({id, en}: {id?: string; en?: string}) => ({
        title: id || en || 'Belum diisi',
        subtitle: en && id ? 'ID + EN' : id ? 'EN belum diisi' : undefined,
      }),
    },
  } as never)
}

/** Versi textarea. Sama dengan localeField, hanya default 3 baris. */
export function localeText(opts: LocaleFieldOptions): FieldDefinition {
  return localeField({rows: 3, ...opts})
}

/**
 * Daftar paragraf dwibahasa dengan batas per paragraf.
 * Dipakai untuk halaman kebijakan yang mapping-nya menyebut "3 paragraf".
 */
export function localeParagraphs(opts: {
  name: string
  title: string
  max: number
  description?: string
  group?: string
  min?: number
  maxItems?: number
}): FieldDefinition {
  const {name, title, max, description, group, min = 1, maxItems = 6} = opts

  return defineField({
    name,
    title,
    ...(group ? {group} : {}),
    type: 'array',
    description: `${description ?? ''} Setiap paragraf maksimal ${max} karakter. ${min}–${maxItems} paragraf.`.trim(),
    of: [
      defineType({
        name: 'paragraph',
        title: 'Paragraf',
        type: 'object',
        fields: [localeField({name: 'body', title: 'Teks', max, rows: 4, strict: false})],
        preview: {
          select: {title: 'body.id'},
          prepare: ({title}: {title?: string}) => ({title: title || 'Paragraf kosong'}),
        },
      } as never),
    ],
    validation: (rule) => rule.min(min).max(maxItems),
  } as never)
}

/** Ambil nilai satu bahasa dengan fallback ke bahasa default. */
export function resolveLocale<T extends Partial<Record<LanguageId, unknown>>>(
  value: T | undefined,
  lang: LanguageId,
): string {
  if (!value) return ''
  return String(value[lang] ?? value[DEFAULT_LANGUAGE] ?? '')
}
