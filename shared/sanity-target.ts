export const sanityTarget = {
  projectId: "6zvti7ob",
  dataset: "production",
} as const

export function assertSanityTarget(
  projectIdOverride?: string,
  datasetOverride?: string
) {
  if (
    projectIdOverride !== undefined &&
    projectIdOverride !== sanityTarget.projectId
  ) {
    throw new Error(
      `This application is locked to Sanity project ${sanityTarget.projectId}.`
    )
  }

  if (
    datasetOverride !== undefined &&
    datasetOverride !== sanityTarget.dataset
  ) {
    throw new Error(
      `This application is locked to Sanity dataset ${sanityTarget.dataset}.`
    )
  }
}
