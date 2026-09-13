import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Heading, Text } from "@/components/typography"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { Reveal } from "@/components/motion"
import { ScrollFloat } from "@/components/scroll-motion"

const articles = [
  {
    category: "Energi",
    title: "Mengenal B40 Biosolar dan perannya dalam kebutuhan industri",
    description:
      "Memahami komposisi B40, program mandatori pemerintah, dan standar mutu yang menjadi rujukan.",
    href: "/artikel/anigos-news",
    image: "/images/articles/article-b40.svg",
    alt: "Visual B40 Biosolar",
  },
  {
    category: "Operasional",
    title: "Mengapa ketepatan waktu penting dalam distribusi BBM?",
    description:
      "Catatan tentang keandalan, keselamatan, dan koordinasi dalam mendukung kebutuhan konsumen.",
    href: "/artikel/anigos-news",
    image: "/images/articles/article-operation.svg",
    alt: "Visual operasional distribusi BBM",
  },
  {
    category: "Wawasan",
    title: "Memilih mitra distribusi BBM untuk kebutuhan bisnis",
    description:
      "Hal-hal yang perlu diperhatikan saat menilai kualitas, legalitas, dan kesiapan layanan.",
    href: "/artikel/publikasi",
    image: "/images/resources/resource-publication.svg",
    alt: "Visual publikasi Petro Anigos",
  },
] as const

export function ArticleShowcase() {
  const [featured, ...secondary] = articles

  return (
    <section
      id="artikel"
      className="border-b border-border bg-muted/40 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl" delay={0.04}>
            <Badge variant="secondary">Anigos News</Badge>
            <Heading level={2} className="mt-5">
              Perspektif tentang energi, distribusi, dan kerja sama.
            </Heading>
            <Text variant="lead" className="mt-5">
              Ruang berbagi informasi dan wawasan yang membantu memahami dunia
              BBM industri dengan lebih dekat.
            </Text>
          </Reveal>
          <Link
            href="/artikel/anigos-news"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Lihat semua artikel
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <ScrollFloat className="group">
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
              className="mt-4 block rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          </ScrollFloat>

          <div className="grid gap-8">
            {secondary.map((article) => (
              <ScrollFloat key={article.title} className="group" distance={7}>
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
                    className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
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
              </ScrollFloat>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
