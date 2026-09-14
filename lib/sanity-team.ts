import { sanityClient, sanityImageUrl } from "@/lib/sanity-client"

export type TeamCategory = "komisaris" | "direksi" | "operasional" | "armada" | "kemitraan"

export type TeamMember = {
  initials: string
  image: string
  name: string
  role: string
  description: string
}

type SanityTeamMember = {
  name: string
  role: string
  category: TeamCategory
  photo?: { asset?: { _ref?: string } }
  description?: string
  order?: number
  published?: boolean
}

const teamQuery = `*[_type == "teamMember" && published != false] | order(category asc, order asc, name asc) {
  name, role, category, photo, description, order, published
}`

const initialsFromName = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

export async function getSanityTeam(): Promise<Record<TeamCategory, TeamMember[]>> {
  const rows = await sanityClient.fetch<SanityTeamMember[]>(teamQuery)
  const categories: Record<TeamCategory, TeamMember[]> = {
    komisaris: [],
    direksi: [],
    operasional: [],
    armada: [],
    kemitraan: [],
  }

  for (const member of rows) {
    if (!categories[member.category]) continue
    categories[member.category].push({
      initials: initialsFromName(member.name),
      image: sanityImageUrl(member.photo) ?? "/images/team/portrait-placeholder.svg",
      name: member.name,
      role: member.role,
      description: member.description ?? "",
    })
  }

  return categories
}
