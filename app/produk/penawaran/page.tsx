import Link from "next/link"
import {
  ArrowRight,
  CircleAlert,
  ClipboardCheck,
  FileText,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Truck,
} from "lucide-react"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const preparationItems = [
  {
    title: "Jenis produk",
    description: "Solar/HSD atau B40 Biosolar sesuai kebutuhan operasional.",
    icon: PackageCheck,
  },
  {
    title: "Volume kebutuhan",
    description: "Perkiraan volume per pengiriman atau kebutuhan berkala.",
    icon: ClipboardCheck,
  },
  {
    title: "Lokasi dan jadwal",
    description: "Wilayah titik bongkar serta rencana waktu penerimaan.",
    icon: MapPin,
  },
  {
    title: "Moda distribusi",
    description: "Kebutuhan armada darat, transportasi laut, atau mitra transportir.",
    icon: Truck,
  },
] as const

const offerSteps = [
  {
    number: "01",
    title: "Sampaikan kebutuhan",
    description:
      "Isi informasi awal produk, volume, wilayah, jadwal, serta detail perusahaan.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "Verifikasi bersama",
    description:
      "Tim Petro Anigos meninjau kebutuhan, ketersediaan, armada, dan skema distribusi.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Bahas penawaran",
    description:
      "Detail harga, minimum order, pembayaran, dan ketentuan transaksi dibahas sesuai kebutuhan.",
    icon: ArrowRight,
  },
] as const

export default function PenawaranPage() {
  return (
    <main>
      <PageHero
        eyebrow="Produk / Penawaran"
        title="Mulai dari kebutuhan, kami siapkan pembahasannya."
        description="Sampaikan kebutuhan BBM industri Anda agar tim Petro Anigos dapat membantu meninjau produk, volume, lokasi, jadwal, dan skema distribusi yang sesuai."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Produk", href: "/produk/kenali-produk" },
          { label: "Penawaran", href: "/produk/penawaran" },
        ]}
      />

      <section className="relative isolate overflow-hidden border-b border-border bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.1] blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 size-80 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8">
          <div>
            <Badge variant="secondary">Penawaran berbasis kebutuhan</Badge>
            <SectionHeading
              className="mt-5"
              eyebrow="Sebelum mengajukan"
              title="Informasi sederhana membantu pembahasan lebih terarah."
              description="Tidak perlu menyiapkan spesifikasi komersial yang rumit. Mulai dari informasi operasional yang sudah Anda ketahui."
            />
            <Link href="/produk/penawaran/ajukan" className={buttonVariants({ className: "mt-8" })}>
              Ajukan kebutuhan
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <Card className="bg-background/85 shadow-lg backdrop-blur-md">
            <CardHeader>
              <CardTitle>Yang perlu disiapkan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              {preparationItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="space-y-3">
                    <Icon className="size-5 text-primary" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <Text variant="small" className="mt-1">
                        {item.description}
                      </Text>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Alur Pembahasan"
            title="Dari informasi awal menuju penawaran yang dibahas bersama."
            description="Alur ini membantu menyamakan kebutuhan sebelum detail transaksi dan pengiriman disepakati."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {offerSteps.map((step) => {
              const Icon = step.icon

              return (
                <Card key={step.number} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                        {step.number}
                      </span>
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-5">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body-muted">{step.description}</Text>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow="Ruang Lingkup Pembahasan"
            title="Detail komersial dan distribusi dikonfirmasi bersama."
            description="Informasi pada form adalah bahan awal pembahasan, bukan penetapan harga atau jaminan pengiriman."
          />
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <Text variant="small">
              Harga, minimum order, pembayaran, dan ketersediaan pengiriman
              dibahas bersama setelah kebutuhan dan detail operasional
              diverifikasi.
            </Text>
          </div>
          <Card>
            <CardContent className="p-6 lg:p-8">
              <div className="space-y-6">
                <div>
                  <p className="font-medium">Ketentuan komersial</p>
                  <Text variant="body-muted" className="mt-2">
                    Harga, minimum order, metode pembayaran, dan persyaratan transaksi
                    dibahas berdasarkan kebutuhan serta persetujuan kedua pihak.
                  </Text>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">Detail distribusi</p>
                  <Text variant="body-muted" className="mt-2">
                    Wilayah, jadwal, volume, moda pengiriman, dan ketersediaan armada
                    diselaraskan saat proses verifikasi.
                  </Text>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">Data pendukung</p>
                  <Text variant="body-muted" className="mt-2">
                    Bila tersedia, Anda dapat menambahkan catatan frekuensi pengiriman,
                    kebutuhan khusus titik bongkar, atau konteks operasional lainnya.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              Siap memulai
            </Badge>
            <Heading level={2} className="mt-5 text-background">
              Sampaikan kebutuhan BBM industri Anda.
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Gunakan form pengajuan untuk menyiapkan ringkasan kebutuhan yang dapat
              dibahas bersama tim Petro Anigos.
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
            })}
          >
            Mulai pengajuan
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </main>
  )
}
