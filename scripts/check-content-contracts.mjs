import {readFile, readdir} from "node:fs/promises"
import {resolve} from "node:path"

const root = resolve(import.meta.dirname, "..")
const read = (relativePath) => readFile(resolve(root, relativePath), "utf8")

const routesSource = await read("studio-anigos-project/sanity/lib/page.ts")
const mapping = await read("docs/content-page-mapping.md")
const formContract = await read("lib/form-contract.ts")
const formComponent = await read("components/career-application-form.tsx")
const formRoute = await read("app/api/career-applications/route.ts")
const singletonFiles = await readdir(
  resolve(root, "studio-anigos-project/sanity/schemaTypes/documents/singletons"),
  {withFileTypes: true},
)
const singletonSource = (
  await Promise.all(
    singletonFiles
      .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
      .map((entry) =>
        read(`studio-anigos-project/sanity/schemaTypes/documents/singletons/${entry.name}`),
      ),
  )
).join("\n")

const routeBlock = routesSource.match(/export const ROUTES = \{([\s\S]*?)\} as const/)
if (!routeBlock) throw new Error("ROUTES registry was not found.")

const routes = [...routeBlock[1].matchAll(/^\s*(\w+):\s*['"]([^'"]+)['"]/gm)].map(
  ([, key, route]) => ({key, route}),
)
const mappedRoutes = [...mapping.matchAll(/^## \d+\. .*? — `([^`]+)`/gm)].map(([, route]) => route)
const missingMappings = routes
  .map(({route}) => route)
  .filter((route) => !mappedRoutes.includes(route))

const singletonRouteKeys = [
  ...singletonSource.matchAll(/route:\s*ROUTES\.(\w+)/g),
].map(([, key]) => key)
const missingSchemas = routes
  .filter(({key}) => key !== "home" && !singletonRouteKeys.includes(key))
  .map(({key}) => key)

const fieldKeys = [...formContract.matchAll(/^\s*(\w+):\s*"([^"]+)"/gm)].map(
  ([, key, value]) => ({key, value}),
)
const missingFormReferences = fieldKeys.filter(
  ({value}) => !formComponent.includes(`CAREER_APPLICATION_FIELDS.${value}`) &&
    !formRoute.includes(`CAREER_APPLICATION_FIELDS.${value}`),
)

const failures = []
if (missingMappings.length) {
  failures.push(`Routes missing from content mapping: ${missingMappings.join(", ")}`)
}
if (missingSchemas.length) {
  failures.push(`Routes missing a singleton schema route: ${missingSchemas.join(", ")}`)
}
if (missingFormReferences.length) {
  failures.push(
    `Form contract keys not referenced by UI/API: ${missingFormReferences
      .map(({key}) => key)
      .join(", ")}`,
  )
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exitCode = 1
} else {
  console.log(
    `Content contracts OK: ${routes.length} routes, ${fieldKeys.length} form keys.`,
  )
}
