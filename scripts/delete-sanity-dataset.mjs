import {createClient} from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_AUTH_TOKEN
const confirmation = process.env.SANITY_DELETE_CONFIRMATION

if (!projectId || !dataset || !token) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN are required.')
}

if (confirmation !== `${projectId}/${dataset}`) {
  throw new Error(`Destructive deletion requires SANITY_DELETE_CONFIRMATION=${projectId}/${dataset}`)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-09-13',
  useCdn: false,
  perspective: 'raw',
})

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function withRetry(operation) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      const statusCode = error?.statusCode ?? error?.response?.statusCode
      if (statusCode !== 429 || attempt === 7) throw error
      await sleep(Math.min(1000 * 2 ** attempt, 16000))
    }
  }
}

const documents = await withRetry(() => client.fetch('*[!(_id in path("_.**"))]{_id, _type}'))
const ids = documents
  .filter((document) => typeof document._id === 'string' && document._type && !document._type.startsWith('sanity.'))
  .map((document) => document._id)
const assetIds = documents
  .filter((document) => typeof document._id === 'string' && (document._type === 'sanity.imageAsset' || document._type === 'sanity.fileAsset'))
  .map((document) => document._id)
const deleteGroups = [ids, assetIds]
let deleted = 0

for (const group of deleteGroups) {
  for (let index = 0; index < group.length; index += 20) {
    const batch = group.slice(index, index + 20)
    await withRetry(() => {
      const transaction = client.transaction()
      for (const id of batch) transaction.delete(id)
      return transaction.commit()
    })
    deleted += batch.length
    console.log(`Deleted ${deleted}/${ids.length + assetIds.length} documents`)
  }
}

const remaining = await withRetry(() => client.fetch('count(*[!(_id in path("_.**"))])'))
if (remaining !== 0) {
  throw new Error(`Deletion verification failed: ${remaining} user documents remain.`)
}

console.log(JSON.stringify({projectId, dataset, deleted, remaining}))
