import {
  getSanityClientForCurrentMode,
  sanityClient,
  sanityImageUrl,
} from "@/lib/sanity-client"
import type { NewsroomArticle, NewsroomCategory } from "@/lib/newsroom-data"

type SanityArticle = {
  _id: string
  title: string
  slug?: string
  excerpt: string
  category?: {
    slug?: string
    name?: string
  }
  subcategory?: string
  date: string
  readTime?: string
  image?: { asset?: { _ref?: string } }
  video?: string
  videoPoster?: { asset?: { _ref?: string } }
  featured?: boolean
  content?: Array<{
    _type?: string
    children?: Array<{ text?: string }>
    text?: string
  }>
}

const newsroomQuery = `{
  "categories": *[_type == "newsroomCategory"] | order(name asc) {
    "slug": slug.current,
    name,
    description,
    "subcategories": coalesce(subcategories[] {
      "slug": slug.current,
      name
    }, [])
  },
  "articles": *[
    _type in ["newsroomArticle", "article"] &&
    (_type != "article" || isPublished != false)
  ] | order(date desc, _createdAt desc) {
    _id, title, "slug": slug.current, excerpt,
    "category": select(
      defined(category->) => category->{"slug": slug.current, name},
      defined(category) => {"slug": category, "name": category}
    ),
    subcategory, date, readTime, image,
    "video": video.asset->url, videoPoster, featured,
    content[]{
      _type,
      text,
      children[]{text}
    }
  }
}`

const getArticleParagraphs = (content: SanityArticle["content"]): string[] =>
  (content ?? [])
    .map((block) => {
      if (block._type === "text" || block._type === "articleParagraph") {
        return block.text?.trim() ?? ""
      }
      return (block.children ?? [])
        .map((child) => child.text ?? "")
        .join("")
        .trim()
    })
    .filter(Boolean)

export async function getSanityNewsroom(options?: { useDraftMode?: boolean }) {
  const client =
    options?.useDraftMode === false
      ? sanityClient
      : await getSanityClientForCurrentMode()
  const data = await client.fetch<{
    categories: NewsroomCategory[]
    articles: SanityArticle[]
  }>(newsroomQuery)

  const categories = data.categories

  const articles: NewsroomArticle[] = data.articles
    .filter((article) => article.slug && article.category?.slug)
    .map((article) => ({
      slug: article.slug!,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category!.slug!,
      subcategory: article.subcategory ?? "",
      date: article.date,
      readTime: article.readTime ?? "Baca",
      image:
        sanityImageUrl(article.image) ??
        "/images/articles/article-operation.svg",
      video: article.video,
      videoPoster: sanityImageUrl(article.videoPoster),
      featured: article.featured,
      content: getArticleParagraphs(article.content),
    }))

  return { categories, articles }
}
