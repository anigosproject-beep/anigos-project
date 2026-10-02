import { sanityAvailabilityClient } from "@/lib/sanity-client"
import type { Locale } from "@/lib/i18n"
import type { CareerOpening } from "@/lib/careers-data"

const CAREER_OPENINGS_QUERY = `*[_type == "careerOpening" && isActive == true] | order(order asc, _createdAt asc) {
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

function localizedValue(value: LocalizedText | undefined, locale: Locale) {
  return value?.[locale] || value?.id || ""
}

export async function getCareerOpenings(
  locale: Locale
): Promise<CareerOpening[]> {
  const documents = await sanityAvailabilityClient.fetch<SanityCareerOpening[]>(
    CAREER_OPENINGS_QUERY
  )

  return documents
    .filter(
      (opening): opening is SanityCareerOpening & { slug: string } =>
        opening.isActive === true &&
        typeof opening._id === "string" &&
        typeof opening.slug === "string" &&
        opening.slug.length > 0
    )
    .map((opening) => ({
      sanityId: opening._id,
      slug: opening.slug,
      title: localizedValue(opening.title, locale),
      department: localizedValue(opening.department, locale),
      location: localizedValue(opening.location, locale),
      type: localizedValue(opening.employmentType, locale),
      summary: localizedValue(opening.summary, locale),
      responsibilities: (opening.responsibilities ?? [])
        .map((responsibility) =>
          localizedValue(responsibility ?? undefined, locale)
        )
        .filter(Boolean),
    }))
}

export async function getActiveCareerOpening(
  slug: string,
  locale: Locale
): Promise<CareerOpening | undefined> {
  const openings = await getCareerOpenings(locale)
  return openings.find((opening) => opening.slug === slug)
}
