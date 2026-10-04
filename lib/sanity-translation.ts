import { createHash } from "node:crypto"
import type { SanityClient } from "@sanity/client"

import { translateTexts } from "./translation-handler"

const supportedDocumentTypes = new Set([
  "homePage",
  "pageHeroEditor",
  "pageMediaEditor",
  "mediaAsset",
  "careerOpening",
  "partner",
  "client",
  "partnership",
  "partnershipPage",
  "newsroomArticle",
  "article",
  "newsroomCategory",
  "teamMember",
  "product",
  "fleetOption",
  "jangkauanPage",
  "coverageArea",
])

const maxLocalizedFieldsPerDocument = 40
const maxMediaLocalizedFieldsPerDocument = 120
const maxArticleLocalizedFieldsPerDocument = 100
const maxCategoryLocalizedFieldsPerDocument = 80
const maxLocalizedTextLength = 5000
const localizedFieldKeys = new Set([
  "id",
  "en",
  "translationSourceHash",
  "translationTargetHash",
  "_type",
  "_key",
])

type SanityDocument = {
  _id: string
  _type: string
  _rev: string
  [key: string]: unknown
}

type LocalizedTextPath = {
  path: string
  source: string
  sourceHash: string
}

export type SanityDocumentTranslationResult = {
  translatedFields: number
  skippedFields: number
}

export function isSupportedTranslationDocumentType(
  value: unknown
): value is string {
  return typeof value === "string" && supportedDocumentTypes.has(value)
}

export async function translateSanityDocument(
  client: SanityClient,
  document: SanityDocument
): Promise<SanityDocumentTranslationResult> {
  if (!isSupportedTranslationDocumentType(document._type)) {
    throw new Error("Unsupported Sanity translation document type.")
  }

  let currentDocument = document

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const localizedFields: LocalizedTextPath[] = []
    collectLocalizedFields(currentDocument, "", localizedFields)
    const translatableFields = localizedFields.filter(
      ({ source }) => source.length <= maxLocalizedTextLength
    )
    const fieldLimit = getFieldLimit(currentDocument._type)

    if (translatableFields.length > fieldLimit) {
      throw new Error(
        `Sanity document exceeds the ${fieldLimit}-field translation limit.`
      )
    }

    const skippedFields = localizedFields.length - translatableFields.length
    if (translatableFields.length === 0) {
      return { translatedFields: 0, skippedFields }
    }

    const translations = await translateTexts(
      translatableFields.map(({ source }) => ({
        text: source,
        sourceLocale: "id",
        targetLocale: "en",
      }))
    )
    const updates: Record<string, string> = {}

    for (const [index, field] of translatableFields.entries()) {
      updates[`${field.path}.en`] = translations[index]
      updates[`${field.path}.translationSourceHash`] = field.sourceHash
      updates[`${field.path}.translationTargetHash`] = hashSource(
        translations[index]
      )
    }

    try {
      await client
        .patch(currentDocument._id)
        .ifRevisionId(currentDocument._rev)
        .set(updates)
        .commit()

      return {
        translatedFields: translatableFields.length,
        skippedFields,
      }
    } catch (error) {
      if (attempt > 0 || !isRevisionConflict(error)) throw error

      const latestDocument = await client.fetch<SanityDocument | null>(
        "*[_id == $id && _type == $type][0]",
        { id: currentDocument._id, type: currentDocument._type }
      )
      if (!latestDocument) throw error
      currentDocument = latestDocument
    }
  }

  throw new Error("Sanity document changed during translation.")
}

function collectLocalizedFields(
  value: unknown,
  path: string,
  fields: LocalizedTextPath[]
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const key =
        typeof item === "object" &&
        item !== null &&
        "_key" in item &&
        typeof item._key === "string"
          ? item._key
          : undefined
      const segment = key
        ? `[_key=="${escapeJsonMatchString(key)}"]`
        : `[${index}]`
      collectLocalizedFields(item, `${path}${segment}`, fields)
    })
    return
  }

  if (!isRecord(value)) return

  if (
    typeof value.id === "string" &&
    Object.keys(value).every((key) => localizedFieldKeys.has(key))
  ) {
    const source = value.id.trim()
    const englishValue = typeof value.en === "string" ? value.en : ""
    const english = englishValue.trim()
    const sourceHash = hashSource(value.id)
    const targetHash =
      typeof value.translationTargetHash === "string"
        ? value.translationTargetHash
        : undefined

    if (source && !english) {
      fields.push({ path, source: value.id, sourceHash })
    } else if (
      source &&
      english &&
      typeof value.translationSourceHash === "string" &&
      value.translationSourceHash !== sourceHash &&
      (targetHash === undefined || targetHash === hashSource(englishValue))
    ) {
      fields.push({ path, source: value.id, sourceHash })
    }

    return
  }

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("_")) continue
    collectLocalizedFields(child, path ? `${path}.${key}` : key, fields)
  }
}

function getFieldLimit(documentType: string) {
  if (documentType === "newsroomArticle" || documentType === "article")
    return maxArticleLocalizedFieldsPerDocument
  if (documentType === "newsroomCategory")
    return maxCategoryLocalizedFieldsPerDocument
  if (
    documentType === "homePage" ||
    documentType === "pageHeroEditor" ||
    documentType === "pageMediaEditor" ||
    documentType === "partner" ||
    documentType === "client" ||
    documentType === "teamMember" ||
    documentType === "product" ||
    documentType === "fleetOption" ||
    documentType === "jangkauanPage" ||
    documentType === "coverageArea"
  ) {
    return maxMediaLocalizedFieldsPerDocument
  }
  return maxLocalizedFieldsPerDocument
}

function isRevisionConflict(error: unknown) {
  return (
    isRecord(error) &&
    (error.statusCode === 409 ||
      (isRecord(error.response) && error.response.status === 409))
  )
}

function hashSource(source: string) {
  return createHash("sha256").update(source).digest("hex")
}

function escapeJsonMatchString(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
