"use client"

import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

type ContentVideoPlayerProps = {
  src: string
  poster?: string
  thumbnail?: string
  title?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  deferUntilVisible?: boolean
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}

export function ContentVideoPlayer({
  src,
  poster,
  thumbnail,
  title,
  className,
  autoPlay = false,
  loop = false,
  deferUntilVisible = false,
}: ContentVideoPlayerProps) {
  const { locale } = useLocale()
  const resolvedTitle = title ?? translate(locale, "videoContent")
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(autoPlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [generatedPoster, setGeneratedPoster] = useState<string>()
  const [shouldLoad, setShouldLoad] = useState(!deferUntilVisible)
  const resolvedPoster = poster ?? thumbnail ?? generatedPoster

  useEffect(() => {
    if (!deferUntilVisible || shouldLoad) return

    const player = playerRef.current
    if (!player) return

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = window.setTimeout(() => setShouldLoad(true), 0)
      return () => window.clearTimeout(fallbackTimer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    observer.observe(player)

    return () => observer.disconnect()
  }, [deferUntilVisible, shouldLoad])

  const scheduleControlsHide = useCallback(() => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
    }

    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying && !controlsRef.current?.matches(":focus-within")) {
        setControlsVisible(false)
      }
    }, 2800)
  }, [isPlaying])

  const revealControls = () => {
    setControlsVisible(true)
    scheduleControlsHide()
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
      return
    }

    scheduleControlsHide()
  }, [isPlaying, scheduleControlsHide])

  const generatePoster = (video: HTMLVideoElement) => {
    if (poster || thumbnail || generatedPoster || !video.videoWidth) return
    if (
      video.currentSrc &&
      new URL(video.currentSrc, window.location.href).origin !==
        window.location.origin
    ) {
      return
    }

    const canvas = document.createElement("canvas")
    const width = 960
    const height = Math.round((video.videoHeight / video.videoWidth) * width)
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext("2d")
    if (!context) return

    context.drawImage(video, 0, 0, width, height)
    setGeneratedPoster(canvas.toDataURL("image/jpeg", 0.78))
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const seek = (value: number) => {
    const video = videoRef.current
    if (
      !video ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0 ||
      !Number.isFinite(value)
    ) {
      return
    }

    const nextTime = Math.max(0, Math.min(value, video.duration))
    video.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const enterFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }

    void video.requestFullscreen()
  }

  return (
    <div
      ref={playerRef}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-foreground text-background shadow-xl",
        className
      )}
      onPointerMove={revealControls}
      onPointerEnter={revealControls}
      onClickCapture={(event) => {
        const target = event.target
        if (
          !(target instanceof Element) ||
          !target.closest("[data-media-control]")
        ) {
          setControlsVisible(false)
        }
      }}
      onFocusCapture={revealControls}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={resolvedPoster}
        title={resolvedTitle}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline
        preload={deferUntilVisible ? "none" : "metadata"}
        className="block aspect-video size-full object-cover"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration)
          setCurrentTime(event.currentTarget.currentTime)
          generatePoster(event.currentTarget)
        }}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onLoadedData={(event) => generatePoster(event.currentTarget)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onSeeking={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false)
          setControlsVisible(true)
        }}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
        onEnded={() => {
          if (!loop) setIsPlaying(false)
        }}
      />

      <button
        type="button"
        onClick={togglePlayback}
        className={cn(
          "absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background",
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        data-media-control
        aria-label={translate(locale, isPlaying ? "videoPause" : "videoPlay")}
      >
        {isPlaying ? (
          <Pause className="size-5" />
        ) : (
          <Play className="ml-1 size-5" />
        )}
      </button>

      <div
        ref={controlsRef}
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-4 transition-opacity duration-200",
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        data-media-control
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step="any"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(event.currentTarget.valueAsNumber)}
          disabled={!Number.isFinite(duration) || duration <= 0}
          className="mb-3 h-1 w-full cursor-pointer accent-primary"
          aria-label={translate(locale, "videoPosition")}
          aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="rounded-md p-1.5 hover:bg-background/15 focus-visible:outline-2 focus-visible:outline-background"
            aria-label={translate(
              locale,
              isPlaying ? "videoPause" : "videoPlay"
            )}
          >
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </button>
          <span className="min-w-20 text-xs tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-md p-1.5 hover:bg-background/15 focus-visible:outline-2 focus-visible:outline-background"
            aria-label={translate(
              locale,
              isMuted ? "videoUnmute" : "videoMute"
            )}
          >
            {isMuted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={enterFullscreen}
            className="ml-auto rounded-md p-1.5 hover:bg-background/15 focus-visible:outline-2 focus-visible:outline-background"
            aria-label={translate(locale, "videoFullscreen")}
          >
            <Maximize className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
