import {
  pageHeroFieldName,
  pageHeroMenus,
} from "../studio-anigos-project/sanity/page-hero-registry"

const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce(
    (result, string, index) => `${result}${string}${values[index] ?? ""}`,
    ""
  )

const t = (field: string, alias?: string) =>
  `"${alias ?? field}": coalesce(${field}[$lang], ${field}.id, ${field})`

const pageHeroLocalizedValue = (
  field: string,
  fallback: { id: string; en: string }
) =>
  `coalesce(${field}[$lang], ${field}.id, select($lang == "en" => ${JSON.stringify(fallback.en)}, ${JSON.stringify(fallback.id)}))`

const image = groq`
  "url": asset->url,
  "uploadedAt": asset->_createdAt,
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

const pageHeroImageFields = pageHeroMenus
  .reduce<string[]>((fields, menu) => {
    for (const page of menu.pages) {
      const fieldName = pageHeroFieldName(page.value)
      fields.push(
        `"${page.path}": {
          "title": ${pageHeroLocalizedValue(`${fieldName}.title`, page.heading)},
          "description": ${pageHeroLocalizedValue(`${fieldName}.subtitle`, page.subtitle)},
          "image": ${fieldName}.image{"url": asset->url, "alt": coalesce(alt[$lang], alt.id, alt)}
        }`
      )
    }
    return fields
  }, [])
  .join(",")

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
    ${t("caption")},
    "url": image.asset->url,
    "alt": coalesce(image.alt[$lang], image.alt.id, image.alt, select($lang == "en" => "Partnership documentation photo", "Foto dokumentasi kemitraan")),
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "uploadedAt": image.asset->_createdAt
  },
  "logo": logo{${image}},
  "image": logo{${image}},
  "portfolioDocument": portfolioDocument.asset->{url, originalFilename},
`

export const HOME_QUERY = groq`*[_type == "homePage"][0]{
  meta{${meta}},
  seo{${seo}},
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
        ${t("alt")}
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

export const HOME_PAGE_DATA_QUERY = groq`{
  "home": ${HOME_QUERY},
  "legacyMediaSlots": *[_type == "mediaAsset" && page == "home" && isActive != false]{
    page,
    section,
    slot,
    "image": {"url": image.asset->url, "alt": coalesce(image.alt[$lang], image.alt.id, image.alt)}
  },
  "supportingMediaSlots": *[_type == "pageMediaEditor" && _id == "pageMediaEditor"][0].homeSlots[]{
    slotId,
    ${t("name")},
    ${t("description")},
    linkedPagePath,
    "image": image{"url": asset->url, "alt": coalesce(alt[$lang], alt.id, alt)},
    "video": {"url": video.asset->url}
  },
  "pageHeroImages": *[_id == "pageHeroEditor"][0]{
    ${pageHeroImageFields}
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

export const CLIENT_PORTFOLIO_QUERY = groq`*[
  (_type == "client" && isActive == true) ||
  (_type == "partner" && isActive == true && isClient == true)
] | order(companyName asc){
  _id,
  companyName,
  "logo": logo{${image}},
  "location": select(
    _type == "client" => coalesce(location[$lang], location.id),
    coalesce(clientLocation[$lang], clientLocation.id)
  ),
  "productsUsed": select(
    _type == "client" => services[]{
      "name": select(
        serviceType == "solar-hsd" => select($lang == "en" => "Industrial Diesel / HSD", "Solar Industri / HSD"),
        serviceType == "biosolar-b35" => "Biosolar B35",
        serviceType == "biosolar-b40" => "Biosolar B40",
        serviceType == "dexlite" => "Dexlite",
        serviceType == "pertamina-dex" => "Pertamina Dex",
        serviceType == "marine-fuel-oil" => "Marine Fuel Oil (MFO)",
        serviceType == "other" => otherService,
        null
      )
    },
    clientProducts[]{"name": coalesce(product[$lang], product.id)}
  ),
  "gallery": gallery[]{
    _key,
    ${t("caption")},
    "url": image.asset->url,
    "alt": coalesce(image.alt[$lang], image.alt.id, image.alt, select($lang == "en" => "Client documentation photo", "Foto dokumentasi client")),
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "uploadedAt": image.asset->_createdAt
  }
}`
