"use client"

import type { ReactNode } from "react"
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const revealTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={prefersReducedMotion ? undefined : { ...revealTransition, delay }}
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
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
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

    const sections = Array.from(container.querySelectorAll<HTMLElement>("section"))
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
              delay: 0.28 + Math.min(sections.indexOf(section) * 0.04, 0.2),
            }
          )
          observer.unobserve(section)
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
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
        section.style.willChange = ""
      })
    }
  }, [pathname, prefersReducedMotion])

  return <div ref={containerRef}>{children}</div>
}
