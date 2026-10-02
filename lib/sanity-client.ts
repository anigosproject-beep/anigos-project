import { createClient } from "@sanity/client"
import { draftMode } from "next/headers"
import { assertSanityTarget, sanityTarget } from "@/shared/sanity-target"

assertSanityTarget(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_DATASET
)
const { projectId, dataset } = sanityTarget

const clientConfig = {
  projectId,
  dataset,
  apiVersion: "2026-09-13",
  useCdn: false,
  fetch: {cache: "no-store" as const},
} as const

const availabilityClientConfig = {
  ...clientConfig,
  timeout: 5000,
  maxRetries: 0,
} as const

export const sanityClient = createClient({...clientConfig, perspective: "published"})
export const sanityAvailabilityClient = createClient({
  ...availabilityClientConfig,
  perspective: "published",
})

export const sanityDraftClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_AUTH_TOKEN,
  perspective: "drafts",
})
export const sanityAvailabilityDraftClient = createClient({
  ...availabilityClientConfig,
  token: process.env.SANITY_AUTH_TOKEN,
  perspective: "drafts",
})

export async function getSanityClientForCurrentMode() {
  const {isEnabled} = await draftMode()
  return isEnabled ? sanityDraftClient : sanityClient
}

export async function getSanityAvailabilityClientForCurrentMode() {
  const {isEnabled} = await draftMode()
  return isEnabled
    ? sanityAvailabilityDraftClient
    : sanityAvailabilityClient
}

export function isSanityAvailabilityError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  if (error.name === "TimeoutError" || error.name === "AbortError") return true
  if (error instanceof TypeError && error.message === "fetch failed") return true

  const cause = error.cause
  if (cause instanceof Error) {
    return (
      cause.name === "TimeoutError" ||
      cause.name === "AbortError" ||
      "code" in cause &&
        typeof cause.code === "string" &&
        (cause.code.startsWith("UND_ERR_") ||
          cause.code.startsWith("ECONN"))
    )
  }

  return false
}

export const sanityImageUrl = (source: { asset?: { _ref?: string } } | null | undefined) => {
  const assetRef = source?.asset?._ref
  if (!assetRef) return undefined

  const [, id, dimensions, format] = assetRef.split("-")
  if (!id || !dimensions || !format) return undefined

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
