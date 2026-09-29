import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

const backupDir = resolve(process.cwd(), process.argv[2] ?? 'sanity-backup')
const assetsDir = resolve(backupDir, 'assets')
const manifest = JSON.parse(await readFile(resolve(backupDir, 'assets-manifest.json'), 'utf8'))

await mkdir(assetsDir, {recursive: true})

const results = []
for (const asset of manifest) {
  if (!asset.url) {
    results.push({id: asset._id, status: 'missing-url'})
    continue
  }

  const response = await fetch(asset.url)
  if (!response.ok) {
    results.push({id: asset._id, status: 'failed', httpStatus: response.status})
    continue
  }

  const filename = `${asset.assetId}.${asset.extension ?? 'bin'}`
  await writeFile(resolve(assetsDir, filename), Buffer.from(await response.arrayBuffer()))
  results.push({id: asset._id, filename, status: 'downloaded'})
}

await writeFile(
  resolve(backupDir, 'asset-download-results.json'),
  `${JSON.stringify(results, null, 2)}\n`,
  'utf8',
)

console.log(JSON.stringify({
  total: results.length,
  downloaded: results.filter((result) => result.status === 'downloaded').length,
  failed: results.filter((result) => result.status !== 'downloaded').length,
}))
