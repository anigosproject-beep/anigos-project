"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CircleAlert } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MockPerson = {
  initials: string
  image: string
  name: string
  role: string
  description: string
}

const mockPeople = {
  komisaris: [
    {
      initials: "AS",
      image: "/images/team/portrait-placeholder.svg",
      name: "Arif Setiawan",
      role: "Komisaris",
      description: "Mengawasi arah tata kelola dan kepatuhan perusahaan.",
    },
  ],
  direksi: [
    {
      initials: "DN",
      image: "/images/team/portrait-placeholder.svg",
      name: "Dimas Nugraha",
      role: "Direktur Utama",
      description: "Mengkoordinasikan strategi dan pengembangan usaha.",
    },
    {
      initials: "MP",
      image: "/images/team/portrait-placeholder.svg",
      name: "Maya Prameswari",
      role: "Direktur Operasional",
      description: "Memimpin pengelolaan operasional dan layanan distribusi.",
    },
  ],
  operasional: [
    {
      initials: "FA",
      image: "/images/team/portrait-placeholder.svg",
      name: "Fajar Ananta",
      role: "Koordinator Operasional",
      description: "Mengatur koordinasi distribusi dan kebutuhan pelanggan.",
    },
  ],
  armada: [
    {
      initials: "RW",
      image: "/images/team/portrait-placeholder.svg",
      name: "Raka Wibowo",
      role: "Koordinator Armada",
      description: "Memantau kesiapan armada dan alur pengiriman.",
    },
  ],
  kemitraan: [
    {
      initials: "SN",
      image: "/images/team/portrait-placeholder.svg",
      name: "Sinta Nuraini",
      role: "Koordinator Kemitraan",
      description: "Menjaga komunikasi dan layanan bersama mitra.",
    },
  ],
} satisfies Record<string, readonly MockPerson[]>

function PersonCards({
  people,
}: {
  people: readonly MockPerson[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {people.map((person) => (
        <div
          key={person.name}
          className="rounded-2xl border border-border bg-background p-5"
        >
          <div className="flex gap-4">
            <Image
              src={person.image}
              alt={`Foto placeholder ${person.name}`}
              width={96}
              height={120}
              className="h-24 w-20 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="font-medium">{person.name}</p>
              <p className="mt-1 text-sm text-primary">{person.role}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                Profil ilustrasi
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {person.description}
          </p>
          <Badge variant="outline" className="mt-4">
            <span className="inline-flex items-center gap-1.5">
              <CircleAlert className="size-3" />
              Data mock
            </span>
          </Badge>
        </div>
      ))}
    </div>
  )
}

export default function StrukturPerusahaanPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tentang Kami"
        title="Struktur Perusahaan"
        description="Mengenal kerangka tata kelola, kepemimpinan, dan fungsi kerja yang mendukung operasional PT. Anigos Jaya Perkasa."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Tabs
            defaultValue="komisaris"
            orientation="vertical"
            className="grid gap-12 lg:grid-cols-[20%_minmax(0,1fr)] lg:gap-16"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Struktur Organisasi
              </p>
              <TabsList className="mt-8 flex w-full flex-col items-stretch">
                {[
                  ["komisaris", "Komisaris"],
                  ["direksi", "Direksi"],
                  ["tim-divisi", "Tim dan Divisi"],
                ].map(([value, label]) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="w-full justify-start text-left"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div>
              <TabsContent value="komisaris">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Komisaris
                  </Badge>
                  <CardTitle className="mt-4 text-2xl">
                    Pengawasan dan tata kelola perusahaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Text variant="body-muted">
                    Struktur nama dan jabatan Komisaris belum tercantum dalam
                    company profile yang menjadi referensi website.
                  </Text>
                  <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <CircleAlert className="size-4 text-muted-foreground" />
                      Data perlu dilengkapi
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Nama Komisaris, jabatan, dan informasi profil yang
                      disetujui untuk dipublikasikan.
                    </p>
                  </div>
                  <PersonCards people={mockPeople.komisaris} />
                </CardContent>
              </Card>

              </TabsContent>
              <TabsContent value="direksi">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Direksi
                  </Badge>
                  <CardTitle className="mt-4 text-2xl">
                    Kepemimpinan dan pengelolaan usaha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Text variant="body-muted">
                    Company profile belum memuat nama Direksi, pembagian
                    tanggung jawab, atau profil pimpinan perusahaan.
                  </Text>
                  <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <CircleAlert className="size-4 text-muted-foreground" />
                      Data perlu dilengkapi
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Nama Direktur, jabatan, tanggung jawab, dan foto atau
                      biografi jika memang akan ditampilkan.
                    </p>
                  </div>
                  <PersonCards people={mockPeople.direksi} />
                </CardContent>
              </Card>

              </TabsContent>
              <TabsContent value="tim-divisi">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Tim dan Divisi
                  </Badge>
                  <CardTitle className="mt-4 text-2xl">
                    Fungsi kerja yang mendukung layanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Text variant="body-muted">
                    Belum tersedia bagan organisasi, daftar departemen, atau
                    jumlah karyawan yang dapat digunakan sebagai struktur
                    publik.
                  </Text>
                  <Tabs
                    defaultValue="operasional"
                    orientation="horizontal"
                    className="gap-0"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="operasional"
                        className="w-full text-center"
                      >
                        Operasional Distribusi
                      </TabsTrigger>
                      <TabsTrigger
                        value="armada"
                        className="w-full text-center"
                      >
                        Armada &amp; Logistik
                      </TabsTrigger>
                      <TabsTrigger
                        value="kemitraan"
                        className="w-full text-center"
                      >
                        Kemitraan &amp; Layanan
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="operasional" className="mt-6">
                      <div                       className="rounded-2xl border border-border p-5">
                        <p className="mt-4 font-medium">Jaringan operasional</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Kantor pusat di Bekasi dan titik jaringan di Palembang,
                          Medan, Kalimantan, serta Sulawesi.
                        </p>
                        <PersonCards people={mockPeople.operasional} />
                      </div>
                    </TabsContent>
                    <TabsContent value="armada" className="mt-6">
                      <div                       className="rounded-2xl border border-border p-5">
                        <p className="mt-4 font-medium">Armada dan logistik</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Fungsi armada dan logistik mendukung distribusi produk
                          energi ke berbagai wilayah operasional.
                        </p>
                        <PersonCards people={mockPeople.armada} />
                      </div>
                    </TabsContent>
                    <TabsContent value="kemitraan" className="mt-6">
                      <div                       className="rounded-2xl border border-border p-5">
                        <p className="mt-4 font-medium">Kemitraan dan layanan</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Kemitraan dan layanan menjadi bagian dari pengelolaan
                          hubungan dengan pelanggan serta mitra operasional.
                        </p>
                        <PersonCards people={mockPeople.kemitraan} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              Struktur dan legalitas
            </Badge>
            <Heading level={2} className="mt-5">
              Kenali dasar hukum dan jaringan operasional kami.
            </Heading>
            <p className="mt-5 leading-7 text-background/70">
              Informasi legalitas dan jangkauan yang tersedia dapat menjadi
              referensi awal mengenai fondasi operasional perusahaan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({
                className: "bg-background text-foreground hover:bg-background/90",
              })}
            >
              Lihat Legalitas
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/jangkauan"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-background/30 text-background hover:bg-background/10 hover:text-background",
              })}
            >
              Lihat Jangkauan
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-background/15" />
      </section>
    </main>
  )
}
