"use client"

import { Download, FileText } from "lucide-react"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { PdfThumbnail } from "@/components/pdf-thumbnail"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

type PublicationCardProps = {
  title: string
  description: string
  category: string
  href?: string
  available: boolean
}

function getPreviewSource(href: string) {
  const [source] = href.split(/[?#]/)
  const extension = source.split(".").pop()?.toLowerCase()
  const imageExtensions = new Set([
    "avif",
    "bmp",
    "gif",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "webp",
  ])

  if (imageExtensions.has(extension ?? "")) {
    return {
      url: href,
      label: "publicationImagePreview",
      type: "image" as const,
    }
  }

  return {
    url: `${href}#page=1&view=FitH`,
    label: "publicationDocumentPreview",
    type: extension === "pdf" ? ("pdf" as const) : ("document" as const),
  }
}

export function PublicationCard({
  title,
  description,
  category,
  href,
  available,
}: PublicationCardProps) {
  const { locale } = useLocale()
  const preview = available && href ? getPreviewSource(href) : null

  const openDocument = () => {
    if (!href) return
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const downloadDocument = () => {
    if (!href) return
    const anchor = document.createElement("a")
    anchor.href = href
    anchor.rel = "noopener noreferrer"
    anchor.download = title || "document.pdf"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  return (
    <Card className="bg-background">
      <CardContent className="flex flex-col gap-5 p-4 sm:flex-row sm:items-stretch sm:p-5">
        <div
          className={cn(
            "relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl border border-border bg-muted/50 sm:w-28 md:w-32",
            !available && "flex items-center justify-center",
          )}
        >
          {preview?.type === "pdf" && href ? (
            <PdfThumbnail src={href} title={title} />
          ) : preview ? (
            <iframe
              title={`${translate(locale, preview.label as TranslationKey)}: ${title}`}
              src={preview.url}
              className="pointer-events-none absolute inset-0 size-full border-0 bg-background"
              loading="lazy"
            />
          ) : (
            <FileText className="size-8 text-muted-foreground/60" aria-hidden="true" />
          )}
          <span className="sr-only">
            {preview
              ? translate(locale, preview.label as TranslationKey)
              : translate(locale, "publicationUnavailable")}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {!available ? <Badge variant="outline">{translate(locale, "publicationComingSoon")}</Badge> : null}
          </div>
          <CardTitle className="mt-3 text-lg">{title}</CardTitle>
          <Text variant="small" className="mt-2 max-w-3xl">
            {description}
          </Text>
          {available && href ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={openDocument}
                className="w-fit"
              >
                {translate(locale, "publicationOpenPdf")}
              </Button>
              <Button
                type="button"
                onClick={downloadDocument}
                variant="outline"
                className="w-fit"
              >
                <Download data-icon="inline-start" /> {translate(locale, "partnershipDownload")}
              </Button>
            </div>
          ) : (
            <span className="mt-4 text-xs text-muted-foreground">
              {translate(locale, "publicationPreparing")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
