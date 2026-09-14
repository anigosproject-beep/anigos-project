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
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const volumePresets = [5000, 8000, 10000, 16000, 24000, 30000]
const scheduleOptions = [
  {
    value: "Terjadwal",
    label: "scheduled",
    description: "scheduledDescription",
  },
  {
    value: "Berkala",
    label: "recurring",
    description: "recurringDescription",
  },
  {
    value: "Sesuai kebutuhan",
    label: "asNeeded",
    description: "asNeededDescription",
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
  const { locale } = useLocale()
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
        eyebrow={translate(locale, "offerFormEyebrow")}
        title={translate(locale, "offerFormTitle")}
        description={translate(locale, "offerFormDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: translate(locale, "products"), href: "/produk/kenali-produk" },
          { label: translate(locale, "offer"), href: "/produk/penawaran" },
        ]}
      />

      <section className="border-b border-border bg-[linear-gradient(135deg,white_0%,color-mix(in_oklab,var(--muted)_42%,white)_52%,white_100%)] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
          <div>
            <SectionHeading
              level={3}
              className="gap-2"
              eyebrow={`${translate(locale, "stepLabel")} ${step} ${translate(locale, "ofLabel")} 2`}
              title={
                <span className="text-2xl leading-tight sm:text-3xl">
                  {step === 1
                    ? translate(locale, "configureNeeds")
                    : translate(locale, "applicantDetails")}
                </span>
              }
              description={
                <span className="text-base leading-6 sm:text-lg">
                  {translate(locale, "offerFormNotice")}
                </span>
              }
            />

            <form onSubmit={handleSubmit} className="mt-8">
              {step === 1 ? (
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>{translate(locale, "fuelType")}</FieldLabel>
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
                                  {translate(
                                    locale,
                                    product === "B40 Biosolar"
                                      ? "b40FuelDescription"
                                      : "dieselFuelDescription"
                                  )}
                                </span>
                              </span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>{translate(locale, "requiredVolume")}</FieldLabel>
                      <FieldContent>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-2xl font-semibold">
                            {Number(form.volume || 0).toLocaleString("id-ID")} L
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {translate(locale, "volumeRange")}
                          </span>
                        </div>
                        <Slider
                          aria-label={translate(locale, "volumeSliderLabel")}
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
                          {translate(locale, "volumeSelectionDescription")}
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
                        <FieldLabel htmlFor="region">{translate(locale, "deliveryRegion")}</FieldLabel>
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
                        <FieldLabel htmlFor="schedule">{translate(locale, "deliverySchedule")}</FieldLabel>
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
                                    <span>{translate(locale, option.label)}</span>
                                    <span className="text-[11px] font-normal leading-4 text-muted-foreground">
                                      {translate(locale, option.description)}
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
                        <FieldLabel htmlFor="company">{translate(locale, "companyName")}</FieldLabel>
                        <FieldContent><Input id="company" value={form.company} onChange={(event) => update("company", event.target.value)} required /></FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="contact">{translate(locale, "contactName")}</FieldLabel>
                        <FieldContent><Input id="contact" value={form.contact} onChange={(event) => update("contact", event.target.value)} required /></FieldContent>
                      </Field>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <FieldContent><Input id="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">{translate(locale, "phoneNumber")}</FieldLabel>
                        <FieldContent><Input id="phone" type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></FieldContent>
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="address">{translate(locale, "unloadingAddress")}</FieldLabel>
                      <FieldContent><Input id="address" value={form.address} onChange={(event) => update("address", event.target.value)} required /></FieldContent>
                    </Field>
                    {form.schedule === "Terjadwal" ? (
                      <Field>
                        <FieldLabel>{translate(locale, "expectedReceivingDate")}</FieldLabel>
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
                                : translate(locale, "chooseReceivingDate")}
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
                                {translate(locale, "dateConfirmationNote")}
                              </span>
                            </span>
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    ) : null}
                    <Field>
                      <FieldLabel htmlFor="notes">{translate(locale, "requirementNotes")}</FieldLabel>
                      <FieldContent>
                        <Textarea id="notes" rows={5} value={form.notes} onChange={(event) => update("notes", event.target.value)} />
                        <FieldDescription>{translate(locale, "requirementNotesDescription")}</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              )}
              <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
                {step === 2 ? (
                  <button type="button" onClick={() => setStep(1)} className={buttonVariants({ variant: "outline" })}>
                    <ArrowLeft data-icon="inline-start" /> {translate(locale, "back")}
                  </button>
                ) : <span />}
                {step === 1 ? (
                  <button type="button" onClick={() => setStep(2)} className={buttonVariants()}>
                    {translate(locale, "continueApplicantDetails")} <ArrowRight data-icon="inline-end" />
                  </button>
                ) : (
                  <button type="submit" className={buttonVariants()}>
                    {translate(locale, "prepareOfferEmail")}
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
                  <CardTitle className="truncate text-sm">{translate(locale, "requirementEstimate")}</CardTitle>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{translate(locale, "temporarySummary")}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-background/70 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                {translate(locale, "draft")}
              </span>
            </CardHeader>
            <CardContent className="space-y-4 p-5 text-xs">
              <div className="space-y-2.5">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{translate(locale, "products")}</span>
                  <span className="text-right font-medium">{form.product}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{translate(locale, "requiredVolume")}</span>
                  <span className="font-medium">{volume.toLocaleString("id-ID")} L</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{translate(locale, "region")}</span>
                  <span className="text-right font-medium">{form.region || translate(locale, "notFilled")}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{translate(locale, "schedule")}</span>
                  <span className="text-right font-medium">{form.schedule || translate(locale, "notFilled")}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{translate(locale, "fuelTaxEstimate")}</p>
                  <Text variant="small" className="mt-1 text-xs">
                    {translate(locale, "fuelTaxDescription")}
                  </Text>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="coverage-area" className="text-[11px] font-medium">
                      {translate(locale, "serviceArea")}
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
                      <p className="text-[11px] font-medium">{translate(locale, "basePricePerLiter")}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {form.product} · {translate(locale, "temporary")}
                      </p>
                    </div>
                    <span className="font-medium">{formatCurrency(basePrice)}</span>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pbbkb-rate" className="text-[11px] font-medium">
                      {translate(locale, "pbbkbRate")} {selectedCoverage ? `(${selectedCoverage.province})` : ""}
                    </label>
                    <Input
                      id="pbbkb-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder={translate(locale, "accordingToProvince")}
                      value={pbbkbRate}
                      onChange={(event) => setPbbkbRate(event.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-3 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{translate(locale, "priceBasis")}</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4">
                    <span className="text-muted-foreground">{translate(locale, "estimatedPbbkb")}</span>
                    <span>{formatCurrency(estimatedPbbkb)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between gap-4 font-semibold">
                    <span>{translate(locale, "estimatedTotal")}</span>
                    <span>{formatCurrency(estimatedTotal)}</span>
                  </div>
                </div>
                <Text variant="small" className="flex items-start gap-2 text-[11px] leading-4">
                  <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <span>
                  {translate(locale, "taxSimulationNote")}
                  </span>
                </Text>
              </div>
              <Separator />
              <Text variant="body-muted">{translate(locale, "emailOpeningNote")}</Text>
              <Link href="/produk/kenali-produk" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                {translate(locale, "backToProducts")}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading level={2} className="text-background">{translate(locale, "directDiscussionTitle")}</Heading>
          <a href="mailto:anigospetro@gmail.com" className={buttonVariants({ variant: "outline", className: "mt-6 border-background/30 text-background hover:bg-background/10 hover:text-background" })}>
            {translate(locale, "emailPetroAnigos")} <ArrowRight data-icon="inline-end" />
          </a>
        </div>
      </section>
    </main>
  )
}
