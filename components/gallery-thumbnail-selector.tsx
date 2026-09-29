"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

type GalleryThumbnail = {
  src: string
}

type GalleryThumbnailSelectorProps = {
  images: GalleryThumbnail[]
  selectedIndex: number
  onSelect: (index: number) => void
  photoLabel: (index: number) => string
  previousLabel: string
  nextLabel: string
  positionLabel: string
  className?: string
  maskedEdges?: boolean
  accent?: "primary" | "foreground"
}

export function GalleryThumbnailSelector({
  images,
  selectedIndex,
  onSelect,
  photoLabel,
  previousLabel,
  nextLabel,
  positionLabel,
  className = "relative pb-10",
  maskedEdges = false,
  accent = "foreground",
}: GalleryThumbnailSelectorProps) {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api || api.slidesInView().includes(selectedIndex)) return
    api.scrollTo(selectedIndex)
  }, [api, selectedIndex])

  const selectImage = (index: number) => {
    if (images.length === 0) return
    const nextIndex = (index + images.length) % images.length
    onSelect(nextIndex)
  }

  if (images.length === 0) return null

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
      }}
      className={className}
    >
      <div
        className={maskedEdges ? "overflow-hidden" : undefined}
        style={
          maskedEdges
            ? {
                maskImage:
                  "radial-gradient(ellipse 58% 260% at center, #000 78%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 58% 260% at center, #000 78%, transparent 100%)",
              }
            : undefined
        }
      >
        <CarouselContent className="!ml-0 gap-3 px-2">
          {images.map((image, index) => (
            <CarouselItem
              key={`${image.src}-${index}`}
              className="basis-1/4 !pl-0 sm:basis-1/5 lg:basis-1/4"
            >
              <button
                type="button"
                aria-label={photoLabel(index + 1)}
                aria-pressed={index === selectedIndex}
                onClick={() => selectImage(index)}
                className={`group relative block aspect-square w-full touch-manipulation overflow-hidden rounded-xl border-2 bg-background transition-[border-color,opacity,box-shadow] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none ${
                  index === selectedIndex
                    ? accent === "primary"
                      ? "border-primary shadow-md"
                      : "border-foreground bg-foreground/5 shadow-md"
                    : "border-foreground/20 opacity-75 hover:border-foreground/60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 15vw, 20vw"
                  className="absolute inset-0 size-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2 bottom-1.5 z-10 h-0.5 rounded-full ${
                    index === selectedIndex
                      ? accent === "primary"
                        ? "bg-primary"
                        : "bg-foreground"
                      : "bg-transparent group-hover:bg-foreground/40"
                  }`}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => selectImage(selectedIndex - 1)}
        className="absolute bottom-0 left-0 z-20 flex size-8 touch-manipulation items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:size-7"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => selectImage(selectedIndex + 1)}
        className="absolute bottom-0 left-10 z-20 flex size-8 touch-manipulation items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:left-9 sm:size-7"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
      <p
        aria-live="polite"
        className="absolute bottom-0 left-[5.25rem] z-20 flex h-8 items-center text-xs text-muted-foreground sm:left-[4.75rem] sm:h-7"
      >
        {positionLabel
          .replace("{current}", String(selectedIndex + 1))
          .replace("{total}", String(images.length))}
      </p>
    </Carousel>
  )
}
