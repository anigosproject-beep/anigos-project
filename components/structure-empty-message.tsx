"use client"

import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

export function StructureEmptyMessage({
  messageKey,
}: {
  messageKey: Extract<
    TranslationKey,
    | "structureNoCommissioners"
    | "structureNoDirectors"
    | "structureNoDivisions"
    | "structureNoDivisionMembers"
  >
}) {
  const { locale } = useLocale()

  return (
    <p className="text-sm leading-6 text-muted-foreground">
      {translate(locale, messageKey)}
    </p>
  )
}
