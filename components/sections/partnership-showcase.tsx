"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { ArrowRight, Handshake, ShipWheel, Truck } from "lucide-react"

import { Heading, Text } from "@/components/typography"
import { Reveal } from "@/components/motion"
import { ScrollFloat } from "@/components/scroll-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import { DistributionLinePattern } from "@/components/patterns/distribution-line-pattern"

const partnershipOpportunities = [
  {
    id: "transportasi",
    title: "Kemitraan Transportasi BBM",
    description:
      "Terbuka bagi mitra transportir yang ingin mendukung pengangkutan Bahan Bakar Minyak secara aman, tepat waktu, dan profesional.",
    image: "/images/partnership/partnership-transportation.svg",
    imageAlt: "Ilustrasi kemitraan transportasi BBM",
    icon: Truck,
    label: "Transportasi",
    detail: "Pengangkutan Bahan Bakar Minyak",
  },
  {
    id: "distribusi",
    title: "Distribusi Antarwilayah",
    description:
      "Membangun kerja sama untuk memperkuat penyediaan dan distribusi BBM industri ke berbagai wilayah di Indonesia.",
    image: "/images/partnership/partnership-distribution.svg",
    imageAlt: "Ilustrasi distribusi BBM antarwilayah",
    icon: ShipWheel,
    label: "Distribusi",
    detail: "Jaringan layanan antarwilayah",
  },
  {
    id: "usaha",
    title: "Peluang Kerja Sama Usaha",
    description:
      "Kami terbuka untuk menjajaki peluang bersama perusahaan atau instansi yang membutuhkan mitra distribusi BBM industri.",
    image: "/images/partnership/partnership-business.svg",
    imageAlt: "Ilustrasi peluang kerja sama usaha",
    icon: Handshake,
    label: "Kemitraan usaha",
    detail: "Kolaborasi yang saling menguntungkan",
  },
] as const

export function PartnershipShowcase() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeOpportunity = partnershipOpportunities[activeIndex]
  const ActiveIcon = activeOpportunity.icon

  React.useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, 6000)

    return () => {
      window.clearInterval(interval)
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api])

  return (
    <section
      id="kemitraan"
      className="border-b border-border bg-muted/40 py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-20 lg:px-8">
        <ScrollFloat className="min-w-0" distance={6}>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            aria-label="Peluang kemitraan Petro Anigos"
          >
            <CarouselContent>
              {partnershipOpportunities.map((opportunity) => (
                <CarouselItem key={opportunity.id}>
                  <AspectRatio
                    ratio={0.86}
                    className="overflow-hidden rounded-4xl bg-foreground shadow-xl"
                  >
                    <Image
                      src={opportunity.image}
                      alt={opportunity.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <DistributionLinePattern className="text-background opacity-[0.1] [mask-image:linear-gradient(135deg,black_0%,transparent_78%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-8">
                      <p className="text-xs font-semibold tracking-[0.18em] text-background/65 uppercase">
                        Petro Anigos
                      </p>
                      <p className="mt-2 text-xl font-medium">
                        {opportunity.label}
                      </p>
                    </div>
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-5 flex justify-end gap-2">
              <CarouselPrevious
                className="static size-9 translate-y-0"
                variant="outline"
              />
              <CarouselNext
                className="static size-9 translate-y-0"
                variant="outline"
              />
            </div>
            <Link
              href="/tentang-kami/kemitraan"
              className={buttonVariants({ className: "mt-5 w-full" })}
            >
              Pelajari Kemitraan
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Carousel>
        </ScrollFloat>

        <Reveal className="lg:flex lg:h-full lg:flex-col lg:justify-center" delay={0.08}>
          <Badge variant="secondary">Kemitraan Petro Anigos</Badge>
          <Heading level={2} className="mt-5 max-w-2xl">
            Bertumbuh melalui kolaborasi yang terpercaya.
          </Heading>
          <Text variant="lead" className="mt-6 max-w-2xl">
            Kami membuka ruang kerja sama dengan perusahaan dan instansi yang
            memiliki semangat untuk membangun layanan distribusi energi yang
            aman, profesional, dan saling menguatkan.
          </Text>

          <Card className="mt-8 overflow-hidden border-border/80 shadow-sm">
            <CardHeader className="gap-4">
              <div className="flex items-start justify-between gap-4">
                <Badge variant="outline">{activeOpportunity.label}</Badge>
                <ActiveIcon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {activeOpportunity.title}
              </CardTitle>
              <CardDescription className="text-base leading-7">
                {activeOpportunity.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-5" />
              <p className="text-sm font-medium text-muted-foreground">
                Fokus kemitraan
              </p>
              <p className="mt-2 font-medium">{activeOpportunity.detail}</p>
              <div className="mt-6 flex items-center gap-2">
                {partnershipOpportunities.map((opportunity, index) => (
                  <span
                    key={opportunity.id}
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      index === activeIndex
                        ? "w-10 bg-primary"
                        : "w-5 bg-border"
                    )}
                  />
                ))}
                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(partnershipOpportunities.length).padStart(2, "0")}
                </span>
              </div>
            </CardContent>
          </Card>

        </Reveal>
      </div>
    </section>
  )
}
