"use client"

import * as React from "react"
import Image from "next/image"
import { X } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

export type GalleryImage = {
  alt: string
  caption: string
  fileName: string
  format: string
  resolution: string
  src: string
}

type LeadershipGalleryProps = {
  personName: string
  personRole: string
  profileImage: string
  gallery?: Array<{
    src: string
    alt: string
    caption: string
  }>
}

export function GalleryLightbox({ image }: { image: GalleryImage }) {
  const { locale } = useLocale()
  const [scale, setScale] = React.useState(1)
  const pointers = React.useRef(new Map<number, { x: number; y: number }>())
  const pinchDistance = React.useRef<number | null>(null)

  const updateZoom = React.useCallback((nextScale: number) => {
    setScale(Math.min(3, Math.max(1, nextScale)))
  }, [])

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    updateZoom(scale - event.deltaY * 0.002)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
    const activePointers = Array.from(pointers.current.values())
    if (activePointers.length !== 2) return

    const [first, second] = activePointers
    const distance = Math.hypot(second.x - first.x, second.y - first.y)
    if (pinchDistance.current === null) {
      pinchDistance.current = distance
      return
    }

    updateZoom(scale * (distance / pinchDistance.current))
    pinchDistance.current = distance
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinchDistance.current = null
  }

  return (
    <DialogContent
      showCloseButton={false}
      className="fixed inset-0 top-0 left-0 z-50 flex h-dvh !w-screen !max-w-none translate-x-0 translate-y-0 items-center justify-center gap-0 rounded-none border-0 bg-transparent p-0 text-white shadow-none ring-0 outline-none"
      aria-describedby={`gallery-description-${image.src.replace(/[^a-z0-9]/gi, "-")}`}
    >
      <DialogClose
        aria-label={translate(locale, "dialogClose")}
        title={translate(locale, "dialogClose")}
        className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/80 text-white shadow-xl backdrop-blur-md transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:scale-105 hover:border-white hover:bg-white hover:text-black hover:shadow-2xl active:scale-95 active:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:top-6 sm:right-6"
      >
        <X aria-hidden="true" className="size-5" />
      </DialogClose>
      <DialogTitle className="sr-only">{image.caption}</DialogTitle>
      <DialogDescription
        id={`gallery-description-${image.src.replace(/[^a-z0-9]/gi, "-")}`}
        className="sr-only"
      >
        {image.alt}. Gunakan scroll atau pinch untuk memperbesar foto.
      </DialogDescription>
      <div
        className="flex h-full w-full touch-none flex-col items-center justify-center px-5 pt-16 pb-16 select-none sm:px-10"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={() => updateZoom(scale > 1 ? 1 : 2)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1800}
          height={1350}
          draggable={false}
          className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-[92vw] object-contain transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="pointer-events-none fixed right-5 bottom-5 left-5 flex flex-col items-center gap-1.5 sm:right-10 sm:left-10">
          <p className="text-center text-sm font-medium text-white/75">
            {image.caption}
          </p>
          <p className="self-start text-[10px] leading-4 font-light tracking-[0.02em] text-white/45">
            {image.fileName} · {image.resolution} · {image.format}
          </p>
        </div>
      </div>
    </DialogContent>
  )
}

export function LeadershipGallery({
  personName,
  personRole,
  profileImage,
  gallery = [],
}: LeadershipGalleryProps) {
  const { locale } = useLocale()
  const profileCaption = translate(locale, "leadershipProfileCaption").replace(
    "{role}",
    personRole
  )
  const images: GalleryImage[] = [
    ...(profileImage
      ? [
          {
            src: profileImage,
            alt: `Foto profil ${personName}`,
            caption: profileCaption,
            fileName: `profil-${personName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`,
            resolution: "576 × 768 px",
            format: "SVG",
          },
        ]
      : []),
    ...gallery
      .filter((image) => image.src !== profileImage)
      .map((image) => ({
        ...image,
        fileName: image.src.split("/").pop() ?? "foto-galeri",
        resolution: "Resolusi mengikuti gambar asli",
        format: image.src.split(".").pop()?.toUpperCase() ?? "IMAGE",
      })),
  ]

  return (
    <section
      className="mt-16 border-t border-border pt-10"
      aria-labelledby="leadership-gallery-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {translate(locale, "commissionerDocumentation")}
          </p>
          <h3
            id="leadership-gallery-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground"
          >
            {translate(locale, "leadershipGallery")}
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          {translate(locale, "commissionerGalleryDescription")}
        </p>
      </div>

      <Carousel
        className="mt-8"
        opts={{ align: "start", loop: false }}
        aria-label={translate(locale, "leadershipGallery")}
      >
        <CarouselContent className="-ml-5">
          {images.map((image) => (
            <CarouselItem
              key={image.src}
              className="basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <figure>
                <Dialog>
                  <DialogTrigger
                    render={
                      <button
                        type="button"
                        className="group block w-full cursor-zoom-in text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                        aria-label={`Perbesar ${image.alt}`}
                      />
                    }
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={900}
                        height={675}
                        className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </DialogTrigger>
                  <GalleryLightbox image={image} />
                </Dialog>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  {image.caption}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label={translate(locale, "galleryPrevious")}
          className="left-2 hidden sm:inline-flex"
        />
        <CarouselNext
          aria-label={translate(locale, "galleryNext")}
          className="right-2 hidden sm:inline-flex"
        />
      </Carousel>
    </section>
  )
}
