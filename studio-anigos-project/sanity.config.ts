import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import {
  assertSanityTarget,
  sanityTarget,
} from "../shared/sanity-target"
import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./structure"

assertSanityTarget(
  process.env.SANITY_STUDIO_PROJECT_ID,
  process.env.SANITY_STUDIO_DATASET
)
const { projectId, dataset } = sanityTarget

export default defineConfig({
  name: "petro-anigos",
  title: "Petro Anigos — Content Studio",
  projectId,
  dataset,
  basePath: process.env.SANITY_STUDIO_BASE_PATH ?? "/",
  plugins: [structureTool({ structure })],
  document: {
    actions: (previousActions, context) => {
      const protectedSingleton =
        (context.schemaType === "homePage" &&
          context.documentId === "homePage") ||
        (context.schemaType === "pageHeroEditor" &&
          context.documentId === "pageHeroEditor") ||
        (context.schemaType === "pageMediaEditor" &&
          context.documentId === "pageMediaEditor")
      const protectedMediaAsset = context.schemaType === "mediaAsset"

      if (!protectedSingleton && !protectedMediaAsset) return previousActions

      return previousActions.filter(
        (action) => action.action !== "delete" && action.action !== "unpublish"
      )
    },
  },
  schema: {
    types: schemaTypes,
  },
})
