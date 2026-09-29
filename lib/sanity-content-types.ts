export type SanityLink = {
  label?: string
  href?: string
  variant?: "default" | "outline"
}

export type SanityRichTextBlock = {
  _key?: string
  _type?: string
  style?: string
  listItem?: string
  children?: Array<{
    _key?: string
    _type?: string
    text?: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _key?: string
    _type?: string
    href?: string
  }>
}

export type HomeContent = {
  mediaSlots?: Array<{
    page?: string
    section?: string
    slot?: string
    slotId?: string
    image?: { url?: string; alt?: string }
  } | null>
  aspiration?: {
    badge?: string
    title?: string
    lead?: string
    body?: string
    links?: Array<SanityLink | null>
  }
  about?: {
    eyebrow?: string
    title?: string
    description?: string
    actions?: Array<SanityLink | null>
    image?: { url?: string }
  }
  achievements?: {
    badge?: string
    title?: string
    description?: string
    stats?: Array<{
      value?: string
      label?: string
      description?: string
    } | null>
    cta?: SanityLink
  }
  productShowcase?: {
    title?: string
    description?: string
    logoItems?: Array<{
      _key?: string
      name?: string
      description?: string
      logo?: { url?: string; alt?: string }
    } | null>
    products?: Array<{
      _id: string
      name?: string
      description?: string
      category?: string
      basePricePerLiter?: number
      artwork?: { url?: string }
      specs?: Array<{ label?: string; value?: string } | null>
    } | null>
    media?: Array<{ slug?: string; image?: { url?: string } } | null>
    cta?: SanityLink
  }
  partnershipShowcase?: {
    eyebrow?: string
    title?: string
    body?: string
    partners?: Array<{
      _id: string
      name?: string
      body?: string
      image?: { url?: string }
    } | null>
    media?: Array<{ slot?: string; image?: { url?: string } } | null>
    cta?: SanityLink
  }
  resources?: {
    title?: string
    description?: string
    cards?: Array<{
      title?: string
      description?: string
      thumbnail?: { url?: string }
      link?: SanityLink
    } | null>
    link?: SanityLink
  }
}

export type SanityCoverageArea = {
  _id?: string
  city?: string
  province?: string
  island?: string
  body?: string
  modes?: string[]
  active?: boolean
  image?: { url?: string }
}

export type CoveragePageResponse = {
  serviceAreas?: {
    areas?: SanityCoverageArea[]
  }
}

export type SanityProduct = {
  _id: string
  slug?: string
  name?: string
  description?: string
  category?: string
  artwork?: { url?: string; alt?: string }
  specs?: Array<{ label?: string; value?: string } | null>
  availableForQuote?: boolean
  order?: number
  isPublished?: boolean
}

export type SanityFleetOption = {
  _id: string
  label?: string
  capacity?: number
  unit?: string
  transportMode?: "darat" | "laut" | "mitra"
  note?: string
  image?: { url?: string; alt?: string; width?: number; height?: number }
  gallery?: Array<{
    image?: { url?: string; alt?: string; width?: number; height?: number }
  } | null>
  order?: number
  isPublished?: boolean
}

export type PartnershipPageResponse = {
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
    image?: { url?: string }
  }
  intro?: {
    eyebrow?: string
    title?: string
    lead?: string
    body?: string
  }
  showcase?: Array<{
    _id: string
    name?: string
    partnerSince?: string
    portfolio?: string
    body?: string
    partnershipBackground?: string | SanityRichTextBlock[]
    partnershipBackgroundTitle?: string
    partnershipBackgroundSubtitle?: string
    partnershipClosing?: string
    logo?: { url?: string; alt?: string }
    image?: { url?: string }
    gallery?: Array<{
      _key?: string
      url?: string
      alt?: string
      caption?: string
      width?: number
      height?: number
      uploadedAt?: string
      storyTitle?: string
      storyDate?: string
      storyBody?: string
    } | null>
    portfolioDocument?: { url?: string; originalFilename?: string }
    documentation?: { url?: string; originalFilename?: string }
    cta?: SanityLink
  } | null>
  process?: Array<{
    title?: string
    body?: string
  } | null>
  closing?: {
    title?: string
    body?: string
    actions?: SanityLink[]
  }
}

export function isSanityObject(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
