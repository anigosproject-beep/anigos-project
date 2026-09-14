"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useCallback, useEffect, useState } from "react"

import { Eyebrow, Heading, Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

type HeroSlide = {
  eyebrow: TranslationKey
  title: TranslationKey
  description: TranslationKey
  image: string
  video?: string
  href: string
  action: TranslationKey
  duration?: number
}

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "heroPrimaryEyebrow",
    title: "heroPrimaryTitle",
    description: "heroPrimaryDescription",
    image: "/images/hero/home-01.webp",
    video: "/video-hero/0914.mp4",
    href: "/produk/kenali-produk",
    action: "heroPrimaryAction",
  },
  {
    eyebrow: "heroProductEyebrow",
    title: "heroProductTitle",
    description: "heroProductDescription",
    image: "/images/hero/home-02.webp",
    href: "/produk/penawaran",
    action: "heroProductAction",
  },
  {
    eyebrow: "heroDistributionEyebrow",
    title: "heroDistributionTitle",
    description: "heroDistributionDescription",
    image: "/images/hero/home-03.webp",
    href: "/produk/armada",
    action: "heroDistributionAction",
  },
  {
    eyebrow: "heroFutureEyebrow",
    title: "heroFutureTitle",
    description: "heroFutureDescription",
    image: "/images/hero/home-04.webp",
    href: "/tentang-kami/kemitraan",
    action: "heroFutureAction",
  },
] satisfies HeroSlide[]

const slideDuration = 7000

const heroContentVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.14,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
}

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const reducedHeroContentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12 },
  },
}

const reducedHeroItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

export function HomeHero() {
  const { locale } = useLocale()
  const [activeSlide, setActiveSlide] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const slide = heroSlides[activeSlide]
  const duration = slide.duration ?? slideDuration
  const prefersReducedMotion = useReducedMotion()
  const contentVariants = prefersReducedMotion
    ? reducedHeroContentVariants
    : heroContentVariants
  const itemVariants = prefersReducedMotion
    ? reducedHeroItemVariants
    : heroItemVariants

  const selectSlide = useCallback((index: number) => {
    setElapsed(0)
    setVideoProgress(0)
    setActiveSlide(index)
  }, [])

  useEffect(() => {
    if (slide.video) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const nextElapsed = Date.now() - startedAt
      if (nextElapsed >= duration) {
        selectSlide((activeSlide + 1) % heroSlides.length)
        return
      }
      setElapsed(nextElapsed)
    }, 50)

    return () => window.clearInterval(timer)
  }, [activeSlide, duration, selectSlide, slide.video])

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-foreground text-background"
      aria-label={translate(locale, "heroLabel")}
      data-motion="hero"
    >
      {heroSlides.map((item, index) => (
        <div
          key={item.image}
          aria-hidden={index !== activeSlide}
          className={cn(
            "absolute inset-0 -z-20 bg-cover bg-center transition-[opacity,transform] duration-1000",
            index === activeSlide ? "opacity-100" : "opacity-0"
          )}
          style={{
            ...(!item.video
              ? { backgroundImage: `url("${item.image}")` }
              : {}),
          }}
        >
          {item.video && index === activeSlide && (
            <video
              autoPlay
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload noplaybackrate noremoteplayback"
              preload={index === activeSlide ? "auto" : "metadata"}
              poster={item.image}
              onCanPlay={(event) => {
                if (!prefersReducedMotion) {
                  void event.currentTarget.play().catch(() => undefined)
                }
              }}
              onTimeUpdate={(event) => {
                if (index !== activeSlide) return
                const video = event.currentTarget
                setVideoProgress(
                  video.duration ? (video.currentTime / video.duration) * 100 : 0
                )
              }}
              onEnded={() =>
                selectSlide((activeSlide + 1) % heroSlides.length)
              }
              className="size-full object-cover"
            >
              <source src={item.video} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_92%,transparent)_0%,color-mix(in_oklab,var(--foreground)_62%,transparent)_52%,color-mix(in_oklab,var(--foreground)_35%,transparent)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-foreground/80 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-[13rem] sm:px-6 sm:pb-16 sm:pt-[14rem] lg:px-8 lg:pb-20 lg:pt-[20rem] xl:pt-[22rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="max-w-3xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow className="text-background/70">
                {translate(locale, slide.eyebrow)}
              </Eyebrow>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Heading level={1} variant="display" className="mt-4 max-w-3xl sm:mt-5">
                {translate(locale, slide.title)}
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text variant="lead" className="mt-5 max-w-2xl text-background/75 sm:mt-6">
                {translate(locale, slide.description)}
              </Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href={slide.href}
                className={buttonVariants({
                  className:
                    "mt-6 bg-background text-foreground hover:bg-background/90 sm:mt-8",
                })}
              >
                {translate(locale, slide.action)}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid max-w-3xl grid-cols-4 gap-2 sm:mt-16" role="tablist">
          {heroSlides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              role="tab"
              aria-label={`${translate(locale, "heroSlideLabel")} ${index + 1}: ${translate(locale, item.eyebrow)}`}
              aria-selected={index === activeSlide}
              className="group py-3 text-left"
              onClick={() => selectSlide(index)}
            >
              <Progress
                value={
                  index < activeSlide
                    ? 100
                    : index > activeSlide
                      ? 0
                      : item.video
                        ? videoProgress
                        : (elapsed / duration) * 100
                }
                className="gap-0 [&_[data-slot=progress-indicator]]:bg-background [&_[data-slot=progress-track]]:bg-background/30"
                aria-label={`${translate(locale, "slideDurationLabel")} ${index + 1}`}
                aria-valuetext={`${index + 1} dari ${heroSlides.length}`}
              />
              <span className="mt-2 block text-xs text-background/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
