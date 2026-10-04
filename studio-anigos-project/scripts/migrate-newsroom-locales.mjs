import { createClient } from "@sanity/client"

const expectedTarget = { projectId: "6zvti7ob", dataset: "production" }
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? expectedTarget.projectId
const dataset = process.env.SANITY_STUDIO_DATASET ?? expectedTarget.dataset
const apply = process.argv.includes("--apply")

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
  `*[_type in ["newsroomArticle", "article", "newsroomCategory"]]{
    _id, _rev, _type, title, excerpt, readTime, content,
    name, description, subcategories
  }`
)

let changedDocuments = 0
let convertedFields = 0

for (const document of documents) {
  const updates = {}

  if (document._type === "newsroomArticle" || document._type === "article") {
    for (const field of ["title", "excerpt", "readTime"]) {
      if (typeof document[field] === "string") {
        updates[field] = { id: document[field] }
      }
    }

    if (Array.isArray(document.content)) {
      const content = document.content.map((block) => {
        if (!block || typeof block !== "object") return block

        let migratedBlock = block
        if (typeof block.text === "string") {
          migratedBlock = { ...migratedBlock, text: { id: block.text } }
        }
        if (Array.isArray(block.children)) {
          const children = block.children.map((child) =>
            typeof child?.text === "string"
              ? { ...child, text: { id: child.text } }
              : child
          )
          if (
            children.some((child, index) => child !== block.children[index])
          ) {
            migratedBlock = { ...migratedBlock, children }
          }
        }
        return migratedBlock
      })
      if (content.some((block, index) => block !== document.content[index])) {
        updates.content = content
      }
    }
  } else {
    if (typeof document.name === "string") {
      updates.name = { id: document.name }
    }
    if (typeof document.description === "string") {
      updates.description = { id: document.description }
    }
    if (Array.isArray(document.subcategories)) {
      const subcategories = document.subcategories.map((subcategory) =>
        typeof subcategory?.name === "string"
          ? { ...subcategory, name: { id: subcategory.name } }
          : subcategory
      )
      if (
        subcategories.some(
          (subcategory, index) => subcategory !== document.subcategories[index]
        )
      ) {
        updates.subcategories = subcategories
      }
    }
  }

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
  `${apply ? "Migrated" : "Dry run"}: ${changedDocuments} documents, ${convertedFields} top-level fields.`
)
if (!apply) {
  console.log(
    "No documents were changed. Re-run with --apply to write changes."
  )
}
