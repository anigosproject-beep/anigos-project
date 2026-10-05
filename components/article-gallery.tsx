"use client"

import Image from "next/image"

import {
  GalleryLightbox,
  type GalleryImage,
} from "@/components/commissioner-gallery"
import { useLocale } from "@/components/locale-provider"
import { Heading } from "@/components/typography"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { translate } from "@/lib/i18n"
import type { NewsroomGalleryImage } from "@/lib/newsroom-data"

export function ArticleGallery({
  images,
}: {
  images: NewsroomGalleryImage[]
}) {
  const { locale } = useLocale()
  const galleryImages = images.map(
    (image): GalleryImage & { _key?: string } => {
      const fileName =
        image.src.split("/").pop()?.split("?")[0] ?? "article-image"

      return {
        ...image,
        caption: image.caption || image.alt,
        fileName,
        format: fileName.split(".").pop()?.toUpperCase() ?? "IMAGE",
        resolution:
          image.width && image.height
            ? `${image.width} × ${image.height} px`
            : locale === "en"
              ? "Original resolution"
              : "Resolusi asli",
      }
    }
  )

  if (galleryImages.length === 0) return null

  return (
    <section
      className="mt-12 max-w-3xl"
      aria-labelledby="article-gallery-title"
    >
      <Heading level={2} id="article-gallery-title" className="text-2xl">
        {translate(locale, "articleGalleryTitle")}
      </Heading>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {galleryImages.map((image, index) => (
          <Dialog key={image._key ?? `${image.src}-${index}`}>
            <DialogTrigger
              render={
                <button
                  type="button"
                  className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-muted text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  aria-label={`${translate(locale, "galleryEnlargePhoto")}: ${image.alt}`}
                />
              }
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              {image.caption ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  {image.caption}
                </p>
              ) : null}
            </DialogTrigger>
            <GalleryLightbox image={image} />
          </Dialog>
        ))}
      </div>
    </section>
  )
}
