"use client"

import Image from "next/image"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

export function CareerRecruitmentDisclaimer() {
  const { locale } = useLocale()
  const [open, setOpen] = useState(true)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="gap-5 p-7">
        <AlertDialogHeader className="place-items-center text-center">
          <Image
            src="/logo/petro%20anigos.svg"
            alt="PT. Anigos Jaya Perkasa"
            width={176}
            height={56}
            priority
            className="h-14 w-44 object-contain"
          />
          <span className="mt-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-300">
            {translate(locale, "recruitmentWarningLabel")}
          </span>
          <AlertDialogTitle className="text-xl">
            {translate(locale, "recruitmentWarningTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {translate(locale, "recruitmentWarningDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center text-sm font-semibold leading-6 text-foreground">
          {translate(locale, "recruitmentFeeDisclaimer")}
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">
            {translate(locale, "recruitmentWarningAcknowledge")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
