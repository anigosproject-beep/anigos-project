import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { careerBenefits, careerOpenings } from "@/lib/careers-data"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

export default function KarirPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tentang Kami / Karir"
        title="Tumbuh bersama energi yang menggerakkan Indonesia."
        description="Kami mencari orang-orang yang ingin bekerja dengan tujuan, menjaga kualitas, dan membangun distribusi energi yang dapat diandalkan."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow="Mengapa Petro Anigos"
            title="Pekerjaan yang punya dampak nyata."
            description="Di sini, pekerjaan administratif, komersial, dan operasional saling terhubung untuk memastikan kebutuhan pelanggan dilayani dengan aman dan tepat."
          />
          <div className="rounded-4xl bg-foreground p-8 text-background shadow-xl sm:p-12">
            <Badge variant="secondary" className="bg-background/10 text-background">
              Cara kami bertumbuh
            </Badge>
            <Heading level={2} className="mt-6 text-background">
              Profesional dalam bekerja, manusiawi dalam berkolaborasi.
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Kami percaya kualitas layanan dimulai dari orang-orang yang diberi
              konteks, kepercayaan, dan ruang untuk mengambil tanggung jawab.
            </Text>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pengalaman Bekerja"
            title="Hal-hal yang kami jaga bersama."
            description="Keunggulan bekerja bukan hanya tentang fasilitas, tetapi juga tentang lingkungan yang membantu setiap orang menghasilkan pekerjaan terbaiknya."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} className="h-full bg-background transition-transform duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <CardTitle className="mt-5">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="lowongan" className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Ketersediaan Lowongan"
              title="Temukan peran yang sesuai dengan langkahmu."
              description="Pilih posisi yang ingin kamu pelajari. Jika belum ada peran yang sesuai, kamu tetap dapat mengirimkan profil untuk dipertimbangkan pada kebutuhan berikutnya."
            />
            <Badge variant="outline" className="w-fit">{careerOpenings.length} posisi tersedia</Badge>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {careerOpenings.map((opening) => (
              <Card key={opening.slug} className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{opening.department}</Badge>
                    <span className="text-xs text-muted-foreground">{opening.type}</span>
                  </div>
                  <CardTitle className="mt-4 text-2xl">{opening.title}</CardTitle>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" /> {opening.location}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{opening.summary}</p>
                  <Link href={`/tentang-kami/karir/lamar?posisi=${opening.slug}`} className={buttonVariants({ className: "mt-7 w-fit" })}>
                    Lihat posisi &amp; lamar <ArrowRight data-icon="inline-end" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
