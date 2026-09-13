"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check, CircleAlert, Ship, Truck } from "lucide-react"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fleetCapacities = [
  { id: "armada-5000", value: "5.000", label: "Liter", note: "Kebutuhan ringan", image: "/images/partnership/partnership-transportation.svg" },
  { id: "armada-8000", value: "8.000", label: "Liter", note: "Distribusi fleksibel", image: "/images/partnership/partnership-distribution.svg" },
  { id: "armada-10000", value: "10.000", label: "Liter", note: "Operasional reguler", image: "/images/partnership/partnership-business.svg" },
  { id: "armada-16000", value: "16.000", label: "Liter", note: "Kebutuhan menengah", image: "/images/articles/article-operation.svg" },
  { id: "armada-24000", value: "24.000", label: "Liter", note: "Skala industri", image: "/images/resources/resource-energy.svg" },
  { id: "armada-30000", value: "30.000", label: "Liter", note: "Muatan besar", image: "/images/articles/article-b40.svg" },
] as const
type FleetId = (typeof fleetCapacities)[number]["id"]

export default function ArmadaPage() {
  const [selectedFleetId, setSelectedFleetId] = useState<FleetId>(fleetCapacities[0].id)
  const selectedFleet =
    fleetCapacities.find((fleet) => fleet.id === selectedFleetId) ?? fleetCapacities[0]

  return (
    <main>
      <PageHero
        eyebrow="Produk / Armada"
        title="Kapasitas armada yang mengikuti skala kebutuhan."
        description="Armada tangki BBM Petro Anigos tersedia dalam beberapa variasi kapasitas untuk mendukung kebutuhan distribusi mulai dari skala kecil hingga industri besar."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Produk", href: "/produk/kenali-produk" },
          { label: "Armada", href: "/produk/armada" },
        ]}
      />

      <section id="armada-darat" className="relative isolate overflow-hidden border-b border-border bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.1] blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-20 size-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Armada Darat / Trucking"
            title="Satu jaringan, enam pilihan kapasitas."
            description="Pilih kapasitas untuk melihat visual armada dan ringkasan penggunaannya. Variasi ini membantu proses verifikasi kebutuhan dilakukan secara lebih tepat."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-4xl bg-foreground shadow-xl lg:aspect-[16/9]">
              <Image
                key={selectedFleet.image}
                src={selectedFleet.image}
                alt={`Ilustrasi armada trucking kapasitas ${selectedFleet.value} liter`}
                fill
                className="object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-background lg:inset-x-8 lg:bottom-8">
                <div className="mt-3 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-sm font-medium text-background/75">Armada trucking</p>
                    <p className="mt-1 text-4xl font-semibold tracking-tight">
                      {selectedFleet.value} <span className="text-lg font-normal">liter</span>
                    </p>
                  </div>
                  <Truck className="hidden size-10 shrink-0 text-background/80 sm:block" />
                </div>
              </div>
            </div>

            <div>
              <Badge variant="secondary">Kapasitas armada</Badge>
              <Heading level={2} className="mt-5">
                Pilih volume sesuai kebutuhan distribusi.
              </Heading>
              <Text variant="lead" className="mt-5">
                Armada tangki HSD tersedia dalam beberapa kapasitas untuk
                mendukung kebutuhan ringan, reguler, hingga skala industri.
              </Text>
              <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{selectedFleet.note} dengan kapasitas {selectedFleet.value} liter.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border/70 pt-6">
            <p className="text-sm font-medium">Volume yang tersedia</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {fleetCapacities.map((fleet) => (
                <button
                  key={fleet.id}
                  id={fleet.id}
                  type="button"
                  onClick={() => setSelectedFleetId(fleet.id)}
                  aria-pressed={selectedFleetId === fleet.id}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedFleetId === fleet.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {fleet.value} {fleet.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="armada-laut" className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-8">
          <div className="relative min-h-80 overflow-hidden rounded-4xl bg-foreground">
            <Image
              src="/images/partnership/partnership-distribution.svg"
              alt="Ilustrasi distribusi antarwilayah"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/60" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-background lg:bottom-8 lg:left-8">
              <Ship className="size-7" />
              <span className="text-sm font-medium">Distribusi antarwilayah</span>
            </div>
          </div>
          <div>
            <Badge variant="secondary">Transportasi laut</Badge>
            <Heading level={2} className="mt-5">
              Dukungan logistik untuk kebutuhan antarpulau.
            </Heading>
            <Text variant="lead" className="mt-5">
              Selain armada darat, referensi perusahaan menyebut sarana transportasi
              laut seperti kapal Batam Marine I untuk mendukung pengangkutan BBM
              antarwilayah atau antarpulau.
            </Text>
            <Text variant="body-muted" className="mt-5 flex items-start gap-2">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
              Detail jumlah kapal, jadwal, kapasitas, dan ketersediaan perlu
              dikonfirmasi berdasarkan kebutuhan pengiriman.
              </span>
            </Text>
          </div>
        </div>
      </section>

      <section id="armada-mitra" className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
          <div>
            <Badge variant="secondary">Mitra transportir</Badge>
            <Heading level={2} className="mt-5">
              Distribusi diperkuat mitra resmi.
            </Heading>
            <Text variant="lead" className="mt-5">
              PT Masinton Nusa Perkasa mendukung distribusi sebagai mitra
              transportir resmi dengan izin usaha pengangkutan Minyak dan Gas Bumi.
            </Text>
            <Link href="/tentang-kami/kemitraan" className={buttonVariants({ className: "mt-8" })}>
              Lihat detail kemitraan
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[2fr_3fr]">
            <div className="relative min-h-56 bg-foreground lg:min-h-full">
              <Image
                src="/images/partnership/partnership-business.svg"
                alt="Ilustrasi kemitraan distribusi Petro Anigos"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6 lg:p-8">
              <CardHeader className="px-0">
                <CardTitle>Skema distribusi yang dapat dibahas</CardTitle>
              </CardHeader>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  Penyesuaian wilayah dan titik bongkar
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  Penentuan volume dan jadwal distribusi
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  Verifikasi armada sesuai kebutuhan
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-background/30 text-background">
              Siap berdiskusi
            </Badge>
            <Heading level={2} className="mt-5 text-background">
              Temukan kapasitas yang sesuai untuk kebutuhan Anda.
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Sampaikan volume, lokasi, jadwal, dan moda distribusi untuk dibahas
              bersama tim Petro Anigos.
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
            })}
          >
            Ajukan kebutuhan
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </main>
  )
}
