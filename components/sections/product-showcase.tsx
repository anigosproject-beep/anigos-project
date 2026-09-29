"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { useHomeContent } from "@/components/home-content-provider"
import { useLocale } from "@/components/locale-provider"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { MotionButtonLink } from "@/components/ui/button"
import { translate } from "@/lib/i18n"

export function ProductShowcase() {
  const { locale } = useLocale()
  const home = useHomeContent()
  const title = home?.productShowcase?.title
  const description = home?.productShowcase?.description
  const logoItems = home?.productShowcase?.logoItems?.slice(0, 4) ?? []

  return (
    <section
      id="produk"
      className="h-[100svh] max-h-[100svh] overflow-hidden border-b border-border bg-muted/40"
      aria-labelledby="home-products-title"
    >
      <div className="product-showcase-content mx-auto grid h-full max-w-7xl grid-rows-[auto_auto_auto] content-center gap-3 px-4 pt-[var(--site-header-height,9rem)] pb-4 sm:gap-5 sm:px-6 sm:pb-6 lg:gap-6 lg:px-8 lg:py-7">
        <div className="product-showcase-heading mx-auto w-full max-w-2xl text-center">
          <Badge variant="secondary">
            {translate(locale, "homeProductsEyebrow")}
          </Badge>
          <Heading
            level={2}
            id="home-products-title"
            className="mx-auto mt-2 line-clamp-2 max-w-2xl text-[clamp(1.4rem,3vw,2.5rem)] leading-tight sm:mt-3"
          >
            {title ?? translate(locale, "homeProductsTitle")}
          </Heading>
          <Text
            variant="lead"
            className="mx-auto mt-2 line-clamp-2 max-w-2xl text-xs leading-5 sm:mt-3 sm:line-clamp-3 sm:text-sm sm:leading-6 lg:text-base"
          >
            {description ?? translate(locale, "homeProductsDescription")}
          </Text>
        </div>

        <div className="grid w-full grid-cols-4 items-center justify-items-center gap-1.5 py-2 sm:gap-4">
          {Array.from({ length: 4 }, (_, index) => {
            const item = logoItems[index]
            const slotId = `home-product-logo-${index + 1}`
            const staticLogo = home?.mediaSlots?.find(
              (media) => media?.slotId === slotId
            )
            const image = staticLogo?.image?.url ?? item?.logo?.url
            const alt =
              staticLogo?.image?.alt ||
              item?.name ||
              item?.logo?.alt ||
              "Logo produk"

            return (
              <div
                key={slotId}
                className="flex h-10 w-full min-w-0 items-center justify-center sm:h-12 lg:h-14"
              >
                {image ? (
                  <Image
                    src={image}
                    alt={alt}
                    title={item?.description}
                    width={180}
                    height={80}
                    sizes="(max-width: 639px) 4.5rem, (max-width: 1023px) 6rem, 7rem"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span aria-hidden="true" className="block size-full" />
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {translate(locale, "homeProductsInquiry")}
          </p>
          <MotionButtonLink
            href="/produk/penawaran"
            variant="outline"
            size="lg"
            className="max-sm:h-8 max-sm:text-xs"
          >
            {translate(locale, "homeProductsContact")}
            <ArrowRight data-icon="inline-end" />
          </MotionButtonLink>
        </div>
      </div>
    </section>
  )
}
