"use client"

import { PageHero } from "@/components/sections"
import { CareerApplicationForm } from "@/components/career-application-form"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import type { CareerOpening } from "@/lib/careers-data"
import { useCareerOpenings } from "@/components/use-career-openings"

export function CareerApplicationShell({
  openings,
  selectedOpening,
}: {
  openings: CareerOpening[]
  selectedOpening?: string
}) {
  const { locale } = useLocale()
  const {
    openings: currentOpenings,
    isLoading,
    error,
  } = useCareerOpenings(locale)
  const availableOpenings = isLoading ? openings : currentOpenings

  return (
    <>
      <PageHero
        eyebrow={translate(locale, "careersFormEyebrow")}
        title={translate(locale, "careersFormTitle")}
        description={translate(locale, "careersFormDescription")}
        image="/images/page-hero/tentang-kami.webp"
        pageKey="lamar-karir"
        breadcrumbs={[
          {
            label: translate(locale, "about"),
            href: "/tentang-kami/profil-perusahaan",
          },
          {
            label: translate(locale, "careersEyebrow"),
            href: "/tentang-kami/karir",
          },
        ]}
      />
      <section className="bg-muted/40 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {error && (
            <p role="alert" className="mb-4 text-sm text-destructive">
              {error}
            </p>
          )}
          <CareerApplicationForm
            openings={availableOpenings}
            selectedOpening={selectedOpening}
          />
        </div>
      </section>
    </>
  )
}
