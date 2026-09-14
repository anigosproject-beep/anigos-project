"use client"

import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type ScrollFloatProps = {
  children: ReactNode
  className?: string
  distance?: number
}

export function ScrollFloat({
  children,
  className,
  distance = 10,
}: ScrollFloatProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div
      ref={targetRef}
      className={className}
      data-scroll-float
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}
