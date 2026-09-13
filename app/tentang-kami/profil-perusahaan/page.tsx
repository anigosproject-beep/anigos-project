import Link from "next/link"
import {
  ArrowRight,
  CircleCheck,
  Eye,
  Handshake,
  ShieldCheck,
  Target,
} from "lucide-react"

import { FeatureImageSection, PageHero } from "@/components/sections"
import { DistributionLinePattern } from "@/components/patterns/distribution-line-pattern"
import { Eyebrow, Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"

const principles = [
  {
    title: "Sasaran",
    description:
      "Dikenal sebagai perusahaan dagang dengan kemampuan teknis terbaik, saling menghormati, dan berkomitmen penuh terhadap kepuasan konsumen.",
    icon: Target,
  },
  {
    title: "Etika",
    description:
      "Menempatkan kepatuhan pada etika dan tanggung jawab sebagai dasar dalam setiap pekerjaan yang dilakukan.",
    icon: Handshake,
  },
  {
    title: "Objektif",
    description:
      "Mengutamakan ketepatan waktu dan keamanan, dengan komitmen terhadap operasional yang bebas dari kecelakaan kerja.",
    icon: ShieldCheck,
  },
  {
    title: "Nilai",
    description:
      "Menjalankan usaha dengan transparansi, integritas, keandalan, dan profesionalisme untuk menangani produk serta layanan berkualitas tinggi.",
    icon: CircleCheck,
  },
] as const

const legalHighlights = [
  ["Berdiri", "18 Juli 2019"],
  ["Nomor akta", "11"],
  ["Kode izin usaha", "05.Nw.03.25.00.153"],
  ["Registrasi BPH Migas", "03/NRU/KABPH MIGAS/2020"],
] as const

export default function ProfilPerusahaanPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tentang Kami"
        title="Profil Perusahaan"
        description="Mengenal PT. Anigos Jaya Perkasa dan Petro Anigos sebagai distributor Bahan Bakar Industri untuk kebutuhan konsumen di Indonesia."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow="Tentang Kami"
            title="Membangun layanan distribusi energi dengan fondasi yang terpercaya."
            description="Petro Anigos adalah brand PT. Anigos Jaya Perkasa, perusahaan yang bergerak sebagai distributor Bahan Bakar Industri."
          />
          <div className="space-y-6">
            <Text variant="lead">
              PT. Anigos Jaya Perkasa telah berpengalaman dalam menyediakan
              Bahan Bakar Industri untuk kebutuhan di wilayah Indonesia,
              khususnya Pulau Jawa, Sumatera, dan Kalimantan.
            </Text>
            <Text variant="body-muted">
              Perusahaan berdiri pada 18 Juli 2019 berdasarkan Akta Pendirian
              Nomor 11 oleh Notaris Andi Ismawati Achmad, S.H. Perusahaan juga
              telah memperoleh pengesahan melalui Keputusan Menteri Hukum dan
              Hak Asasi Manusia Republik Indonesia Nomor
              AHU-0035830.Ah.01.01 Tahun 2019.
            </Text>
            <Text variant="body-muted">
              Dalam menjalankan kegiatan usahanya, perusahaan memegang merek
              dagang Petro Anigos dan menyediakan BBM dengan mutu serta
              spesifikasi yang mengacu pada Ditjen Migas RI.
            </Text>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({ variant: "outline", className: "mt-2" })}
            >
              Lihat detail legalitas
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </section>

      <FeatureImageSection
        id="sejarah-perusahaan"
        eyebrow="Perjalanan Perusahaan"
        title="Berawal dari fondasi yang terpercaya, tumbuh untuk melayani lebih luas."
        description="PT. Anigos Jaya Perkasa berdiri pada 18 Juli 2019 berdasarkan Akta Pendirian Nomor 11. Sejak itu, perusahaan mengembangkan layanan distribusi Bahan Bakar Industri dengan dasar legalitas yang jelas, dukungan jaringan operasional, armada berbagai kapasitas, dan kemitraan transportir untuk mendukung kebutuhan konsumen di berbagai wilayah Indonesia."
        image="/images/page-hero/tentang-kami.webp"
        imagePosition="center"
      />

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
            <SectionHeading
              eyebrow="Tujuan Perusahaan"
              title="Menjadi penyedia distribusi BBM yang profesional dan dapat diandalkan."
            />
            <div className="relative overflow-hidden rounded-4xl bg-foreground p-8 text-background sm:p-12">
              <DistributionLinePattern className="text-background opacity-[0.2] [mask-image:linear-gradient(135deg,black_0%,black_46%,transparent_88%)]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_42%),linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.16)_100%)]"
              />
              <div className="relative z-10">
                <Eye className="size-8 text-background/70" />
                <blockquote className="mt-8 text-2xl leading-relaxed font-medium tracking-tight sm:text-3xl">
                  “Kami berusaha menyediakan layanan dengan kualitas dan
                  kuantitas yang disesuaikan untuk memenuhi kebutuhan konsumen.”
                </blockquote>
                <p className="mt-8 text-sm text-background/60">
                  Melayani kebutuhan berskala besar hingga berskala nasional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Prinsip Kami"
            title="Nilai yang menjadi cara kami bekerja."
            description="Empat prinsip ini dirangkum dari sasaran, etika, objektif, dan nilai perusahaan dalam company profile."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => {
              const Icon = principle.icon

              return (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-4">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <Card className="relative overflow-hidden bg-foreground text-background">
            <DistributionLinePattern className="text-background opacity-[0.18] [mask-image:linear-gradient(135deg,black_0%,black_42%,transparent_90%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_44%),linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.12)_100%)] backdrop-blur-[1px]"
            />
            <div className="relative z-10">
              <CardHeader>
                <Badge variant="outline" className="border-background/30 text-background">
                  Visi
                </Badge>
                <CardTitle className="mt-5 text-3xl leading-tight">
                  Menjadi Perusahaan Nasional yang terpercaya.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-background/70">
                  Menjadi perusahaan nasional yang terpercaya dalam penyediaan
                  berbagai layanan dengan orientasi dan efisiensi kerja yang
                  mengedepankan kecepatan kerja dan profesionalisme.
                </p>
              </CardContent>
            </div>
          </Card>
          <Card className="relative overflow-hidden">
            <DistributionLinePattern className="text-foreground opacity-[0.12] [mask-image:linear-gradient(135deg,black_0%,black_40%,transparent_90%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_44%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.08)_100%)] backdrop-blur-[1px]"
            />
            <div className="relative z-10">
              <CardHeader>
                <Badge variant="secondary">Misi</Badge>
                <CardTitle className="mt-5 text-3xl leading-tight">
                  Tumbuh secara profesional, terbuka, dan berkesinambungan.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  Mengembangkan diri dalam tatanan yang beretika dan terbuka,
                  mengacu pada inovasi berkesinambungan, menjaga hubungan dengan
                  rekan usaha serta konsumen, dan menjadi mitra Pemerintah
                  Republik Indonesia dalam menciptakan iklim bisnis yang sehat.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Legalitas Sekilas</Eyebrow>
              <Heading level={2} className="mt-3">
                Beroperasi dengan dasar hukum yang jelas.
              </Heading>
            </div>
            <Link
              href="/tentang-kami/legalitas"
              className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              Lihat semua legalitas
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <Separator className="my-10" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {legalHighlights.map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              Langkah berikutnya
            </Badge>
            <Heading level={2} className="mt-5">
              Kenali produk dan cara kami mendukung kebutuhan distribusi Anda.
            </Heading>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produk/kenali-produk"
              className={buttonVariants({ className: "bg-background text-foreground hover:bg-background/90" })}
            >
              Kenali Produk
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({ variant: "outline", className: "border-background/30 text-background hover:bg-background/10 hover:text-background" })}
            >
              Lihat Legalitas
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
