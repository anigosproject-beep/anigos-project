import {getSanityClientForCurrentMode} from "@/lib/sanity-client"

export type Publication = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  pages: string
  href?: string
  available: boolean
}

type SanityPublication = {
  _id: string
  title?: {id?: string; en?: string}
  description?: {id?: string; en?: string}
  category?: {name?: {id?: string; en?: string}}
  issuedAt?: string
  isPublished?: boolean
  file?: {asset?: {url?: string}}
}

const publicationsQuery = `*[_type == "publicationDocument" && isPublished != false && defined(file.asset)] | order(issuedAt desc, _createdAt desc) {
  _id,
  title,
  description,
  category->{name},
  issuedAt,
  isPublished,
  "file": {"asset": {"url": file.asset->url}}
}`

const fallbackPublications: Publication[] = [
  {
    slug: "company-profile-kemitraan-transportir",
    title: "Company Profile Kemitraan Transportir",
    description:
      "Profil dan informasi izin usaha mitra transportir yang mendukung kegiatan pengangkutan BBM.",
    category: "Company profile",
    date: "2020",
    pages: "Dokumen PDF",
    href: "/documents/company-profile-kemitraan-transportir.pdf",
    available: true,
  },
]

function formatDate(value?: string) {
  if (!value) return "Dokumen PDF"
  return new Intl.DateTimeFormat("id-ID", {year: "numeric"}).format(new Date(value))
}

export async function getSanityPublications(): Promise<Publication[]> {
  const client = await getSanityClientForCurrentMode()
  const rows = await client.fetch<SanityPublication[]>(publicationsQuery)
  if (rows.length === 0) return fallbackPublications

  return rows.map((row) => ({
    slug: row._id.replace(/^[a-z]+-/, ""),
    title: row.title?.id || row.title?.en || "Dokumen PDF",
    description: row.description?.id || row.description?.en || "",
    category: row.category?.name?.id || row.category?.name?.en || "Publikasi",
    date: formatDate(row.issuedAt),
    pages: "Dokumen PDF",
    href: row.file?.asset?.url,
    available: Boolean(row.file?.asset?.url),
  }))
}
