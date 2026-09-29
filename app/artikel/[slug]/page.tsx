import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react"

import {
  formatArticleDate,
  getArticleBySlug,
} from "@/lib/newsroom-data"
import { getSanityNewsroom } from "@/lib/sanity-newsroom"
import { SectionContainer } from "@/components/layout/section-shell"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ContentVideoPlayer } from "@/components/content-video-player"
import { LocalizedText } from "@/components/localized-text"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export async function generateStaticParams() {
  const { articles } = await getSanityNewsroom({useDraftMode: false})
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { articles } = await getSanityNewsroom()
  const article = getArticleBySlug(slug, articles)
  return article
    ? { title: `${article.title} | PT. Anigos Jaya Perkasa`, description: article.excerpt }
    : { title: "Artikel | PT. Anigos Jaya Perkasa" }
}

export const dynamic = "force-dynamic"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { articles, categories } = await getSanityNewsroom()
  const article = getArticleBySlug(slug, articles)
  if (!article) notFound()

  const category = categories.find((item) => item.slug === article.category)
  const subcategory = category?.subcategories.find(
    (item) => item.slug === article.subcategory
  )
  const newsroomHref = "/artikel/anigos-news"
  const categoryHref = category
    ? `${newsroomHref}?category=${encodeURIComponent(category.slug)}`
    : newsroomHref
  const subcategoryHref =
    category && subcategory
      ? `${categoryHref}&subcategory=${encodeURIComponent(subcategory.slug)}`
      : categoryHref
  const recommendations = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3)

  return (
    <main>
      <article className="border-b border-border bg-background">
        <SectionContainer className="pb-10 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
          <Breadcrumb className="max-w-full overflow-hidden">
            <BreadcrumbList className="flex-nowrap overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <LocalizedText translationKey="articleHome" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/artikel">
                  <LocalizedText translationKey="articles" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={newsroomHref}>
                  <LocalizedText translationKey="articleNewsroom" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              {category ? (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={categoryHref}>{category.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : null}
              {subcategory ? (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={subcategoryHref}>
                      {subcategory.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : null}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[min(18rem,60vw)] truncate">
                  {article.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(15rem,1fr)] lg:gap-16">
            <div className="min-w-0">
              <header className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    {category?.name ?? <LocalizedText translationKey="articleOffice" />}
                  </Badge>
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
                    {article.readTime} <LocalizedText translationKey="articleReadMore" />
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

              {article.video ? (
                <div className="mt-8 max-w-3xl">
                  <ContentVideoPlayer
                    src={article.video}
                    poster={article.videoPoster}
                    title={`Video: ${article.title}`}
                  />
                </div>
              ) : null}

              <div className="typeset typeset-docs mt-10 max-w-3xl lg:mt-14">
                {article.content.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <Separator className="my-10 max-w-3xl" />
              <Link
                href="/artikel/anigos-news"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="size-4" />
                <LocalizedText translationKey="articleBackToNewsroom" />
              </Link>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-2 border-foreground pt-4">
                <p className="text-sm font-semibold tracking-tight">
                  <LocalizedText translationKey="articleReadAlso" />
                </p>
                <div className="mt-5 space-y-5">
                  {recommendations.map((recommendation) => (
                    <Link
                      key={recommendation.slug}
                      href={`/artikel/${recommendation.slug}`}
                      className="group flex gap-3 rounded-2xl border border-border bg-background p-3 transition-colors hover:border-primary/50"
                    >
                      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={recommendation.image}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 py-0.5">
                        <Badge variant="outline" className="max-w-full truncate text-[10px]">
                          {                          categories.find(
                            (item) => item.slug === recommendation.category,
                          )?.name ?? "Artikel"}
                        </Badge>
                        <p className="mt-2 line-clamp-3 text-sm font-semibold leading-5 tracking-tight transition-colors group-hover:text-primary">
                          {recommendation.title}
                        </p>
                        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                          {formatArticleDate(recommendation.date)} · {recommendation.readTime}
                        </p>
                      </div>
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
        </SectionContainer>
      </article>
    </main>
  )
}
