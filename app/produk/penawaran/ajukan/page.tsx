"use client"

import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, ArrowRight, CalendarDays, CircleAlert, ReceiptText } from "lucide-react"
import { useState } from "react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const volumePresets = [5000, 8000, 10000, 16000, 24000, 30000]
const scheduleOptions = [
  {
    value: "Terjadwal",
    label: "Terjadwal",
    description: "Memiliki target tanggal penerimaan.",
  },
  {
    value: "Berkala",
    label: "Berkala",
    description: "Kebutuhan berulang yang perlu dibahas.",
  },
  {
    value: "Sesuai kebutuhan",
    label: "Sesuai kebutuhan",
    description: "Waktu pengiriman dibahas kemudian.",
  },
] as const

// Temporary values until product pricing is managed through the CMS.
const productBasePrices: Record<string, number> = {
  "Solar / HSD": 10000,
  "B40 Biosolar": 10500,
}

const coverageAreas = [
  { value: "Bekasi", label: "Bekasi", province: "Jawa Barat" },
  { value: "Palembang", label: "Palembang", province: "Sumatera Selatan" },
  { value: "Medan", label: "Medan", province: "Sumatera Utara" },
  {
    value: "Palangka Raya",
    label: "Palangka Raya",
    province: "Kalimantan Tengah",
  },
  {
    value: "Sulawesi Utara",
    label: "Sulawesi — titik operasional 1",
    province: "Sulawesi Utara",
  },
  {
    value: "Sulawesi Selatan",
    label: "Sulawesi — titik operasional 2",
    province: "Sulawesi Selatan",
  },
] as const

const initialForm = {
  product: "Solar / HSD",
  volume: "5000",
  region: "Bekasi",
  schedule: "Terjadwal",
  company: "",
  contact: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
}

export default function AjukanPenawaranPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [pbbkbRate, setPbbkbRate] = useState("")
  const [deliveryDate, setDeliveryDate] = useState<Date>()

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const volume = Number(form.volume) || 0
  const basePrice = productBasePrices[form.product] ?? 0
  const taxRate = Number(pbbkbRate) || 0
  const selectedCoverage = coverageAreas.find(
    (area) => area.value === form.region
  )
  const subtotal = volume * basePrice
  const estimatedPbbkb = subtotal * (taxRate / 100)
  const estimatedTotal = subtotal + estimatedPbbkb
  const formatCurrency = (value: number) =>
    value > 0
      ? `Rp ${value.toLocaleString("id-ID")}`
      : "Belum dihitung"

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = `Pengajuan Penawaran BBM - ${form.company || "Calon pelanggan"}`
    const body = [
      `Produk: ${form.product}`,
      `Volume: ${Number(form.volume).toLocaleString("id-ID")} liter`,
      `Harga dasar per liter: ${formatCurrency(basePrice)} (${form.product})`,
      `Tarif PBBKB yang digunakan: ${taxRate}%`,
      `Estimasi PBBKB: ${formatCurrency(estimatedPbbkb)}`,
      `Estimasi total: ${formatCurrency(estimatedTotal)}`,
      `Wilayah: ${form.region}`,
      `Jadwal: ${form.schedule}`,
      ...(form.schedule === "Terjadwal" && deliveryDate
        ? [`Tanggal penerimaan yang diharapkan: ${format(deliveryDate, "dd/MM/yyyy")}`]
        : []),
      `Perusahaan: ${form.company}`,
      `Narahubung: ${form.contact}`,
      `Email: ${form.email}`,
      `Telepon: ${form.phone}`,
      `Alamat: ${form.address}`,
      `Catatan: ${form.notes}`,
    ].join("\n")

    window.location.href = `mailto:anigospetro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main>
      <PageHero
        eyebrow="Produk / Penawaran"
        title="Ajukan kebutuhan BBM industri Anda."
        description="Lengkapi informasi awal agar tim Petro Anigos dapat memahami kebutuhan produk, volume, lokasi, dan moda distribusi yang diperlukan."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Produk", href: "/produk/kenali-produk" },
          { label: "Penawaran", href: "/produk/penawaran" },
        ]}
      />

      <section className="border-b border-border bg-[linear-gradient(135deg,white_0%,color-mix(in_oklab,var(--muted)_42%,white)_52%,white_100%)] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
          <div>
            <SectionHeading
              level={3}
              className="gap-2"
              eyebrow={`Langkah ${step} dari 2`}
              title={
                <span className="text-2xl leading-tight sm:text-3xl">
                  {step === 1
                    ? "Konfigurasi kebutuhan Anda."
                    : "Lengkapi detail pemohon."}
                </span>
              }
              description={
                <span className="text-base leading-6 sm:text-lg">
                  Form ini hanya menyiapkan informasi awal. Harga, minimum
                  order, pembayaran, dan ketentuan komersial akan dikonfirmasi
                  melalui proses penawaran.
                </span>
              }
            />

            <form onSubmit={handleSubmit} className="mt-8">
              {step === 1 ? (
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Jenis bahan bakar</FieldLabel>
                      <FieldContent>
                        <RadioGroup
                          value={form.product}
                          onValueChange={(value) => update("product", String(value))}
                          className="sm:grid-cols-2"
                        >
                          {["Solar / HSD", "B40 Biosolar"].map((product) => (
                            <label key={product} className="flex cursor-pointer gap-3 rounded-2xl border border-border p-4 has-data-checked:border-primary">
                              <RadioGroupItem value={product} />
                              <span>
                                <span className="block text-sm font-medium">{product}</span>
                                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                  {product === "B40 Biosolar" ? "40% Biodiesel + 60% Solar/HSD" : "Bahan bakar minyak jenis solar"}
                                </span>
                              </span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Volume kebutuhan (liter)</FieldLabel>
                      <FieldContent>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-2xl font-semibold">
                            {Number(form.volume || 0).toLocaleString("id-ID")} L
                          </span>
                          <span className="text-sm text-muted-foreground">
                            1.000–30.000 L
                          </span>
                        </div>
                        <Slider
                          aria-label="Volume kebutuhan dalam liter"
                          min={1000}
                          max={30000}
                          step={1000}
                          value={[Number(form.volume) || 5000]}
                          onValueChange={(value) => {
                            const nextVolume = Array.isArray(value)
                              ? value[0]
                              : value
                            update("volume", String(nextVolume ?? 5000))
                          }}
                          className="mt-4"
                        />
                        <FieldDescription>
                          Geser untuk memilih estimasi volume. Preset di bawah
                          mengikuti variasi kapasitas armada yang tersedia.
                        </FieldDescription>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {volumePresets.map((volume) => (
                            <button
                              key={volume}
                              type="button"
                              onClick={() => update("volume", String(volume))}
                              className={buttonVariants({
                                variant: form.volume === String(volume) ? "default" : "outline",
                                size: "sm",
                              })}
                            >
                              {volume.toLocaleString("id-ID")} L
                            </button>
                          ))}
                        </div>
                      </FieldContent>
                    </Field>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="region">Wilayah pengiriman</FieldLabel>
                        <FieldContent>
                          <Select
                            value={form.region}
                            onValueChange={(value) => update("region", String(value))}
                          >
                            <SelectTrigger id="region" className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl p-1.5">
                              {coverageAreas.map((area) => (
                                <SelectItem
                                  key={area.value}
                                  value={area.value}
                                  className="rounded-xl px-3 py-2 text-xs leading-5"
                                >
                                  {area.label} · {area.province}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="schedule">Jadwal pengiriman</FieldLabel>
                        <FieldContent>
                          <Select
                            value={form.schedule}
                            onValueChange={(value) => update("schedule", String(value))}
                          >
                            <SelectTrigger id="schedule" className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl p-1.5">
                              {scheduleOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="rounded-xl px-3 py-2 leading-5"
                                >
                                  <span className="flex min-w-0 flex-col items-start gap-0.5">
                                    <span>{option.label}</span>
                                    <span className="text-[11px] font-normal leading-4 text-muted-foreground">
                                      {option.description}
                                    </span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FieldContent>
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>
              ) : (
                <FieldSet>
                  <FieldGroup>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="company">Nama perusahaan</FieldLabel>
                        <FieldContent><Input id="company" value={form.company} onChange={(event) => update("company", event.target.value)} required /></FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="contact">Nama narahubung</FieldLabel>
                        <FieldContent><Input id="contact" value={form.contact} onChange={(event) => update("contact", event.target.value)} required /></FieldContent>
                      </Field>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <FieldContent><Input id="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Nomor telepon</FieldLabel>
                        <FieldContent><Input id="phone" type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></FieldContent>
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="address">Alamat titik bongkar</FieldLabel>
                      <FieldContent><Input id="address" value={form.address} onChange={(event) => update("address", event.target.value)} required /></FieldContent>
                    </Field>
                    {form.schedule === "Terjadwal" ? (
                      <Field>
                        <FieldLabel>Tanggal penerimaan yang diharapkan</FieldLabel>
                        <FieldContent>
                          <Popover>
                            <PopoverTrigger
                              render={
                                <button
                                  type="button"
                                  className={buttonVariants({
                                    variant: "outline",
                                    className: "w-full justify-between font-normal",
                                  })}
                                />
                              }
                            >
                              {deliveryDate
                                ? format(deliveryDate, "dd MMMM yyyy")
                                : "Pilih tanggal penerimaan"}
                              <CalendarDays className="size-4 text-muted-foreground" />
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={deliveryDate}
                                onSelect={setDeliveryDate}
                                disabled={{ before: new Date() }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FieldDescription>
                            <span className="flex items-start gap-2">
                              <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
                              <span>
                                Tanggal ini menjadi acuan awal dan tetap dikonfirmasi
                                bersama tim Petro Anigos.
                              </span>
                            </span>
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    ) : null}
                    <Field>
                      <FieldLabel htmlFor="notes">Catatan kebutuhan</FieldLabel>
                      <FieldContent>
                        <Textarea id="notes" rows={5} value={form.notes} onChange={(event) => update("notes", event.target.value)} />
                        <FieldDescription>Sertakan frekuensi, kebutuhan khusus, atau informasi distribusi lainnya.</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              )}
              <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
                {step === 2 ? (
                  <button type="button" onClick={() => setStep(1)} className={buttonVariants({ variant: "outline" })}>
                    <ArrowLeft data-icon="inline-start" /> Kembali
                  </button>
                ) : <span />}
                {step === 1 ? (
                  <button type="button" onClick={() => setStep(2)} className={buttonVariants()}>
                    Lanjut ke detail pemohon <ArrowRight data-icon="inline-end" />
                  </button>
                ) : (
                  <button type="submit" className={buttonVariants()}>
                    Siapkan email penawaran
                  </button>
                )}
              </div>
            </form>
          </div>

          <Card className="h-fit overflow-hidden border-border/70 bg-background/55 shadow-lg backdrop-blur-xl lg:sticky lg:top-28">
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 bg-transparent px-5 py-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ReceiptText className="size-4" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="truncate text-sm">Estimasi kebutuhan</CardTitle>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Ringkasan sementara</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-background/70 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Draft
              </span>
            </CardHeader>
            <CardContent className="space-y-4 p-5 text-xs">
              <div className="space-y-2.5">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Produk</span>
                  <span className="text-right font-medium">{form.product}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="font-medium">{volume.toLocaleString("id-ID")} L</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Wilayah</span>
                  <span className="text-right font-medium">{form.region || "Belum diisi"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Jadwal</span>
                  <span className="text-right font-medium">{form.schedule || "Belum diisi"}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Estimasi pajak BBM</p>
                  <Text variant="small" className="mt-1 text-xs">
                    Pilih area layanan dan tarif PBBKB untuk simulasi sementara.
                  </Text>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="coverage-area" className="text-[11px] font-medium">
                      Area layanan
                    </label>
                    <Select
                      value={form.region}
                      onValueChange={(value) => update("region", String(value))}
                    >
                      <SelectTrigger id="coverage-area" size="sm" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl p-1.5">
                        {coverageAreas.map((area) => (
                          <SelectItem
                            key={area.value}
                            value={area.value}
                            className="rounded-xl px-3 py-2 text-sm leading-5"
                          >
                            {area.label} · {area.province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
                    <div>
                      <p className="text-[11px] font-medium">Harga dasar / liter</p>
                      <p className="text-[10px] text-muted-foreground">
                        {form.product} · sementara
                      </p>
                    </div>
                    <span className="font-medium">{formatCurrency(basePrice)}</span>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pbbkb-rate" className="text-[11px] font-medium">
                      Tarif PBBKB {selectedCoverage ? `(${selectedCoverage.province})` : ""}
                    </label>
                    <Input
                      id="pbbkb-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Sesuai provinsi"
                      value={pbbkbRate}
                      onChange={(event) => setPbbkbRate(event.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-3 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Dasar harga</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4">
                    <span className="text-muted-foreground">Estimasi PBBKB</span>
                    <span>{formatCurrency(estimatedPbbkb)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between gap-4 font-semibold">
                    <span>Estimasi total</span>
                    <span>{formatCurrency(estimatedTotal)}</span>
                  </div>
                </div>
                <Text variant="small" className="flex items-start gap-2 text-[11px] leading-4">
                  <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <span>
                  PBBKB mengikuti ketentuan provinsi terpilih dan perlu
                  dikonfirmasi sesuai penggunaan BBM. Simulasi ini bukan tagihan resmi.
                  </span>
                </Text>
              </div>
              <Separator />
              <Text variant="body-muted">Setelah tombol dikirim, aplikasi email akan dibuka dengan ringkasan kebutuhan yang sudah disiapkan.</Text>
              <Link href="/produk/kenali-produk" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                Kembali ke Kenali Produk
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading level={2} className="text-background">Butuh membahas kebutuhan secara langsung?</Heading>
          <a href="mailto:anigospetro@gmail.com" className={buttonVariants({ variant: "outline", className: "mt-6 border-background/30 text-background hover:bg-background/10 hover:text-background" })}>
            Email Petro Anigos <ArrowRight data-icon="inline-end" />
          </a>
        </div>
      </section>
    </main>
  )
}
