"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"
import type {
  DotLottie,
  LoadErrorEvent,
  RenderErrorEvent,
} from "@lottiefiles/dotlottie-react"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then(
      (module) => module.DotLottieReact
    ),
  { ssr: false }
)

const getBaseColor = () => {
  if (typeof document === "undefined") return "#0f0f0f"
  const color = getComputedStyle(document.body)
    .getPropertyValue("--base-color")
    .trim()
  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#0f0f0f"
}

const subscribeToBaseColor = () => () => {}

export function GlobalLoading() {
  const { locale } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const baseColor = useSyncExternalStore(
    subscribeToBaseColor,
    getBaseColor,
    () => "#0f0f0f"
  )
  const [player, setPlayer] = useState<DotLottie | null>(null)
  const [animationFailed, setAnimationFailed] = useState(false)
  const filterId = useId().replaceAll(":", "")
  const colorMatrix = useMemo(() => {
    const channels = baseColor
      .match(/[0-9a-f]{2}/gi)
      ?.map((channel) => (Number.parseInt(channel, 16) / 255).toFixed(4))
    if (!channels || channels.length !== 3)
      return "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
    return `0 0 0 0 ${channels[0]} 0 0 0 0 ${channels[1]} 0 0 0 0 ${channels[2]} 0 0 0 1 0`
  }, [baseColor])

  useEffect(() => {
    if (!player) return

    const handleError = (event: LoadErrorEvent | RenderErrorEvent) => {
      console.error("Unable to render the loading animation.", event.error)
      setAnimationFailed(true)
    }
    player.addEventListener("loadError", handleError)
    player.addEventListener("renderError", handleError)

    return () => {
      player.removeEventListener("loadError", handleError)
      player.removeEventListener("renderError", handleError)
    }
  }, [player])

  const setPlayerRef = useCallback((instance: DotLottie | null) => {
    setPlayer(instance)
  }, [])

  return (
    <main
      className="fixed inset-0 z-[100] flex min-h-svh items-center justify-center bg-background px-6"
      role="status"
      aria-live="polite"
      aria-label={translate(locale, "loadingPage")}
    >
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={colorMatrix} />
          </filter>
        </defs>
      </svg>
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.15 : 0.35,
          ease: "easeOut",
        }}
      >
        {animationFailed ? (
          <Image
            src="/animated/loading-animation.svg"
            alt=""
            width={128}
            height={128}
            className="size-28"
            style={{ filter: `url(#${filterId})` }}
            priority
            aria-hidden="true"
          />
        ) : (
          <DotLottieReact
            src="/animated/loading.lottie"
            autoplay
            loop
            width={128}
            height={128}
            className="size-28"
            style={{ filter: `url(#${filterId})` }}
            dotLottieRefCallback={setPlayerRef}
            aria-hidden="true"
          />
        )}
        <motion.p
          className="mt-5 text-sm font-medium text-muted-foreground"
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {translate(locale, "loadingPage")}…
        </motion.p>
      </motion.div>
    </main>
  )
}
