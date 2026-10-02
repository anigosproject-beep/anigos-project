import { defineCliConfig } from "sanity/cli"

import {
  assertSanityTarget,
  sanityTarget,
} from "../shared/sanity-target"

assertSanityTarget(
  process.env.SANITY_STUDIO_PROJECT_ID,
  process.env.SANITY_STUDIO_DATASET
)
const { projectId, dataset } = sanityTarget

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "b0aeni0iyzep8bldqhbp0qt2",
  },
})
