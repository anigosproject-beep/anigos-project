import Link from "next/link"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cookieTypes = [
  {
    title: "Cookies esensial",
    description:
      "Cookies yang diperlukan agar fitur dasar website dapat berjalan, termasuk menyimpan pilihan persetujuan cookies dan membantu menjaga preferensi tampilan.",
    status: "Aktif",
  },
  {
    title: "Cookies preferensi",
    description:
      "Cookies yang dapat membantu mengingat pilihan pengguna seperti bahasa atau preferensi tampilan ketika fitur tersebut menggunakannya.",
    status: "Terbatas",
  },
  {
    title: "Cookies analitik dan iklan",
    description:
      "Saat ini tidak digunakan. Jika diaktifkan di masa depan, pengguna akan diberi informasi dan pilihan yang sesuai sebelum cookie non-esensial disimpan.",
    status: "Tidak aktif",
  },
]

export const metadata = {
  title: "Ketentuan Cookies",
  description: "Penjelasan penggunaan cookies pada website Petro Anigos.",
}

export default function KetentuanCookiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ketentuan Cookies"
        title="Cara kami menggunakan cookies di website Petro Anigos."
        description="Kami menggunakan cookies secara terbatas untuk mendukung fungsi dasar website dan menghormati pilihan pengunjung."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Ketentuan Cookies", href: "/ketentuan-cookies" }]}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary">Transparansi penggunaan</Badge>
            <Heading level={2} className="mt-5">
              Cookies membantu website mengingat konteks yang diperlukan.
            </Heading>
            <Text variant="lead" className="mt-5">
              Cookies adalah file data kecil yang disimpan pada perangkat ketika
              mengunjungi website. Ketentuan ini menjelaskan jenis, tujuan,
              durasi, dan pilihan yang tersedia bagi pengguna.
            </Text>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cookieTypes.map((cookieType) => (
              <Card key={cookieType.title} className="h-full">
                <CardHeader>
                  <Badge variant={cookieType.status === "Aktif" ? "secondary" : "outline"} className="w-fit">
                    {cookieType.status}
                  </Badge>
                  <CardTitle className="mt-4">{cookieType.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{cookieType.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <SectionHeading
            eyebrow="Cookies persetujuan"
            title="Pilihanmu disimpan selama 180 hari."
            description="Website menyimpan pilihan consent pada cookie bernama petro_anigos_cookie_consent. Nilainya hanya menunjukkan pilihan persetujuan, bukan data identitas."
          />
          <div className="space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              Pilihan “Hanya yang diperlukan” mengizinkan fungsi dasar yang
              dibutuhkan agar website berjalan. Pilihan “Terima semua” saat ini
              tetap tidak mengaktifkan analytics atau iklan karena layanan
              tersebut belum dipasang.
            </p>
            <p>
              Jika layanan pihak ketiga ditambahkan di masa depan, konfigurasi
              dan pemberitahuan cookies akan diperbarui sebelum kategori baru
              digunakan.
            </p>
            <p>
              Kamu dapat menghapus cookies melalui pengaturan browser. Setelah
              itu banner persetujuan akan muncul kembali pada kunjungan
              berikutnya.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-foreground p-8 text-background sm:p-12">
            <p className="text-sm font-medium text-background/60">Pembaruan ketentuan</p>
            <blockquote className="mt-5 max-w-4xl text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
              Kami akan memperbarui halaman ini apabila teknologi, layanan, atau
              kebutuhan kepatuhan cookies di website berubah.
            </blockquote>
            <Link href="/kebijakan-data" className="mt-8 inline-block text-sm text-background/70 hover:text-background hover:underline">
              Lihat kebijakan data
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
