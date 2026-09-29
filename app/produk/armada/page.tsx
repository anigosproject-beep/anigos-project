"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import {ArrowRight, Images} from "lucide-react"

import {PageHero, MarineFuelShowcase} from "@/components/sections"
import {SectionContainer, SectionShell} from "@/components/layout/section-shell"
import {Heading, Text} from "@/components/typography"
import {Badge} from "@/components/ui/badge"
import {buttonVariants} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog"
import {useLocale} from "@/components/locale-provider"
import {translate} from "@/lib/i18n"
import type {SanityFleetOption} from "@/lib/sanity-content-types"

type GalleryImage = {url: string; alt: string; width?: number; height?: number}

const fallbackGallery: GalleryImage[] = [
  {
    url: "/images/partnership/transport-carrier.png",
    alt: "Armada tangki transportir dengan identitas Petro Anigos",
    width: 1600,
    height: 1067,
  },
  {
    url: "/images/partnership/partnership-transportation.svg",
    alt: "Ilustrasi layanan transportasi darat",
    width: 1200,
    height: 900,
  },
  {
    url: "/images/distribution/distribution-map.png",
    alt: "Ilustrasi jangkauan operasional distribusi",
    width: 1600,
    height: 900,
  },
]

function getGalleryImages(options: SanityFleetOption[]): GalleryImage[] {
  const images = options.flatMap((option) => {
    const gallery = option.gallery?.flatMap((item) =>
      item?.image?.url
        ? [{
            url: item.image.url,
            alt: item.image.alt ?? option.label ?? "Foto armada darat Petro Anigos",
            width: item.image.width,
            height: item.image.height,
          }]
        : [],
    ) ?? []

    if (gallery.length) return gallery
    return option.image?.url
      ? [{
          url: option.image.url,
          alt: option.image.alt ?? option.label ?? "Foto armada darat Petro Anigos",
          width: option.image.width,
          height: option.image.height,
        }]
      : []
  })

  const uniqueImages = [...new Map(images.map((image) => [image.url, image])).values()]
  return uniqueImages.length ? uniqueImages : fallbackGallery
}

export default function ArmadaPage() {
  const {locale} = useLocale()
  const [fleet, setFleet] = React.useState<SanityFleetOption[]>([])
  const [galleryOpen, setGalleryOpen] = React.useState(false)
  const [galleryImageIndex, setGalleryImageIndex] = React.useState(0)

  React.useEffect(() => {
    const controller = new AbortController()
    void fetch(`/api/fleet?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Fleet request failed: ${response.status}`)
        return response.json() as Promise<{fleet?: SanityFleetOption[]}>
      })
      .then((data) => setFleet(data.fleet ?? []))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity fleet content", error)
      })
    return () => controller.abort()
  }, [locale])

  const galleryImages = getGalleryImages(fleet)
  const selectedImage = galleryImages[galleryImageIndex] ?? galleryImages[0]
  const capacities = [...new Set(fleet.map((option) => option.capacity).filter(
    (capacity): capacity is number => typeof capacity === "number" && capacity > 0,
  ))].sort((first, second) => first - second)
  const fleetCapacities = capacities.length
    ? capacities
    : [5000, 8000, 10000, 16000, 24000, 30000]

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "fleetPageEyebrow")}
        title={translate(locale, "fleetPageTitle")}
        description={translate(locale, "fleetPageDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="armada"
        breadcrumbs={[
          {label: translate(locale, "products"), href: "/produk/kenali-produk"},
          {label: translate(locale, "fleet"), href: "/produk/armada"},
        ]}
      />

      <SectionShell id="armada-darat" className="bg-muted/40 py-20 sm:py-24 lg:py-32">
        <SectionContainer>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
              {galleryImages.slice(0, 3).map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  className={`group relative overflow-hidden rounded-3xl bg-muted text-left ${
                    index === 0
                      ? "row-span-2 min-h-[22rem] sm:min-h-[30rem]"
                      : "aspect-[4/3]"
                  }`}
                  onClick={() => {
                    setGalleryImageIndex(index)
                    setGalleryOpen(true)
                  }}
                  aria-label={`${translate(locale, "fleetOpenPhoto")} ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 38vw, 50vw" : "(min-width: 1024px) 19vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {index === 0 ? (
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-xs font-medium text-foreground sm:right-4 sm:bottom-4">
                      <Images className="size-4" />
                      {translate(locale, "fleetGallery")}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="max-w-xl">
              <Badge variant="secondary">{translate(locale, "landServiceEyebrow")}</Badge>
              <Heading level={2} className="mt-5">
                {translate(locale, "landServiceTitle")}
              </Heading>
              <Text variant="lead" className="mt-5">
                {translate(locale, "landServiceDescription")}
              </Text>

              <div className="mt-8 rounded-2xl border border-border bg-background p-5 sm:p-6">
                <p className="text-sm font-semibold">{translate(locale, "serviceFleetCapacity")}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {fleetCapacities.map((capacity) => (
                    <span
                      key={capacity}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium"
                    >
                      {capacity.toLocaleString(locale === "id" ? "id-ID" : "en-US")} L
                    </span>
                  ))}
                </div>
                <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  {translate(locale, "serviceFleetCoverage")}
                </p>
              </div>

              <Link
                href="/produk/penawaran/ajukan"
                className={buttonVariants({className: "mt-7"})}
              >
                {translate(locale, "submitRequirement")}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </SectionShell>

      <MarineFuelShowcase />

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-6xl gap-4 p-4 sm:p-6">
          <DialogTitle>{translate(locale, "fleetGallery")}</DialogTitle>
          <DialogDescription>
            {galleryImages.length} {translate(locale, "fleetPhotoCount")}
          </DialogDescription>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-foreground">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 70vw, 100vw"
              />
            </div>
            <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-auto lg:grid-cols-2">
              {galleryImages.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setGalleryImageIndex(index)}
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 ${
                    galleryImageIndex === index ? "border-primary" : "border-transparent"
                  }`}
                  aria-label={`${translate(locale, "fleetOpenPhoto")} ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
