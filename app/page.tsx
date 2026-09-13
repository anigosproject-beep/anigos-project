import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  ArticleShowcase,
  FeatureImageSection,
  HomeHero,
  PartnershipShowcase,
  ProductShowcase,
  ResourceGrid,
} from "@/components/sections"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <div>
      <HomeHero />

      {/* SECTION 01: Harapan & Cita-Cita Perusahaan */}
      <section
        id="harapan-cita-cita"
        className="border-b border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-16 lg:px-8">
          <div
            aria-label="Pattern visual cita-cita Petro Anigos"
            className="relative isolate min-h-[22rem] overflow-hidden bg-background lg:min-h-[30rem]"
          >
            <Image
              src="/images/patterns/home-section-01/home-section-01-pattern.svg"
              alt="Pattern visual cita-cita Petro Anigos"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-contain"
            />
          </div>

          <div className="max-w-3xl">
            <Badge variant="secondary">Harapan &amp; Cita-Cita</Badge>
            <Heading level={2} className="mt-5">
              Distribusi Hari Ini, Kontribusi untuk Negeri
            </Heading>
            <Text variant="lead" className="mt-6">
              PT. Anigos Jaya Perkasa memandang distribusi Bahan Bakar Minyak
              bukan sekadar aktivitas niaga, melainkan bagian dari perjalanan
              untuk menggerakkan roda industri dan kehidupan masyarakat di
              seluruh penjuru Indonesia. Melalui brand Petro Anigos, kami
              menghadirkan layanan distribusi yang mengutamakan kualitas,
              ketepatan waktu, keselamatan kerja, dan keandalan bagi setiap
              konsumen serta mitra usaha.
            </Text>
            <Text variant="body-muted" className="mt-5">
              Sejak berdiri pada 18 Juli 2019, kami terus mengembangkan diri
              secara profesional dengan menjaga hubungan baik, menjunjung
              transparansi dan integritas, serta membuka ruang bagi kemitraan
              yang sehat. Kami percaya bahwa keberhasilan distribusi energi
              tidak hanya diukur dari berapa liter yang terkirim, tetapi juga
              dari seberapa besar kontribusi yang tercipta bagi peningkatan
              taraf hidup dan kesejahteraan masyarakat, bangsa, dan negara.
            </Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tentang-kami/harapan-cita-cita"
                className={buttonVariants()}
              >
                Baca Harapan Kami
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                href="/tentang-kami/profil-perusahaan"
                className={buttonVariants({ variant: "outline" })}
              >
                Profil Perusahaan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Tentang Kami */}
      <FeatureImageSection
        id="tentang-kami"
        eyebrow="Mengenal Petro Anigos"
        title="Tentang Kami"
        description="PT. Anigos Jaya Perkasa melalui brand Petro Anigos hadir sebagai distributor Bahan Bakar Industri yang mengutamakan kualitas, profesionalisme, dan keandalan untuk mendukung kebutuhan industri di Indonesia."
        image="/images/page-hero/tentang-kami.webp"
        primaryAction={{
          label: "Selengkapnya",
          href: "/tentang-kami/profil-perusahaan",
        }}
        secondaryAction={{
          label: "Struktur Organisasi",
          href: "/tentang-kami/struktur-perusahaan",
        }}
      />

      {/* SECTION 03: Pencapaian Perusahaan */}
      <section
        id="pencapaian-perusahaan"
        className="border-b border-border bg-muted/40 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <Badge variant="secondary">Pencapaian Perusahaan</Badge>
              <Heading level={3} variant="card" className="mt-5 max-w-md">
                Fondasi yang tumbuh bersama kebutuhan energi Indonesia.
              </Heading>
              <Heading level={2} className="mt-4 max-w-xl">
                Berpengalaman, menjangkau lebih luas, dan siap melayani.
              </Heading>
            </div>
            <div className="flex flex-col items-start lg:items-end lg:text-right">
              <Text variant="lead" className="max-w-2xl">
                Sejak berdiri pada 18 Juli 2019, PT. Anigos Jaya Perkasa terus
                membangun fondasi distribusi Bahan Bakar Industri yang
                profesional dan terpercaya. Perjalanan ini tercermin dari
                jaringan operasional yang menjangkau berbagai wilayah serta
                pilihan kapasitas armada yang disiapkan untuk mendukung
                kebutuhan konsumen dari berbagai skala.
              </Text>
              <Link
                href="/keberlanjutan/pencapaian-perusahaan"
                className={buttonVariants({ className: "mt-8" })}
              >
                Lihat Selengkapnya
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                Berdiri sejak
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">2019</p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                Tahun berdirinya PT. Anigos Jaya Perkasa berdasarkan akta
                pendirian perusahaan.
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                Jaringan cabang
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                5 <span className="text-3xl">titik</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                Titik cabang yang tercantum dalam company profile di Sumatera,
                Kalimantan, dan Sulawesi.
              </Text>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-muted-foreground">
                Variasi kapasitas armada
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                6 <span className="text-3xl">pilihan</span>
              </p>
              <Text variant="small" className="mt-3 md:ml-auto md:max-w-xs">
                Kapasitas tangki mulai dari 5.000 L hingga 30.000 L untuk
                mendukung kebutuhan distribusi.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: Produk */}
      <ProductShowcase />

      {/* SECTION 05: Kemitraan */}
      <PartnershipShowcase />

      {/* SECTION 06: Keberlanjutan dan Publikasi */}
      <ResourceGrid />

      {/* SECTION 07: Artikel */}
      <ArticleShowcase />
    </div>
  )
}
