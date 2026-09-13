import type { HTMLAttributes } from "react"

import { cn } from "cn"

const textVariants = {
  lead: "text-lg leading-8 text-muted-foreground sm:text-xl",
  body: "text-base leading-7 text-foreground",
  "body-muted": "text-base leading-7 text-muted-foreground",
  small: "text-sm leading-6 text-muted-foreground",
  meta: "text-xs leading-5 font-medium tracking-wide text-muted-foreground",
} as const

type TextVariant = keyof typeof textVariants
type TextElement = "p" | "span" | "div"

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextElement
  variant?: TextVariant
}

function Text({
  as: Element = "p",
  variant = "body",
  className,
  ...props
}: TextProps) {
  return (
    <Element className={cn(textVariants[variant], className)} {...props} />
  )
}

export { Text, textVariants }
export type { TextProps, TextVariant }
