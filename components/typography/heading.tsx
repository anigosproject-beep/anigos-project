import type { HTMLAttributes } from "react"

import { cn } from "cn"

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const

const headingVariants = {
  display:
    "text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl",
  page: "text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl",
  section:
    "text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl",
  subsection:
    "text-2xl leading-[1.2] font-semibold tracking-tight text-balance sm:text-3xl",
  card: "text-xl leading-snug font-semibold tracking-tight",
  detail: "text-lg leading-snug font-semibold tracking-tight",
} as const

type HeadingLevel = keyof typeof headingTags
type HeadingVariant = keyof typeof headingVariants

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel
  variant?: HeadingVariant
}

function defaultVariantForLevel(level: HeadingLevel): HeadingVariant {
  if (level === 1) return "page"
  if (level === 2) return "section"
  if (level === 3) return "subsection"
  if (level === 4) return "card"
  return "detail"
}

function Heading({
  level,
  variant,
  className,
  ...props
}: HeadingProps) {
  const Tag = headingTags[level]

  return (
    <Tag
      className={cn(
        headingVariants[variant ?? defaultVariantForLevel(level)],
        className
      )}
      {...props}
    />
  )
}

export { Heading, headingVariants }
export type { HeadingLevel, HeadingVariant }
