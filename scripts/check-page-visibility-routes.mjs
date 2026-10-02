import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const appRoot = path.join(projectRoot, "app")
const registryPath = path.join(
  projectRoot,
  "shared",
  "page-visibility-registry.ts"
)

async function collectPageRoutes(directory, relativeSegments = []) {
  const entries = await readdir(directory, { withFileTypes: true })
  const routes = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      if (entry.name === "page.tsx" || entry.name === "page.jsx") {
        routes.push(routePattern(relativeSegments))
      }
      continue
    }

    if (entry.name.startsWith("@") || entry.name.startsWith("(")) {
      routes.push(
        ...(await collectPageRoutes(
          path.join(directory, entry.name),
          relativeSegments
        ))
      )
      continue
    }

    routes.push(
      ...(await collectPageRoutes(path.join(directory, entry.name), [
        ...relativeSegments,
        entry.name,
      ]))
    )
  }

  return routes
}

function routePattern(segments) {
  const routeSegments = segments
    .filter((segment) => !segment.startsWith("@") && !/^\(.+\)$/.test(segment))
    .map((segment) =>
      /^\[\[?\.\.\..+\]?\]$/.test(segment) || /^\[[^/]+\]$/.test(segment)
        ? "*"
        : segment
    )
  return routeSegments.length ? `/${routeSegments.join("/")}` : "/"
}

function isCovered(route, registryPath) {
  if (route === registryPath) return true
  if (!registryPath.endsWith("/*")) return false
  const prefix = registryPath.slice(0, -1)
  return route.startsWith(prefix)
}

const registrySource = await readFile(registryPath, "utf8")
const registryRoutes = [
  ...registrySource.matchAll(/\bpath:\s*["']([^"']+)["']/g),
].map((match) => match[1])
const appRoutes = [...new Set(await collectPageRoutes(appRoot))].sort()
const uncoveredRoutes = appRoutes.filter(
  (route) => !registryRoutes.some((registered) => isCovered(route, registered))
)

if (uncoveredRoutes.length > 0) {
  console.error(
    `Page visibility registry is missing ${uncoveredRoutes.length} app route(s):`
  )
  for (const route of uncoveredRoutes) console.error(`- ${route}`)
  process.exitCode = 1
} else {
  console.log(
    `Page visibility registry covers all ${appRoutes.length} app page routes.`
  )
}
