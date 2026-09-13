"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

import { Eyebrow, Heading, Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type HeroSlide = {
  eyebrow: string
  title: string
  description: string
  image: string
  href: string
  action: string
  mediaType?: "image" | "video"
  duration?: number
}

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Petro Anigos",
    title: "Distributor bahan bakar industri terpercaya di Indonesia.",
    description:
      "Melayani kebutuhan distribusi BBM berkualitas untuk kebutuhan industri dengan jangkauan operasional yang terus berkembang.",
    image: "/images/hero/home-01.webp",
    href: "/produk/kenali-produk",
    action: "Kenali Produk",
  },
  {
    eyebrow: "Produk Berkualitas",
    title: "Solusi energi yang sesuai dengan kebutuhan bisnis Anda.",
    description:
      "Produk dan layanan Petro Anigos dirancang untuk mendukung kebutuhan operasional dari berbagai skala.",
    image: "/images/hero/home-02.webp",
    href: "/produk/penawaran",
    action: "Ajukan Penawaran",
  },
  {
    eyebrow: "Distribusi Terpercaya",
    title: "Dukungan armada untuk distribusi yang aman dan tepat waktu.",
    description:
      "Didukung pilihan kapasitas armada dan mitra transportir untuk menjangkau kebutuhan distribusi ant wilayah.",
    image: "/images/hero/home-03.webp",
    href: "/produk/armada",
    action: "Lihat Armada",
  },
  {
    eyebrow: "Bersama untuk Masa Depan",
    title: "Membangun kemitraan energi yang berkelanjutan.",
    description:
      "Kami terbuka untuk membangun hubungan bisnis yang profesional, transparan, dan saling menguntungkan.",
    image: "/images/hero/home-04.webp",
    href: "/tentang-kami/kemitraan",
    action: "Jelajahi Kemitraan",
  },
] satisfies HeroSlide[]

const slideDuration = 7000

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const slide = heroSlides[activeSlide]
  const duration = slide.duration ?? slideDuration
  const prefersReducedMotion = useReducedMotion()

  const selectSlide = useCallback((index: number) => {
    setElapsed(0)
    setVideoProgress(0)
    setActiveSlide(index)
  }, [])

  useEffect(() => {
    if (slide.mediaType === "video") return

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
  }, [activeSlide, duration, selectSlide, slide.mediaType])

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-foreground text-background"
      aria-label="Hero utama Petro Anigos"
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
            ...(item.mediaType !== "video"
              ? { backgroundImage: `url("${item.image}")` }
              : {}),
          }}
        >
          {item.mediaType === "video" && (
            <video
              autoPlay={index === activeSlide}
              muted
              playsInline
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
              <source src={item.image} type="video/mp4" />
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

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-[9.5rem] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <motion.div
          key={activeSlide}
          className="max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.28 }}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="text-background/70">{slide.eyebrow}</Eyebrow>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heading level={1} variant="display" className="mt-4 max-w-3xl sm:mt-5">
              {slide.title}
            </Heading>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.05, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text variant="lead" className="mt-5 max-w-2xl text-background/75 sm:mt-6">
              {slide.description}
            </Text>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.95, delay: 0.96, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={slide.href}
              className={buttonVariants({
                className:
                  "mt-6 bg-background text-foreground hover:bg-background/90 sm:mt-8",
              })}
            >
              {slide.action}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-10 grid max-w-3xl grid-cols-4 gap-2 sm:mt-16" role="tablist">
          {heroSlides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              role="tab"
              aria-label={`Tampilkan slide ${index + 1}: ${item.eyebrow}`}
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
                      : item.mediaType === "video"
                        ? videoProgress
                        : (elapsed / duration) * 100
                }
                className="gap-0 [&_[data-slot=progress-indicator]]:bg-background [&_[data-slot=progress-track]]:bg-background/30"
                aria-label={`Durasi slide ${index + 1}`}
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
