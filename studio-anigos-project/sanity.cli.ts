import { defineCliConfig } from "sanity/cli"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "6zvti7ob"
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production"

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "b0aeni0iyzep8bldqhbp0qt2",
  },
})
