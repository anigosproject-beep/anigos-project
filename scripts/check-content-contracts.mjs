import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const read = (relativePath) => readFile(resolve(root, relativePath), "utf8")

const [formContract, formComponent, formRoute, schemaIndex, structure] =
  await Promise.all([
    read("lib/form-contract.ts"),
    read("components/career-application-form.tsx"),
    read("app/api/career-applications/route.ts"),
    read("studio-anigos-project/sanity/schemaTypes/index.ts"),
    read("studio-anigos-project/structure.ts"),
  ])

const schemaImports = [
  ...schemaIndex.matchAll(
    /import\s+\{\s*(\w+)\s*\}\s+from\s+["']\.\/([^"']+)["']/g
  ),
].map(([, symbol, file]) => ({ symbol, file }))
const registeredBlock = schemaIndex.match(
  /export const schemaTypes(?::[^=]+)?=\s*\[([\s\S]*?)\]/
)
if (!registeredBlock) throw new Error("Active schemaTypes registry was not found.")

const registeredSymbols = new Set(
  [...registeredBlock[1].matchAll(/\b[A-Za-z_$][\w$]*\b/g)].map(
    ([symbol]) => symbol
  )
)
const missingRegistrations = schemaImports
  .map(({ symbol }) => symbol)
  .filter((symbol) => !registeredSymbols.has(symbol))

const schemaNames = new Set()
for (const { symbol, file } of schemaImports) {
  const source = await read(`studio-anigos-project/sanity/schemaTypes/${file}.ts`)
  const declaration = new RegExp(
    `export const ${symbol}\\s*=\\s*defineType\\(\\{\\s*name:\\s*["']([^"']+)["']`
  ).exec(source)

  if (declaration) schemaNames.add(declaration[1])
}

const singletonEntries = [
  ...structure.matchAll(
    /\.schemaType\(["']([^"']+)["']\)[\s\S]{0,160}?\.documentId\(["']([^"']+)["']\)/g
  ),
].map(([, schemaType, documentId]) => ({ schemaType, documentId }))
const missingSingletonSchemas = singletonEntries.filter(
  ({ schemaType }) => !schemaNames.has(schemaType)
)

const fieldKeys = [
  ...formContract.matchAll(/^\s*(\w+):\s*["']([^"']+)["']/gm),
].map(([, key, value]) => ({ key, value }))
const missingFormReferences = fieldKeys.filter(
  ({ value }) =>
    !formComponent.includes(`CAREER_APPLICATION_FIELDS.${value}`) &&
    !formRoute.includes(`CAREER_APPLICATION_FIELDS.${value}`)
)

const failures = []
if (missingRegistrations.length) {
  failures.push(
    `Schema imports missing from active schemaTypes registry: ${missingRegistrations.join(", ")}`
  )
}
if (missingSingletonSchemas.length) {
  failures.push(
    `Studio singleton points to an unregistered schema: ${missingSingletonSchemas
      .map(({ schemaType, documentId }) => `${schemaType} (${documentId})`)
      .join(", ")}`
  )
}
if (missingFormReferences.length) {
  failures.push(
    `Form contract keys not referenced by UI/API: ${missingFormReferences
      .map(({ key }) => key)
      .join(", ")}`
  )
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exitCode = 1
} else {
  console.log(
    `Content contracts OK: ${schemaImports.length} active schema imports, ${singletonEntries.length} singleton entries, ${fieldKeys.length} form keys.`
  )
}
