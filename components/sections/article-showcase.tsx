"use client"

import Image from "next/image"
import Link from "@/components/site-link"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Heading, Text } from "@/components/typography"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { Reveal } from "@/components/motion"
import {
  SectionContainer,
  SectionShell,
} from "@/components/layout/section-shell"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

type ShowcaseArticle = {
  category: string
  title: string
  description: string
  href: string
  image: string
  alt: string
}

const fallbackArticles: ShowcaseArticle[] = [
  {
    category: "articleEnergyCategory",
    title: "articleEnergyTitle",
    description: "articleEnergyDescription",
    href: "/artikel/anigos-news",
    image: "/images/articles/article-b40.svg",
    alt: "Visual B40 Biosolar",
  },
  {
    category: "articleOperationsCategory",
    title: "articleOperationsTitle",
    description: "articleOperationsDescription",
    href: "/artikel/anigos-news",
    image: "/images/articles/article-operation.svg",
    alt: "Visual operasional distribusi BBM",
  },
  {
    category: "articleInsightsCategory",
    title: "articleInsightsTitle",
    description: "articleInsightsDescription",
    href: "/artikel/publikasi",
    image: "/images/resources/resource-publication.svg",
    alt: "Visual publikasi PT. Anigos Jaya Perkasa",
  },
]

export function ArticleShowcase() {
  const { locale } = useLocale()
  const [articles, setArticles] = useState<ShowcaseArticle[]>(fallbackArticles)

  useEffect(() => {
    const controller = new AbortController()

    fetch("/api/newsroom", { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Newsroom request failed: ${response.status}`)
        return response.json() as Promise<{
          articles?: Array<{
            slug: string
            title: string
            excerpt: string
            category: string
            categoryName?: string
            date: string
            image: string
          }>
        }>
      })
      .then((data) => {
        const latestArticles = (data.articles ?? [])
          .filter((article) => article.slug && article.title && article.date)
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 3)
          .map((article) => ({
            category: article.categoryName ?? article.category,
            title: article.title,
            description: article.excerpt,
            href: `/artikel/${article.slug}`,
            image: article.image,
            alt: article.title,
          }))

        if (latestArticles.length > 0) setArticles(latestArticles)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load newsroom articles for homepage", error)
      })

    return () => controller.abort()
  }, [locale])

  const [featured, ...secondary] = articles

  return (
    <SectionShell id="artikel" className="bg-muted/40 py-24 lg:py-32">
      <SectionContainer>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl" delay={0.04}>
            <Badge variant="secondary">
              {translate(locale, "articleSectionLabel")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "articleSectionTitle")}
            </Heading>
            <Text variant="lead" className="mt-5">
              {translate(locale, "articleSectionDescription")}
            </Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              href="/artikel/anigos-news"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              {translate(locale, "viewAllArticles")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal className="group" delay={0.3}>
            <AspectRatio
              ratio={1.45}
              className="overflow-hidden rounded-4xl bg-muted"
            >
              <Image
                src={featured.image}
                alt={featured.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </AspectRatio>
            <Link
              href={featured.href}
              className="mt-4 block rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Card className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <CardHeader className="gap-3">
                  <Badge variant="outline" className="w-fit">
                    {featured.category}
                  </Badge>
                  <CardTitle className="text-2xl leading-tight">
                    {featured.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {featured.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>

          <div className="grid gap-8">
            {secondary.map((article, index) => (
              <Reveal
                key={article.title}
                className="group"
                delay={0.36 + index * 0.06}
              >
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-start">
                  <AspectRatio
                    ratio={1}
                    className="overflow-hidden rounded-3xl bg-muted"
                  >
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      sizes="(min-width: 640px) 8rem, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <Link
                    href={article.href}
                    className="block rounded-3xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                      <CardHeader className="gap-2">
                        <Badge variant="outline" className="w-fit">
                          {article.category}
                        </Badge>
                        <CardTitle className="flex items-start justify-between gap-3 text-lg leading-tight">
                          {article.title}
                          <ArrowUpRight
                            className={cn(
                              "size-4 shrink-0 text-muted-foreground transition-transform",
                              "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                            )}
                          />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {article.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
