"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Anchor, Clapperboard, Compass, Fuel } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { MotionButtonLink } from "@/components/ui/button"
import { translate } from "@/lib/i18n"

export function MarineFuelShowcase({ variant = "home" }: {variant?: "home" | "product"}) {
  const { locale } = useLocale()
  const [media, setMedia] = useState<{
    variant: "home" | "product"
    backgroundImage?: string
    backgroundVideo?: string
  } | null>(null)
  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/marine-fuel-media?variant=${variant}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Marine Fuel media request failed: ${response.status}`)
        }
        return response.json() as Promise<{
          variant: "home" | "product"
          backgroundImage?: string
          backgroundVideo?: string
        }>
      })
      .then((data) => setMedia(data))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Unable to load Marine Fuel media from Sanity", error)
      })

    return () => controller.abort()
  }, [variant])
  const copyKeys = variant === "product"
    ? {
        title: "productMarineFuelTitle",
        description: "productMarineFuelDescription",
        productSupport: "productMarineFuelProductSupport",
        distribution: "productMarineFuelDistribution",
      } as const
    : {
        title: "marineFuelTitle",
        description: "marineFuelDescription",
        productSupport: "marineFuelProductSupport",
        distribution: "marineFuelFlexibleDistribution",
      } as const
  const backgroundImage =
    media?.variant === variant ? media.backgroundImage : undefined
  const backgroundVideo =
    media?.variant === variant ? media.backgroundVideo : undefined
  const [failedVideoUrl, setFailedVideoUrl] = useState<string | null>(null)

  return (
    <section
      id="marine-fuel"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-border bg-slate-950 text-white lg:h-[100svh] lg:max-h-[100svh]"
      aria-labelledby="marine-fuel-title"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={backgroundImage ?? "/images/distribution/fuel-distribution.png"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        {backgroundVideo && backgroundVideo !== failedVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover opacity-45"
            onError={(event) => {
              console.error("Marine Fuel background video failed to load", {
                source: event.currentTarget.currentSrc,
                errorCode: event.currentTarget.error?.code ?? null,
              })
              setFailedVideoUrl(backgroundVideo)
            }}
          >
            <source src={backgroundVideo} />
          </video>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(2,12,27,0.95)_0%,rgba(2,12,27,0.76)_48%,rgba(2,12,27,0.35)_100%)]"
      />

      <div className="mx-auto grid h-full max-w-7xl content-center gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="border-white/30 bg-white/10 text-white"
          >
            <Anchor aria-hidden="true" className="mr-1.5 size-3.5" />
            {translate(locale, "marineFuelEyebrow")}
          </Badge>
          <Heading
            level={2}
            id="marine-fuel-title"
            className="mt-4 text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] text-white"
          >
            {translate(locale, copyKeys.title)}
          </Heading>
          <Text
            variant="lead"
            className="mt-4 max-w-xl text-sm text-white/75 sm:mt-6 sm:text-lg"
          >
            {translate(locale, copyKeys.description)}
          </Text>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 backdrop-blur-sm sm:text-sm">
              <Fuel
                aria-hidden="true"
                className="size-4 shrink-0 text-sky-300"
              />
              {translate(locale, copyKeys.productSupport)}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 backdrop-blur-sm sm:text-sm">
              <Compass
                aria-hidden="true"
                className="size-4 shrink-0 text-sky-300"
              />
              {translate(locale, copyKeys.distribution)}
            </div>
          </div>

          <MotionButtonLink
            href="/produk/penawaran"
            variant="overlay"
            className="mt-6 sm:mt-8"
          >
            {translate(locale, "marineFuelCta")}
            <ArrowRight data-icon="inline-end" />
          </MotionButtonLink>
        </div>

        <div className="flex justify-center">
          <div
            role="group"
            aria-label={translate(locale, "marineFuelVideoPlaceholder")}
            className="flex aspect-video w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-slate-950/55 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-3 text-center text-white/80">
              <Clapperboard aria-hidden="true" className="size-10 text-sky-200" />
              <Text className="text-sm text-white/80">
                {translate(locale, "marineFuelVideoPlaceholder")}
              </Text>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
                16:9
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
