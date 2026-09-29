const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce(
    (result, string, index) => `${result}${string}${values[index] ?? ""}`,
    ""
  )

const t = (field: string, alias?: string) =>
  `"${alias ?? field}": coalesce(${field}[$lang], ${field}.id)`

const image = groq`
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  ${t("alt")},
  hotspot,
  crop
`

const cta = groq`
  ${t("label")},
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

const hero = groq`
  ${t("eyebrow")},
  ${t("title")},
  ${t("description")},
  image{${image}}
`

const seo = groq`
  ${t("metaTitle")},
  ${t("metaDescription")},
  ogImage{${image}},
  noIndex
`

const meta = groq`
  route,
  ${t("breadcrumbLabel")},
  ${t("navLabel")}
`

const product = groq`
  _id,
  "slug": slug.current,
  ${t("name")},
  ${t("description")},
  category,
  basePricePerLiter,
  artwork{${image}},
  specs[]{${t("label")}, value},
  availableForQuote,
  order,
  isPublished
`

const fleetOption = groq`
  _id,
  capacity,
  "label": coalesce(label[$lang], label.id),
  unit,
  "note": coalesce(note[$lang], note.id),
  transportMode,
  image{${image}},
  gallery[]{"image": {${image}}},
  order,
  isPublished
`

const partnership = groq`
  _id,
  "name": companyName,
  partnerSince,
  "portfolio": partnershipType,
  "body": overview,
  partnershipBackgroundTitle,
  partnershipBackgroundSubtitle,
  partnershipBackground[]{
    _key,
    _type,
    style,
    listItem,
    markDefs[]{_key, _type, href},
    children[]{_key, _type, text, marks}
  },
  partnershipClosing,
  gallery[]{
    _key,
    caption,
    "url": image.asset->url,
    "alt": coalesce(image.alt, "Foto dokumentasi kemitraan"),
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  },
  "logo": logo{${image}},
  "image": logo{${image}},
  "portfolioDocument": portfolioDocument.asset->{url, originalFilename},
`

export const HOME_QUERY = groq`*[_type == "homePage"][0]{
  meta{${meta}},
  seo{${seo}},
  heroSlides | order(position asc, _key asc){
    position,
    ${t("title")},
    ${t("description")},
    image{${image}},
  },
  aspiration{
    ${t("badge")},
    ${t("title")},
    ${t("lead")},
    ${t("body")},
    links[]{${cta}}
  },
  about{
    ${t("eyebrow")},
    ${t("title")},
    ${t("description")},
    actions[]{${cta}},
    image{${image}}
  },
  achievements{
    ${t("badge")},
    ${t("title")},
    ${t("description")},
    stats[]{value, ${t("label")}, ${t("description")}},
    cta{${cta}}
  },
  productShowcase{
    ${t("title")},
    ${t("description")},
    logoItems[]{
      _key,
      ${t("name")},
      ${t("description")},
      logo{
        "url": asset->url,
        "alt": alt
      }
    },
    products[@->isPublished != false]->{${product}},
    media[]{"slug": product->slug.current, image{${image}}},
    cta{${cta}}
  },
  partnershipShowcase{
    ${t("eyebrow")},
    ${t("title")},
    ${t("body")},
    "partners": *[_type == "partner" && isActive == true] | order(companyName asc){
      ${partnership}
    },
    media[]{slot, image{${image}}},
    cta{${cta}}
  },
  resources{
    ${t("title")},
    ${t("description")},
    cards[]{${t("title")}, ${t("description")}, thumbnail{${image}}, link{${cta}}},
    link{${cta}}
  }
}`

export const JANGKAUAN_QUERY = groq`*[_type == "jangkauanPage"][0]{
  meta{${meta}},
  seo{${seo}},
  hero{${hero}},
  intro{
    ${t("eyebrow")},
    ${t("title")},
    ${t("lead")},
    ${t("body")}
  },
  serviceAreas{
    ${t("title")},
    areas[]->{
      _id,
      city,
      province,
      island,
      image{${image}},
      ${t("body")},
      modes,
      icon,
      active
    }
  },
  capabilities{
    ${t("title")},
    items[]{icon, ${t("title")}, ${t("body")}}
  },
  closing{${t("title")}, ${t("body")}, actions[]{${cta}}}
}`

export const PRODUCT_QUERY = groq`*[_type == "product" && isPublished != false] | order(order asc, _createdAt asc){
  ${product}
}`

export const FLEET_OPTIONS_QUERY = groq`*[_type == "fleetOption" && isPublished != false] | order(order asc, capacity asc){
  ${fleetOption}
}`

export const PARTNERSHIP_PAGE_QUERY = groq`{
  "hero": *[_type == "partnershipPage"][0].hero{${hero}},
  "intro": *[_type == "partnershipPage"][0].intro{
    ${t("eyebrow")},
    ${t("title")},
    ${t("lead")},
    ${t("body")}
  },
  "showcase": *[_type == "partner" && isActive == true] | order(companyName asc){
    ${partnership}
  },
  "process": *[_type == "partnershipPage"][0].process[]{
    ${t("title")},
    ${t("body")}
  },
  "closing": *[_type == "partnershipPage"][0].closing{${t("title")}, ${t("body")}}
}`
