"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

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
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = Array.from({ length: 4 }, (_, index) => {
    const item = logoItems[index]
    const staticLogo = home?.mediaSlots?.find(
      (media) => media?.slotId === `home-product-logo-${index + 1}`
    )

    return {
      item,
      name: staticLogo?.name ?? item?.name,
      description: staticLogo?.description ?? item?.description,
      image: staticLogo?.image?.url ?? item?.logo?.url,
      alt:
        staticLogo?.image?.alt ||
        item?.name ||
        item?.logo?.alt ||
        "Logo produk",
    }
  }).filter((slide): slide is typeof slide & { image: string } =>
    Boolean(slide.image)
  )
  const activeSlide = slides[activeIndex % Math.max(slides.length, 1)]

  useEffect(() => {
    if (slides.length < 2) return

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [slides.length])

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

        <div className="flex min-h-32 w-full items-center justify-center py-2 sm:min-h-40 lg:min-h-48">
          <AnimatePresence mode="wait" initial={false}>
            {activeSlide && (
              <motion.div
                key={`${activeIndex}-${activeSlide.image}`}
                className="grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-4 sm:gap-8"
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 28,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.25 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-live="polite"
              >
                <div className="flex h-20 items-center justify-center sm:h-28 lg:h-36">
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    width={320}
                    height={160}
                    sizes="(max-width: 639px) 42vw, (max-width: 1023px) 16rem, 20rem"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 border-l border-border pl-4 sm:pl-8">
                  <h3 className="text-sm leading-snug font-semibold text-foreground sm:text-base lg:text-lg">
                    {activeSlide.name ?? activeSlide.alt}
                  </h3>
                  <p className="mt-2 line-clamp-4 text-xs leading-5 text-muted-foreground sm:mt-2.5 sm:text-sm sm:leading-5">
                    {activeSlide.description ??
                      description ??
                      translate(locale, "homeProductsDescription")}
                  </p>
                  {slides.length > 1 && (
                    <p className="mt-2.5 text-[0.65rem] font-medium text-muted-foreground sm:mt-3">
                      {String((activeIndex % slides.length) + 1).padStart(
                        2,
                        "0"
                      )}
                      <span className="mx-1.5 opacity-50">/</span>
                      {String(slides.length).padStart(2, "0")}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
