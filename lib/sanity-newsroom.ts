import {
  getSanityClientForCurrentMode,
  sanityClient,
  sanityImageUrl,
} from "@/lib/sanity-client"
import { cookies } from "next/headers"
import type { Locale } from "@/lib/i18n"
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

const localized = (field: string) => `select(
  defined(${field}.id) => select(
    defined(${field}[$lang]) && ${field}[$lang] != "" => ${field}[$lang],
    ${field}.id
  ),
  ${field}
)`

const newsroomQuery = `{
  "categories": *[_type == "newsroomCategory"] | order(name.id asc) {
    "slug": slug.current,
    "name": ${localized("name")},
    "description": ${localized("description")},
    "subcategories": coalesce(subcategories[] {
      "slug": slug.current,
      "name": ${localized("name")}
    }, [])
  },
  "articles": *[
    _type in ["newsroomArticle", "article"] &&
    (_type != "article" || isPublished != false)
  ] | order(date desc, _createdAt desc) {
    _id,
    "title": ${localized("title")},
    "slug": slug.current,
    "excerpt": ${localized("excerpt")},
    "category": select(
      defined(category->) => category->{
        "slug": slug.current,
        "name": ${localized("name")}
      },
      defined(category) => {"slug": category, "name": category}
    ),
    subcategory, date,
    "readTime": ${localized("readTime")},
    image,
    "video": video.asset->url, videoPoster, featured,
    content[]{
      _type,
      "text": ${localized("text")},
      children[]{
        "text": ${localized("text")}
      }
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

export async function getSanityNewsroom(options?: {
  useDraftMode?: boolean
  locale?: Locale
}) {
  const locale =
    options?.locale ??
    ((await cookies()).get("locale")?.value === "en" ? "en" : "id")
  const client =
    options?.useDraftMode === false
      ? sanityClient
      : await getSanityClientForCurrentMode()
  const data = await client.fetch<{
    categories: NewsroomCategory[]
    articles: SanityArticle[]
  }>(newsroomQuery, { lang: locale })

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
      readTime: article.readTime ?? (locale === "en" ? "Read" : "Baca"),
      image:
        sanityImageUrl(article.image) ??
        "/images/articles/article-operation.svg",
      video: article.video,
      videoPoster: sanityImageUrl(article.videoPoster),
      featured: article.featured,
      content: getArticleParagraphs(article.content),
    }))

  return { categories, articles, locale }
}
