"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
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
  const preset = revealPresets[kind]

  return (
    <motion.div
      data-motion-reveal="true"
      className={className}
      initial={{ opacity: 0, y: preset.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        ...revealTransition,
        delay,
        duration: preset.duration,
      }}
    >
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        data-motion-page-transition="true"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <SectionMotion>{children}</SectionMotion>
      </motion.div>
    </AnimatePresence>
  )
}

function SectionMotion({ children }: { children: ReactNode }) {
  return <>{children}</>
}
