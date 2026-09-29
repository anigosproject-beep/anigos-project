import type {SchemaTypeDefinition} from 'sanity'

/* objects */
import {cta, note, pageMeta, seo} from './objects/shared'
import {
  compactCard,
  ctaPanel,
  featureSection,
  homeHeroSlide,
  iconCard,
  introSection,
  numberedStep,
  pageHero,
  principlePanel,
  resourceCard,
  statBlock,
} from './objects/blocks'

/* settings */
import {cookieBanner, footer, navigation, siteSettings} from './documents/settings'

/* halaman */
import {homePage} from './documents/singletons/home'
import {
  energiBerkelanjutanPage,
  jangkauanPage,
  keberlanjutanPage,
  kemitraanTataKelolaPage,
  keselamatanOperasionalPage,
} from './documents/singletons/coverage-sustainability'
import {
  ajukanPenawaranPage,
  armadaPage,
  kenaliProdukPage,
  penawaranPage,
} from './documents/singletons/produk'
import {
  harapanCitaCitaPage,
  karirPage,
  kemitraanPage,
  lamaranPage,
  legalitasPage,
  profilPerusahaanPage,
} from './documents/singletons/tentang-kami'
import {kebijakanDataPage, ketentuanCookiesPage} from './documents/singletons/legal'

/* koleksi */
import {coverageArea, fleetVariant, partnership, product} from './documents/collections/catalog'
import {jobOpening, legalDocument} from './documents/collections/people-legal'
import {newsroomArticle} from '../../../studio-anigos-project/schemaTypes/newsroomArticle'
import {newsroomCategory} from '../../../studio-anigos-project/schemaTypes/newsroomCategory'
import {teamMember} from '../../../studio-anigos-project/schemaTypes/teamMember'
import {mediaLibrary} from '../../../studio-anigos-project/schemaTypes/mediaLibrary'

/** Nama semua dokumen yang hanya boleh ada satu. Dipakai struktur desk. */
export const SINGLETON_TYPES = [
  'siteSettings',
  'navigation',
  'footer',
  'cookieBanner',
  'homePage',
  'jangkauanPage',
  'keberlanjutanPage',
  'energiBerkelanjutanPage',
  'kemitraanTataKelolaPage',
  'keselamatanOperasionalPage',
  'kenaliProdukPage',
  'armadaPage',
  'penawaranPage',
  'ajukanPenawaranPage',
  'profilPerusahaanPage',
  'harapanCitaCitaPage',
  'kemitraanPage',
  'legalitasPage',
  'karirPage',
  'lamaranPage',
  'kebijakanDataPage',
  'ketentuanCookiesPage',
] as const

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  cta,
  seo,
  pageMeta,
  note,
  pageHero,
  homeHeroSlide,
  introSection,
  featureSection,
  principlePanel,
  ctaPanel,
  iconCard,
  compactCard,
  resourceCard,
  numberedStep,
  statBlock,

  // settings
  siteSettings,
  navigation,
  footer,
  cookieBanner,

  // halaman
  homePage,
  jangkauanPage,
  keberlanjutanPage,
  energiBerkelanjutanPage,
  kemitraanTataKelolaPage,
  keselamatanOperasionalPage,
  kenaliProdukPage,
  armadaPage,
  penawaranPage,
  ajukanPenawaranPage,
  profilPerusahaanPage,
  harapanCitaCitaPage,
  kemitraanPage,
  legalitasPage,
  karirPage,
  lamaranPage,
  kebijakanDataPage,
  ketentuanCookiesPage,

  // koleksi
  product,
  fleetVariant,
  coverageArea,
  partnership,
  jobOpening,
  legalDocument,

  // compatibility: existing newsroom, organization, and media documents
  newsroomArticle,
  newsroomCategory,
  teamMember,
  mediaLibrary,
] as SchemaTypeDefinition[]
