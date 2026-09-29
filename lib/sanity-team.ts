import {
  getSanityClientForCurrentMode,
  sanityImageUrl,
} from "@/lib/sanity-client"

export type TeamCategory =
  "komisaris" | "direksi" | "operasional" | "armada" | "kemitraan"

export type TeamMember = {
  initials: string
  image: string
  name: string
  role: string
  description: string
  gallery?: Array<{
    src: string
    alt: string
    caption: string
  }>
}

export type TeamDivisionGroup = {
  name: string
  members: TeamMember[]
}

type SanityTeamMember = {
  name: string
  structuralClass?: "komisaris" | "direksi" | "tim-divisi"
  officialTitle?: string
  divisionRole?: "kepala-divisi" | "tim-divisi" | "other"
  customDivisionRole?: string
  division?: { name?: string }
  photo?: { asset?: { _ref?: string } }
  gallery?: Array<{
    _key?: string
    image?: { asset?: { _ref?: string } }
    alt?: string
    caption?: string
  }>
  description?: string
  order?: number
  isPublished?: boolean
}

const teamQuery = `*[_type == "teamMember" && isPublished != false] | order(structuralClass asc, order asc, name asc) {
  name,
  structuralClass,
  officialTitle,
  divisionRole,
  customDivisionRole,
  division->{name},
  photo,
  gallery[]{
    _key,
    image,
    alt,
    caption
  },
  description,
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
  if (member.officialTitle) return member.officialTitle

  if (!member.division) return "Tim Divisi"

  const roleLabel =
    member.divisionRole === "kepala-divisi"
      ? "Kepala Divisi"
      : member.divisionRole === "other"
        ? member.customDivisionRole || "Lainnya"
        : "Tim Divisi"

  return `${roleLabel} - ${member.division.name ?? "Divisi"}`
}

const toTeamMember = (member: SanityTeamMember): TeamMember => ({
  initials: initialsFromName(member.name),
  image:
    sanityImageUrl(member.photo) ?? "/images/team/portrait-placeholder.svg",
  name: member.name,
  role: formatDivisionRole(member),
  description: member.description ?? "",
  gallery: (member.gallery ?? []).flatMap((image) => {
    const src = sanityImageUrl(image.image)
    if (!src) return []

    return [
      {
        src,
        alt: image.alt?.trim() || `Foto ${member.name}`,
        caption: image.caption?.trim() || `Dokumentasi ${member.name}`,
      },
    ]
  }),
})

export async function getSanityTeam(): Promise<
  Record<TeamCategory, TeamMember[]>
> {
  const client = await getSanityClientForCurrentMode()
  const rows = await client.fetch<SanityTeamMember[]>(teamQuery)

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

    categories[category].push(toTeamMember(member))
  }

  return categories
}

export async function getSanityTeamDivisions(): Promise<TeamDivisionGroup[]> {
  const client = await getSanityClientForCurrentMode()
  const rows = await client.fetch<SanityTeamMember[]>(teamQuery)
  const map = new Map<string, TeamMember[]>()

  for (const member of rows) {
    if (member.structuralClass !== "tim-divisi") continue

    const divisionName = member.division?.name?.trim() || "Divisi Umum"
    const list = map.get(divisionName) ?? []
    list.push(toTeamMember(member))
    map.set(divisionName, list)
  }

  return Array.from(map.entries())
    .map(([name, members]) => ({ name, members }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
