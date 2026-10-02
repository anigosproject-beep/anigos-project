import Image from "next/image"
import Link from "@/components/site-link"
import { ArrowUpRight } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { Reveal } from "@/components/motion"
import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
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
    (media) => media?.page === "home" && media.section === "publikasi" && media.slot === "thumbnail",
  )?.image?.url
  const sustainabilityMedia = {
    energi: home?.mediaSlots?.find(
      (media) => media?.page === "home" && media.section === "keberlanjutan" && media.slot === "image-energi",
    )?.image?.url,
    keselamatan: home?.mediaSlots?.find(
      (media) => media?.page === "home" && media.section === "keberlanjutan" && media.slot === "image-keselamatan",
    )?.image?.url,
  }
  const configuredCards = home?.resources?.cards?.filter(
    (card): card is NonNullable<typeof card> => Boolean(card?.title && card.link?.href),
  )
  const cards = configuredCards?.length
    ? configuredCards.map((card, index) => ({
        title: card.title ?? "",
        description: card.description ?? "",
        href: card.link?.href ?? "#",
        image:
          card.thumbnail?.url ??
          (index === 0 ? sustainabilityMedia.energi : undefined) ??
          (index === 1 ? sustainabilityMedia.keselamatan : undefined) ??
          (index === 2 ? publicationMedia : undefined) ??
          resources[index % resources.length].image,
        alt: card.title ?? "Resource PT. Anigos Jaya Perkasa",
      }))
    : resources.map((resource, index) => ({
        title: translate(locale, resource.title),
        description: translate(locale, resource.description),
        href: resource.href,
        image:
          index === 0
            ? sustainabilityMedia.energi ?? resource.image
            : index === 1
              ? sustainabilityMedia.keselamatan ?? resource.image
              : publicationMedia ?? resource.image,
        alt: resource.alt,
      }))

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
            <Reveal key={resource.href} className="group" delay={index * 0.06}>
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
                className="mt-4 block rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader className="gap-3">
                    <CardTitle className="flex items-center justify-between gap-4 text-xl">
                      {resource.title}
                      <ArrowUpRight
                        className={cn(
                          "size-5 shrink-0 text-muted-foreground transition-transform",
                          "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        )}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
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
