import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CircleAlert,
  Download,
  Handshake,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"

const partnershipPrinciples = [
  {
    title: "Distribusi yang terhubung",
    description:
      "Kemitraan transportasi mendukung kelancaran pendistribusian BBM ke berbagai wilayah operasional.",
    icon: Truck,
  },
  {
    title: "Kepatuhan yang terjaga",
    description:
      "Setiap kerja sama diarahkan untuk berjalan dengan dasar izin dan tanggung jawab yang jelas.",
    icon: ShieldCheck,
  },
  {
    title: "Hubungan jangka panjang",
    description:
      "Kami menjaga hubungan baik dengan rekan usaha, konsumen, dan mitra Pemerintah Republik Indonesia.",
    icon: Handshake,
  },
] as const

const transportLicense = [
  ["Nama badan usaha", "PT Masinton Nusa Perkasa"],
  ["Jenis izin usaha", "Pengangkutan Minyak dan Gas Bumi"],
  ["Jenis kegiatan", "Pengangkutan Bahan Bakar Minyak"],
  ["Jangka waktu izin", "Berlaku selama 5 (lima) tahun"],
  ["Tanggal terbit", "13 Juli 2020"],
  ["Diterbitkan oleh", "Kepala BKPM melalui Sertifikat Izin Usaha"],
] as const

export default function KemitraanPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tentang Kami"
        title="Kemitraan"
        description="Membangun kerja sama yang bertanggung jawab untuk mendukung distribusi Bahan Bakar Industri ke berbagai wilayah Indonesia."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Mitra Transportir Resmi"
              title="Jaringan distribusi yang didukung mitra berizin."
              description="Untuk mendukung kelancaran pendistribusian ke seluruh pelosok Indonesia, PT. Anigos Jaya Perkasa menjalin kerja sama dengan PT Masinton Nusa Perkasa sebagai mitra transportir resmi."
            />
            <div className="max-w-sm rounded-2xl border border-border bg-muted/30 p-3">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background">
                <iframe
                  title="Preview dokumen kemitraan transportir"
                  src="/documents/company-profile-kemitraan-transportir.pdf#page=1&view=FitH"
                  className="size-full"
                />
              </div>
              <div className="px-1 pb-1 pt-4">
                <p className="text-sm font-medium">
                  Dokumen kemitraan transportir
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Company profile file 8, halaman internal 07 “Transportir”,
                  memuat sertifikat izin usaha dan dokumentasi armada mitra.
                </p>
                <a
                  href="/documents/company-profile-kemitraan-transportir.pdf"
                  download="company-profile-kemitraan-transportir.pdf"
                  className={buttonVariants({
                    variant: "outline",
                    className: "mt-4 w-full",
                  })}
                >
                  Unduh dokumen
                  <Download data-icon="inline-end" />
                </a>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 p-0">
              <div className="overflow-hidden bg-muted/40">
              <Image
                src="/images/partnership/partnership-transportation.svg"
                alt="Ilustrasi kemitraan transportasi Petro Anigos"
                className="h-auto w-full"
                width={1200}
                height={675}
              />
              </div>
              <Text variant="body-muted" className="px-6 pb-6">
                Kemitraan ini mendukung kebutuhan pengangkutan Bahan Bakar
                Minyak dengan memperhatikan legalitas, koordinasi operasional,
                dan ketepatan layanan.
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Detail Kemitraan"
            title="Informasi izin transportir yang tersedia."
            description="Ringkasan berikut disusun dari sertifikat izin usaha yang tercantum dalam company profile."
          />
          <Card className="mt-12 overflow-hidden">
            <CardHeader className="border-b border-border bg-background">
              <Badge variant="secondary" className="w-fit">
                PT Masinton Nusa Perkasa
              </Badge>
              <CardTitle className="mt-4 text-2xl">
                Sertifikat izin usaha pengangkutan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-px bg-border p-0 md:grid-cols-2">
              {transportLicense.map(([label, value]) => (
                <div
                  key={label}
                  className="bg-background px-6 py-5"
                >
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="mt-5 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CircleAlert className="size-4 text-muted-foreground" />
                Catatan verifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Text variant="body-muted" className="flex items-start gap-2">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                Alamat lengkap dan beberapa detail badan usaha mitra belum
                terbaca jelas pada scan dokumen sumber. Informasi tersebut perlu
                diverifikasi sebelum dipublikasikan sebagai data final.
                </span>
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cara Kami Bermitra"
            title="Kerja sama yang dibangun dari kejelasan dan kepercayaan."
            description="Kami membuka ruang kolaborasi dengan perusahaan atau instansi yang ingin menjajaki peluang kerja sama distribusi maupun transportasi Bahan Bakar Minyak."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partnershipPrinciples.map((principle) => {
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

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              Terbuka untuk kolaborasi
            </Badge>
            <Heading level={2} className="mt-5">
              Mari bangun kemitraan yang mendukung distribusi energi secara bertanggung jawab.
            </Heading>
            <p className="mt-5 leading-7 text-background/70">
              Hubungi tim Petro Anigos untuk mendiskusikan kebutuhan distribusi,
              transportasi, atau peluang kerja sama lainnya.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:anigospetro@gmail.com"
              className={buttonVariants({
                className: "bg-background text-foreground hover:bg-background/90",
              })}
            >
              Hubungi Kami
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-background/30 text-background hover:bg-background/10 hover:text-background",
              })}
            >
              Lihat Legalitas
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-background/15" />
      </section>
    </main>
  )
}
