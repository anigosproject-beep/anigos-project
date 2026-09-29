"use client"

import * as React from "react"
import { cn } from "cn"

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  const { locale } = useLocale()
  return (
    <nav
      role="navigation"
      aria-label={translate(locale, "paginationLabel")}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "icon"
} &
  React.ComponentProps<"a">

function paginationLinkVariants({
  isActive,
  size,
}: {
  isActive?: boolean
  size: PaginationLinkProps["size"]
}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none transition-[color,background-color,border-color,box-shadow] select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    size === "icon" ? "size-9" : "h-9 gap-1.5 px-3",
    isActive
      ? "border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground"
      : "text-foreground hover:bg-muted hover:text-foreground",
  )
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        paginationLinkVariants({isActive, size}),
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  text,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  const { locale } = useLocale()
  return (
    <PaginationLink
      aria-label={translate(locale, "paginationPrevious")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text ?? translate(locale, "paginationPrevious")}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  const { locale } = useLocale()
  return (
    <PaginationLink
      aria-label={translate(locale, "paginationNext")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{text ?? translate(locale, "paginationNext")}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { locale } = useLocale()
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">{translate(locale, "paginationMore")}</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
