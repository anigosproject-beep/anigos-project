import {createClient} from '@sanity/client'
import {copyFile, mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_AUTH_TOKEN
const outputDir = resolve(process.cwd(), process.argv[2] ?? 'sanity-backup')

if (!projectId || !dataset || !token) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN are required.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-09-13',
  useCdn: false,
  perspective: 'raw',
})

const documents = await client.fetch('*[]')
const assets = documents.filter((document) =>
  document._type === 'sanity.imageAsset' || document._type === 'sanity.fileAsset'
)
const userDocuments = documents.filter((document) =>
  !document._id.startsWith('_.') &&
  document._type !== 'sanity.imageAsset' &&
  document._type !== 'sanity.fileAsset'
)

await mkdir(outputDir, {recursive: true})
await writeFile(
  resolve(outputDir, 'documents.ndjson'),
  `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`,
  'utf8',
)
await writeFile(
  resolve(outputDir, 'assets-manifest.json'),
  `${JSON.stringify(assets, null, 2)}\n`,
  'utf8',
)
await writeFile(
  resolve(outputDir, 'backup-metadata.json'),
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    projectId,
    dataset,
    perspective: 'raw',
    totalDocuments: documents.length,
    userDocuments: userDocuments.length,
    assets: assets.length,
    restoreHint: 'Use sanity dataset import or replay documents.ndjson with a write token after reviewing it.',
  }, null, 2)}\n`,
  'utf8',
)

const schemaSource = resolve(process.cwd(), '..', 'studio-anigos-project', 'schemaTypes', 'index.ts')
try {
  await copyFile(schemaSource, resolve(outputDir, 'schemaTypes.index.ts'))
} catch {
  console.warn(`Schema source was not copied: ${schemaSource}`)
}

console.log(JSON.stringify({
  outputDir,
  totalDocuments: documents.length,
  userDocuments: userDocuments.length,
  assets: assets.length,
}))
