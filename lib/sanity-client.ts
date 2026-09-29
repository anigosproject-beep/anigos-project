import { createClient } from "@sanity/client"
import { draftMode } from "next/headers"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6zvti7ob"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

const clientConfig = {
  projectId,
  dataset,
  apiVersion: "2026-09-13",
  useCdn: false,
  fetch: {cache: "no-store" as const},
} as const

export const sanityClient = createClient({...clientConfig, perspective: "published"})

export const sanityDraftClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_AUTH_TOKEN,
  perspective: "drafts",
})

export async function getSanityClientForCurrentMode() {
  const {isEnabled} = await draftMode()
  return isEnabled ? sanityDraftClient : sanityClient
}

export const sanityImageUrl = (source: { asset?: { _ref?: string } } | null | undefined) => {
  const assetRef = source?.asset?._ref
  if (!assetRef) return undefined

  const [, id, dimensions, format] = assetRef.split("-")
  if (!id || !dimensions || !format) return undefined

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
