import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2026-09-13',
  useCdn: false,
  perspective: 'raw',
})

const result = await client.fetch(`{
  "total": count(*),
  "user": count(*[!(_id in path("_.**"))]),
  "types": array::unique(*[]._type)
}`)

console.log(JSON.stringify(result))

if (result.user !== 0) {
  throw new Error(`Sanity dataset still contains ${result.user} user documents.`)
}
