import {
  getSanityClientForCurrentMode,
  sanityImageUrl,
} from "@/lib/sanity-client"
import { cookies } from "next/headers"
import type { Locale } from "@/lib/i18n"
import type { SanityRichTextBlock } from "@/lib/sanity-content-types"

export type TeamCategory =
  "komisaris" | "direksi" | "operasional" | "armada" | "kemitraan"

export type TeamMember = {
  initials: string
  image?: string
  imageAlt?: string
  imageUploadedAt?: string
  name: string
  role: string
  description: string
  quote?: string
  biography?: SanityRichTextBlock[]
  gallery?: Array<{
    src: string
    alt: string
    caption: string
    uploadedAt?: string
  }>
}

export type TeamDivisionGroup = {
  name: string
  description: string
  members: TeamMember[]
}

type SanityTeamMember = {
  _id?: string
  name: string
  structuralClass?: "komisaris" | "direksi" | "tim-divisi"
  officialTitle?: string
  directorPosition?: string
  customDirectorPosition?: string
  divisionRole?: "anggota" | "kepala-divisi" | "tim-divisi" | "other"
  customDivisionRole?: string
  division?: { _id?: string; name?: string }
  photo?: { asset?: { _ref?: string }; alt?: string }
  photoUploadedAt?: string
  gallery?: Array<{
    _key?: string
    image?: { asset?: { _ref?: string } }
    alt?: string
    caption?: string
    uploadedAt?: string
  }>
  quote?: string
  description?: string
  biography?: SanityRichTextBlock[]
  order?: number
  isPublished?: boolean
}

const teamQuery = `*[_type == "teamMember" && isPublished != false] | order(structuralClass asc, order asc, name asc) {
  _id,
  name,
  structuralClass,
  officialTitle,
  directorPosition,
  customDirectorPosition,
  divisionRole,
  customDivisionRole,
  division->{_id, name},
  "photo": photo{"asset": asset, "alt": coalesce(alt[$lang], alt.id, alt)},
  "photoUploadedAt": photo.asset->_createdAt,
  gallery[]{
    _key,
    image,
    "alt": coalesce(image.alt[$lang], image.alt.id, image.alt),
    "caption": coalesce(caption[$lang], caption.id, caption),
    "uploadedAt": image.asset->_createdAt
  },
  quote,
  description,
  biography[]{
    _key,
    _type,
    style,
    listItem,
    markDefs[]{_key, _type, href},
    children[]{_key, _type, text, marks}
  },
  order,
  isPublished
}`

const initialsFromName = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

const formatDivisionRole = (member: SanityTeamMember) => {
  if (member.structuralClass === "direksi") {
    return member.directorPosition === "other"
      ? member.customDirectorPosition || "Direksi"
      : member.directorPosition || member.officialTitle || "Direksi"
  }
  if (member.structuralClass === "komisaris") return "Komisaris"

  if (!member.division) return "Tim Divisi"

  const roleLabel =
    member.divisionRole === "kepala-divisi"
      ? "Kepala Divisi"
      : member.divisionRole === "other"
        ? member.customDivisionRole || "Lainnya"
        : "Anggota"

  return `${roleLabel} - ${member.division.name ?? "Divisi"}`
}

const toTeamMember = (member: SanityTeamMember, locale: Locale): TeamMember => ({
  initials: initialsFromName(member.name),
  image: sanityImageUrl(member.photo),
  imageAlt:
    member.photo?.alt?.trim() ||
    (locale === "en"
      ? `Portrait of ${member.name}`
      : `Foto ${member.name}`),
  imageUploadedAt: member.photoUploadedAt,
  name: member.name,
  role: formatDivisionRole(member),
  description: member.description ?? "",
  quote: member.quote ?? member.description,
  biography: member.biography ?? [],
  gallery: (member.gallery ?? []).flatMap((image) => {
    const src = sanityImageUrl(image.image)
    if (!src) return []

    return [
      {
        src,
        alt:
          image.alt?.trim() ||
          (locale === "en"
            ? `Photo of ${member.name}`
            : `Foto ${member.name}`),
        caption:
          image.caption?.trim() ||
          (locale === "en"
            ? `Photo documentation of ${member.name}`
            : `Dokumentasi ${member.name}`),
        uploadedAt: image.uploadedAt,
      },
    ]
  }),
})

export async function getSanityTeam(locale?: Locale): Promise<
  Record<TeamCategory, TeamMember[]>
> {
  const lang =
    locale ?? ((await cookies()).get("locale")?.value === "en" ? "en" : "id")
  const client = await getSanityClientForCurrentMode()
  const rows = await client.fetch<SanityTeamMember[]>(teamQuery, { lang })

  const categories: Record<TeamCategory, TeamMember[]> = {
    komisaris: [],
    direksi: [],
    operasional: [],
    armada: [],
    kemitraan: [],
  }

  for (const member of rows) {
    const category =
      member.structuralClass === "tim-divisi"
        ? "operasional"
        : member.structuralClass
    if (!category || !categories[category]) continue

    categories[category].push(toTeamMember(member, lang))
  }

  return categories
}

export async function getSanityTeamDivisions(
  locale?: Locale
): Promise<TeamDivisionGroup[]> {
  const lang =
    locale ?? ((await cookies()).get("locale")?.value === "en" ? "en" : "id")
  const client = await getSanityClientForCurrentMode()
  const [divisions, members] = await Promise.all([
    client.fetch<
      Array<{
        _id: string
        name: string
        description?: string
      }>
    >(
      '*[_type == "teamDivision" && isActive != false] | order(order asc, name asc) {_id, name, description}'
    ),
    client.fetch<SanityTeamMember[]>(teamQuery, { lang }),
  ])

  return divisions.map((division) => ({
    name: division.name,
    description: division.description ?? "",
    members: members
      .filter(
        (member) =>
          member.structuralClass === "tim-divisi" &&
          member.division?._id === division._id
      )
      .map((member) => toTeamMember(member, lang)),
  }))
}
