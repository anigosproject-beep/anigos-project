"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, FileText, Newspaper } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const destinations = [
  {
    title: "articleDestinationNews",
    description: "articleDestinationNewsDescription",
    href: "/artikel/anigos-news",
    icon: Newspaper,
  },
  {
    title: "articleDestinationPublications",
    description: "articleDestinationPublicationDescription",
    href: "/artikel/publikasi",
    icon: FileText,
  },
  {
    title: "articleDestinationPublicInfo",
    description: "articleDestinationPublicInfoDescription",
    href: "/artikel/landasan-informasi-publik",
    icon: BookOpen,
  },
]

export default function ArtikelPage() {
  const { locale } = useLocale()
  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "articles")}
        title={translate(locale, "articlePageTitle")}
        description={translate(locale, "articlePageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="artikel"
        breadcrumbs={[{ label: translate(locale, "articles"), href: "/artikel" }]}
      />
      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "articleDirectoryEyebrow")}
            title={translate(locale, "articleDirectoryTitle")}
            description={translate(locale, "articleDirectoryDescription")}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => {
              const Icon = destination.icon
              return (
                <Link key={destination.href} href={destination.href} className="group">
                  <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="mt-4">
                        {translate(locale, destination.title as TranslationKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text variant="body-muted">
                        {translate(locale, destination.description as TranslationKey)}
                      </Text>
                      <span className={buttonVariants({ variant: "link", className: "mt-5 h-auto p-0" })}>
                        {translate(locale, "articleOpenPage")}{" "}
                        <ArrowRight data-icon="inline-end" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-4xl bg-base-color p-8 text-base-color-foreground sm:p-12">
            <p className="text-sm font-medium text-base-color-foreground/60">
              {translate(locale, "articleEditorialNote")}
            </p>
            <Heading level={2} className="mt-4 text-base-color-foreground">
              {translate(locale, "articleEditorialTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 max-w-2xl text-base-color-foreground/70">
              {translate(locale, "articleEditorialDescription")}
            </Text>
          </div>
        </div>
      </section>
    </main>
  )
}
