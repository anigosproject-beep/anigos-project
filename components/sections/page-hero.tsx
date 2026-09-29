"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

import { Reveal } from "@/components/motion"
import { SectionContainer } from "@/components/layout/section-shell"
import { Eyebrow, Heading, Text } from "@/components/typography"
import { useLocale } from "@/components/locale-provider"
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
  pageKey?: string
  appearance?: "overlay" | "plain"
  eyebrow?: ReactNode
  breadcrumbs?: { label: string; href: string }[]
}

type SanityPageHero = {
  image?: string
  eyebrow?: string
  title?: string
  description?: string
} | null

type LoadedPageHero = {
  key: string
  content: SanityPageHero
}

export function PageHero({
  title,
  description,
  image,
  pageKey,
  appearance = "overlay",
  eyebrow,
  breadcrumbs = [],
}: PageHeroProps) {
  const { locale } = useLocale()
  const [loadedHero, setLoadedHero] = useState<LoadedPageHero | null>(null)
  const hasImageOverlay = appearance === "overlay"
  const requestKey = `${pageKey ?? ""}:${locale}`

  useEffect(() => {
    if (!pageKey || !hasImageOverlay) return

    const controller = new AbortController()
    void fetch(
      `/api/page-hero?page=${encodeURIComponent(pageKey)}&lang=${locale}`,
      {
        signal: controller.signal,
        cache: "no-store",
      },
    )
      .then((response) =>
        response.ok
          ? (response.json() as Promise<SanityPageHero>)
          : Promise.reject(new Error("Gagal memuat hero halaman."))
      )
      .then((content: SanityPageHero) =>
        setLoadedHero({key: requestKey, content}),
      )
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error(error)
      })
    return () => controller.abort()
  }, [hasImageOverlay, locale, pageKey, requestKey])

  const sanityHero =
    hasImageOverlay && loadedHero?.key === requestKey
      ? loadedHero.content
      : null
  const heroImage = sanityHero?.image || image
  const heroEyebrow = sanityHero?.eyebrow || eyebrow
  const heroTitle = sanityHero?.title || title
  const heroDescription = sanityHero?.description || description

  return (
    <section
      className={
        hasImageOverlay
          ? "relative isolate flex min-h-[min(34rem,65svh)] items-end overflow-hidden bg-foreground text-white"
          : "relative isolate flex items-end overflow-hidden border-b border-border bg-muted/40 text-foreground"
      }
    >
      {hasImageOverlay ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url("${heroImage}")`,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.16)_100%)] backdrop-blur-[1px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-[68%] bg-gradient-to-t from-black/72 via-black/34 to-transparent"
          />
        </>
      ) : null}

      <SectionContainer
        className={
          hasImageOverlay
            ? "px-4 pt-36 pb-12 sm:px-6 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20"
            : "px-4 py-24 sm:px-6 sm:py-28 lg:py-32"
        }
      >
        {breadcrumbs.length > 0 ? (
          <Reveal kind="body" className="mb-8" delay={0.05}>
            <Breadcrumb>
              <BreadcrumbList
                className={
                  hasImageOverlay ? "text-white/65" : "text-muted-foreground"
                }
              >
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className={
                      hasImageOverlay
                        ? "hover:text-white"
                        : "hover:text-foreground"
                    }
                  >
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((breadcrumb) => (
                  <span key={breadcrumb.href} className="contents">
                    <BreadcrumbSeparator className="text-white/50" />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className={
                          hasImageOverlay
                            ? "hover:text-white"
                            : "hover:text-foreground"
                        }
                      >
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </span>
                ))}
                <BreadcrumbSeparator
                  className={
                    hasImageOverlay ? "text-white/50" : "text-muted-foreground"
                  }
                />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={
                      hasImageOverlay ? "text-white" : "text-foreground"
                    }
                  >
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Reveal>
        ) : null}

        {heroEyebrow ? (
          <Reveal kind="eyebrow" delay={0.1}>
            <Eyebrow className={hasImageOverlay ? "!text-white/70" : undefined}>
              {heroEyebrow}
            </Eyebrow>
          </Reveal>
        ) : null}
        <Reveal kind="heading" delay={0.16}>
          <Heading level={1} variant="page" className="mt-3 max-w-3xl sm:mt-4">
            {heroTitle}
          </Heading>
        </Reveal>
        <Reveal kind="body" delay={0.24}>
          <Text
            variant="lead"
            className={
              hasImageOverlay
                ? "mt-4 max-w-2xl !text-white/75 sm:mt-5"
                : "mt-4 max-w-2xl text-muted-foreground sm:mt-5"
            }
          >
            {heroDescription}
          </Text>
        </Reveal>
      </SectionContainer>
    </section>
  )
}
