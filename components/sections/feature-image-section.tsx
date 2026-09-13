import Link from "next/link"
import type { ReactNode } from "react"

import { ArrowRight } from "lucide-react"

import { Eyebrow, Heading, Text } from "@/components/typography"
import { Reveal } from "@/components/motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FeatureImageAction = {
  label: string
  href: string
  variant?: "default" | "outline"
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
  return (
    <section
      id={id}
      className={cn(
        "relative isolate min-h-[28rem] w-full overflow-hidden bg-foreground text-background md:min-h-[32rem] lg:min-h-[37.5rem]",
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_90%,transparent)_0%,color-mix(in_oklab,var(--foreground)_62%,transparent)_52%,color-mix(in_oklab,var(--foreground)_28%,transparent)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-foreground/75 to-transparent"
      />

      <div className="mx-auto flex min-h-[inherit] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Reveal className="max-w-2xl" delay={0.08}>
          {eyebrow ? (
            <Eyebrow className="text-background/70">{eyebrow}</Eyebrow>
          ) : null}
          <Heading level={2} className="mt-4 text-background">
            {title}
          </Heading>
          <Text variant="lead" className="mt-5 text-background/80">
            {description}
          </Text>
          {primaryAction || secondaryAction ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryAction ? (
                <Link
                  href={primaryAction.href}
                  className={buttonVariants({
                    variant: primaryAction.variant ?? "default",
                    className:
                      "w-full bg-background text-foreground hover:bg-background/90 sm:w-auto",
                  })}
                >
                  {primaryAction.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              ) : null}
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className={buttonVariants({
                    variant: secondaryAction.variant ?? "outline",
                    className:
                      "w-full border-background/35 bg-transparent text-background hover:bg-background/10 hover:text-background sm:w-auto",
                  })}
                >
                  {secondaryAction.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

export { FeatureImageSection }
