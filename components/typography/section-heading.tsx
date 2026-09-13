import type { ReactNode } from "react"

import { cn } from "cn"
import { Reveal } from "@/components/motion"

import { Eyebrow } from "./eyebrow"
import { Heading, type HeadingLevel } from "./heading"
import { Text } from "./text"

type SectionHeadingProps = {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  level?: Extract<HeadingLevel, 2 | 3>
  align?: "left" | "center"
  className?: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        centered && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal delay={0}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <Heading level={level}>{title}</Heading>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <Text variant="lead">{description}</Text>
        </Reveal>
      ) : null}
    </div>
  )
}

export { SectionHeading }
