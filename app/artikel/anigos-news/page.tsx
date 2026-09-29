import { getSanityNewsroom } from "@/lib/sanity-newsroom"
import AnigosNewsPage from "./newsroom-client"

export const dynamic = "force-dynamic"

export default async function Page() {
  const { articles, categories } = await getSanityNewsroom()

  return <AnigosNewsPage articles={articles} categories={categories} />
}
