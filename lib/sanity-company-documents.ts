import {getSanityClientForCurrentMode} from "@/lib/sanity-client"

export type CompanyDocumentKind = "kemitraan" | "legalitas"

export type CompanyDocument = {
  id: string
  title: string
  description: string
  href?: string
  filename?: string
}

type SanityCompanyDocument = {
  _id: string
  title?: string
  description?: string
  file?: {asset?: {url?: string; originalFilename?: string}}
  isPublished?: boolean
}

export async function getSanityCompanyDocuments(kind: CompanyDocumentKind) {
  const client = await getSanityClientForCurrentMode()
  const rows = await client.fetch<SanityCompanyDocument[]>(
    `*[_type == "companyDocument" && documentType == $kind && isPublished != false && defined(file.asset)] | order(issuedAt desc, _createdAt desc) {
      _id, title, description, "file": {"asset": file.asset->{url, originalFilename}}, isPublished
    }`,
    {kind},
  )

  return rows.map((row): CompanyDocument => ({
    id: row._id,
    title: row.title ?? "Dokumen perusahaan",
    description: row.description ?? "",
    href: row.file?.asset?.url,
    filename: row.file?.asset?.originalFilename,
  }))
}
