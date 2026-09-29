"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  value: number
  duration?: number
  className?: string
}

const numberFormatter = new Intl.NumberFormat("id-ID")

function CountUp({ value, duration = 1200, className }: CountUpProps) {
  const targetRef = useRef<HTMLSpanElement>(null)
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    let frameId = 0
    let startTime: number | null = null
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        if (motionPreference.matches) {
          setCurrentValue(value)
          observer.disconnect()
          return
        }

        const animateValue = (timestamp: number) => {
          startTime ??= timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setCurrentValue(Math.round(easedProgress * value))

          if (progress < 1) {
            frameId = requestAnimationFrame(animateValue)
          }
        }

        frameId = requestAnimationFrame(animateValue)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return
      setCurrentValue(value)
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }

    motionPreference.addEventListener("change", handleMotionPreferenceChange)
    observer.observe(target)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange
      )
    }
  }, [duration, value])

  return (
    <span ref={targetRef} className={className} aria-hidden="true">
      {numberFormatter.format(currentValue)}
    </span>
  )
}

export { CountUp }
