"use client"

import type { ReactNode } from "react"
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const revealTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
}

type RevealKind = "eyebrow" | "heading" | "body" | "action" | "default"

const revealPresets: Record<
  RevealKind,
  { distance: number; duration: number }
> = {
  eyebrow: { distance: 10, duration: 0.4 },
  heading: { distance: 18, duration: 0.55 },
  body: { distance: 14, duration: 0.5 },
  action: { distance: 10, duration: 0.4 },
  default: { distance: 22, duration: revealTransition.duration },
}

export function Reveal({
  children,
  className,
  delay = 0,
  kind = "default",
}: {
  children: ReactNode
  className?: string
  delay?: number
  kind?: RevealKind
}) {
  const prefersReducedMotion = useReducedMotion()
  const preset = revealPresets[kind]

  return (
    <motion.div
      data-motion-reveal="true"
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: preset.distance }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      animate={prefersReducedMotion ? { opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, delay }
          : {
              ...revealTransition,
              delay,
              duration: preset.duration,
            }
      }
    >
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.35, ease: "easeOut" }
        }
      >
        <SectionMotion>{children}</SectionMotion>
      </motion.div>
    </AnimatePresence>
  )
}

function SectionMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion) return

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("section:not([data-motion='hero'])")
    ).filter((section) => !section.querySelector("[data-motion-reveal='true']"))
    if (sections.length === 0) return

    const visibleSections = new WeakSet<HTMLElement>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || visibleSections.has(entry.target as HTMLElement)) return

          const section = entry.target as HTMLElement
          visibleSections.add(section)
          animate(
            section,
            { opacity: 1, y: 0 },
            {
              ...revealTransition,
              delay: 0.08,
            }
          )
          observer.unobserve(section)
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    )

    sections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(24px)"
      section.style.willChange = "opacity, transform"
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
      sections.forEach((section) => {
        section.style.opacity = ""
        section.style.transform = ""
        section.style.willChange = ""
      })
    }
  }, [pathname, prefersReducedMotion])

  return <div ref={containerRef}>{children}</div>
}
