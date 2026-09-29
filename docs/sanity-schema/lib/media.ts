import {defineField} from 'sanity'
import type {FieldDefinition, ImageValue, ValidationContext} from 'sanity'
import {localeField} from './locale'
import {LIMIT} from './limits'

/**
 * Standar gambar dari content-page-mapping.md → "Standar gambar".
 *
 * `ratio` adalah rentang lebar/tinggi yang aman.
 * `fit` menentukan apakah asset boleh dipotong (`cover`) atau harus utuh
 * (`contain`, untuk artwork transparan dan pattern).
 */
export const MEDIA_PRESET = {
  pageHero: {
    label: 'Hero halaman',
    note: 'Background full-bleed PageHero. Tinggi minimum min(34rem, 65svh). Letakkan subjek di tengah atau sisi yang tidak tertutup overlay teks.',
    minWidth: 1920,
    minHeight: 1080,
    ratio: [16 / 9, 2 / 1] as [number, number],
    fit: 'cover' as const,
  },
  homeHero: {
    label: 'Hero beranda',
    note: 'Slide carousel full-bleed. Rasio 16:9.',
    minWidth: 1920,
    minHeight: 1080,
    ratio: [1.7, 1.82] as [number, number],
    fit: 'cover' as const,
  },
  featureFullBleed: {
    label: 'Feature full-bleed',
    note: 'Background FeatureImageSection. Tinggi minimum desktop sekitar 37.5rem, jadi gambar akan terpotong di atas dan bawah.',
    minWidth: 1920,
    minHeight: 1080,
    ratio: [16 / 9, 2.4] as [number, number],
    fit: 'cover' as const,
  },
  showcaseSquare: {
    label: 'Showcase persegi',
    note: 'Panel/card object-cover rasio 1:1.',
    minWidth: 1200,
    minHeight: 1200,
    ratio: [0.95, 1.05] as [number, number],
    fit: 'cover' as const,
  },
  resourceThumbnail: {
    label: 'Thumbnail resource/artikel',
    note: 'Card image object-cover rasio 3:2.',
    minWidth: 1200,
    minHeight: 800,
    ratio: [1.45, 1.6] as [number, number],
    fit: 'cover' as const,
  },
  fleetPhoto: {
    label: 'Foto armada',
    note: 'Rasio 4:3 sampai 3:2.',
    minWidth: 1200,
    minHeight: 800,
    ratio: [1.3, 1.55] as [number, number],
    fit: 'cover' as const,
  },
  productArtwork: {
    label: 'Artwork produk',
    note: 'Gambar produk berlatar transparan (PNG/WebP). Jangan memakai foto berlatar penuh — asset ini dirender object-contain.',
    minWidth: 1200,
    minHeight: 1400,
    ratio: [0.86, 1.08] as [number, number],
    fit: 'contain' as const,
  },
  decorativePattern: {
    label: 'Pattern dekoratif',
    note: 'SVG transparan lebih disarankan. Dirender object-contain, tidak pernah dipotong.',
    minWidth: 1600,
    minHeight: 1067,
    ratio: [1.35, 1.7] as [number, number],
    fit: 'contain' as const,
  },
  logo: {
    label: 'Logo',
    note: 'Logo transparan untuk header dan footer. SVG lebih disarankan.',
    minWidth: 200,
    minHeight: 60,
    ratio: [2, 8] as [number, number],
    fit: 'contain' as const,
  },
} as const

export type MediaPresetKey = keyof typeof MEDIA_PRESET

type AssetMetadata = {
  dimensions?: {width: number; height: number; aspectRatio: number}
  mimeType?: string
}

/**
 * Validasi asset terhadap preset: resolusi minimum (error) dan rasio (warning).
 *
 * Rasio dibuat warning, bukan error, karena `hotspot` Sanity bisa menyelamatkan
 * sebagian kasus. Resolusi dibuat error karena tidak bisa diperbaiki di CMS.
 */
function validateAsset(preset: (typeof MEDIA_PRESET)[MediaPresetKey]) {
  return async (value: ImageValue | undefined, context: ValidationContext) => {
    const ref = value?.asset?._ref
    if (!ref) return true

    const client = context.getClient({apiVersion: '2024-10-01'})
    const meta = await client.fetch<AssetMetadata | null>(
      `*[_id == $id][0]{ "dimensions": metadata.dimensions, mimeType }`,
      {id: ref},
    )

    const dims = meta?.dimensions
    if (!dims) return true

    // SVG tidak punya dimensi piksel yang bermakna.
    if (meta?.mimeType === 'image/svg+xml') return true

    if (dims.width < preset.minWidth || dims.height < preset.minHeight) {
      return `Resolusi ${dims.width}x${dims.height} terlalu kecil. Minimum ${preset.minWidth}x${preset.minHeight} untuk ${preset.label}.`
    }

    const [minRatio, maxRatio] = preset.ratio
    if (dims.aspectRatio < minRatio || dims.aspectRatio > maxRatio) {
      return {
        message: `Rasio ${dims.aspectRatio.toFixed(2)}:1 di luar rentang aman ${minRatio.toFixed(2)}–${maxRatio.toFixed(2)}. Atur hotspot agar subjek utama tidak terpotong, atau siapkan crop baru.`,
        level: 'warning' as const,
      }
    }

    return true
  }
}

type MediaFieldOptions = {
  name: string
  title: string
  preset: MediaPresetKey
  description?: string
  group?: string
  fieldset?: string
  required?: boolean
  /** izinkan SVG (untuk pattern dekoratif) */
  allowSvg?: boolean
  /** asset hanya dekoratif; alt tidak wajib dan frontend menyembunyikannya */
  decorative?: boolean
}

/**
 * Field gambar lengkap: hotspot, alt dwibahasa, dan validasi preset.
 */
export function mediaField(opts: MediaFieldOptions): FieldDefinition {
  const {
    name,
    title,
    preset: presetKey,
    description,
    group,
    fieldset,
    required = false,
    allowSvg = false,
    decorative = false,
  } = opts
  const preset = MEDIA_PRESET[presetKey]

  return defineField({
    name,
    title,
    ...(group ? {group} : {}),
    ...(fieldset ? {fieldset} : {}),
    type: 'image',
    description: [
      description,
      preset.note,
      `Minimum ${preset.minWidth}x${preset.minHeight}.`,
      allowSvg ? 'SVG diperbolehkan.' : 'Gunakan raster image.',
      decorative ? 'Asset dekoratif: alt boleh dikosongkan.' : undefined,
    ]
      .filter(Boolean)
      .join(' '),
    options: {
      hotspot: preset.fit === 'cover',
      accept: allowSvg ? 'image/*,.svg' : 'image/*',
      storeOriginalFilename: false,
      metadata: ['blurhash', 'lqip', 'dimensions'],
    },
    fields: [
      localeField({
        name: 'alt',
        title: 'Teks alternatif',
        description: 'Deskripsi gambar untuk pembaca layar dan saat gambar gagal dimuat.',
        max: LIMIT.imageAlt,
        strict: true,
        required: !decorative,
      }),
    ],
    validation: (rule) => {
      const rules = [rule.custom(validateAsset(preset))]
      if (required) rules.push(rule.required().error(`${title} wajib diisi.`))
      return rules
    },
  } as never)
}

/** Video hero beranda: MP4 H.264, 16:9. */
export function heroVideoField(name = 'video', group?: string): FieldDefinition {
  return defineField({
    name,
    title: 'Video slide',
    ...(group ? {group} : {}),
    type: 'file',
    description:
      'MP4 H.264, 16:9, minimum 1920x1080. Slide berpindah saat video selesai (event ended), bukan lewat timer. Jaga durasi di bawah 20 detik dan ukuran file di bawah 8 MB.',
    options: {accept: 'video/mp4'},
  } as never)
}
