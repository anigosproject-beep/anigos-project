"use client"

import Link from "next/link"
import { Download, Search } from "lucide-react"
import { useMemo, useState } from "react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Publication = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  pages: string
  href?: string
  available: boolean
}

const publications: Publication[] = [
  {
    slug: "company-profile-kemitraan-transportir",
    title: "Company Profile Kemitraan Transportir",
    description: "Profil dan informasi izin usaha mitra transportir yang mendukung kegiatan pengangkutan BBM.",
    category: "Company profile",
    date: "2020",
    pages: "Dokumen PDF",
    href: "/documents/company-profile-kemitraan-transportir.pdf",
    available: true,
  },
  {
    slug: "company-profile-anigos-jaya-perkasa",
    title: "Company Profile PT. Anigos Jaya Perkasa",
    description: "Profil perusahaan, layanan distribusi, produk, dan informasi operasional Petro Anigos.",
    category: "Company profile",
    date: "Segera hadir",
    pages: "Dalam persiapan",
    available: false,
  },
  {
    slug: "profil-produk-bbm-industri",
    title: "Profil Produk BBM Industri",
    description: "Ringkasan produk Solar/HSD dan B40 Biosolar untuk kebutuhan industri.",
    category: "Produk",
    date: "Segera hadir",
    pages: "Dalam persiapan",
    available: false,
  },
  {
    slug: "ringkasan-operasional-distribusi",
    title: "Ringkasan Operasional dan Distribusi",
    description: "Materi informasi tentang jangkauan, armada, dan koordinasi distribusi.",
    category: "Operasional",
    date: "Segera hadir",
    pages: "Dalam persiapan",
    available: false,
  },
]

const categories = ["Semua", ...Array.from(new Set(publications.map((publication) => publication.category)))]

export default function PublikasiPage() {
  const [category, setCategory] = useState("Semua")
  const [query, setQuery] = useState("")

  const filteredPublications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return publications.filter((publication) => {
      const matchesCategory = category === "Semua" || publication.category === category
      const matchesQuery =
        !normalizedQuery ||
        `${publication.title} ${publication.description}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <main>
      <PageHero
        eyebrow="Artikel / Publikasi"
        title="Pusat publikasi Petro Anigos."
        description="Akses materi informasi perusahaan, produk, operasional, dan kemitraan dalam format dokumen yang dapat dibaca dan diunduh."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Artikel", href: "/artikel/anigos-news" },
          { label: "Publikasi", href: "/artikel/publikasi" },
        ]}
      />

      <section className="border-b border-border bg-background py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:px-8">
          <SectionHeading
            eyebrow="Dokumen Resmi"
            title="Satu tempat untuk materi publikasi."
            description="Katalog ini disiapkan untuk memuat PDF yang telah melalui proses verifikasi dan disetujui untuk dibagikan secara publik."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Company profile", "Identitas dan kemitraan"],
              ["02", "Produk", "Informasi BBM industri"],
              ["03", "Operasional", "Distribusi dan jangkauan"],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-primary">{number}</p>
                <p className="mt-4 text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Katalog publikasi</p>
              <Heading level={2} className="mt-3">Pilih materi yang ingin Anda baca.</Heading>
            </div>
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari publikasi..."
                className="pl-9"
                aria-label="Cari publikasi"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === item
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4">
            {filteredPublications.map((publication) => (
              <Card key={publication.slug} className="bg-background">
                <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{publication.category}</Badge>
                      {!publication.available ? <Badge variant="outline">Segera hadir</Badge> : null}
                    </div>
                    <CardTitle className="mt-3 text-lg">{publication.title}</CardTitle>
                    <Text variant="small" className="mt-2 max-w-3xl">{publication.description}</Text>
                  </div>
                  {publication.available && publication.href ? (
                    <a href={publication.href} download className={buttonVariants({ size: "sm", className: "shrink-0" })}>
                      <Download data-icon="inline-start" /> Unduh
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-muted-foreground">Dokumen sedang disiapkan</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPublications.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-10 text-center">
              <p className="font-medium">Publikasi tidak ditemukan</p>
              <Text variant="small" className="mt-2">Coba gunakan kata kunci atau kategori lain.</Text>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">Pembaruan dokumen</Badge>
            <Heading level={2} className="mt-5 text-background">Materi publikasi akan ditambahkan bertahap.</Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Dokumen baru akan tersedia setelah proses penyusunan, verifikasi,
              dan persetujuan publikasi selesai.
            </Text>
          </div>
          <Link href="/artikel/anigos-news" className={buttonVariants({ className: "bg-background text-foreground hover:bg-background/90" })}>
            Kembali ke newsroom
          </Link>
        </div>
      </section>
    </main>
  )
}
