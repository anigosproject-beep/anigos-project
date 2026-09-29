"use client"

import { useEffect, useState } from "react"

import type { CareerOpening } from "@/lib/careers-data"
import type { Locale } from "@/lib/i18n"

function isCareerOpening(value: unknown): value is CareerOpening {
  if (typeof value !== "object" || value === null) return false

  const opening = value as Record<string, unknown>
  return (
    typeof opening.slug === "string" &&
    typeof opening.title === "string" &&
    typeof opening.department === "string" &&
    typeof opening.location === "string" &&
    typeof opening.type === "string" &&
    typeof opening.summary === "string" &&
    Array.isArray(opening.responsibilities) &&
    opening.responsibilities.every(
      (responsibility) => typeof responsibility === "string"
    )
  )
}

export function useCareerOpenings(locale: Locale) {
  const [openings, setOpenings] = useState<CareerOpening[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadOpenings() {
      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(`/api/careers?lang=${locale}`, {
          signal: controller.signal,
          cache: "no-store",
        })
        const payload: unknown = await response.json()
        const openings =
          typeof payload === "object" &&
          payload !== null &&
          "openings" in payload &&
          Array.isArray(payload.openings)
            ? payload.openings
            : null

        if (!response.ok || !openings || !openings.every(isCareerOpening)) {
          throw new Error("Lowongan karir tidak dapat dimuat.")
        }

        setOpenings(openings)
      } catch (loadError) {
        if (controller.signal.aborted) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Lowongan karir tidak dapat dimuat."
        )
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadOpenings()

    return () => controller.abort()
  }, [locale])

  return { openings, isLoading, error }
}
