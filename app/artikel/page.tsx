import Link from "next/link"
import { ArrowRight, BookOpen, FileText, Newspaper } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

const destinations = [
  {
    title: "Anigos News",
    description: "Kabar, perspektif, dan informasi seputar energi serta distribusi.",
    href: "/artikel/anigos-news",
    icon: Newspaper,
  },
  {
    title: "Publikasi",
    description: "Materi perusahaan, produk, operasional, dan kemitraan yang tersedia untuk dibaca.",
    href: "/artikel/publikasi",
    icon: FileText,
  },
  {
    title: "Landasan Informasi Publik",
    description: "Rujukan fakta perusahaan dan batas informasi yang dapat dipublikasikan.",
    href: "/artikel/landasan-informasi-publik",
    icon: BookOpen,
  },
]

export default function ArtikelPage() {
  return (
    <main>
      <PageHero
        eyebrow="Artikel"
        title="Wawasan dan informasi Petro Anigos."
        description="Temukan berita, publikasi, dan landasan informasi yang membantu memahami cara Petro Anigos melayani kebutuhan energi industri."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Artikel", href: "/artikel" }]}
      />
      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pusat Informasi"
            title="Pilih ruang baca yang Anda butuhkan."
            description="Halaman ini menjadi pintu masuk menuju konten editorial dan informasi referensial perusahaan."
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
                      <CardTitle className="mt-4">{destination.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text variant="body-muted">{destination.description}</Text>
                      <span className={buttonVariants({ variant: "link", className: "mt-5 h-auto p-0" })}>
                        Buka halaman <ArrowRight data-icon="inline-end" />
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
          <div className="rounded-4xl bg-foreground p-8 text-background sm:p-12">
            <p className="text-sm font-medium text-background/60">Catatan editorial</p>
            <Heading level={2} className="mt-4 text-background">
              Konten akan berkembang bersama perjalanan perusahaan.
            </Heading>
            <Text variant="lead" className="mt-5 max-w-2xl text-background/70">
              Artikel dan publikasi yang belum memiliki sumber resmi akan
              ditambahkan secara bertahap melalui proses editorial terpisah.
            </Text>
          </div>
        </div>
      </section>
    </main>
  )
}
