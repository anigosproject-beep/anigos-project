import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { Reveal } from "@/components/motion"
import { ScrollFloat } from "@/components/scroll-motion"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const resources = [
  {
    title: "resourceEnergyTitle",
    description: "resourceEnergyDescription",
    href: "/keberlanjutan/energi-berkelanjutan",
    image: "/images/resources/resource-energy.svg",
    alt: "Visual energi berkelanjutan",
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
    alt: "Visual publikasi Petro Anigos",
  },
] as const

export function ResourceGrid() {
  const { locale } = useLocale()

  return (
    <section className="border-b border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource, index) => (
            <Reveal key={resource.href} className="group" delay={index * 0.06}>
              <ScrollFloat>
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
                        {translate(locale, resource.title)}
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
                        {translate(locale, resource.description)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollFloat>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
