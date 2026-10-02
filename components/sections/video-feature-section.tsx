"use client"

import { PlayCircle } from "lucide-react"
import { useEffect, useState } from "react"

import { ContentVideoPlayer } from "@/components/content-video-player"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/locale-provider"

type LocalizedCopy = {id: string; en: string}

type VideoFeatureSectionProps = {
  eyebrow: LocalizedCopy
  title: LocalizedCopy
  description: LocalizedCopy
  videoTitle: LocalizedCopy
  mediaSlotId?: string
  className?: string
}

export function VideoFeatureSection({
  eyebrow,
  title,
  description,
  videoTitle,
  mediaSlotId,
  className,
}: VideoFeatureSectionProps) {
  const { locale } = useLocale()
  const [loadedMedia, setLoadedMedia] = useState<{
    slotId: string
    videoUrl?: string
  } | null>(null)
  const copy = (value: LocalizedCopy) => value[locale]
  const videoSrc =
    loadedMedia &&
    loadedMedia.slotId === mediaSlotId &&
    loadedMedia.videoUrl
      ? loadedMedia.videoUrl
      : "/video-hero/0914.mp4"

  useEffect(() => {
    if (!mediaSlotId) return

    const controller = new AbortController()
    void fetch(`/api/page-media?slotId=${encodeURIComponent(mediaSlotId)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Supporting video request failed: ${response.status}`)
        }
        return response.json() as Promise<{
          slotId: string
          videoUrl?: string
        }>
      })
      .then((result) => setLoadedMedia(result))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error(`Unable to load supporting video: ${mediaSlotId}`, error)
      })

    return () => controller.abort()
  }, [mediaSlotId])

  return (
    <section className={`border-b border-border bg-muted/40 py-20 lg:py-28 ${className ?? ""}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div>
          <Badge variant="secondary">
            <PlayCircle data-icon="inline-start" />
            {copy(eyebrow)}
          </Badge>
          <Heading level={2} className="mt-5 max-w-2xl">
            {copy(title)}
          </Heading>
          <Text variant="lead" className="mt-5 max-w-2xl">
            {copy(description)}
          </Text>
        </div>
        <ContentVideoPlayer
          src={videoSrc}
          title={copy(videoTitle)}
          className="w-full"
        />
      </div>
    </section>
  )
}
