import { defineConfig } from "sanity"
import { visionTool } from "@sanity/vision"

import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "Anigos Project",
  projectId: "wm8u3z2o",
  dataset: "production",
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
})
