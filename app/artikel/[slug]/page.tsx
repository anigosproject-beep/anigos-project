import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react"

import {
  formatArticleDate,
  getArticleBySlug,
  newsroomArticles,
  newsroomCategories,
} from "@/lib/newsroom-data"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  return article
    ? { title: `${article.title} | Petro Anigos`, description: article.excerpt }
    : { title: "Artikel | Petro Anigos" }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const category = newsroomCategories.find((item) => item.slug === article.category)
  const subcategory = category?.subcategories.find(
    (item) => item.slug === article.subcategory
  )
  const recommendations = newsroomArticles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3)

  return (
    <main>
      <article className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/artikel/anigos-news" className="hover:text-foreground">Artikel</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category?.name ?? "Berita"}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(15rem,1fr)] lg:gap-16">
            <div className="min-w-0">
              <header className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{category?.name ?? "Artikel"}</Badge>
                  {subcategory ? <Badge variant="outline">{subcategory.name}</Badge> : null}
                </div>
                <Heading level={1} className="mt-6 text-4xl leading-tight lg:text-6xl">
                  {article.title}
                </Heading>
                <Text variant="lead" className="mt-6 max-w-3xl text-muted-foreground">
                  {article.excerpt}
                </Text>
                <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                  <span>{formatArticleDate(article.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4" />
                    {article.readTime} baca
                  </span>
                </div>
              </header>

              <div className="mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-muted lg:mt-14">
                <Image
                  src={article.image}
                  alt=""
                  width={1400}
                  height={788}
                  priority
                  className="size-full object-cover"
                />
              </div>

              <div className="mt-10 max-w-3xl space-y-6 lg:mt-14">
                {article.content.map((paragraph) => (
                  <Text key={paragraph} variant="lead" className="leading-8">
                    {paragraph}
                  </Text>
                ))}
              </div>

              <Separator className="my-10 max-w-3xl" />
              <Link
                href="/artikel/anigos-news"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="size-4" />
                Kembali ke newsroom
              </Link>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-2 border-foreground pt-4">
                <p className="text-sm font-semibold tracking-tight">Baca juga</p>
                <div className="mt-5 space-y-5">
                  {recommendations.map((recommendation) => (
                    <Link
                      key={recommendation.slug}
                      href={`/artikel/${recommendation.slug}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden transition-colors group-hover:border-primary/50">
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <Image
                            src={recommendation.image}
                            alt=""
                            width={500}
                            height={281}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground">
                            {formatArticleDate(recommendation.date)}
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-5 tracking-tight">
                            {recommendation.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/artikel/anigos-news"
                className={buttonVariants({ variant: "outline", className: "mt-6 w-full" })}
              >
                Semua artikel
                <ArrowRight data-icon="inline-end" />
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}
