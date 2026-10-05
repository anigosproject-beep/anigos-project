"use client"

import Image from "next/image"
import * as React from "react"

import {
  GalleryLightbox,
  type GalleryImage,
} from "@/components/commissioner-gallery"
import { useLocale } from "@/components/locale-provider"
import { SectionHeading } from "@/components/typography"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { translate } from "@/lib/i18n"

type ServiceGalleryImage = {
  _key?: string
  url: string
  width?: number
  height?: number
  uploadedAt?: string
}

export function ServiceGallery() {
  const { locale } = useLocale()
  const [images, setImages] = React.useState<ServiceGalleryImage[] | null>(null)
  const [hasLoadError, setHasLoadError] = React.useState(false)

  React.useEffect(() => {
    const controller = new AbortController()

    void fetch("/api/service-gallery", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Service gallery request failed: ${response.status}`)
        }
        return response.json() as Promise<{
          images?: ServiceGalleryImage[]
        }>
      })
      .then((data) => {
        setImages(data.images ?? [])
        setHasLoadError(false)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load Sanity service gallery", error)
        setHasLoadError(true)
      })

    return () => controller.abort()
  }, [])

  const galleryImages = (images ?? []).map<GalleryImage>((image, index) => {
    const fileName = image.url.split("/").pop()?.split("?")[0] ?? "image"

    return {
      src: image.url,
      alt: `${translate(locale, "galleryPhotoDocumentation")} ${index + 1}`,
      caption: `${translate(locale, "galleryPhotoDocumentation")} ${index + 1}`,
      fileName,
      format: fileName.split(".").pop()?.toUpperCase() ?? "IMAGE",
      resolution:
        image.width && image.height
          ? `${image.width} × ${image.height} px`
          : "Resolusi asli",
    }
  })

  return (
    <section
      className="border-b border-border bg-muted/40 py-20 lg:py-28"
      aria-label={translate(locale, "serviceGalleryTitle")}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={translate(locale, "serviceGalleryEyebrow")}
          title={translate(locale, "serviceGalleryTitle")}
          description={translate(locale, "serviceGalleryDescription")}
        />

        {images === null && !hasLoadError ? (
          <p className="mt-8 text-sm text-muted-foreground" role="status">
            {translate(locale, "galleryLoading")}
          </p>
        ) : hasLoadError ? (
          <p className="mt-8 text-sm text-destructive" role="alert">
            {translate(locale, "galleryLoadError")}
          </p>
        ) : galleryImages.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
            {translate(locale, "galleryNoPhotosInCategory")}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <Dialog key={images?.[index]?._key ?? `${image.src}-${index}`}>
                <DialogTrigger
                  render={
                    <button
                      type="button"
                      className="group block w-full overflow-hidden rounded-2xl border border-border bg-background text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                      aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${image.alt}`}
                    />
                  }
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent px-4 pt-12 pb-4 text-sm font-semibold text-white">
                      {image.caption}
                    </span>
                  </div>
                </DialogTrigger>
                <GalleryLightbox image={image} />
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
