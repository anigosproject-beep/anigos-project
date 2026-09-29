import {groq} from 'next-sanity'

/**
 * Pola bahasa.
 *
 * Setiap field dwibahasa disimpan sebagai `{id, en}`. GROQ meratakannya
 * di server dengan `coalesce`, jadi komponen React hanya menerima string biasa
 * dan tidak perlu tahu soal i18n sama sekali.
 *
 * Semua query menerima parameter $lang ("id" atau "en").
 */
const t = (field: string, alias?: string) =>
  `"${alias ?? field}": coalesce(${field}[$lang], ${field}.id)`

/* ------------------------------------------------------------------ */
/* Fragment                                                            */
/* ------------------------------------------------------------------ */

export const IMAGE_FRAGMENT = groq`
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  ${t('alt')},
  hotspot,
  crop
`

export const CTA_FRAGMENT = groq`
  ${t('label')},
  kind,
  variant,
  "href": select(
    kind == "internal" => route,
    kind == "external" => url,
    kind == "anchor" => "#" + anchor,
    null
  ),
  "isExternal": kind == "external"
`

export const PAGE_HERO_FRAGMENT = groq`
  ${t('eyebrow')},
  ${t('title')},
  ${t('description')},
  image{${IMAGE_FRAGMENT}}
`

export const SEO_FRAGMENT = groq`
  ${t('metaTitle')},
  ${t('metaDescription')},
  ogImage{${IMAGE_FRAGMENT}},
  noIndex
`

export const META_FRAGMENT = groq`
  route,
  ${t('breadcrumbLabel')},
  ${t('navLabel')}
`

export const ICON_CARD_FRAGMENT = groq`
  icon,
  ${t('title')},
  ${t('body')}
`

export const CTA_PANEL_FRAGMENT = groq`
  ${t('title')},
  ${t('body')},
  actions[]{${CTA_FRAGMENT}}
`

export const PRODUCT_FRAGMENT = groq`
  _id,
  "slug": slug.current,
  ${t('name')},
  ${t('description')},
  artwork{${IMAGE_FRAGMENT}},
  specs[]{${t('label')}, value},
  availableForQuote,
  cta{${CTA_FRAGMENT}}
`

export const PARTNERSHIP_FRAGMENT = groq`
  _id,
  name,
  ${t('body')},
  image{${IMAGE_FRAGMENT}},
  cta{${CTA_FRAGMENT}}
`

/* ------------------------------------------------------------------ */
/* Query global                                                        */
/* ------------------------------------------------------------------ */

export const LAYOUT_QUERY = groq`{
  "settings": *[_type == "siteSettings"][0]{
    companyName,
    ${t('tagline')},
    logo{${IMAGE_FRAGMENT}},
    address, email, phone,
    socials[]{platform, url},
    defaultSeo{${SEO_FRAGMENT}}
  },
  "navigation": *[_type == "navigation"][0]{
    items[]{
      ${t('label')},
      link{${CTA_FRAGMENT}},
      children[]{${t('label')}, ${t('description')}, link{${CTA_FRAGMENT}}}
    },
    headerCta{${CTA_FRAGMENT}}
  },
  "footer": *[_type == "footer"][0]{
    ${t('blurb')},
    columns[]{${t('title')}, links[]{${CTA_FRAGMENT}}},
    ${t('copyright')},
    legalLinks[]{${CTA_FRAGMENT}}
  },
  "cookieBanner": *[_type == "cookieBanner"][0]{
    ${t('message')},
    ${t('acceptLabel')},
    ${t('rejectLabel')},
    ${t('settingsLabel')},
    policyLink{${CTA_FRAGMENT}}
  }
}`

/* ------------------------------------------------------------------ */
/* Beranda                                                             */
/* ------------------------------------------------------------------ */

export const HOME_QUERY = groq`*[_type == "homePage"][0]{
  meta{${META_FRAGMENT}},
  seo{${SEO_FRAGMENT}},

  heroSlides[]{
    ${t('eyebrow')},
    ${t('title')},
    ${t('description')},
    ${t('progressLabel')},
    cta{${CTA_FRAGMENT}},
    mediaType,
    image{${IMAGE_FRAGMENT}},
    "videoUrl": video.asset->url,
    videoPoster{${IMAGE_FRAGMENT}}
  },

  aspiration{
    ${t('badge')},
    ${t('title')},
    ${t('lead')},
    ${t('body')},
    links[]{${CTA_FRAGMENT}},
  },

  about{
    ${t('eyebrow')},
    ${t('title')},
    ${t('description')},
    actions[]{${CTA_FRAGMENT}},
    image{${IMAGE_FRAGMENT}}
  },

  achievements{
    ${t('badge')},
    ${t('title')},
    ${t('description')},
    stats[]{value, ${t('label')}, ${t('description')}},
    cta{${CTA_FRAGMENT}}
  },

  productShowcase{
    ${t('title')},
    ${t('description')},
    products[]->{${PRODUCT_FRAGMENT}},
    cta{${CTA_FRAGMENT}}
  },

  partnershipShowcase{
    ${t('eyebrow')},
    ${t('title')},
    ${t('body')},
    partners[]->{${PARTNERSHIP_FRAGMENT}},
    cta{${CTA_FRAGMENT}}
  },

  resources{
    ${t('title')},
    ${t('description')},
    cards[]{
      ${t('title')},
      ${t('description')},
      thumbnail{${IMAGE_FRAGMENT}},
      link{${CTA_FRAGMENT}}
    },
    link{${CTA_FRAGMENT}}
  }
}`

/* ------------------------------------------------------------------ */
/* Halaman topik (keberlanjutan dan turunannya)                        */
/* ------------------------------------------------------------------ */

export const topicPageQuery = (type: string) => groq`*[_type == "${type}"][0]{
  meta{${META_FRAGMENT}},
  seo{${SEO_FRAGMENT}},
  hero{${PAGE_HERO_FRAGMENT}},
  intro{
    ${t('title')},
    ${t('lead')},
    panel{${t('title')}, ${t('body')}}
  },
  topics[]{${ICON_CARD_FRAGMENT}},
  note{${t('body')}},
  closing{${CTA_PANEL_FRAGMENT}}
}`

export const sustainableEnergyQuery = groq`*[_type == "energiBerkelanjutanPage"][0]{
  meta{${META_FRAGMENT}},
  seo{${SEO_FRAGMENT}},
  hero{${PAGE_HERO_FRAGMENT}},
  intro{
    ${t('title')},
    ${t('lead')},
    panel{${t('title')}, ${t('body')}}
  },
  components[]{
    ${t('title')},
    ${t('body')},
  },
  closing{${CTA_PANEL_FRAGMENT}}
}`

/* ------------------------------------------------------------------ */
/* Karir                                                               */
/* ------------------------------------------------------------------ */

export const CAREER_QUERY = groq`{
  "page": *[_type == "karirPage"][0]{
    meta{${META_FRAGMENT}},
    seo{${SEO_FRAGMENT}},
    hero{${PAGE_HERO_FRAGMENT}},
    workingValues{${t('title')}, ${t('body')}, panel{${t('title')}, ${t('body')}}},
    benefits[]{${ICON_CARD_FRAGMENT}},
    openingsIntro{${t('title')}, ${t('emptyState')}},
    applyCta{${t('label')}}
  },
  "openings": *[_type == "jobOpening" && active == true] | order(_createdAt desc){
    _id,
    "slug": slug.current,
    ${t('title')},
    department,
    employmentType,
    location,
    ${t('summary')},
    closingDate
  }
}`

/* ------------------------------------------------------------------ */
/* Armada                                                              */
/* ------------------------------------------------------------------ */

export const FLEET_QUERY = groq`*[_type == "armadaPage"][0]{
  meta{${META_FRAGMENT}},
  seo{${SEO_FRAGMENT}},
  hero{${PAGE_HERO_FRAGMENT}},
  landFleetIntro{${t('title')}, ${t('body')}, image{${IMAGE_FRAGMENT}}},
  capacityOptions{
    ${t('title')},
    variants[]->{
      _id, capacity, order,
      ${t('label')},
      ${t('summary')},
      photo{${IMAGE_FRAGMENT}}
    } | order(order asc)
  },
  seaTransport{enabled, ${t('title')}, ${t('body')}, image{${IMAGE_FRAGMENT}}},
  availabilityNote{${t('body')}},
  closing{${CTA_PANEL_FRAGMENT}}
}`
