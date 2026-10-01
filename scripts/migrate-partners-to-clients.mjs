import { existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { createClient } from "@sanity/client"

const directory = dirname(fileURLToPath(import.meta.url))
const envFile = resolve(directory, "..", ".env.local")

if (existsSync(envFile)) process.loadEnvFile(envFile)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6zvti7ob"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const apiVersion = "2026-09-13"
const sourceQuery = `*[
  _type == "partner" &&
  isActive == true &&
  defined(companyName) &&
  defined(logo.asset._ref)
] | order(companyName asc){
  _id,
  companyName,
  isActive,
  partnerSince,
  partnershipType,
  logo{_type, asset{_ref}, alt, hotspot, crop},
  gallery[]{
    _key,
    caption,
    image{_type, asset{_ref}, alt, hotspot, crop}
  }
}`
const isApply = process.argv.includes("--apply")

const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const token = process.env.SANITY_AUTH_TOKEN
if (isApply && !token) {
  throw new Error("SANITY_AUTH_TOKEN is required to write the migration.")
}

const writeClient = token
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  : null

const sourcePartners = await readClient.fetch(sourceQuery)
const candidates = sourcePartners.flatMap((partner) => {
  const partnerId = partner._id
  const migratedId = `client-migrated-${partnerId}`
  const sourceService = partner.partnershipType?.toLowerCase() ?? ""
  const serviceYear = Number.parseInt(partner.partnerSince?.slice(0, 4) ?? "", 10)
  const services = sourceService.includes("solar industri")
    ? [
        {
          _key: "solar-hsd",
          _type: "clientService",
          serviceType: "solar-hsd",
        },
      ]
    : []

  if (!partner.logo?.asset?._ref) return []
  if (!services.length) {
    console.warn(
      `Skipping ${partner._id} (${partner.companyName}): service type cannot be safely inferred.`
    )
    return []
  }

  const gallery = (partner.gallery ?? [])
    .filter((item) => item?.image?.asset?._ref)
    .map((item, index) => ({
      _key: item._key ?? `migrated-photo-${index + 1}`,
      _type: "clientGalleryItem",
      caption: item.caption,
      image: item.image,
    }))

  return [
    {
      _id: migratedId,
      _type: "client",
      sourcePartnerId: partnerId,
      companyName: partner.companyName,
      logo: partner.logo,
      ...(Number.isInteger(serviceYear) && serviceYear >= 1980
        ? { serviceYear }
        : {}),
      isActive: true,
      services,
      gallery,
    },
  ]
})

const ids = candidates.map(({ _id }) => _id)
const existingIds = ids.length
  ? await readClient.fetch("*[_id in $ids]._id", { ids })
  : []
const pending = candidates.filter(({ _id }) => !existingIds.includes(_id))

console.log(
  JSON.stringify(
    {
      mode: isApply ? "apply" : "dry-run",
      projectId,
      dataset,
      sourceCount: sourcePartners.length,
      candidateCount: candidates.length,
      existingCount: existingIds.length,
      pendingCount: pending.length,
      records: candidates.map(
        ({ _id, companyName, logo, serviceYear, services, gallery }) => ({
          id: _id,
          companyName,
          hasLogo: Boolean(logo?.asset?._ref),
          serviceYear: serviceYear ?? null,
          services: services.map(({ serviceType }) => serviceType),
          galleryCount: gallery.length,
          alreadyMigrated: existingIds.includes(_id),
        })
      ),
    },
    null,
    2
  )
)

if (!isApply || pending.length === 0) process.exit(0)

if (!writeClient) throw new Error("Sanity write client is not configured.")

const mutations = pending.map((document) => ({
  createIfNotExists: document,
}))

await writeClient.mutate(mutations)

const migrated = await readClient.fetch(
  '*[_id in $ids]{_id, companyName, "logoAsset": logo.asset._ref, "galleryCount": count(gallery[]), serviceYear, isActive}',
  { ids }
)

if (migrated.length !== candidates.length) {
  throw new Error(
    `Migration verification failed: expected ${candidates.length} documents, found ${migrated.length}.`
  )
}

console.log(
  JSON.stringify(
    {
      result: "verified",
      migratedCount: migrated.length,
      records: migrated.map((document) => ({
        id: document._id,
        companyName: document.companyName,
        hasLogo: Boolean(document.logoAsset),
        galleryCount: document.galleryCount,
        serviceYear: document.serviceYear ?? null,
        isActive: document.isActive,
      })),
    },
    null,
    2
  )
)
