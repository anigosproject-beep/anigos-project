"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

type CountUpProps = {
  value: number
  duration?: number
  className?: string
}

const numberFormatter = new Intl.NumberFormat("id-ID")

function CountUp({ value, duration = 1200, className }: CountUpProps) {
  const targetRef = useRef<HTMLSpanElement>(null)
  const [currentValue, setCurrentValue] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    if (prefersReducedMotion) return

    let frameId = 0
    let startTime: number | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

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

    observer.observe(target)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [duration, prefersReducedMotion, value])

  return (
    <span ref={targetRef} className={className} aria-hidden="true">
      {numberFormatter.format(prefersReducedMotion ? value : currentValue)}
    </span>
  )
}

export { CountUp }
