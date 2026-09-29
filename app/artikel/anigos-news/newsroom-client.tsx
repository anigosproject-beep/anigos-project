"use client"

import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import {
  formatArticleDate,
  getNewsroomSegments,
  type NewsroomArticle,
  type NewsroomCategory,
} from "@/lib/newsroom-data"
import { PageHero } from "@/components/sections"
import { SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ContentVideoPlayer } from "@/components/content-video-player"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

function NewsroomArticleRow({
  article,
  categoryLabel,
  subcategoryLabel,
  compact = false,
}: {
  article: NewsroomArticle
  categoryLabel: string
  subcategoryLabel?: string
  compact?: boolean
}) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className={`group flex min-h-0 rounded-2xl border border-border bg-background transition-colors hover:border-primary/50 ${
        compact
          ? "flex-row gap-3 p-2.5"
          : "flex-col gap-3 p-2.5 sm:min-h-40 sm:flex-row sm:gap-5 sm:p-4"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl bg-muted ${
          compact
            ? "aspect-square w-20 sm:w-24"
            : "aspect-[16/10] w-full sm:aspect-square sm:w-32"
        }`}
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes={compact ? "96px" : "(min-width: 640px) 128px, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div
        className={`min-w-0 px-0.5 pb-1 ${
          compact ? "py-0.5" : "sm:py-1 sm:pl-0"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`max-w-full truncate ${
              compact ? "text-[9px]" : "text-[10px] sm:text-xs"
            }`}
          >
            {categoryLabel}
          </Badge>
          {subcategoryLabel ? (
            <span
              className={`truncate text-muted-foreground ${
                compact ? "text-[9px]" : "text-[10px] sm:text-xs"
              }`}
            >
              {subcategoryLabel}
            </span>
          ) : null}
        </div>
        <h3
          className={`font-semibold tracking-tight transition-colors group-hover:text-primary ${
            compact
              ? "mt-1.5 line-clamp-2 text-xs leading-4 sm:text-sm"
              : "mt-2 line-clamp-3 text-sm sm:mt-3 sm:line-clamp-2 sm:text-lg"
          }`}
        >
          {article.title}
        </h3>
        {!compact ? (
          <Text
            variant="small"
            className="mt-2 line-clamp-2 text-xs sm:text-sm"
          >
            {article.excerpt}
          </Text>
        ) : null}
        <p
          className={`text-muted-foreground ${
            compact ? "mt-1.5 text-[9px]" : "mt-3 text-[10px] sm:text-xs"
          }`}
        >
          {formatArticleDate(article.date)} · {article.readTime}
        </p>
      </div>
    </Link>
  )
}

type NewsroomClientProps = {
  articles: NewsroomArticle[]
  categories: NewsroomCategory[]
}

function AnigosNewsContent({ articles, categories }: NewsroomClientProps) {
  const { locale } = useLocale()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialSubcategory = searchParams.get("subcategory")
  const validCategory = categories.some(
    (category) => category.slug === initialCategory
  )
    ? (initialCategory ?? "semua")
    : "semua"
  const validSubcategory = categories.some((category) =>
    category.subcategories.some(
      (subcategory) => subcategory.slug === initialSubcategory
    )
  )
    ? (initialSubcategory ?? "semua")
    : "semua"
  const [activeCategory, setActiveCategory] = useState(() => validCategory)
  const [activeSubcategory, setActiveSubcategory] = useState(
    () => validSubcategory
  )
  const [query, setQuery] = useState("")

  const visibleSubcategories = useMemo(() => {
    if (activeCategory === "semua") {
      return categories.flatMap((category) => category.subcategories)
    }

    return (
      categories.find((category) => category.slug === activeCategory)
        ?.subcategories ?? []
    )
  }, [activeCategory, categories])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "semua" || article.category === activeCategory
      const matchesSubcategory =
        activeSubcategory === "semua" ||
        article.subcategory === activeSubcategory
      const matchesSearch =
        !normalizedQuery ||
        `${article.title} ${article.excerpt}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesSubcategory && matchesSearch
    })
  }, [activeCategory, activeSubcategory, query, articles])

  const categorySegments = useMemo(
    () => getNewsroomSegments(filteredArticles, categories),
    [filteredArticles, categories]
  )

  function selectCategory(category: string) {
    setActiveCategory(category)
    setActiveSubcategory("semua")
  }

  const latestArticles = useMemo(() => {
    const sortedArticles = [...filteredArticles].sort((a, b) =>
      b.date.localeCompare(a.date)
    )
    const featuredArticle = sortedArticles.find((article) => article.featured)
    const latestByCategory = categories
      .map((category) =>
        sortedArticles.find((article) => article.category === category.slug)
      )
      .filter((article): article is NewsroomArticle => Boolean(article))
      .filter((article) => article.slug !== featuredArticle?.slug)
      .sort((a, b) => b.date.localeCompare(a.date))
    const selectedSlugs = new Set([
      featuredArticle?.slug,
      ...latestByCategory.map((article) => article.slug),
    ])
    const additionalArticles = sortedArticles.filter(
      (article) => !selectedSlugs.has(article.slug)
    )

    return {
      featuredArticle,
      articles: [...latestByCategory, ...additionalArticles].slice(0, 6),
    }
  }, [categories, filteredArticles])

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "newsroomEyebrow")}
        title={translate(locale, "newsroomTitle")}
        description={translate(locale, "newsroomDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="anigos-news"
        breadcrumbs={[{ label: translate(locale, "articles"), href: "/artikel/anigos-news" }]}
      />

      <section
        data-motion="hero"
        className="border-b border-border bg-background py-10 lg:py-14"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectCategory("semua")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeCategory === "semua" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}
              >
                {translate(locale, "newsroomAllCategories")}
              </button>
              {categories.map((category) => (
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
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={translate(locale, "newsroomSearch")}
                className="pl-9"
                aria-label={translate(locale, "newsroomSearch")}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setActiveSubcategory("semua")}
              className={`text-sm ${activeSubcategory === "semua" ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {translate(locale, "newsroomAllSubcategories")}
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

      <section
        data-motion="hero"
        className="relative isolate overflow-hidden bg-muted/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow={translate(locale, "newsroomLatest")}
              title={translate(locale, "newsroomLatestTitle")}
            />
            <Text variant="small" className="hidden sm:block">
              {filteredArticles.length} {translate(locale, "newsroomArticleCount")}
            </Text>
          </div>
          {latestArticles.featuredArticle ||
          latestArticles.articles.length > 0 ? (
            <>
              {latestArticles.featuredArticle ? (
                <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
                  <Link
                    href={`/artikel/${latestArticles.featuredArticle.slug}`}
                    className="group overflow-hidden rounded-4xl border border-border bg-background shadow-sm transition-colors hover:border-primary/50"
                  >
                    <div className="aspect-[16/9] bg-muted lg:aspect-[4/3]">
                      <Image
                        src={latestArticles.featuredArticle.image}
                        alt=""
                        width={1200}
                        height={900}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 lg:p-8">
                      <Badge variant="secondary" className="w-fit">
                        {translate(locale, "newsroomFeatured")}
                      </Badge>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight lg:text-4xl">
                        {latestArticles.featuredArticle.title}
                      </h2>
                      <Text variant="body-muted" className="mt-4">
                        {latestArticles.featuredArticle.excerpt}
                      </Text>
                      <p className="mt-5 text-xs text-muted-foreground">
                        {formatArticleDate(latestArticles.featuredArticle.date)}{" "}
                        · {latestArticles.featuredArticle.readTime}
                      </p>
                    </div>
                  </Link>
                  <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {latestArticles.articles.map((article) => {
                      const category = categories.find(
                        (item) => item.slug === article.category
                      )
                      return (
                        <NewsroomArticleRow
                          key={article.slug}
                          article={article}
                          compact
                          categoryLabel={category?.name ?? article.category}
                          subcategoryLabel={
                            category?.subcategories.find(
                              (subcategory) =>
                                subcategory.slug === article.subcategory
                            )?.name
                          }
                        />
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
                  {latestArticles.articles.map((article) => {
                    const category = categories.find(
                      (item) => item.slug === article.category
                    )
                    return (
                      <NewsroomArticleRow
                        key={article.slug}
                        article={article}
                        categoryLabel={category?.name ?? article.category}
                        subcategoryLabel={
                          category?.subcategories.find(
                            (subcategory) =>
                              subcategory.slug === article.subcategory
                          )?.name
                        }
                      />
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-10 text-center">
              <p className="font-medium">{translate(locale, "newsroomEmpty")}</p>
              <Text variant="small" className="mt-2">
                {translate(locale, "newsroomSearchHint")}
              </Text>
            </div>
          )}
        </div>
      </section>

      <section
        data-motion="hero"
        className="border-b border-border bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={translate(locale, "newsroomBrowseCategories")}
              title={translate(locale, "newsroomCategoryTitle")}
              description={translate(locale, "newsroomCategoryDescription")}
            />
            <Text variant="small" className="shrink-0">
              {categorySegments.length} {translate(locale, "newsroomActiveSegments")}
            </Text>
          </div>

          <div className="mt-14 space-y-16">
            {categorySegments.map((category) => (
              <section
                key={category.slug}
                data-motion="hero"
                aria-labelledby={`category-${category.slug}`}
              >
                {(() => {
                  const videoArticle = category.articles.find(
                    (article) => article.video
                  )
                  return (
                    <>
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
                          {category.articles.length} {translate(locale, "newsroomArticleCount")}
                        </span>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
                        {videoArticle ? (
                          <div className="col-span-2 grid gap-5 rounded-3xl border border-border bg-muted/30 p-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(14rem,0.8fr)] sm:p-5">
                            <ContentVideoPlayer
                              src={videoArticle.video!}
                              poster={videoArticle.videoPoster}
                              title={videoArticle.title}
                              className="rounded-2xl shadow-none"
                            />
                            <div className="flex flex-col justify-center">
                              <Badge variant="secondary" className="w-fit">
                                {translate(locale, "newsroomVideoCategory")}
                              </Badge>
                              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                                {videoArticle.title}
                              </h3>
                              <Text variant="small" className="mt-3">
                                {translate(locale, "newsroomVideoDescription")}
                              </Text>
                            </div>
                          </div>
                        ) : null}
                        {category.articles.map((article) => (
                          <NewsroomArticleRow
                            key={article.slug}
                            article={article}
                            categoryLabel={category.name}
                            subcategoryLabel={
                              category.subcategories.find(
                                (subcategory) =>
                                  subcategory.slug === article.subcategory
                              )?.name
                            }
                          />
                        ))}
                      </div>
                    </>
                  )
                })()}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default function AnigosNewsPage({
  articles,
  categories,
}: NewsroomClientProps) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-background" />}>
      <AnigosNewsContent articles={articles} categories={categories} />
    </Suspense>
  )
}
