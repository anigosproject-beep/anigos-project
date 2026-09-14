import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "Anigos Project",
  projectId: "wm8u3z2o",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
