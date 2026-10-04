import { createClient } from "@sanity/client"

const expectedTarget = { projectId: "6zvti7ob", dataset: "production" }
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? expectedTarget.projectId
const dataset = process.env.SANITY_STUDIO_DATASET ?? expectedTarget.dataset
const apply = process.argv.includes("--apply")
const mediaDocumentTypes = [
  "homePage",
  "pageHeroEditor",
  "pageMediaEditor",
  "mediaAsset",
  "partner",
  "client",
  "newsroomArticle",
  "article",
  "teamMember",
  "product",
  "fleetOption",
  "jangkauanPage",
  "coverageArea",
]

if (
  projectId !== expectedTarget.projectId ||
  dataset !== expectedTarget.dataset
) {
  throw new Error(
    `Target ditolak. Script ini dikunci ke ${expectedTarget.projectId}/${expectedTarget.dataset}.`
  )
}

if (
  apply &&
  (!process.env.SANITY_STUDIO_PROJECT_ID ||
    !process.env.SANITY_STUDIO_DATASET ||
    !process.env.SANITY_AUTH_TOKEN)
) {
  throw new Error(
    "Mode --apply memerlukan SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, dan SANITY_AUTH_TOKEN yang ditetapkan secara eksplisit."
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-13",
  useCdn: false,
  token: apply ? process.env.SANITY_AUTH_TOKEN : undefined,
})

const documents = await client.fetch(
  `*[_type in $types && !(_id in path("drafts.**"))]`,
  { types: mediaDocumentTypes }
)

let changedDocuments = 0
let convertedFields = 0

for (const document of documents) {
  const updates = collectLegacyMediaText(document)
  const fields = Object.keys(updates)
  if (fields.length === 0) continue

  changedDocuments += 1
  convertedFields += fields.length
  if (apply) {
    await client
      .patch(document._id)
      .ifRevisionId(document._rev)
      .set(updates)
      .commit()
  }
}

console.log(
  `${apply ? "Migrated" : "Dry run"}: ${changedDocuments} documents, ${convertedFields} Indonesian media-text fields.`
)
if (!apply) {
  console.log(
    "No documents were changed. Re-run with --apply to wrap legacy strings as { id }; the Sanity webhook fills English."
  )
}

function collectLegacyMediaText(document) {
  const updates = {}

  function visit(value, path, parentKey) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const key =
          item &&
          typeof item === "object" &&
          typeof item._key === "string"
            ? `[_key=="${escapePathKey(item._key)}"]`
            : `[${index}]`
        visit(item, `${path}${key}`, parentKey)
      })
      return
    }

    if (!isRecord(value)) return

    for (const [key, child] of Object.entries(value)) {
      if (key.startsWith("_")) continue
      const childPath = path ? `${path}.${key}` : key
      const mediaAlt =
        key === "alt" &&
        ["image", "photo", "videoPoster", "artwork", "thumbnail"].includes(
          parentKey
        )
      const visibleCaption = key === "caption" || key === "flipTitle"
      const homeProductCopy =
        ["name", "description"].includes(key) &&
        typeof value.slotId === "string" &&
        /^home-product-logo-\d+$/.test(value.slotId)

      if (
        (mediaAlt || visibleCaption || homeProductCopy) &&
        typeof child === "string" &&
        child.trim()
      ) {
        updates[childPath] = { id: child }
      } else {
        visit(child, childPath, key)
      }
    }
  }

  visit(document, "", "")
  return updates
}

function escapePathKey(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
