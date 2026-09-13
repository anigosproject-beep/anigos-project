"use client"

import Image from "next/image"

import { localeLabels } from "@/lib/i18n"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Locale = "id" | "en"

const flagSources: Record<Locale, string> = {
  id: "/flag-ico/id.svg",
  en: "/flag-ico/gb.svg",
}

export function HeaderLanguageSelect({
  locale,
  setLocale,
  label,
  variant = "active",
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  label: string
  variant?: "idle" | "active"
}) {
  const isIdle = variant === "idle"

  return (
    <div className="header-language-select">
      <Select
        value={locale}
        onValueChange={(value) => {
          if (value === "id" || value === "en") {
            setLocale(value)
          }
        }}
      >
        <SelectTrigger
          size="sm"
          aria-label={label}
          className={`h-9 rounded-2xl px-2.5 text-xs font-semibold shadow-none focus-visible:ring-2 ${
            isIdle
              ? "border-background/20 bg-background/10 text-background hover:bg-background/15 focus-visible:border-background/40 focus-visible:ring-background/30 [&_svg]:text-background/70"
              : "border-border/70 bg-muted/50 text-foreground hover:bg-muted focus-visible:border-primary/40 focus-visible:ring-primary/20 [&_svg]:text-muted-foreground"
          }`}
        >
          <SelectValue>
            <LanguageOption locale={locale} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-32 rounded-2xl border-border/70 p-1.5">
          <SelectItem
            value="id"
            className="rounded-xl px-3 py-2.5"
          >
            <LanguageOption locale="id" />
          </SelectItem>
          <SelectItem
            value="en"
            className="rounded-xl px-3 py-2.5"
          >
            <LanguageOption locale="en" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function LanguageOption({ locale }: { locale: Locale }) {
  return (
    <>
      <Image
        src={flagSources[locale]}
        alt=""
        width={20}
        height={15}
        className="size-5 rounded-sm object-cover"
        aria-hidden="true"
      />
      <span>{localeLabels[locale]}</span>
    </>
  )
}
