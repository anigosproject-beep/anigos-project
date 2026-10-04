import type { Locale } from "@/lib/i18n"

export type NewsroomCategory = {
  slug: string
  name: string
  description: string
  subcategories: Array<{
    slug: string
    name: string
  }>
}

export type NewsroomArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  subcategory: string
  date: string
  readTime: string
  image: string
  video?: string
  videoPoster?: string
  featured?: boolean
  content: string[]
}

export function getNewsroomSegments(
  articles: NewsroomArticle[],
  categories: NewsroomCategory[]
) {
  const knownCategories = new Map(
    categories.map((category) => [category.slug, category])
  )
  const categorySlugs = Array.from(
    new Set([
      ...categories.map((category) => category.slug),
      ...articles.map((article) => article.category),
    ])
  )

  return categorySlugs
    .map((slug) => {
      const category = knownCategories.get(slug)
      const categoryArticles = articles
        .filter((article) => article.category === slug)
        .sort((a, b) => b.date.localeCompare(a.date))

      return {
        slug,
        name: category?.name ?? slug.replaceAll("-", " "),
        description:
          category?.description ??
          `Artikel dan informasi dalam kategori ${slug.replaceAll("-", " ")}.`,
        subcategories: category?.subcategories ?? [],
        articles: categoryArticles,
      }
    })
    .filter((category) => category.articles.length > 0)
}

export function getArticleBySlug(slug: string, articles: NewsroomArticle[]) {
  return articles.find((article) => article.slug === slug)
}

export function formatArticleDate(date: string, locale: Locale = "id") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}
