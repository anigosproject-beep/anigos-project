import { sanityClient } from "@/lib/sanity-client"
import { translate, type Locale } from "@/lib/i18n"
import { careerOpenings, type CareerOpening } from "@/lib/careers-data"

const CAREER_OPENINGS_QUERY = `*[_type == "careerOpening"] | order(order asc, _createdAt asc) {
  _id,
  "slug": slug.current,
  isActive,
  title { id, en },
  department { id, en },
  location { id, en },
  employmentType { id, en },
  summary { id, en },
  responsibilities[] { id, en }
}`

type LocalizedText = {
  id?: string
  en?: string
}

type SanityCareerOpening = {
  _id: string
  slug?: string
  isActive?: boolean
  title?: LocalizedText
  department?: LocalizedText
  location?: LocalizedText
  employmentType?: LocalizedText
  summary?: LocalizedText
  responsibilities?: Array<LocalizedText | null>
}

const fallbackTranslationKeys: Record<
  string,
  {
    title: "distributionOperationsStaff" | "salesAccountExecutive"
    summary: "distributionOperationsSummary" | "salesAccountSummary"
    department: "operations" | "commercial"
  }
> = {
  "staff-operasional-distribusi": {
    title: "distributionOperationsStaff",
    summary: "distributionOperationsSummary",
    department: "operations",
  },
  "sales-account-executive": {
    title: "salesAccountExecutive",
    summary: "salesAccountSummary",
    department: "commercial",
  },
}

function getFallbackOpenings(locale: Locale): CareerOpening[] {
  return careerOpenings.map((opening) => {
    const keys = fallbackTranslationKeys[opening.slug]
    if (!keys) return opening

    return {
      ...opening,
      title: translate(locale, keys.title),
      department: translate(locale, keys.department),
      location:
        locale === "en" && opening.slug === "staff-operasional-distribusi"
          ? "Jakarta / Hybrid"
          : opening.location,
      type: translate(locale, "fullTime"),
      summary: translate(locale, keys.summary),
    }
  })
}

function localizedValue(value: LocalizedText | undefined, locale: Locale) {
  return value?.[locale] || value?.id || ""
}

export async function getCareerOpenings(locale: Locale): Promise<CareerOpening[]> {
  const documents =
    await sanityClient.fetch<SanityCareerOpening[]>(CAREER_OPENINGS_QUERY)

  if (documents.length === 0) return getFallbackOpenings(locale)

  return documents
    .filter(
      (opening): opening is SanityCareerOpening & { slug: string } =>
        opening.isActive !== false &&
        typeof opening.slug === "string" &&
        opening.slug.length > 0
    )
    .map((opening) => ({
      slug: opening.slug,
      title: localizedValue(opening.title, locale),
      department: localizedValue(opening.department, locale),
      location: localizedValue(opening.location, locale),
      type: localizedValue(opening.employmentType, locale),
      summary: localizedValue(opening.summary, locale),
      responsibilities: (opening.responsibilities ?? [])
        .map((responsibility) => localizedValue(responsibility ?? undefined, locale))
        .filter(Boolean),
    }))
}
