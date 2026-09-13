"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Clock3 } from "lucide-react"
import { useMemo, useState } from "react"

import {
  formatArticleDate,
  getNewsroomSegments,
  newsroomArticles,
  newsroomCategories,
} from "@/lib/newsroom-data"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

export default function AnigosNewsPage() {
  const [activeCategory, setActiveCategory] = useState("semua")
  const [activeSubcategory, setActiveSubcategory] = useState("semua")
  const [query, setQuery] = useState("")

  const visibleSubcategories = useMemo(() => {
    if (activeCategory === "semua") {
      return newsroomCategories.flatMap((category) => category.subcategories)
    }
    return newsroomCategories.find((category) => category.slug === activeCategory)?.subcategories ?? []
  }, [activeCategory])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return newsroomArticles.filter((article) => {
      const matchesCategory = activeCategory === "semua" || article.category === activeCategory
      const matchesSubcategory = activeSubcategory === "semua" || article.subcategory === activeSubcategory
      const matchesSearch =
        !normalizedQuery ||
        `${article.title} ${article.excerpt}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesSubcategory && matchesSearch
    })
  }, [activeCategory, activeSubcategory, query])

  const categorySegments = useMemo(
    () => getNewsroomSegments(filteredArticles),
    [filteredArticles]
  )

  function selectCategory(category: string) {
    setActiveCategory(category)
    setActiveSubcategory("semua")
  }

  const featured = filteredArticles.find((article) => article.featured) ?? filteredArticles[0]
  const remainingArticles = filteredArticles.filter((article) => article.slug !== featured?.slug)

  return (
    <main>
      <PageHero
        eyebrow="Artikel / Anigos News"
        title="Newsroom Petro Anigos."
        description="Kabar, perspektif, dan informasi yang membantu memahami energi, distribusi, serta cara kami bekerja."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Artikel", href: "/artikel/anigos-news" }]}
      />

      <section className="border-b border-border bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectCategory("semua")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeCategory === "semua" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}
              >
                Semua
              </button>
              {newsroomCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => selectCategory(category.slug)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari artikel..." className="pl-9" aria-label="Cari artikel" />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
            <button type="button" onClick={() => setActiveSubcategory("semua")} className={`text-sm ${activeSubcategory === "semua" ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              Semua subkategori
            </button>
            {visibleSubcategories.map((subcategory) => (
              <button
                key={subcategory.slug}
                type="button"
                onClick={() => setActiveSubcategory(subcategory.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${activeSubcategory === subcategory.slug ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Kabar Terbaru" title="Cerita yang sedang kami rangkum." />
            <Text variant="small" className="hidden sm:block">{filteredArticles.length} artikel</Text>
          </div>
          {featured ? (
            <div className="mt-10 grid overflow-hidden rounded-4xl border border-border bg-background shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
              <div className="min-h-72 bg-muted lg:min-h-96">
                <Image src={featured.image} alt="" width={1200} height={750} className="size-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <Badge variant="secondary" className="w-fit">{newsroomCategories.find((category) => category.slug === featured.category)?.name}</Badge>
                <Heading level={2} className="mt-5">{featured.title}</Heading>
                <Text variant="body-muted" className="mt-5">{featured.excerpt}</Text>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatArticleDate(featured.date)}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />{featured.readTime}</span>
                </div>
                <Link href={`/artikel/${featured.slug}`} className={buttonVariants({ className: "mt-7 w-fit" })}>
                  Baca artikel <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-10 text-center">
              <p className="font-medium">Artikel tidak ditemukan</p>
              <Text variant="small" className="mt-2">Coba gunakan kata kunci atau kategori lain.</Text>
            </div>
          )}
          {remainingArticles.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {remainingArticles.map((article) => (
                <Link key={article.slug} href={`/artikel/${article.slug}`} className="group">
                  <Card className="h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <Image src={article.image} alt="" width={800} height={500} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline">{newsroomCategories.find((category) => category.slug === article.category)?.name}</Badge>
                      <h3 className="mt-4 text-lg font-semibold tracking-tight">{article.title}</h3>
                      <Text variant="small" className="mt-3 line-clamp-3">{article.excerpt}</Text>
                      <p className="mt-5 text-xs text-muted-foreground">{formatArticleDate(article.date)} · {article.readTime}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Jelajahi berdasarkan kategori"
              title="Setiap cerita memiliki konteksnya."
              description="Pilih segmen untuk melihat artikel yang dikelompokkan berdasarkan tema newsroom."
            />
            <Text variant="small" className="shrink-0">
              {categorySegments.length} segmen aktif
            </Text>
          </div>

          <div className="mt-14 space-y-16">
            {categorySegments.map((category) => (
              <section key={category.slug} aria-labelledby={`category-${category.slug}`}>
                <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Badge variant="secondary">{category.name}</Badge>
                    <h2
                      id={`category-${category.slug}`}
                      className="mt-4 text-2xl font-semibold tracking-tight"
                    >
                      {category.description}
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {category.articles.length} artikel
                  </span>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {category.articles.map((article) => (
                    <Link key={article.slug} href={`/artikel/${article.slug}`} className="group">
                      <Card className="h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                        <div className="aspect-[16/10] overflow-hidden bg-muted">
                          <Image
                            src={article.image}
                            alt=""
                            width={800}
                            height={500}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">{category.name}</Badge>
                            {category.subcategories.find(
                              (subcategory) => subcategory.slug === article.subcategory
                            ) ? (
                              <span className="text-xs text-muted-foreground">
                                {
                                  category.subcategories.find(
                                    (subcategory) => subcategory.slug === article.subcategory
                                  )?.name
                                }
                              </span>
                            ) : null}
                          </div>
                          <h3 className="mt-4 text-lg font-semibold tracking-tight">
                            {article.title}
                          </h3>
                          <Text variant="small" className="mt-3 line-clamp-3">
                            {article.excerpt}
                          </Text>
                          <p className="mt-5 text-xs text-muted-foreground">
                            {formatArticleDate(article.date)} · {article.readTime}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
