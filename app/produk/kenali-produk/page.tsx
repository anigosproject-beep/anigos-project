"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Check,
  CircleAlert,
  ClipboardCheck,
  Droplets,
  FileText,
  Truck,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import { DistributionLinePattern } from "@/components/patterns"
import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"

const purchaseSteps = [
  {
    number: "01",
    title: "Sampaikan kebutuhan",
    description:
      "Informasikan jenis produk, estimasi volume, lokasi, jadwal, dan kebutuhan moda transportasi.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Verifikasi kebutuhan",
    description:
      "Tim Petro Anigos meninjau ketersediaan produk, volume, wilayah, armada, dan jadwal distribusi.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Penawaran dan persetujuan",
    description:
      "Penawaran disusun berdasarkan kebutuhan pelanggan untuk dibahas dan disepakati bersama.",
    icon: Check,
  },
  {
    number: "04",
    title: "Pengiriman dan penyelesaian",
    description:
      "Produk disiapkan, armada ditentukan, lalu pengiriman dan dokumen transaksi diselesaikan sesuai kesepakatan.",
    icon: Truck,
  },
] as const

const productSpecs = [
  ["Produk", "Solar/HSD dan B40 Biosolar"],
  ["Komposisi B40", "40% Biodiesel + 60% Solar/HSD"],
  ["Standar mutu", "Mengacu pada spesifikasi Ditjen Migas RI"],
  ["Merek", "Petro Anigos"],
  ["Skala kebutuhan", "Kecil, menengah, besar, hingga nasional"],
] as const

const b40ChartData = [
  { component: "Biodiesel", percentage: 40 },
  { component: "Solar/HSD", percentage: 60 },
]

const b40ChartConfig = {
  percentage: { label: "Komposisi (%)" },
  biodiesel: { label: "Biodiesel", color: "var(--chart-1)" },
  solar: { label: "Solar/HSD", color: "var(--chart-2)" },
} satisfies ChartConfig

export default function KenaliProdukPage() {
  const [activeComponent, setActiveComponent] = useState("Biodiesel")

  return (
    <main>
      <PageHero
        eyebrow="Produk"
        title="Bahan Bakar Industri untuk kebutuhan operasional Anda."
        description="Petro Anigos menyediakan Solar/HSD dan B40 Biosolar dengan mutu serta spesifikasi yang mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: "Produk", href: "/produk/kenali-produk" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kenali Produk"
            title="Dua pilihan BBM untuk kebutuhan distribusi dan industri."
            description="Produk Petro Anigos disiapkan untuk mendukung kebutuhan konsumen dengan pendekatan yang mengutamakan mutu, ketepatan, keselamatan, dan keandalan layanan."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
                  <Droplets className="size-6" />
                </div>
                <Badge variant="secondary" className="mt-5 w-fit">
                  Solar / HSD
                </Badge>
                <CardTitle className="text-2xl">Bahan Bakar Minyak</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body-muted">
                  Produk bahan bakar minyak jenis solar yang dipasarkan dengan
                  mutu dan spesifikasi sesuai acuan Ditjen Migas RI.
                </Text>
              </CardContent>
            </Card>
            <Card className="h-full bg-foreground text-background">
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-background/10">
                  <Droplets className="size-6" />
                </div>
                <Badge variant="outline" className="mt-5 w-fit border-background/30 text-background">
                  B40 Biosolar
                </Badge>
                <CardTitle className="text-2xl text-background">
                  Campuran biodiesel dan solar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body-muted" className="text-background/70">
                  Produk yang mengikuti program pemerintah dengan komposisi 40%
                  Biodiesel dan 60% bahan bakar minyak jenis solar.
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Komposisi B40
              </Badge>
              <CardTitle className="mt-4 text-2xl">
                Campuran yang membentuk B40 Biosolar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 divide-x rounded-2xl border border-border">
                {b40ChartData.map((item) => {
                  const isActive = activeComponent === item.component
                  const configKey =
                    item.component === "Biodiesel" ? "biodiesel" : "solar"

                  return (
                    <button
                      key={item.component}
                      type="button"
                      data-active={isActive}
                      onClick={() => setActiveComponent(item.component)}
                      className="flex flex-col gap-1 px-4 py-3 text-left transition-colors data-[active=true]:bg-muted/60"
                    >
                      <span className="text-xs text-muted-foreground">
                        {b40ChartConfig[configKey].label}
                      </span>
                      <span className="text-2xl font-bold">{item.percentage}%</span>
                    </button>
                  )
                })}
              </div>
              <ChartContainer config={b40ChartConfig} className="h-[260px] w-full">
                <BarChart
                  accessibilityLayer
                  data={b40ChartData}
                  layout="vertical"
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} unit="%" />
                  <YAxis
                    dataKey="component"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={76}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        nameKey="percentage"
                        formatter={(value) => [`${value}%`, "Komposisi"]}
                      />
                    }
                  />
                  <Bar
                    dataKey="percentage"
                    radius={6}
                  >
                    {b40ChartData.map((entry) => (
                      <Cell
                        key={entry.component}
                        fill={
                          entry.component === "Biodiesel"
                            ? "var(--color-biodiesel)"
                            : "var(--color-solar)"
                        }
                        fillOpacity={entry.component === activeComponent ? 1 : 0.28}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <div>
            <SectionHeading
              eyebrow="Memahami Produk"
              title="B40 Biosolar mengikuti program mandatori pemerintah."
              description="B40 Biosolar merupakan produk BBM dengan campuran 40% Biodiesel dan 60% bahan bakar minyak jenis solar."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border p-5">
                <p className="text-3xl font-semibold text-primary">40%</p>
                <p className="mt-2 font-medium">Biodiesel</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Bagian biodiesel dalam komposisi B40.
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <p className="text-3xl font-semibold text-primary">60%</p>
                <p className="mt-2 font-medium">Solar/HSD</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Bagian bahan bakar minyak jenis solar.
                </p>
              </div>
            </div>
            <Text variant="body-muted" className="mt-6 flex items-start gap-2">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
              Mutu dan spesifikasi produk mengacu pada standar Direktorat
              Jenderal Minyak dan Gas Bumi Republik Indonesia. Chart ini hanya
              menjelaskan komposisi produk, bukan klaim performa atau
              penghematan.
              </span>
            </Text>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-border bg-muted/40 py-24 lg:py-32">
        <DistributionLinePattern className="text-primary opacity-[0.11] blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-chart-2/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 rounded-[2rem] border border-border/70 bg-background/35 p-6 shadow-sm backdrop-blur-md lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:p-10">
            <SectionHeading
              eyebrow="Spesifikasi Ringkas"
              title="Informasi utama sebelum menentukan kebutuhan."
              description="Ringkasan ini membantu calon pelanggan memahami produk yang tersedia sebelum mengajukan kebutuhan distribusi."
            />
            <Card className="bg-background/80 shadow-lg backdrop-blur-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Informasi</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productSpecs.map(([label, value]) => (
                      <TableRow key={label}>
                        <TableCell className="font-medium">{label}</TableCell>
                        <TableCell className="text-muted-foreground">{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skema Pembelian"
            title="Proses transaksi yang dimulai dari kebutuhan Anda."
            description="Alur berikut adalah gambaran awal proses pembelian. Detail harga, minimum order, pembayaran, dan ketentuan komersial dibahas sesuai kebutuhan serta persetujuan bersama."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {purchaseSteps.map((step) => {
              const Icon = step.icon

              return (
                <Card key={step.number} className="relative h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                        {step.number}
                      </span>
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-5 text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="small">{step.description}</Text>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skema Transportasi"
            title="Pilih pendekatan distribusi sesuai wilayah dan kebutuhan."
            description="Moda transportasi dibahas saat verifikasi kebutuhan agar produk, volume, lokasi, dan jadwal dapat diselaraskan."
          />
          <Tabs defaultValue="darat" className="mt-12">
            <TabsList className="grid w-full min-w-0 grid-cols-3">
              <TabsTrigger
                value="darat"
                className="w-full"
              >
                Darat
              </TabsTrigger>
              <TabsTrigger
                value="laut"
                className="w-full"
              >
                Laut
              </TabsTrigger>
              <TabsTrigger
                value="mitra"
                className="w-full"
              >
                Mitra Transportir
              </TabsTrigger>
            </TabsList>
            <TabsContent value="darat" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-transportation.svg" alt="Ilustrasi transportasi darat" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>Armada tangki darat</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      Armada tersedia dalam variasi kapasitas 5.000 L, 8.000 L,
                      10.000 L, 16.000 L, 24.000 L, dan 30.000 L untuk mendukung
                      kebutuhan distribusi dari skala kecil hingga industri besar.
                    </Text>
                    <Link href="/produk/armada#armada-darat" className={buttonVariants({ className: "mt-6" })}>
                      Lihat armada
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="laut" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-distribution.svg" alt="Ilustrasi transportasi laut" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>Transportasi laut</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      Sarana transportasi laut digunakan untuk mendukung
                      pengangkutan BBM antarwilayah atau antarpulau. Referensi
                      menyebut kapal Batam Marine I sebagai salah satu
                      dokumentasi pendukung.
                    </Text>
                    <Link href="/produk/armada#armada-laut" className={buttonVariants({ className: "mt-6" })}>
                      Lihat armada
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="mitra" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-business.svg" alt="Ilustrasi mitra transportir" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>Mitra transportir resmi</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      Distribusi didukung PT Masinton Nusa Perkasa sebagai mitra
                      transportir resmi dengan izin usaha pengangkutan Minyak dan
                      Gas Bumi.
                    </Text>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/produk/armada#armada-mitra" className={buttonVariants()}>
                        Lihat armada
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                      <Link href="/tentang-kami/kemitraan" className={buttonVariants({ variant: "outline" })}>
                        Lihat detail kemitraan
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Penyesuaian Pengiriman"
              title="Sampaikan detail kebutuhan distribusi Anda."
              description="Setiap kebutuhan dapat dibahas berdasarkan jenis produk, volume, lokasi, jadwal, dan moda transportasi yang diperlukan."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Lokasi pengiriman", "Volume per pengiriman", "Frekuensi pengiriman", "Jadwal penerimaan"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <Check className="size-4 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Hal yang dibahas saat penawaran</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion>
                <AccordionItem value="commercial">
                  <AccordionTrigger>Ketentuan komersial</AccordionTrigger>
                  <AccordionContent>
                    Harga, minimum order, metode pembayaran, dan syarat transaksi
                    dibahas berdasarkan kebutuhan serta persetujuan kedua pihak.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery">
                  <AccordionTrigger>Detail distribusi</AccordionTrigger>
                  <AccordionContent>
                    Wilayah, jadwal, volume, dan moda pengiriman diselaraskan
                    sebelum penawaran disepakati.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
            <Heading level={2} className="mt-5">
              Sampaikan kebutuhan BBM industri Anda kepada Petro Anigos.
            </Heading>
            <Text variant="lead" className="mt-5 text-background/70">
              Tim kami siap membahas produk, volume, lokasi, dan skema distribusi
              yang sesuai.
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
            })}
          >
            Ajukan Penawaran
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-background/15" />
      </section>
    </main>
  )
}
