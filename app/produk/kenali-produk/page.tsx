"use client"

import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { useState } from "react"
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Droplets,
  FileText,
  Truck,
} from "lucide-react"

import { MarineFuelShowcase, PageHero, VideoFeatureSection } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type {SanityProduct} from "@/lib/sanity-content-types"

const purchaseSteps = [
  {
    number: "01",
    title: "submitNeeds",
    description: "submitNeedsDescription",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "verifyNeeds",
    description: "verifyNeedsDescription",
    icon: FileText,
  },
  {
    number: "03",
    title: "offerApproval",
    description: "offerApprovalDescription",
    icon: Check,
  },
  {
    number: "04",
    title: "deliverySettlement",
    description: "deliverySettlementDescription",
    icon: Truck,
  },
] as const

export default function KenaliProdukPage() {
  const { locale } = useLocale()
  const [products, setProducts] = useState<SanityProduct[]>([])

  React.useEffect(() => {
    const controller = new AbortController()
    void fetch(`/api/products?lang=${locale}`, {signal: controller.signal, cache: "no-store"})
      .then((response) => {
        if (!response.ok) throw new Error(`Product request failed: ${response.status}`)
        return response.json() as Promise<{products?: SanityProduct[]}>
      })
      .then((data) => setProducts(data.products ?? []))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity product content", error)
      })

    return () => controller.abort()
  }, [locale])

  const displayProducts = products.length
    ? products
    : [
        {
          _id: "fallback-solar",
          name: translate(locale, "fuelProductTitle"),
          description: translate(locale, "fuelProductDescription"),
          category: "bbm-industri",
        },
        {
          _id: "fallback-biosolar",
          name: translate(locale, "biodieselBlendTitle"),
          description: translate(locale, "biodieselBlendDescription"),
          category: "biosolar",
        },
      ]

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "productPageEyebrow")}
        title={translate(locale, "productPageTitle")}
        description={translate(locale, "productPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="kenali-produk"
        breadcrumbs={[{ label: translate(locale, "products"), href: "/produk/kenali-produk" }]}
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "productOverviewEyebrow")}
            title={translate(locale, "productOverviewTitle")}
            description={translate(locale, "productOverviewDescription")}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {displayProducts.map((product, index) => (
            <Card key={product._id} className={`h-full ${index % 2 === 1 ? "bg-base-color text-base-color-foreground" : ""}`}>
              <CardHeader>
                <div className={`flex size-12 items-center justify-center rounded-2xl ${index % 2 === 1 ? "bg-background/10" : "bg-muted"}`}>
                  <Droplets className="size-6" />
                </div>
                <Badge variant={index % 2 === 1 ? "outline" : "secondary"} className={`mt-5 w-fit ${index % 2 === 1 ? "border-base-color-foreground/30 text-base-color-foreground" : ""}`}>
                  {product.category === "biosolar" ? "B40 Biosolar" : "Solar / HSD"}
                </Badge>
                <CardTitle className={`text-2xl ${index % 2 === 1 ? "text-base-color-foreground" : ""}`}>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body-muted" className={index % 2 === 1 ? "text-base-color-foreground/70" : ""}>
                  {product.description}
                </Text>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>

      <VideoFeatureSection
        eyebrow={{id: translate(locale, "productVideoEyebrow"), en: translate("en", "productVideoEyebrow")}}
        title={{id: translate(locale, "productVideoTitle"), en: translate("en", "productVideoTitle")}}
        description={{id: translate(locale, "productVideoDescription"), en: translate("en", "productVideoDescription")}}
        videoTitle={{id: translate(locale, "productVideoTitleLabel"), en: translate("en", "productVideoTitleLabel")}}
      />

      <MarineFuelShowcase variant="product" />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "purchaseSchemeEyebrow")}
            title={translate(locale, "purchaseSchemeTitle")}
            description={translate(locale, "purchaseSchemeDescription")}
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
                    <CardTitle className="mt-5 text-lg">
                      {translate(locale, step.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="small">
                      {translate(locale, step.description)}
                    </Text>
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
            eyebrow={translate(locale, "transportSchemeEyebrow")}
            title={translate(locale, "transportSchemeTitle")}
            description={translate(locale, "transportSchemeDescription")}
          />
          <Tabs defaultValue="darat" className="mt-12">
            <TabsList className="grid w-full min-w-0 grid-cols-3">
              <TabsTrigger
                value="darat"
                className="w-full"
              >
                {translate(locale, "land")}
              </TabsTrigger>
              <TabsTrigger
                value="laut"
                className="w-full"
              >
                {translate(locale, "sea")}
              </TabsTrigger>
              <TabsTrigger
                value="mitra"
                className="w-full"
              >
                {translate(locale, "transportPartnerTab")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="darat" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-transportation.svg" alt={translate(locale, "landTransportIllustration")} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>{translate(locale, "landFleetTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      {translate(locale, "landFleetDescription")}
                    </Text>
                    <Link href="/produk/armada#armada-darat" className={buttonVariants({ className: "mt-6" })}>
                      {translate(locale, "viewFleet")}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="laut" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-distribution.svg" alt={translate(locale, "seaTransportIllustration")} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>{translate(locale, "seaTransportCardTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      {translate(locale, "seaTransportCardDescription")}
                    </Text>
                    <Link href="/produk/armada#armada-laut" className={buttonVariants({ className: "mt-6" })}>
                      {translate(locale, "viewFleet")}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="mitra" className="mt-8">
              <Card className="overflow-hidden p-0 lg:grid lg:grid-cols-[3fr_7fr]">
                <div className="relative min-h-52 bg-muted lg:h-full">
                  <Image src="/images/partnership/partnership-business.svg" alt={translate(locale, "partnerTransportIllustration")} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <CardHeader className="px-0">
                    <CardTitle>{translate(locale, "officialPartnerTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Text variant="body-muted">
                      {translate(locale, "officialPartnerDescription")}
                    </Text>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/produk/armada#armada-mitra" className={buttonVariants()}>
                        {translate(locale, "viewFleet")}
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                      <Link href="/tentang-kami/client" className={buttonVariants({ variant: "outline" })}>
                        {translate(locale, "viewPartnershipDetails")}
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
              eyebrow={translate(locale, "deliveryAdjustmentEyebrow")}
              title={translate(locale, "deliveryAdjustmentTitle")}
              description={translate(locale, "deliveryAdjustmentDescription")}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {(["deliveryLocation", "volumePerDelivery", "deliveryFrequency", "receivingSchedule"] as const).map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <Check className="size-4 text-primary" />
                  <span className="text-sm font-medium">{translate(locale, item)}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>{translate(locale, "offerDiscussionTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion>
                <AccordionItem value="commercial">
                  <AccordionTrigger>{translate(locale, "commercialTerms")}</AccordionTrigger>
                  <AccordionContent>
                    {translate(locale, "commercialTermsDescription")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery">
                  <AccordionTrigger>{translate(locale, "distributionDetails")}</AccordionTrigger>
                  <AccordionContent>
                    {translate(locale, "distributionDetailsDescription")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-base-color px-6 py-24 text-base-color-foreground lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-base-color-foreground/30 text-base-color-foreground">
              {translate(locale, "productReadyToDiscuss")}
            </Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "productCtaTitle")}
            </Heading>
            <Text variant="lead" className="mt-5 text-base-color-foreground/70">
              {translate(locale, "productCtaDescription")}
            </Text>
          </div>
          <Link
            href="/produk/penawaran/ajukan"
            className={buttonVariants({
              className: "bg-background text-foreground hover:bg-background/90",
            })}
          >
            {translate(locale, "requestOffer")}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-background/15" />
      </section>
    </main>
  )
}
