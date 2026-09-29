"use client"

import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

export function LocalizedText({ translationKey }: { translationKey: TranslationKey }) {
  const { locale } = useLocale()
  return translate(locale, translationKey)
}
