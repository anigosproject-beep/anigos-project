"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import type { AnchorHTMLAttributes } from "react"

import { usePageVisibility } from "@/components/page-visibility-provider"

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  LinkProps

export default function SiteLink({
  href,
  ...props
}: SiteLinkProps) {
  const { isVisible } = usePageVisibility()
  const pathname = usePathname() ?? "/"
  const targetPath =
    typeof href === "string"
      ? href.split(/[?#]/, 1)[0] || pathname
      : href.pathname ?? pathname

  if (!isVisible(targetPath)) return null

  return (
    <Link href={href} {...props} />
  )
}
