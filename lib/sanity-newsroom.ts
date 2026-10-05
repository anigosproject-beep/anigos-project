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
  gallery?: Array<{
    _key?: string
    url?: string
    alt?: string
    caption?: string
    width?: number
    height?: number
  }>
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

const articleGalleryQuery = `*[
  _type in ["newsroomArticle", "article"] &&
  slug.current == $slug &&
  (_type != "article" || isPublished != false)
][0]{
  "gallery": coalesce(gallery[]{
    _key,
    "url": image.asset->url,
    "alt": ${localized("image.alt")},
    "caption": ${localized("caption")},
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }, [])
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
  articleSlug?: string
}) {
  const locale =
    options?.locale ??
    ((await cookies()).get("locale")?.value === "en" ? "en" : "id")
  const client =
    options?.useDraftMode === false
      ? sanityClient
      : await getSanityClientForCurrentMode()
  const [data, articleGallery] = await Promise.all([
    client.fetch<{
      categories: NewsroomCategory[]
      articles: SanityArticle[]
    }>(newsroomQuery, { lang: locale }),
    options?.articleSlug
      ? client.fetch<{ gallery?: NonNullable<SanityArticle["gallery"]> } | null>(
          articleGalleryQuery,
          { lang: locale, slug: options.articleSlug }
        )
      : Promise.resolve(null),
  ])

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
      gallery:
        article.slug === options?.articleSlug
          ? articleGallery?.gallery
              ?.filter(
                (image): image is typeof image & { url: string } =>
                  typeof image.url === "string" && image.url.length > 0
              )
              .map((image, index) => {
                const fallbackLabel =
                  locale === "en" ? `Article image ${index + 1}` : `Foto artikel ${index + 1}`
                return {
                  _key: image._key,
                  src: image.url,
                  alt: image.alt?.trim() || fallbackLabel,
                  caption: image.caption?.trim() || image.alt?.trim() || fallbackLabel,
                  width: image.width,
                  height: image.height,
                }
              })
          : undefined,
    }))

  return { categories, articles, locale }
}
