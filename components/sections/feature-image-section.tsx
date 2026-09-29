import type { ReactNode } from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Eyebrow, Heading, Text } from "@/components/typography"
import { Reveal } from "@/components/motion"
import { MotionButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/layout/section-shell"

type FeatureImageAction = {
  label: string
  href: string
  variant?: "default" | "outline"
  style?: "button" | "text"
}

type FeatureImageSectionProps = {
  eyebrow?: ReactNode
  title: string
  description: string
  image: string
  imagePosition?: "center" | "left" | "right"
  primaryAction?: FeatureImageAction
  secondaryAction?: FeatureImageAction
  id?: string
  className?: string
}

function FeatureImageSection({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
  primaryAction,
  secondaryAction,
  id,
  className,
}: FeatureImageSectionProps) {
  const overlayActionSize = "h-9 gap-1.5 px-3 text-sm leading-5 has-data-[icon=inline-end]:pr-2.5"

  return (
    <section
      id={id}
      className={cn(
        "relative isolate min-h-[28rem] w-full overflow-hidden bg-foreground text-white md:min-h-[32rem] lg:min-h-[37.5rem]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-20 bg-cover bg-no-repeat",
          imagePosition === "center" && "bg-center",
          imagePosition === "left" && "bg-left",
          imagePosition === "right" && "bg-right"
        )}
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div
        aria-hidden="true"
        className="section-image-dynamic-overlay absolute inset-0 -z-10 backdrop-blur-[1px] bg-[linear-gradient(110deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.22)_42%,rgba(0,0,0,0.06)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-gradient-to-t from-black/62 via-black/24 to-transparent"
      />

      <SectionContainer className="flex min-h-[inherit] items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <Reveal delay={0.08}>
            {eyebrow ? (
              <Eyebrow className="!text-white/70">{eyebrow}</Eyebrow>
            ) : null}
            <Heading level={2} className="mt-4 text-white">
              {title}
            </Heading>
            <Text variant="lead" className="mt-5 !text-white/80">
              {description}
            </Text>
            {primaryAction || secondaryAction ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {primaryAction ? (
                  <MotionButtonLink
                    href={primaryAction.href}
                    variant="overlay"
                    className={`${overlayActionSize} w-full sm:w-auto`}
                  >
                    {primaryAction.label}
                    <ArrowRight data-icon="inline-end" />
                  </MotionButtonLink>
                ) : null}
                {secondaryAction ? (
                  secondaryAction.style === "text" ? (
                    <Link
                      href={secondaryAction.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium leading-5 text-white underline-offset-4 transition-colors hover:text-white/75 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    >
                      {secondaryAction.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  ) : (
                    <MotionButtonLink
                      href={secondaryAction.href}
                      variant="overlay"
                      className={`${overlayActionSize} w-full sm:w-auto`}
                    >
                      {secondaryAction.label}
                      <ArrowRight data-icon="inline-end" />
                    </MotionButtonLink>
                  )
                ) : null}
              </div>
            ) : null}
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  )
}

export { FeatureImageSection }
