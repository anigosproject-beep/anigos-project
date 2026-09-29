import { NextResponse } from "next/server"

import { getSanityNewsroom } from "@/lib/sanity-newsroom"

export const dynamic = "force-dynamic"

export async function GET() {
  const { articles, categories } = await getSanityNewsroom()
  const categoryNames = new Map(categories.map((category) => [category.slug, category.name]))

  return NextResponse.json({
    articles: articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      categoryName: categoryNames.get(article.category),
      date: article.date,
      image: article.image,
    })),
  })
}
