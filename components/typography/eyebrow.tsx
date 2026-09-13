import type { HTMLAttributes } from "react"

import { cn } from "cn"

type EyebrowProps = HTMLAttributes<HTMLSpanElement>

function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-xs leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Eyebrow }
