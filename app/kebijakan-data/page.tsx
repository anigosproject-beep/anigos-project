import Link from "next/link"
import { BarChart3, CloudSun, Clock3, ShieldCheck } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const policies = [
  {
    title: "Informasi cuaca",
    description:
      "Data cuaca direncanakan bersumber dari BMKG. Prakiraan cuaca hanya digunakan sebagai informasi umum dan bukan pengganti peringatan resmi BMKG, SOP K3, atau keputusan operasional.",
    icon: CloudSun,
  },
  {
    title: "Informasi pasar",
    description:
      "Ringkasan IDX/Migas pada ribbon saat ini adalah data contoh untuk kebutuhan tampilan. Data produksi hanya boleh ditampilkan setelah sumber dan hak redistribusinya diverifikasi.",
    icon: BarChart3,
  },
  {
    title: "Waktu dan status data",
    description:
      "Setiap integrasi data harus menyertakan sumber, waktu pembaruan, zona waktu, serta status seperti demo, prakiraan, tertunda, atau live.",
    icon: Clock3,
  },
  {
    title: "Penggunaan bertanggung jawab",
    description:
      "Informasi pada ribbon tidak boleh menjadi satu-satunya dasar keputusan distribusi, keselamatan kerja, investasi, atau keputusan komersial.",
    icon: ShieldCheck,
  },
]

export default function KebijakanDataPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kebijakan Data"
        title="Sumber dan penggunaan informasi di website Petro Anigos."
        description="Halaman ini menjelaskan sumber, status, keterbatasan, dan etika penggunaan informasi cuaca serta pasar yang ditampilkan pada website."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Kebijakan Data", href: "/kebijakan-data" }]}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary">Transparansi informasi</Badge>
            <Heading level={2} className="mt-5">
              Data pendukung harus selalu hadir bersama konteksnya.
            </Heading>
            <Text variant="lead" className="mt-5">
              Petro Anigos membedakan data demo, prakiraan, data tertunda, dan
              data live. Nilai yang tampil tanpa sumber atau waktu pembaruan
              tidak boleh dipahami sebagai informasi real-time.
            </Text>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {policies.map((policy) => {
              const Icon = policy.icon
              return (
                <Card key={policy.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-4">{policy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {policy.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow="Sumber rujukan"
            title="Attribution harus terlihat dekat dengan datanya."
            description="Saat integrasi resmi tersedia, attribution, timestamp, dan status data akan ditampilkan pada ribbon serta dijelaskan lebih lengkap di halaman ini."
          />
          <div className="space-y-4">
            <a
              href="https://data.bmkg.go.id/prakiraan-cuaca/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-semibold">BMKG — Prakiraan Cuaca</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sumber resmi prakiraan cuaca terbuka BMKG. Data cuaca harus
                menampilkan attribution BMKG pada aplikasi.
              </p>
            </a>
            <a
              href="https://www.idx.co.id/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-sm font-semibold">Bursa Efek Indonesia (IDX)</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Rujukan resmi pasar modal. Data pasar publik hanya akan
                digunakan setelah hak akses dan redistribusi diverifikasi.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-4xl bg-foreground p-8 text-background sm:p-12">
            <p className="text-sm font-medium text-background/60">Disclaimer</p>
            <blockquote className="mt-5 max-w-4xl text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
              Informasi cuaca dan pasar hanya disediakan untuk tujuan umum.
              Informasi tersebut dapat tertunda, berubah, tidak lengkap, atau
              tidak sesuai kondisi aktual. Data ini bukan nasihat investasi dan
              bukan pengganti peringatan resmi maupun prosedur operasional.
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-background/70">
              <span>Data ribbon saat ini: demo/statis</span>
              <span aria-hidden="true">·</span>
              <Link href="/produk/penawaran" className="text-background hover:underline">
                Hubungi Petro Anigos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
