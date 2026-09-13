import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wm8u3z2o"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-13",
  useCdn: true,
  perspective: "published",
})

export const sanityImageUrl = (source: { asset?: { _ref?: string } } | null | undefined) => {
  const assetRef = source?.asset?._ref
  if (!assetRef) return undefined

  const [, id, dimensions, format] = assetRef.split("-")
  if (!id || !dimensions || !format) return undefined

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
