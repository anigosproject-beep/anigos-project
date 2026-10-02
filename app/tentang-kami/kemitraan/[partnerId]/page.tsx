"use client"

import Image from "next/image"
import Link from "@/components/site-link"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { BadgeCheckIcon } from "lucide-react"

import { PageHero } from "@/components/sections"
import {
  GalleryLightbox,
  type GalleryImage,
} from "@/components/commissioner-gallery"
import { GalleryThumbnailSelector } from "@/components/gallery-thumbnail-selector"
import { SectionHeading, Text } from "@/components/typography"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type {
  PartnershipPageResponse,
  SanityRichTextBlock,
} from "@/lib/sanity-content-types"
import { type PartnershipItem } from "@/lib/partnership-fallback"

function formatPartnerSince(value: string | undefined, locale: "id" | "en") {
  if (!value) return translate(locale, "partnershipUnavailable")
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime()))
    return translate(locale, "partnershipUnavailable")
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    dateStyle: "long",
  }).format(date)
}

function fitText(
  value: string | undefined,
  maxLength: number,
  fallback: string
) {
  const text = value?.trim() || fallback
  return text.length > maxLength
    ? `${text.slice(0, maxLength - 1).trimEnd()}…`
    : text
}

function safeLink(href: string | undefined) {
  if (!href) return undefined
  if (href.startsWith("/") && !href.startsWith("//")) return href
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href
  return undefined
}

function renderSpan(
  span: NonNullable<SanityRichTextBlock["children"]>[number],
  block: SanityRichTextBlock
) {
  let content: React.ReactNode = span.text ?? ""

  for (const mark of span.marks ?? []) {
    if (mark === "strong") {
      content = <strong key={mark}>{content}</strong>
    } else if (mark === "em") {
      content = <em key={mark}>{content}</em>
    } else if (mark === "underline") {
      content = <u key={mark}>{content}</u>
    } else if (mark === "strike-through") {
      content = <s key={mark}>{content}</s>
    } else if (mark === "code") {
      content = <code key={mark}>{content}</code>
    } else {
      const annotation = block.markDefs?.find(
        (definition) => definition._key === mark
      )
      const href =
        annotation?._type === "link" ? safeLink(annotation.href) : undefined
      if (href) {
        const isExternal = /^https?:/i.test(href)
        content = (
          <a
            key={mark}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="underline underline-offset-4"
          >
            {content}
          </a>
        )
      }
    }
  }

  return <React.Fragment key={span._key ?? span.text}>{content}</React.Fragment>
}

function renderRichBlock(block: SanityRichTextBlock) {
  const children = (block.children ?? []).map((span) => renderSpan(span, block))
  const key = block._key ?? `${block.style ?? "normal"}-${children.length}`

  if (block.style === "h2") {
    return (
      <h2 key={key} className="text-xl leading-7 font-semibold">
        {children}
      </h2>
    )
  }
  if (block.style === "h3") {
    return (
      <h3 key={key} className="text-lg leading-7 font-semibold">
        {children}
      </h3>
    )
  }
  if (block.style === "blockquote") {
    return (
      <blockquote
        key={key}
        className="border-l-2 border-border pl-4 text-muted-foreground italic"
      >
        {children}
      </blockquote>
    )
  }
  if (block.listItem) return <li key={key}>{children}</li>
  return (
    <p key={key} className="whitespace-pre-wrap">
      {children}
    </p>
  )
}

function PartnershipRichText({ blocks }: { blocks: SanityRichTextBlock[] }) {
  const content: React.ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (!block) continue
    if (block.listItem === "bullet" || block.listItem === "number") {
      const listType = block.listItem
      const listItems: React.ReactNode[] = []
      while (index < blocks.length && blocks[index]?.listItem === listType) {
        const listBlock = blocks[index]
        if (listBlock) listItems.push(renderRichBlock(listBlock))
        index += 1
      }
      index -= 1
      content.push(
        listType === "number" ? (
          <ol
            key={block._key ?? `number-list-${index}`}
            className="list-inside list-decimal space-y-2"
          >
            {listItems}
          </ol>
        ) : (
          <ul
            key={block._key ?? `bullet-list-${index}`}
            className="list-inside list-disc space-y-2"
          >
            {listItems}
          </ul>
        )
      )
      continue
    }
    content.push(renderRichBlock(block))
  }

  return <div className="space-y-4">{content}</div>
}

function PartnershipGallery({
  partnerName,
  images,
}: {
  partnerName: string
  images: Array<{ url?: string; alt?: string; caption?: string }>
}) {
  const { locale } = useLocale()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const activeImage = images[selectedIndex] ?? images[0]

  if (!activeImage?.url) return null

  return (
    <div className="mt-10 grid gap-8 lg:h-[min(60vw,calc(100svh-18rem))] lg:min-h-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-stretch">
      <div className="relative aspect-[4/3] min-h-0 overflow-hidden rounded-2xl bg-background lg:aspect-auto">
        <Dialog>
          <DialogTrigger
            render={
              <button
                type="button"
                className="group absolute inset-0 block size-full touch-manipulation cursor-zoom-in bg-muted/20 text-left focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                aria-label={`${translate(locale, "partnershipPreview")} ${partnerName}`}
              />
            }
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt ?? translate(locale, "partnershipPhotoAlt").replace("{name}", partnerName)}
              width={1200}
              height={1200}
              className="size-full object-contain"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/15 group-focus-visible:bg-foreground/15">
              <span className="flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-5" aria-hidden="true" />
              </span>
            </span>
          </DialogTrigger>
          <GalleryLightbox
            image={
              {
                src: activeImage.url,
                alt: activeImage.alt ?? translate(locale, "partnershipPhotoAlt").replace("{name}", partnerName),
                caption:
                  activeImage.caption ??
                  activeImage.alt ??
                  translate(locale, "partnershipGalleryAlt").replace("{name}", partnerName),
                fileName: activeImage.url.split("/").pop() ?? "partner-image",
                format:
                  activeImage.url.split(".").pop()?.toUpperCase() ?? "IMAGE",
                resolution: translate(locale, "partnershipOriginalResolution"),
              } satisfies GalleryImage
            }
          />
        </Dialog>
      </div>

      <div className="min-w-0 lg:flex lg:h-full lg:flex-col">
        <div className="h-12 overflow-hidden text-sm leading-6 text-muted-foreground">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={`${activeImage.url}-${activeImage.alt ?? ""}`}
              className="line-clamp-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeImage.caption ??
                activeImage.alt ??
                translate(locale, "partnershipGalleryAlt").replace("{name}", partnerName)}
            </motion.p>
          </AnimatePresence>
        </div>

        <GalleryThumbnailSelector
          images={images.flatMap((image) => (image.url ? [{ src: image.url }] : []))}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          photoLabel={(index) =>
            `${translate(locale, "galleryPhotoSelect")} ${index} ${partnerName}`
          }
          previousLabel={translate(locale, "previousPhoto")}
          nextLabel={translate(locale, "nextPhoto")}
          positionLabel={translate(locale, "galleryPhotoPosition")}
          className="mt-4 pb-10 lg:mt-auto"
        />
      </div>
    </div>
  )
}

export default function PartnershipDetailPage({
  params,
}: {
  params: Promise<{ partnerId: string }>
}) {
  const { locale } = useLocale()
  const [partnerId, setPartnerId] = React.useState<string>()
  const [partner, setPartner] = React.useState<PartnershipItem | null>(null)
  const [backgroundExpanded, setBackgroundExpanded] = React.useState(false)
  const backgroundTextId = React.useId()

  React.useEffect(() => {
    void params.then(({ partnerId: id }) => setPartnerId(id))
  }, [params])

  React.useEffect(() => {
    if (!partnerId) return
    const controller = new AbortController()
    void fetch(`/api/kemitraan?lang=${locale}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Partnership request failed: ${response.status}`)
        return response.json() as Promise<PartnershipPageResponse | null>
      })
      .then((content) => {
        const sanityPartner = content?.showcase?.find(
          (item) => item?._id === partnerId && item.name
        )
        setPartner(sanityPartner ?? null)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load partnership detail", error)
      })
    return () => controller.abort()
  }, [locale, partnerId])

  if (!partner) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {partnerId
              ? translate(locale, "partnershipNotFound")
              : translate(locale, "partnershipLoading")}
          </p>
          <Link
            href="/tentang-kami/client"
            className="mt-5 inline-flex text-sm font-medium underline underline-offset-4"
          >
            {translate(locale, "partnershipBackToList")}
          </Link>
        </div>
      </main>
    )
  }

  const heroImage =
    partner.image?.url ?? "/images/partnership/partnership-transportation.svg"
  const gallery = partner.gallery?.filter(
    (item): item is NonNullable<typeof item> => Boolean(item?.url)
  ) ?? [{ url: heroImage }]
  const partnerName = fitText(
    partner.name,
    80,
    translate(locale, "partnershipNameFallback")
  )
  const portfolioText = fitText(
    partner.portfolio,
    240,
    translate(locale, "partnershipPortfolioMissing")
  )
  const overviewText = fitText(
    partner.body,
    360,
    translate(locale, "partnershipOverviewMissing")
  )
  const richBackground = Array.isArray(partner.partnershipBackground)
    ? partner.partnershipBackground
    : null
  const backgroundText = fitText(
    typeof partner.partnershipBackground === "string"
      ? partner.partnershipBackground
      : partner.body,
    10000,
    translate(locale, "partnershipBackgroundMissing")
  )
  const backgroundTitle = fitText(
    partner.partnershipBackgroundTitle,
    120,
    translate(locale, "partnershipBackgroundTitle")
  )
  const backgroundSubtitle = fitText(
    partner.partnershipBackgroundSubtitle,
    240,
    translate(locale, "partnershipBackgroundSubtitle")
  )
  const closingText = fitText(
    partner.partnershipClosing,
    320,
    translate(locale, "partnershipClosingMissing")
  )

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "aboutSectionLabel")}
        title={partnerName}
        description={
          portfolioText || translate(locale, "partnershipPageDescription")
        }
        image={heroImage}
        breadcrumbs={[
          {
            label: translate(locale, "aboutSectionLabel"),
            href: "/tentang-kami/profil-perusahaan",
          },
          { label: translate(locale, "clientNav"), href: "/tentang-kami/client" },
        ]}
      />

      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
            <div className="flex h-52 min-h-0 items-center justify-center overflow-hidden p-6 sm:h-60 sm:p-8 lg:h-64">
              {partner.logo?.url ? (
                <Image
                  src={partner.logo.url}
                  alt={`Logo ${partner.name ?? translate(locale, "partnershipLogoAltFallback")}`}
                  width={240}
                  height={160}
                  className="size-full object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">
                  {translate(locale, "partnershipLogoUnavailable")}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <SectionHeading
                eyebrow={translate(locale, "partnershipOverviewEyebrow")}
                title={
                  <span className="line-clamp-2 break-words">
                    {partnerName}
                  </span>
                }
                description={
                  <span className="line-clamp-5 break-words">
                    {overviewText}
                  </span>
                }
                className="max-w-3xl"
              />
              <dl className="mt-8 grid gap-5 border-y border-border py-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {translate(locale, "partnershipDate")}
                  </dt>
                  <dd className="mt-1 text-sm">
                    {formatPartnerSince(partner.partnerSince, locale)}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {translate(locale, "partnershipType")}
                  </dt>
                  <dd className="mt-1 line-clamp-4 text-sm leading-6 break-words">
                    {portfolioText}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "partnershipGalleryEyebrow")}
            title={translate(locale, "partnershipGalleryTitle")}
            description={translate(locale, "partnershipGalleryDescription")}
          />
          <PartnershipGallery
            partnerName={partner.name ?? "Mitra"}
            images={gallery}
          />
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "partnershipDocumentsEyebrow")}
            title={translate(locale, "partnershipDocumentsTitle")}
            description={translate(locale, "partnershipDocumentsDescription")}
            className="max-w-2xl"
          />
          <div className="mt-7 flex max-w-3xl flex-col gap-3">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>{translate(locale, "partnershipDownloadPortfolio")}</ItemTitle>
                {partner.portfolioDocument?.originalFilename ? (
                  <ItemDescription>
                    {partner.portfolioDocument.originalFilename}
                  </ItemDescription>
                ) : (
                  <ItemDescription>
                    {translate(locale, "partnershipPortfolioUnavailable")}
                  </ItemDescription>
                )}
              </ItemContent>
              <ItemActions>
                {partner.portfolioDocument?.url ? (
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<a href={partner.portfolioDocument.url} download />}
                  >
                    {translate(locale, "partnershipDownload")}
                  </Button>
                ) : null}
              </ItemActions>
            </Item>
            <Item
              variant="outline"
              size="sm"
              render={
                partner.documentation?.url ? (
                  <a
                    href={partner.documentation.url}
                    target="_blank"
                    rel="noreferrer"
                  />
                ) : undefined
              }
              className={
                partner.documentation?.url ? "cursor-pointer" : undefined
              }
            >
              <ItemMedia>
                <BadgeCheckIcon
                  className="size-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{translate(locale, "partnershipOfficialDocumentation")}</ItemTitle>
              </ItemContent>
            </Item>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-8">
          <SectionHeading
            eyebrow={translate(locale, "partnershipSectionDetailEyebrow")}
            title={backgroundTitle}
            description={backgroundSubtitle}
          />
          <div className="max-w-4xl">
            <div id={backgroundTextId} className="relative" aria-live="polite">
              {richBackground ? (
                <div
                  className={`max-w-none text-base leading-8 text-muted-foreground ${
                    backgroundExpanded ? "" : "max-h-32 overflow-hidden"
                  }`}
                >
                  <PartnershipRichText blocks={richBackground} />
                </div>
              ) : (
                <Text
                  variant="body-muted"
                  className={
                    backgroundExpanded
                      ? "text-base leading-8 whitespace-pre-line"
                      : "line-clamp-4 text-base leading-7 whitespace-pre-line"
                  }
                >
                  {backgroundText}
                </Text>
              )}
              {!backgroundExpanded ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/80 to-transparent"
                />
              ) : null}
            </div>
            <button
              type="button"
              data-partnership-background-toggle
              aria-controls={backgroundTextId}
              aria-expanded={backgroundExpanded}
              onClick={() => setBackgroundExpanded((expanded) => !expanded)}
              className="mt-4 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              {translate(locale, backgroundExpanded ? "partnershipShowLess" : "partnershipReadMore")}
            </button>
          </div>
          <div className="border-t border-border pt-8">
            <p className="max-w-4xl text-base leading-8 text-foreground">
              {closingText}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <Link
            href="/tentang-kami/client"
            className="text-sm font-medium underline underline-offset-4"
          >
            {translate(locale, "partnershipBackToList")}
          </Link>
        </div>
      </section>
    </main>
  )
}
