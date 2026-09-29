import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./structure"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "6zvti7ob"
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production"

export default defineConfig({
  name: "petro-anigos",
  title: "Petro Anigos — Content Studio",
  projectId,
  dataset,
  basePath: process.env.SANITY_STUDIO_BASE_PATH ?? "/",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
})
