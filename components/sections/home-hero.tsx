"use client"

import { ArrowRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

import { Eyebrow, Heading, Text } from "@/components/typography"
import { MotionButtonLink } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import {
  maxHomeHeroSlides,
  maxHomeHeroVideoBytes,
} from "@/shared/sanity-content-contracts"
import { getAllowedHomeHeroEmbedUrl } from "@/shared/sanity-home-hero-embed"

type HeroSlide = {
  position?: number
  eyebrow?: string | LocalizedText
  progressLabel?: LocalizedText
  title: string | LocalizedText
  description: string | LocalizedText
  image?: string
  video?: string
  videoEmbedUrl?: string
  href?: string
  action?: string | LocalizedText
  durationMs?: number
}

type LocalizedText = { id?: string; en?: string }

function hasLocalizedText(value: unknown): value is LocalizedText {
  if (typeof value !== "object" || value === null) return false
  if (!("id" in value) || !("en" in value)) return false

  return [value.id, value.en].some(
    (text) => typeof text === "string" && text.trim().length > 0
  )
}

type SanityHeroSlide = {
  position?: number
  mediaType?: "image" | "video"
  eyebrow?: LocalizedText
  progressLabel?: LocalizedText
  title?: LocalizedText
  description?: LocalizedText
  cta?: {
    label?: LocalizedText
    kind?: string
    route?: string
    url?: string
  }
  image?: { url?: string }
  videoUrl?: string
  videoSize?: number
  videoEmbedUrl?: string
}

const imageSlideDurationMs = 7000
const fallbackHeroSlide: HeroSlide = {
  eyebrow: "heroPrimaryEyebrow",
  title: "heroPrimaryTitle",
  description: "heroPrimaryDescription",
  action: "heroPrimaryAction",
  href: "/produk/kenali-produk",
}

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
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([fallbackHeroSlide])
  const [activeSlide, setActiveSlide] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [videoDurations, setVideoDurations] = useState<Record<number, number>>(
    {}
  )
  const [videoPlaybackBlocked, setVideoPlaybackBlocked] = useState<
    Record<number, boolean>
  >({})
  const transitionLockRef = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const slide = heroSlides[activeSlide]
  const prefersReducedMotion = useReducedMotion()
  const text = (value: string | LocalizedText, fallback: TranslationKey) =>
    typeof value === "string"
      ? translate(locale, value as TranslationKey)
      : (value[locale] ?? value.id ?? translate(locale, fallback))
  const videoIsPlaying =
    Boolean(slide?.video) &&
    !prefersReducedMotion &&
    !videoPlaybackBlocked[activeSlide]
  const videoEmbedIsDisplayed =
    Boolean(slide?.videoEmbedUrl) && !prefersReducedMotion
  const durationMs = videoIsPlaying
    ? (videoDurations[activeSlide] ?? 0)
    : videoEmbedIsDisplayed
      ? 0
      : (slide?.durationMs ?? imageSlideDurationMs)
  const contentVariants = prefersReducedMotion
    ? reducedHeroContentVariants
    : heroContentVariants
  const itemVariants = prefersReducedMotion
    ? reducedHeroItemVariants
    : heroItemVariants

  useEffect(() => {
    let cancelled = false
    void fetch("/api/home-hero", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load Sanity home hero")
        return response.json() as Promise<{ slides?: SanityHeroSlide[] }>
      })
      .then(({ slides }) => {
        if (cancelled) return
        if (!slides?.length) {
          console.warn("Sanity Home Hero has no slides; using local fallback.")
          setHeroSlides([fallbackHeroSlide])
          return
        }
        const mapped = slides
          .map((item): HeroSlide | null => {
            const image = item.image?.url
            const videoEmbedUrl =
              item.position === 1 && item.mediaType === "video"
                ? getAllowedHomeHeroEmbedUrl(item.videoEmbedUrl)
                : undefined
            const shouldPlayVideo =
              item.mediaType === "video" &&
              !videoEmbedUrl &&
              Boolean(item.videoUrl) &&
              (typeof item.videoSize !== "number" ||
                item.videoSize <= maxHomeHeroVideoBytes)
            const hasUsableMedia =
              item.mediaType === "image"
                ? Boolean(image)
                : Boolean(videoEmbedUrl) || shouldPlayVideo
            const href =
              item.cta?.kind === "external"
                ? item.cta.url
                : item.cta?.kind === "internal"
                  ? item.cta.route
                  : undefined
            if (!hasLocalizedText(item.title)) return null
            if (!hasUsableMedia) {
              console.warn(
                `Home Hero slide ${String(item.position ?? "?")} has no playable media; showing the branded placeholder.`
              )
            }
            return {
              position: item.position,
              eyebrow: item.eyebrow,
              progressLabel: item.progressLabel,
              title: item.title,
              description: hasLocalizedText(item.description)
                ? item.description
                : {},
              image: item.mediaType === "image" && image ? image : undefined,
              video: shouldPlayVideo ? item.videoUrl : undefined,
              videoEmbedUrl,
              durationMs:
                item.mediaType === "image" ? imageSlideDurationMs : undefined,
              href,
              action: item.cta?.label,
            }
          })
          .filter((item): item is HeroSlide => item !== null)
        if (!mapped.length) {
          console.warn(
            "Sanity Home Hero has no usable slides; using local fallback."
          )
          setHeroSlides([fallbackHeroSlide])
          return
        }
        setHeroSlides(mapped.slice(0, maxHomeHeroSlides))
        setVideoDurations({})
        setVideoPlaybackBlocked({})
        transitionLockRef.current = null
        setElapsed(0)
        setActiveSlide(0)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Failed to load Sanity home hero", error)
          setHeroSlides([fallbackHeroSlide])
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const selectSlide = useCallback(
    (index: number) => {
      setElapsed(0)
      setActiveSlide(Math.max(0, Math.min(index, heroSlides.length - 1)))
    },
    [heroSlides.length]
  )

  const advanceSlide = useCallback(() => {
    if (transitionLockRef.current === activeSlide) return
    transitionLockRef.current = activeSlide
    selectSlide((activeSlide + 1) % heroSlides.length)
  }, [activeSlide, heroSlides.length, selectSlide])

  useEffect(() => {
    if (!slide) return

    const startedAt = performance.now()
    const timer =
      videoIsPlaying || videoEmbedIsDisplayed
        ? null
        : window.setTimeout(advanceSlide, durationMs)
    const progressInterval = videoEmbedIsDisplayed
      ? null
      : window.setInterval(() => {
          if (videoIsPlaying) {
            const video = videoRef.current
            if (
              video &&
              Number.isFinite(video.duration) &&
              video.duration > 0
            ) {
              setElapsed(video.currentTime * 1000)
            }
          } else {
            setElapsed(Math.min(performance.now() - startedAt, durationMs))
          }
        }, 100)

    return () => {
      if (timer !== null) window.clearTimeout(timer)
      if (progressInterval !== null) window.clearInterval(progressInterval)
    }
  }, [
    activeSlide,
    advanceSlide,
    durationMs,
    slide,
    videoEmbedIsDisplayed,
    videoIsPlaying,
  ])

  if (!slide) return null

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_78%_18%,rgba(0,115,100,0.36),transparent_46%),linear-gradient(135deg,#071e2f,#123b47_56%,#0b2029)] text-white"
      aria-label={translate(locale, "heroLabel")}
      data-motion="hero"
    >
      {heroSlides.map((item, index) => (
        <div
          key={`${item.image}-${item.video ?? ""}-${item.href}-${index}`}
          aria-hidden={index !== activeSlide}
          className={cn(
            "absolute inset-0 -z-20 bg-cover bg-center transition-[opacity,transform] duration-1000",
            index === activeSlide ? "opacity-100" : "opacity-0"
          )}
          style={{
            ...((index === activeSlide ||
              index === (activeSlide + 1) % heroSlides.length) &&
            (!item.video || (index === activeSlide && !videoIsPlaying)) &&
            item.image
              ? {
                  backgroundImage: `url("${item.image}")`,
                }
              : {}),
          }}
        >
          {item.video && index === activeSlide && videoIsPlaying && (
            <video
              ref={videoRef}
              autoPlay={videoIsPlaying}
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload noplaybackrate noremoteplayback"
              preload="metadata"
              poster={item.image}
              onCanPlay={(event) => {
                if (videoIsPlaying) {
                  const video = event.currentTarget
                  video.muted = true
                  video.defaultMuted = true
                  void video.play().catch((error: unknown) => {
                    console.warn("Home Hero video autoplay was blocked.", error)
                    setVideoPlaybackBlocked((current) => ({
                      ...current,
                      [index]: true,
                    }))
                  })
                }
              }}
              onLoadedMetadata={(event) => {
                const videoDuration = event.currentTarget.duration
                if (Number.isFinite(videoDuration) && videoDuration > 0) {
                  setVideoDurations((current) => ({
                    ...current,
                    [index]: videoDuration * 1000,
                  }))
                }
              }}
              onDurationChange={(event) => {
                const videoDuration = event.currentTarget.duration
                if (Number.isFinite(videoDuration) && videoDuration > 0) {
                  setVideoDurations((current) => ({
                    ...current,
                    [index]: videoDuration * 1000,
                  }))
                }
              }}
              onEnded={advanceSlide}
              onError={(event) => {
                const video = event.currentTarget
                console.warn(
                  "Home Hero video unavailable; showing the branded placeholder.",
                  {
                    source: video.currentSrc,
                    errorCode: video.error?.code ?? null,
                    errorMessage:
                      video.error?.message || "No browser error details",
                    readyState: video.readyState,
                    networkState: video.networkState,
                  }
                )
                setVideoPlaybackBlocked((current) =>
                  current[index] ? current : { ...current, [index]: true }
                )
              }}
              className="size-full object-cover"
            >
              <source
                src={item.video}
                type={
                  item.video.toLowerCase().includes(".webm")
                    ? "video/webm"
                    : "video/mp4"
                }
              />
            </video>
          )}
          {item.videoEmbedUrl &&
            item.position === 1 &&
            index === activeSlide &&
            !prefersReducedMotion && (
              <iframe
                src={item.videoEmbedUrl}
                title={text(item.title, "heroPrimaryTitle")}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
                className="size-full border-0"
              />
            )}
        </div>
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.28)_52%,rgba(0,0,0,0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_72%,rgba(0,0,0,0.42),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-black/72 via-black/36 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-4 pt-[calc(var(--site-header-height,9rem)+1rem)] pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="w-full max-w-3xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {slide.eyebrow && (
              <motion.div variants={itemVariants}>
                <Eyebrow className="!text-white/70">
                  {text(slide.eyebrow, "heroPrimaryEyebrow")}
                </Eyebrow>
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <Heading
                level={1}
                variant="display"
                className="mt-3 !text-3xl !leading-[1.05] sm:mt-5 sm:!text-6xl"
              >
                {text(slide.title, "heroPrimaryTitle")}
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text
                variant="lead"
                className="mt-4 max-w-2xl !text-white/75 sm:mt-6"
              >
                {text(slide.description, "heroPrimaryDescription")}
              </Text>
            </motion.div>
            {slide.href && slide.action && (
              <motion.div variants={itemVariants}>
                <MotionButtonLink
                  href={slide.href}
                  variant="overlay"
                  className="mt-6 sm:mt-8"
                >
                  {text(slide.action, "heroPrimaryAction")}
                  <ArrowRight
                    data-icon="inline-end"
                    style={{
                      transitionDuration: prefersReducedMotion
                        ? "0ms"
                        : "180ms",
                      transitionTimingFunction: "ease-out",
                    }}
                  />
                </MotionButtonLink>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 w-full max-w-3xl sm:mt-10">
          <div
            className="grid grid-cols-4 gap-1.5 sm:gap-2"
            role="group"
            aria-label={translate(locale, "heroSlideLabel")}
          >
            {Array.from({ length: maxHomeHeroSlides }, (_, index) => {
              const item = heroSlides[index]

              if (!item) {
                return (
                  <div
                    key={`empty-hero-slide-${index}`}
                    aria-hidden="true"
                    className="min-h-12 min-w-0"
                  />
                )
              }

              return (
                <div
                  key={`${item.image}-${item.video ?? ""}-${item.href}-${index}`}
                  className="flex min-w-0 flex-col"
                >
                  <div className="relative">
                    <Progress
                      value={
                        index < activeSlide
                          ? 100
                          : index > activeSlide
                            ? 0
                            : durationMs > 0
                              ? Math.min((elapsed / durationMs) * 100, 100)
                              : 0
                      }
                      className={cn(
                        "w-full flex-none gap-0 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-white [&_[data-slot=progress-indicator]]:via-white/80 [&_[data-slot=progress-indicator]]:to-white [&_[data-slot=progress-indicator]]:bg-[length:200%_100%] [&_[data-slot=progress-indicator]]:transition-none [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-white/25 [&_[data-slot=progress-track]]:shadow-[inset_0_1px_1px_rgb(255_255_255/0.12)]",
                        !prefersReducedMotion &&
                          index === activeSlide &&
                          elapsed > 120 &&
                          "[&_[data-slot=progress-indicator]]:relative [&_[data-slot=progress-indicator]]:after:pointer-events-none [&_[data-slot=progress-indicator]]:after:absolute [&_[data-slot=progress-indicator]]:after:top-1/2 [&_[data-slot=progress-indicator]]:after:right-0.5 [&_[data-slot=progress-indicator]]:after:size-1 [&_[data-slot=progress-indicator]]:after:-translate-y-1/2 [&_[data-slot=progress-indicator]]:after:animate-[hero-progress-glow_2.2s_ease-in-out_infinite] [&_[data-slot=progress-indicator]]:after:rounded-full [&_[data-slot=progress-indicator]]:after:bg-white/90 [&_[data-slot=progress-indicator]]:after:shadow-[0_0_4px_1px_rgb(255_255_255/0.35)] [&_[data-slot=progress-indicator]]:after:content-['']"
                      )}
                      aria-label={`${translate(locale, "slideDurationLabel")} ${index + 1}`}
                      aria-valuetext={`${index + 1} dari ${heroSlides.length}`}
                    />
                    {index === activeSlide && videoIsPlaying && (
                      <input
                        type="range"
                        min={0}
                        max={Math.ceil(durationMs / 1000)}
                        step={1}
                        value={Math.min(
                          Math.floor(elapsed / 1000),
                          Math.ceil(durationMs / 1000)
                        )}
                        aria-label={translate(locale, "heroVideoSeek")}
                        aria-valuetext={`${Math.floor(elapsed / 1000)} / ${Math.ceil(durationMs / 1000)} s`}
                        className="absolute inset-x-0 top-0 h-6 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100 focus-visible:outline-none"
                        onChange={(event) => {
                          const video = videoRef.current
                          const seekTime = Number(event.currentTarget.value)
                          if (
                            video &&
                            Number.isFinite(seekTime) &&
                            Number.isFinite(video.duration)
                          ) {
                            video.currentTime = seekTime
                            setElapsed(seekTime * 1000)
                          }
                        }}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={`${translate(locale, "heroSlideLabel")} ${index + 1}: ${text(item.eyebrow ?? item.title, "heroPrimaryTitle")}`}
                    aria-pressed={index === activeSlide}
                    data-active={index === activeSlide}
                    className="group flex min-h-8 min-w-0 touch-manipulation items-start text-left transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none data-[active=false]:opacity-70"
                    onClick={() => {
                      transitionLockRef.current = null
                      selectSlide(index)
                    }}
                  >
                    <span className="mt-2 line-clamp-2 h-8 w-full text-[10px] leading-4 break-words text-white/60 sm:text-xs">
                      {item.progressLabel
                        ? text(item.progressLabel, "heroPrimaryTitle")
                        : String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
