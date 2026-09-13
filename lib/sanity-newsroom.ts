import { sanityClient, sanityImageUrl } from "@/lib/sanity-client"
import type { NewsroomArticle, NewsroomCategory } from "@/lib/newsroom-data"

type SanityCategory = {
  _id: string
  name: string
  slug?: string
  description?: string
  subcategories?: Array<{ name: string; slug?: string }>
}

type SanityArticle = {
  _id: string
  title: string
  slug?: { current?: string }
  excerpt: string
  category?: SanityCategory
  subcategory?: string
  date: string
  readTime?: string
  image?: { asset?: { _ref?: string } }
  featured?: boolean
  content?: string[]
}

const newsroomQuery = `{
  "categories": *[_type == "newsroomCategory"] | order(name asc) {
    _id, name, "slug": slug.current, description,
    subcategories[] { name, "slug": slug.current }
  },
  "articles": *[_type == "newsroomArticle"] | order(date desc) {
    _id, title, "slug": slug.current, excerpt,
    category-> { _id, name, "slug": slug.current, description, subcategories[] { name, "slug": slug.current } },
    subcategory, date, readTime, image, featured, content
  }
}`

export async function getSanityNewsroom() {
  const data = await sanityClient.fetch<{
    categories: SanityCategory[]
    articles: SanityArticle[]
  }>(newsroomQuery)

  const categories: NewsroomCategory[] = data.categories
    .filter((category) => category.slug)
    .map((category) => ({
      slug: category.slug!,
      name: category.name,
      description: category.description ?? "",
      subcategories: (category.subcategories ?? [])
        .filter((subcategory) => subcategory.slug)
        .map((subcategory) => ({
          name: subcategory.name,
          slug: subcategory.slug!,
        })),
    }))

  const articles: NewsroomArticle[] = data.articles
    .filter((article) => article.slug?.current && article.category?.slug)
    .map((article) => ({
      slug: article.slug!.current!,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category!.slug!,
      subcategory: article.subcategory ?? "",
      date: article.date,
      readTime: article.readTime ?? "Baca",
      image: sanityImageUrl(article.image) ?? "/images/articles/article-operation.svg",
      featured: article.featured,
      content: article.content ?? [],
    }))

  return { categories, articles }
}
