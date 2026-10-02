"use client"

import { PageHero } from "@/components/sections"
import { CareerApplicationForm } from "@/components/career-application-form"
import { BriefcaseBusiness } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"
import { useCareerOpenings } from "@/components/use-career-openings"

export function CareerApplicationShell({
  selectedOpening,
}: {
  selectedOpening?: string
}) {
  const { locale } = useLocale()
  const {
    openings: currentOpenings,
    isLoading,
    error,
  } = useCareerOpenings(locale)
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
          {isLoading ? (
            <p role="status" className="text-sm text-muted-foreground">
              {translate(locale, "careerOpeningsLoading")}
            </p>
          ) : error ? (
            <p role="alert" className="text-sm text-destructive">
              {translate(locale, "careerOpeningsLoadError")}
            </p>
          ) : currentOpenings.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background p-8 text-center sm:p-12">
              <BriefcaseBusiness className="mx-auto size-10 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">
                {translate(locale, "noCareerOpenings")}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {translate(locale, "noCareerOpeningsDescription")}
              </p>
            </div>
          ) : (
            <CareerApplicationForm
              openings={currentOpenings}
              selectedOpening={selectedOpening}
            />
          )}
        </div>
      </section>
    </>
  )
}
