import type { ReactNode } from "react"

import { Reveal } from "@/components/motion"
import { Eyebrow, Heading, Text } from "@/components/typography"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type PageHeroProps = {
  title: string
  description: string
  image: string
  eyebrow?: ReactNode
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHero({
  title,
  description,
  image,
  eyebrow,
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[min(34rem,65svh)] items-end overflow-hidden bg-foreground text-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_88%,transparent)_0%,color-mix(in_oklab,var(--foreground)_58%,transparent)_60%,color-mix(in_oklab,var(--foreground)_35%,transparent)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-foreground/80 to-transparent"
      />

      <Reveal className="mx-auto w-full max-w-7xl px-4 pb-12 pt-36 sm:px-6 sm:pb-16 sm:pt-40 lg:px-8 lg:pb-20 lg:pt-44">
        {breadcrumbs.length > 0 ? (
          <Reveal className="mb-8" delay={0.05}>
            <Breadcrumb>
            <BreadcrumbList className="text-background/65">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-background">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((breadcrumb) => (
                <span key={breadcrumb.href} className="contents">
                  <BreadcrumbSeparator className="text-background/50" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={breadcrumb.href}
                      className="hover:text-background"
                    >
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </span>
              ))}
              <BreadcrumbSeparator className="text-background/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-background">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
          </Reveal>
        ) : null}

        {eyebrow ? (
          <Reveal delay={0.1}>
            <Eyebrow className="text-background/70">{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.16}>
          <Heading level={1} variant="page" className="mt-3 max-w-3xl sm:mt-4">
            {title}
          </Heading>
        </Reveal>
        <Reveal delay={0.24}>
          <Text variant="lead" className="mt-4 max-w-2xl text-background/75 sm:mt-5">
            {description}
          </Text>
        </Reveal>
      </Reveal>
    </section>
  )
}
