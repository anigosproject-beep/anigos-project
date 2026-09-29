import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "cn"

type SectionShellProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode
}

type SectionContainerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
}

function SectionShell({children, className, ...props}: SectionShellProps) {
  return (
    <section className={cn("border-b border-border", className)} {...props}>
      {children}
    </section>
  )
}

function SectionContainer({
  children,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {SectionContainer, SectionShell}
