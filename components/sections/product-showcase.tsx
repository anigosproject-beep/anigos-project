"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Droplets,
  Fuel,
  ShipWheel,
  Truck,
} from "lucide-react"

import { Heading, Text } from "@/components/typography"
import { Reveal } from "@/components/motion"
import { ScrollFloat } from "@/components/scroll-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import { DistributionLinePattern } from "@/components/patterns/distribution-line-pattern"

const products = [
  {
    id: "b40-biosolar",
    name: "B40 Biosolar",
    category: "Produk unggulan",
    description:
      "Bahan bakar hasil pencampuran 40% Biodiesel dan 60% bahan bakar minyak jenis solar, mengikuti program mandatori pemerintah.",
    visualLabel: "40 + 60",
    visualDescription: "Komposisi B40",
    icon: Droplets,
    features: [
      { label: "Biodiesel", value: "40%" },
      { label: "Solar", value: "60%" },
      { label: "Standar mutu", value: "Ditjen Migas RI" },
      { label: "Program", value: "Mandatori pemerintah" },
    ],
  },
  {
    id: "solar-hsd",
    name: "Solar / HSD Industri",
    category: "BBM industri",
    description:
      "Bahan Bakar Minyak jenis solar atau HSD untuk mendukung kebutuhan konsumen dari skala kecil hingga layanan berskala besar dan nasional.",
    visualLabel: "HSD",
    visualDescription: "Energi untuk kebutuhan industri",
    icon: Fuel,
    features: [
      { label: "Jenis produk", value: "BBM industri" },
      { label: "Standar mutu", value: "Ditjen Migas RI" },
      { label: "Skala layanan", value: "Kecil hingga nasional" },
      { label: "Distribusi", value: "Darat dan laut" },
    ],
  },
] as const

export function ProductShowcase() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeProduct = products[activeIndex]
  const ActiveIcon = activeProduct.icon

  React.useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api])

  return (
    <section
      id="produk"
      className="border-b border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-20 lg:px-8">
        <ScrollFloat className="min-w-0" distance={6}>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            aria-label="Produk Petro Anigos"
          >
            <CarouselContent>
              {products.map((product, index) => {
                const ProductIcon = product.icon

                return (
                  <CarouselItem key={product.id}>
                    <div className="aspect-[1.08] overflow-hidden rounded-4xl bg-foreground text-background shadow-xl sm:aspect-[0.86]">
                      <DistributionLinePattern className="text-background opacity-[0.1] [mask-image:linear-gradient(135deg,black_0%,transparent_72%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_55%)]" />
                      <div className="absolute -right-16 -bottom-20 size-64 rounded-full border border-background/20" />
                      <div className="absolute -right-6 -bottom-10 size-44 rounded-full border border-background/20" />
                      <div className="relative flex h-full flex-col justify-between p-5 sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <Badge
                            variant="outline"
                            className="border-background/30 text-background"
                          >
                            {product.category}
                          </Badge>
                          <ProductIcon className="size-7 text-background/70" />
                        </div>
                        <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
                          <p className="text-5xl font-semibold tracking-[-0.08em] sm:text-7xl">
                            {product.visualLabel}
                          </p>
                          <p className="mt-3 max-w-44 text-sm leading-5 text-background/65">
                            {product.visualDescription}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-background/55 uppercase">
                          <span>Petro Anigos</span>
                          <span className="size-1 rounded-full bg-background/50" />
                          <span>
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(products.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                <CarouselPrevious
                  className="static size-9 translate-y-0"
                  variant="outline"
                />
                <CarouselNext
                  className="static size-9 translate-y-0"
                  variant="outline"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(products.length).padStart(2, "0")}
                </span>
                <Progress
                  value={((activeIndex + 1) / products.length) * 100}
                  className="w-20"
                  aria-label="Posisi produk"
                />
              </div>
            </div>
          </Carousel>
        </ScrollFloat>

        <Reveal delay={0.08}>
          <Badge variant="secondary">Produk Petro Anigos</Badge>
          <div className="mt-5 flex items-start gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <ActiveIcon className="size-5" />
            </div>
            <div>
              <Heading level={2}>{activeProduct.name}</Heading>
              <Text variant="lead" className="mt-5 max-w-2xl">
                {activeProduct.description}
              </Text>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {activeProduct.features.map((feature) => (
              <div key={feature.label} className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {feature.label}
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight">
                  {feature.value}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="flex items-start gap-4 text-sm text-muted-foreground">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border">
              {activeProduct.id === "b40-biosolar" ? (
                <Truck className="size-4" />
              ) : (
                <ShipWheel className="size-4" />
              )}
            </div>
            <p className="max-w-xl leading-6">
              Didukung kapabilitas distribusi Petro Anigos untuk kebutuhan
              konsumen dengan pilihan layanan darat dan antarwilayah.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/produk/kenali-produk" className={buttonVariants()}>
              Kenali Produk
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/produk/penawaran"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Ajukan Penawaran
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
