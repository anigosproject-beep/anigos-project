"use client"

import { PageHero } from "@/components/sections/page-hero"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

export function TranslatedPageHero({
  eyebrowKey,
  titleKey,
  descriptionKey,
  image,
  pageKey,
  breadcrumbKey,
  breadcrumbHref,
}: {
  eyebrowKey: TranslationKey
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  image: string
  pageKey: string
  breadcrumbKey: TranslationKey
  breadcrumbHref: string
}) {
  const { locale } = useLocale()
  return (
    <PageHero
      eyebrow={translate(locale, eyebrowKey)}
      title={translate(locale, titleKey)}
      description={translate(locale, descriptionKey)}
      image={image}
      pageKey={pageKey}
      breadcrumbs={[
        { label: translate(locale, breadcrumbKey), href: breadcrumbHref },
      ]}
    />
  )
}
