/**
 * Batas karakter tunggal untuk seluruh Studio.
 *
 * Sumber: content-page-mapping.md → "Aturan batas teks".
 * Semua angka dihitung dalam karakter termasuk spasi.
 *
 * ATURAN PENTING:
 * Ubah angka di sini SAJA. Jangan menulis angka literal di file skema,
 * supaya batas CMS dan batas layout tidak pernah berbeda.
 */

export const LIMIT = {
  // Identitas segmen
  eyebrow: 35,
  badge: 35,

  // Hero
  heroTitle: 70,
  heroDescription: 220,

  // Section
  sectionTitle: 70,
  sectionTitleShort: 60,
  sectionLead: 220,
  bodySupport: 350,
  bodyPanel: 300,

  // Card
  cardTitle: 55,
  cardTitleCompact: 45,
  cardTitleMedium: 50,
  cardBody: 180,
  cardBodyComplex: 250,
  cardBodyLegal: 300,
  cardBodyCompact: 140,
  cardBodyCoverage: 160,

  // Aksi & navigasi
  cta: 25,
  linkLabel: 35,
  breadcrumb: 35,

  // Statistik
  statValue: 12,
  statLabel: 35,
  statDescription: 120,

  // Form
  formLabel: 45,
  formPlaceholder: 45,
  formHelper: 140,
  formOption: 70,
  formInstruction: 220,
  formError: 160,
  formStatus: 160,
  ariaLabel: 60,

  // Legal & catatan
  note: 250,
  quote: 350,
  statement: 350,
  legalParagraph: 500,
  cookieParagraph: 400,

  // Khusus
  cityName: 30,
  jobTitle: 70,
  jobMeta: 35,
  jobSummary: 250,
  productName: 55,

  // SEO
  seoTitle: 60,
  seoDescription: 160,
  imageAlt: 120,
} as const

export type LimitKey = keyof typeof LIMIT

/**
 * Batas keras = ambang yang benar-benar memblokir publish.
 *
 * Untuk field non-kritis (deskripsi, body) editor sering butuh sedikit ruang
 * lebih karena alasan editorial. Mapping mengizinkan itu ("tanpa alasan
 * editorial"), jadi pola yang dipakai:
 *   - lewat batas aman  → peringatan kuning, masih bisa publish
 *   - lewat batas keras → error merah, publish diblokir
 *
 * Field kritis layout (judul, CTA, label, eyebrow) memakai `strict: true`
 * sehingga batas aman langsung menjadi error.
 */
export const HARD_LIMIT_MULTIPLIER = 1.2

export function hardLimit(max: number): number {
  return Math.ceil(max * HARD_LIMIT_MULTIPLIER)
}
