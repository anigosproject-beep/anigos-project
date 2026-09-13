import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

type Topic = {
  title: string
  description: string
  icon: LucideIcon
}

type CorporateTopicPageProps = {
  eyebrow: string
  title: string
  description: string
  breadcrumbs: { label: string; href: string }[]
  introEyebrow: string
  introTitle: string
  introDescription: string
  topics: Topic[]
  note?: string
  cta?: { label: string; href: string }
}

export function CorporateTopicPage({
  eyebrow,
  title,
  description,
  breadcrumbs,
  introEyebrow,
  introTitle,
  introDescription,
  topics,
  note,
  cta,
}: CorporateTopicPageProps) {
  return (
    <main>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow={introEyebrow}
            title={introTitle}
            description={introDescription}
          />
          <div className="rounded-4xl bg-foreground p-8 text-background shadow-xl sm:p-12">
            <Badge variant="secondary" className="bg-background/10 text-background">
              Cara kami bekerja
            </Badge>
            <Heading level={2} className="mt-6 text-background">
              Prinsip yang diterjemahkan ke dalam tindakan.
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Kami menjaga agar setiap keputusan tetap berangkat dari
              kebutuhan konsumen, kepatuhan, keselamatan, dan hubungan baik
              dengan mitra.
            </Text>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Fokus Utama"
              title="Membangun kepercayaan melalui praktik yang konsisten."
              description="Ringkasan ini merangkum tema yang tersedia dalam referensi perusahaan."
            />
            <p className="text-sm font-medium text-primary">01 — {String(topics.length).padStart(2, "0")}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => {
              const Icon = topic.icon

              return (
                <Card key={topic.title} className="h-full bg-background transition-transform duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <CardTitle className="mt-5">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {note ? (
        <section className="border-b border-border bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-6 sm:p-8">
              <p className="text-sm leading-6 text-muted-foreground">{note}</p>
            </div>
          </div>
        </section>
      ) : null}

      {cta ? (
        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-sm font-medium text-primary">Lanjutkan eksplorasi</p>
              <Heading level={2} className="mt-2">Kenali bagaimana Petro Anigos melayani kebutuhan Anda.</Heading>
            </div>
            <Link href={cta.href} className={buttonVariants({ className: "w-fit" })}>
              {cta.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  )
}
