import {access, mkdir, writeFile} from "node:fs/promises"
import {execFile} from "node:child_process"
import {promisify} from "node:util"
import {dirname, resolve} from "node:path"

const execFileAsync = promisify(execFile)
const root = resolve(import.meta.dirname, "..")
const outputArgumentIndex = process.argv.indexOf("--output")
const outputPath = outputArgumentIndex >= 0 ? process.argv[outputArgumentIndex + 1] : undefined
const strict = process.argv.includes("--strict")

if (outputArgumentIndex >= 0 && (!outputPath || outputPath.startsWith("--"))) {
  throw new Error("--output requires a file path.")
}

const surfaces = [
  {
    id: "sanity-domain-model",
    title: "Sanity domain schema",
    patterns: ["studio-anigos-project/schemaTypes/domainContent.ts", "studio-anigos-project/schemaTypes/index.ts"],
    checks: ["cd studio-anigos-project && npm run build"],
    risk: "high",
  },
  {
    id: "sanity-navigation",
    title: "Operator navigation and registry",
    patterns: ["studio-anigos-project/structure.ts", "studio-anigos-project/content-registry.json", "studio-anigos-project/content-registry.ts"],
    checks: ["cd studio-anigos-project && npm run build", "npm run check:content-contracts"],
    risk: "high",
  },
  {
    id: "sanity-runtime-contract",
    title: "Sanity query and frontend response contract",
    patterns: ["lib/sanity-queries.ts", "lib/sanity-content-types.ts", "lib/sanity-client.ts"],
    checks: ["npm run typecheck", "npm run lint", "npm run check:content-contracts"],
    risk: "high",
  },
  {
    id: "partnership-runtime",
    title: "Kemitraan page and Draft Mode API",
    patterns: ["app/api/kemitraan/route.ts", "app/tentang-kami/kemitraan/page.tsx"],
    checks: ["npm run typecheck", "npm run lint"],
    risk: "high",
  },
  {
    id: "product-runtime",
    title: "Produk and Armada pages",
    patterns: ["app/produk/kenali-produk/page.tsx", "app/produk/armada/page.tsx", "lib/sanity-queries.ts"],
    checks: ["npm run typecheck", "npm run lint"],
    risk: "high",
  },
  {
    id: "content-lake-validation",
    title: "Published Content Lake validation",
    patterns: ["studio-anigos-project/scripts/validate-content.mjs", "studio-anigos-project/content-registry.json"],
    checks: ["cd studio-anigos-project && npm run validate:content"],
    risk: "medium",
  },
  {
    id: "documentation",
    title: "Implementation documentation",
    patterns: ["docs/sanity-implementation/"],
    checks: [],
    risk: "low",
  },
]

const normalize = (value) => value.replaceAll("\\", "/").replace(/^\.\//, "")
const matches = (file, pattern) => pattern.endsWith("/")
  ? file.startsWith(pattern)
  : file === pattern

const getChangedFiles = async () => {
  const explicitFiles = process.argv
    .filter((argument) => argument.startsWith("--file="))
    .map((argument) => normalize(argument.slice("--file=".length)))
  if (explicitFiles.length) return explicitFiles

  try {
    const {stdout} = await execFileAsync("git", ["diff", "--name-only", "HEAD"], {cwd: root})
    return stdout.split(/\r?\n/).map(normalize).filter(Boolean)
  } catch {
    return []
  }
}

const changedFiles = await getChangedFiles()
const impacts = surfaces
  .map((surface) => {
    const affectedFiles = changedFiles.filter((file) => surface.patterns.some((pattern) => matches(file, pattern)))
    return affectedFiles.length ? {...surface, affectedFiles} : null
  })
  .filter(Boolean)

const requiredFiles = [
  "studio-anigos-project/schemaTypes/domainContent.ts",
  "studio-anigos-project/schemaTypes/index.ts",
  "studio-anigos-project/structure.ts",
  "lib/sanity-queries.ts",
  "lib/sanity-content-types.ts",
  "app/api/kemitraan/route.ts",
]
const missingFiles = []
for (const file of requiredFiles) {
  try {
    await access(resolve(root, file))
  } catch {
    missingFiles.push(file)
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  mode: "read-only",
  strict,
  changedFiles,
  impactedSurfaces: impacts.map(({id, title, risk, affectedFiles, checks}) => ({
    id,
    title,
    risk,
    affectedFiles,
    requiredChecks: checks,
  })),
  missingRequiredFiles: missingFiles,
  status: missingFiles.length || (strict && changedFiles.length === 0) ? "blocked" : "review-required",
}

const destination = outputPath ? resolve(root, outputPath) : undefined
if (destination) {
  await mkdir(dirname(destination), {recursive: true})
  await writeFile(destination, `${JSON.stringify(report, null, 2)}\n`, "utf8")
}

console.log(`Structure impact: ${report.status}`)
console.log(`Changed files: ${changedFiles.length}`)
if (impacts.length) {
  for (const impact of impacts) {
    console.log(`- [${impact.risk}] ${impact.title}: ${impact.affectedFiles.join(", ")}`)
    for (const check of impact.checks) console.log(`  check: ${check}`)
  }
} else {
  console.log("- No registered structure surface was affected.")
}
if (missingFiles.length) {
  console.error(`Missing required contract files: ${missingFiles.join(", ")}`)
  process.exitCode = 1
}
if (strict && changedFiles.length === 0) {
  console.error("Strict mode requires changed files or --file=<path> inputs.")
  process.exitCode = 1
}
