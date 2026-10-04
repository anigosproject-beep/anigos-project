import Image from "next/image"
import Link from "@/components/site-link"
import { ArrowUpRight } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { Reveal } from "@/components/motion"
import {
  SectionContainer,
  SectionShell,
} from "@/components/layout/section-shell"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import { useHomeContent } from "@/components/home-content-provider"

const resources = [
  {
    title: "csr",
    description: "navCsrDescription",
    href: "/keberlanjutan/energi-berkelanjutan",
    image: "/images/resources/resource-energy.svg",
    alt: "Visual kegiatan CSR",
  },
  {
    title: "resourceSafetyTitle",
    description: "resourceSafetyDescription",
    href: "/keberlanjutan/keselamatan-operasional",
    image: "/images/resources/resource-safety.svg",
    alt: "Visual keselamatan operasional",
  },
  {
    title: "resourcePublicationTitle",
    description: "resourcePublicationDescription",
    href: "/artikel/publikasi",
    image: "/images/resources/resource-publication.svg",
    alt: "Visual publikasi PT. Anigos Jaya Perkasa",
  },
] as const

export function ResourceGrid() {
  const { locale } = useLocale()
  const home = useHomeContent()
  const publicationMedia = home?.mediaSlots?.find(
    (media) =>
      media?.page === "home" &&
      media.section === "publikasi" &&
      media.slot === "thumbnail"
  )?.image?.url
  const sustainabilityMedia = {
    energi: home?.mediaSlots?.find(
      (media) =>
        media?.page === "home" &&
        media.section === "keberlanjutan" &&
        media.slot === "image-energi"
    )?.image?.url,
    keselamatan: home?.mediaSlots?.find(
      (media) =>
        media?.page === "home" &&
        media.section === "keberlanjutan" &&
        media.slot === "image-keselamatan"
    )?.image?.url,
  }
  const configuredCards = home?.resources?.cards?.filter(
    (card): card is NonNullable<typeof card> =>
      Boolean(card?.title && card.link?.href)
  )
  const getShortcutMedia = (index: number) =>
    home?.mediaSlots?.find(
      (media) => media?.slotId === `home-resource-card-${index + 1}`
    )
  const cards = configuredCards?.length
    ? configuredCards.map((card, index) => {
        const shortcut = getShortcutMedia(index)
        return {
          title: shortcut?.cardTitle ?? card.title ?? "",
          description: shortcut?.cardDescription ?? card.description ?? "",
          href: shortcut?.linkedPagePath ?? card.link?.href ?? "#",
          image:
            shortcut?.image?.url ??
            card.thumbnail?.url ??
            (index === 0
              ? sustainabilityMedia.energi
              : index === 1
                ? sustainabilityMedia.keselamatan
                : publicationMedia) ??
            resources[index % resources.length].image,
          alt:
            shortcut?.image?.alt ??
            card.title ??
            resources[index % resources.length].alt,
        }
      })
    : resources.map((resource, index) => {
        const shortcut = getShortcutMedia(index)
        return {
          title: shortcut?.cardTitle ?? translate(locale, resource.title),
          description:
            shortcut?.cardDescription ??
            translate(locale, resource.description),
          href: shortcut?.linkedPagePath ?? resource.href,
          image:
            shortcut?.image?.url ??
            (index === 0
              ? sustainabilityMedia.energi
              : index === 1
                ? sustainabilityMedia.keselamatan
                : publicationMedia) ??
            resource.image,
          alt: shortcut?.image?.alt ?? resource.alt,
        }
      })

  return (
    <SectionShell className="bg-background py-24 lg:py-32">
      <SectionContainer>
        <div className="grid gap-6 md:grid-cols-3">
          {home?.resources?.title ? (
            <div className="md:col-span-3">
              <h2 className="text-3xl font-semibold tracking-tight">
                {home.resources.title}
              </h2>
              {home.resources.description ? (
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  {home.resources.description}
                </p>
              ) : null}
            </div>
          ) : null}
          {cards.map((resource, index) => (
            <Reveal
              key={`${index}-${resource.href}`}
              className="group"
              delay={index * 0.06}
            >
              <AspectRatio
                ratio={1.35}
                className="overflow-hidden rounded-4xl bg-muted"
              >
                <Image
                  src={resource.image}
                  alt={resource.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </AspectRatio>
              <Link
                href={resource.href}
                className="mt-4 block rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader className="gap-3">
                    <CardTitle className="flex items-center justify-between gap-4 text-xl">
                      <span className="line-clamp-2">{resource.title}</span>
                      <ArrowUpRight
                        className={cn(
                          "size-5 shrink-0 text-muted-foreground transition-transform",
                          "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                        )}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
