"use client"

import Image from "next/image"
import { ArrowRight, Anchor, Compass, Fuel } from "lucide-react"

import { useHomeContent } from "@/components/home-content-provider"
import { useLocale } from "@/components/locale-provider"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { MotionButtonLink } from "@/components/ui/button"
import { translate } from "@/lib/i18n"

export function MarineFuelShowcase() {
  const { locale } = useLocale()
  const home = useHomeContent()
  const backgroundImage = home?.mediaSlots?.find(
    (media) =>
      media?.page === "home" &&
      media.section === "marine-fuel" &&
      media.slot === "background"
  )?.image?.url

  return (
    <section
      id="marine-fuel"
      className="relative isolate h-[100svh] max-h-[100svh] overflow-hidden border-b border-border bg-slate-950 text-white"
      aria-labelledby="marine-fuel-title"
    >
      <Image
        src={backgroundImage ?? "/images/distribution/fuel-distribution.png"}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-45"
      />
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
            {translate(locale, "marineFuelTitle")}
          </Heading>
          <Text
            variant="lead"
            className="mt-4 max-w-xl text-sm text-white/75 sm:mt-6 sm:text-lg"
          >
            {translate(locale, "marineFuelDescription")}
          </Text>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 backdrop-blur-sm sm:text-sm">
              <Fuel
                aria-hidden="true"
                className="size-4 shrink-0 text-sky-300"
              />
              {translate(locale, "marineFuelProductSupport")}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 backdrop-blur-sm sm:text-sm">
              <Compass
                aria-hidden="true"
                className="size-4 shrink-0 text-sky-300"
              />
              {translate(locale, "marineFuelFlexibleDistribution")}
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

        <div className="hidden justify-center lg:flex">
          <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-sm">
            <div className="absolute inset-[10%] rounded-full border border-dashed border-white/20" />
            <div className="absolute inset-[23%] rounded-full border border-white/15" />
            <div className="relative flex size-36 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 shadow-2xl">
              <Anchor
                aria-hidden="true"
                className="size-16 text-sky-200"
                strokeWidth={1.2}
              />
            </div>
            <span className="absolute top-[14%] left-[21%] size-3 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.75)]" />
            <span className="absolute right-[15%] bottom-[25%] size-2 rounded-full bg-white/70" />
            <span className="absolute bottom-[14%] left-[29%] size-2 rounded-full bg-sky-200/80" />
          </div>
        </div>
      </div>
    </section>
  )
}
