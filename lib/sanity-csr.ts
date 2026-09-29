import { getSanityClientForCurrentMode } from "@/lib/sanity-client"

export type SanityCsrActivity = {
  _key?: string
  date?: string
  title?: { id?: string; en?: string }
  description?: { id?: string; en?: string }
  image?: { url?: string; alt?: string }
  document?: { url?: string; originalFilename?: string }
}

export type SanityCsrYear = {
  _key?: string
  year: number
  summary?: { id?: string; en?: string }
  activities?: SanityCsrActivity[]
}

export type SanityCsrPage = {
  intro?: {
    title?: { id?: string; en?: string }
    description?: { id?: string; en?: string }
  }
  years?: SanityCsrYear[]
}

export async function getSanityCsrPage(): Promise<SanityCsrPage | null> {
  const client = await getSanityClientForCurrentMode()

  return client.fetch<SanityCsrPage | null>(
    `*[_type == "energiBerkelanjutanPage"][0]{
      "intro": csrIntro{
        title{id, en},
        description{id, en}
      },
      "years": csrYears[]{
        _key,
        year,
        summary{id, en},
        activities[]{
          _key,
          date,
          title{id, en},
          description{id, en},
          "image": image{"url": asset->url, alt},
          "document": document{
            "url": asset->url,
            "originalFilename": asset->originalFilename
          }
        }
      }
    }`
  )
}
