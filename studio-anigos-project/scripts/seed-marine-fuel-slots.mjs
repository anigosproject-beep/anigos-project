import { createClient } from "@sanity/client"

const expectedTarget = { projectId: "6zvti7ob", dataset: "production" }
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? expectedTarget.projectId
const dataset = process.env.SANITY_STUDIO_DATASET ?? expectedTarget.dataset
const apply = process.argv.includes("--apply")
const documentId = "pageMediaEditor"

const marineFuelSlots = {
  homeSlots: [
    {
      _key: "home-marine-fuel-background",
      slotId: "home-marine-fuel-background",
      pagePath: "/",
      sectionName: "Marine Fuel",
      mediaType: "image",
      containerRatio: "Latar full-bleed; tinggi 100svh; crop responsif",
      fit: "cover",
      recommendedRatio: "16:9 disarankan; crop responsif",
      currentSource:
        "Unggah gambar di slot ini untuk mengganti latar cadangan Marine Fuel.",
    },
    {
      _key: "home-marine-fuel-video",
      slotId: "home-marine-fuel-video",
      pagePath: "/",
      sectionName: "Marine Fuel",
      mediaType: "video",
      containerRatio: "Pemutar video responsif 16:9",
      fit: "cover",
      recommendedRatio: "16:9 disarankan",
      currentSource:
        "Unggah video di slot ini untuk ditampilkan di pemutar Marine Fuel.",
    },
  ],
  productsSlots: [
    {
      _key: "product-marine-fuel-background",
      slotId: "product-marine-fuel-background",
      pagePath: "/produk/kenali-produk",
      sectionName: "Marine Fuel",
      mediaType: "image",
      containerRatio: "Latar full-bleed; tinggi 100svh; crop responsif",
      fit: "cover",
      recommendedRatio: "16:9 disarankan; crop responsif",
      currentSource:
        "Unggah gambar di slot ini untuk mengganti latar cadangan Marine Fuel.",
    },
    {
      _key: "product-marine-fuel-video",
      slotId: "product-marine-fuel-video",
      pagePath: "/produk/kenali-produk",
      sectionName: "Marine Fuel",
      mediaType: "video",
      containerRatio: "Pemutar video responsif 16:9",
      fit: "cover",
      recommendedRatio: "16:9 disarankan",
      currentSource:
        "Unggah video di slot ini untuk ditampilkan di pemutar Marine Fuel.",
    },
  ],
}

if (projectId !== expectedTarget.projectId || dataset !== expectedTarget.dataset) {
  throw new Error(
    `Target ditolak. Script ini dikunci ke ${expectedTarget.projectId}/${expectedTarget.dataset}, bukan ${projectId}/${dataset}.`
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

const existingDocumentQuery = `*[_id == $documentId][0]{
  _id,
  _rev,
  homeSlots[]{_key, slotId, pagePath, sectionName, mediaType, containerRatio, fit, recommendedRatio, currentSource},
  productsSlots[]{_key, slotId, pagePath, sectionName, mediaType, containerRatio, fit, recommendedRatio, currentSource}
}`

function findMissingSlots(existingSlots, desiredSlots, fieldName) {
  const currentSlots = Array.isArray(existingSlots) ? existingSlots : []
  const missing = []

  for (const desired of desiredSlots) {
    const existing = currentSlots.find((slot) => slot.slotId === desired.slotId)
    if (!existing) {
      missing.push(desired)
      continue
    }

    const conflictingFields = Object.keys(desired).filter(
      (key) =>
        key !== "_key" &&
        key !== "currentSource" &&
        existing[key] !== desired[key]
    )
    if (conflictingFields.length > 0) {
      throw new Error(
        `Conflict pada ${fieldName}.${desired.slotId}: metadata berbeda (${conflictingFields.join(", ")}). Tidak ada perubahan yang ditulis.`
      )
    }
  }

  return missing
}

for (let attempt = 1; attempt <= 3; attempt += 1) {
  const document = await client.fetch(existingDocumentQuery, { documentId })
  const missingByField = {
    homeSlots: findMissingSlots(
      document?.homeSlots,
      marineFuelSlots.homeSlots,
      "homeSlots"
    ),
    productsSlots: findMissingSlots(
      document?.productsSlots,
      marineFuelSlots.productsSlots,
      "productsSlots"
    ),
  }
  const missingCount =
    missingByField.homeSlots.length + missingByField.productsSlots.length

  console.log(
    JSON.stringify(
      {
        mode: apply ? "apply" : "dry-run",
        target: `${projectId}/${dataset}`,
        documentId,
        documentExists: Boolean(document),
        missing: Object.fromEntries(
          Object.entries(missingByField).map(([field, slots]) => [
            field,
            slots.map(({ slotId }) => slotId),
          ])
        ),
        missingCount,
      },
      null,
      2
    )
  )

  if (!apply || missingCount === 0) break

  if (!document) {
    await client.createIfNotExists({
      _id: documentId,
      _type: "pageMediaEditor",
      selection: { menu: "", page: "" },
      ...missingByField,
    })
    continue
  }

  try {
    const patch = client.patch(documentId).ifRevisionId(document._rev)
    if (missingByField.homeSlots.length > 0) {
      if (Array.isArray(document.homeSlots)) {
        patch.append("homeSlots", missingByField.homeSlots)
      } else {
        patch.set({ homeSlots: missingByField.homeSlots })
      }
    }
    if (missingByField.productsSlots.length > 0) {
      if (Array.isArray(document.productsSlots)) {
        patch.append("productsSlots", missingByField.productsSlots)
      } else {
        patch.set({ productsSlots: missingByField.productsSlots })
      }
    }
    await patch.commit()
    continue
  } catch (error) {
    if (error?.statusCode !== 409 || attempt === 3) throw error
  }
}

if (apply) {
  const finalDocument = await client.fetch(existingDocumentQuery, { documentId })
  const remaining =
    findMissingSlots(
      finalDocument?.homeSlots,
      marineFuelSlots.homeSlots,
      "homeSlots"
    ).length +
    findMissingSlots(
      finalDocument?.productsSlots,
      marineFuelSlots.productsSlots,
      "productsSlots"
    ).length

  if (remaining > 0) {
    throw new Error(
      `Verifikasi seed gagal: masih ada ${remaining} slot yang belum tersedia.`
    )
  }

  console.log("Seed Marine Fuel terverifikasi.")
}
