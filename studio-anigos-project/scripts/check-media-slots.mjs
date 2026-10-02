import { createClient } from "@sanity/client"
import { readFile } from "node:fs/promises"
import ts from "typescript"

function compileRegistry(source, sharedContractsUrl) {
  const normalizedSource = source.replace(
    '"../../shared/sanity-content-contracts"',
    JSON.stringify(sharedContractsUrl)
  )
  const compiledSource = ts.transpileModule(normalizedSource, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText

  return `data:text/javascript;base64,${Buffer.from(compiledSource).toString("base64")}`
}

const sharedContractsSource = await readFile(
  new URL("../../shared/sanity-content-contracts.ts", import.meta.url),
  "utf8"
)
const sharedContractsUrl = compileRegistry(sharedContractsSource)
const [pageMediaRegistryUrl, pageHeroRegistryUrl] = await Promise.all([
  readFile(new URL("../sanity/page-media-registry.ts", import.meta.url), "utf8")
    .then((source) => compileRegistry(source, sharedContractsUrl)),
  readFile(new URL("../sanity/page-hero-registry.ts", import.meta.url), "utf8")
    .then((source) => compileRegistry(source, sharedContractsUrl)),
])
const [{ pageMediaFieldNames, pageMediaMenus }, { pageHeroFieldName, pageHeroMenus }] =
  await Promise.all([
    import(pageMediaRegistryUrl),
    import(pageHeroRegistryUrl),
  ])

const expectedTarget = { projectId: "6zvti7ob", dataset: "production" }
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? expectedTarget.projectId
const dataset = process.env.SANITY_STUDIO_DATASET ?? expectedTarget.dataset
const apply = process.argv.includes("--apply")
const pageMediaDocumentId = "pageMediaEditor"
const pageHeroDocumentId = "pageHeroEditor"

if (projectId !== expectedTarget.projectId || dataset !== expectedTarget.dataset) {
  throw new Error(
    `Target ditolak. Script dikunci ke ${expectedTarget.projectId}/${expectedTarget.dataset}, bukan ${projectId}/${dataset}.`
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

if (
  apply &&
  process.env.SANITY_MEDIA_SLOTS_CONFIRM_TARGET !== `${projectId}/${dataset}`
) {
  throw new Error(
    `Mode --apply memerlukan SANITY_MEDIA_SLOTS_CONFIRM_TARGET=${projectId}/${dataset} sebagai konfirmasi target eksplisit.`
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-13",
  useCdn: false,
  token: apply ? process.env.SANITY_AUTH_TOKEN : undefined,
})

const slotDefinitions = pageMediaMenus.flatMap((menu) =>
  menu.pages.map((page) => ({
    fieldName: pageMediaFieldNames[page.value],
    page: page.title,
    path: page.path,
    slots: page.slots,
  }))
)

const heroDefinitions = pageHeroMenus.flatMap((menu) =>
  menu.pages.map((page) => ({
    fieldName: pageHeroFieldName(page.value),
    page: page.title,
    value: {
      pageKey: page.pageKey,
      pagePath: page.path,
      pageName: page.pageName,
      title: page.heading,
      subtitle: page.subtitle,
      currentSource: page.currentSource,
    },
  }))
)

const pageMediaQuery = `*[_type == "pageMediaEditor" && _id == $documentId][0]{
  _id,
  _rev,
  selection,
  homeSlots[],
  companyProfileSlots[],
  aspirationsSlots[],
  partnershipSlots[],
  productsSlots[],
  coverageSlots[]
}`
const pageHeroProjection = heroDefinitions
  .map(({ fieldName }) => `${fieldName}{pageKey}`)
  .join(",")
const pageHeroQuery = `*[_type == "pageHeroEditor" && _id == $documentId][0]{
  _id,
  _rev,
  selection,
  ${pageHeroProjection}
}`

function inspectSlots(document, definitions, kind) {
  const missingByField = {}
  const issues = []
  const newFields = {}

  for (const definition of definitions) {
    if (kind === "object") {
      const existingSlot = document?.[definition.fieldName]
      if (existingSlot && existingSlot.pageKey !== definition.value.pageKey) {
        issues.push({
          field: definition.fieldName,
          type: "conflicting-page-key",
          expected: definition.value.pageKey,
          actual: existingSlot.pageKey ?? null,
        })
      } else if (!existingSlot) {
        missingByField[definition.fieldName] = [definition]
        newFields[definition.fieldName] = definition.value
      }
      continue
    }

    const existingSlots = Array.isArray(document?.[definition.fieldName])
      ? document[definition.fieldName]
      : []
    const existingIds = existingSlots.map((slot) => slot?.slotId).filter(Boolean)
    const duplicates = [
      ...new Set(
        existingIds.filter(
          (slotId, index) => existingIds.indexOf(slotId) !== index
        )
      ),
    ]
    const expectedIds = definition.slots.map((slot) => slot.id)
    const unexpected = [
      ...new Set(existingIds.filter((slotId) => !expectedIds.includes(slotId))),
    ]

    if (duplicates.length > 0) {
      issues.push({
        field: definition.fieldName,
        type: "duplicate",
        slotIds: duplicates,
      })
    }
    if (unexpected.length > 0) {
      issues.push({
        field: definition.fieldName,
        type: "unregistered",
        slotIds: unexpected,
      })
    }

    const missing = definition.slots.filter(
      (slot) => !existingIds.includes(slot.id)
    )
    if (missing.length === 0) continue

    missingByField[definition.fieldName] = missing
    newFields[definition.fieldName] = missing.map((slot) => ({
      _key: slot.id,
      slotId: slot.id,
      pagePath: definition.path,
      sectionName: slot.sectionName,
      mediaType: slot.mediaType,
      containerRatio: slot.container,
      fit: slot.fit,
      recommendedRatio: slot.expectedRatio,
      currentSource: slot.currentSource,
    }))
  }

  return { missingByField, issues, newFields }
}

const pageMediaDocument = await client.fetch(pageMediaQuery, {
  documentId: pageMediaDocumentId,
})
const pageHeroDocument = await client.fetch(pageHeroQuery, {
  documentId: pageHeroDocumentId,
})
let pageMediaAudit = inspectSlots(pageMediaDocument, slotDefinitions, "array")
let pageHeroAudit = inspectSlots(pageHeroDocument, heroDefinitions, "object")
const missingCount = [
  ...Object.values(pageMediaAudit.missingByField),
  ...Object.values(pageHeroAudit.missingByField),
].reduce(
  (count, slots) => count + slots.length,
  0
)

console.log(
  JSON.stringify(
    {
      mode: apply ? "apply" : "dry-run",
      target: `${projectId}/${dataset}`,
      registries: {
        pageMedia: {
          documentId: pageMediaDocumentId,
          documentExists: Boolean(pageMediaDocument),
          slotCount: slotDefinitions.reduce(
            (count, definition) => count + definition.slots.length,
            0
          ),
          missingByField: Object.fromEntries(
            Object.entries(pageMediaAudit.missingByField).map(
              ([field, slots]) => [
                field,
                slots.map((slot) => slot.id),
              ]
            )
          ),
          issues: pageMediaAudit.issues,
        },
        pageHero: {
          documentId: pageHeroDocumentId,
          documentExists: Boolean(pageHeroDocument),
          slotCount: heroDefinitions.length,
          missingSlots: Object.keys(pageHeroAudit.missingByField),
          issues: pageHeroAudit.issues,
        },
      },
      issues: [...pageMediaAudit.issues, ...pageHeroAudit.issues],
      missingCount,
    },
    null,
    2
  )
)

const issueCount =
  pageMediaAudit.issues.length + pageHeroAudit.issues.length

if (!apply || (missingCount === 0 && issueCount === 0)) {
  if (apply) console.log("Semua slot media terdaftar dan tidak ada duplikasi.")
} else if (
  issueCount > 0
) {
  throw new Error(
    "Perbaikan otomatis dibatalkan karena ditemukan slot yang konflik. Tinjau dokumen terlebih dahulu."
  )
} else {
  for (const [doc, id, type, audit] of [
    [
      pageMediaDocument,
      pageMediaDocumentId,
      "pageMediaEditor",
      pageMediaAudit,
    ],
    [pageHeroDocument, pageHeroDocumentId, "pageHeroEditor", pageHeroAudit],
  ]) {
    const fields = audit.newFields
    if (Object.keys(fields).length === 0) continue

    if (!doc) {
      await client.createIfNotExists({
        _id: id,
        _type: type,
        selection: { menu: "", page: "" },
        ...Object.fromEntries(
          Object.entries(fields).map(([fieldName, value]) => [
            fieldName,
            value,
          ])
        ),
      })
      continue
    }

    const patch = client.patch(id).ifRevisionId(doc._rev)
    for (const [fieldName, value] of Object.entries(fields)) {
      if (type === "pageMediaEditor" && Array.isArray(doc[fieldName])) {
        patch.append(fieldName, value)
      } else {
        patch.set({ [fieldName]: value })
      }
    }
    await patch.commit()
  }
}

if (apply) {
  const [repairedMediaDocument, repairedHeroDocument] = await Promise.all([
    client.fetch(pageMediaQuery, { documentId: pageMediaDocumentId }),
    client.fetch(pageHeroQuery, { documentId: pageHeroDocumentId }),
  ])
  pageMediaAudit = inspectSlots(repairedMediaDocument, slotDefinitions, "array")
  pageHeroAudit = inspectSlots(repairedHeroDocument, heroDefinitions, "object")
  const remainingCount = [
    ...Object.values(pageMediaAudit.missingByField),
    ...Object.values(pageHeroAudit.missingByField),
  ].reduce((count, slots) => count + slots.length, 0)

  if (
    remainingCount > 0 ||
    pageMediaAudit.issues.length > 0 ||
    pageHeroAudit.issues.length > 0
  ) {
    throw new Error(
      `Verifikasi gagal: ${remainingCount} slot hilang dan ${pageMediaAudit.issues.length + pageHeroAudit.issues.length} konflik setelah perbaikan.`
    )
  }

  console.log("Semua slot media terdaftar berhasil diverifikasi.")
}
