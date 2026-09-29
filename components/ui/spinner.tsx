"use client"

import { cn } from "cn"
import { Loader2Icon } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const { locale } = useLocale()
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label={translate(locale, "spinnerLabel")} className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
