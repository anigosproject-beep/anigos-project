import { useEffect, useState } from "react"
import {
  type FileValue,
  type ImageValue,
  type ObjectInputProps,
  useClient,
  useFormValue,
} from "sanity"

import {
  maxHomeHeroVideoBytes,
  maxMarineFuelVideoBytes,
} from "../../../shared/sanity-content-contracts"

type Dimensions = { width: number; height: number }
type AssetDimensions = Dimensions | null

export function PageMediaImageInput(props: ObjectInputProps<ImageValue>) {
  const client = useClient({ apiVersion: "2026-09-26" })
  const assetId = getAssetId(props.value?.asset)
  const ratioPath = [...props.path.slice(0, -1), "recommendedRatio"]
  const expectedRatioLabel = useFormValue(ratioPath)
  const expectedRatio = parseRatio(expectedRatioLabel)
  const [loadedDimensions, setLoadedDimensions] = useState<{
    assetId: string
    dimensions: AssetDimensions
  } | null>(null)
  const dimensions =
    loadedDimensions?.assetId === assetId ? loadedDimensions.dimensions : null

  useEffect(() => {
    if (!assetId) return

    let isCurrent = true
    void client
      .fetch<AssetDimensions>(
        `*[_id == $assetId][0]{
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height
        }`,
        { assetId }
      )
      .then((result) => {
        if (isCurrent) setLoadedDimensions({ assetId, dimensions: result })
      })
      .catch((error: unknown) => {
        console.error("Failed to read uploaded image dimensions", error)
        if (isCurrent) setLoadedDimensions({ assetId, dimensions: null })
      })

    return () => {
      isCurrent = false
    }
  }, [assetId, client])

  return (
    <div>
      {props.renderDefault(props)}
      <RatioNotice
        dimensions={dimensions}
        expectedRatio={expectedRatio}
        expectedRatioLabel={expectedRatioLabel}
        hasAsset={Boolean(assetId)}
      />
    </div>
  )
}

export function RatioNotice({
  dimensions,
  expectedRatio,
  expectedRatioLabel,
  hasAsset,
}: {
  dimensions: AssetDimensions
  expectedRatio: number | null
  expectedRatioLabel: unknown
  hasAsset: boolean
}) {
  if (!hasAsset) {
    return (
      <p style={noticeStyle}>
        Frame halaman tetap. Setelah gambar ditambahkan, editor akan memberi
        peringatan rasio bila slot memiliki rasio target.
      </p>
    )
  }

  if (!dimensions?.width || !dimensions.height) {
    return (
      <p role="status" style={noticeStyle}>
        Dimensi sumber belum tersedia. Frame halaman tidak berubah.
      </p>
    )
  }

  const actualRatio = dimensions.width / dimensions.height
  const actualRatioLabel = `${actualRatio.toFixed(2)}:1`
  if (!expectedRatio) {
    return (
      <p style={noticeStyle}>
        Sumber {actualRatioLabel}. Slot ini memakai rasio responsif; gambar
        mengikuti perilaku contain/cover yang dikunci dan tidak mengubah frame.
      </p>
    )
  }

  const difference = Math.abs(actualRatio - expectedRatio) / expectedRatio
  const expectedLabel =
    typeof expectedRatioLabel === "string" ? expectedRatioLabel : "target"
  const isMismatch = difference > 0.15

  return (
    <p
      role={isMismatch ? "alert" : "status"}
      style={{
        ...noticeStyle,
        color: isMismatch
          ? "var(--card-badge-caution-fg-color, #b45309)"
          : undefined,
      }}
    >
      {isMismatch
        ? `Perhatian: rasio sumber ${actualRatioLabel} berbeda dari ${expectedLabel}. Container tetap; crop/hotspot mengatur potongan gambar.`
        : `Rasio sumber ${actualRatioLabel} sesuai dengan ${expectedLabel}. Container tetap.`}
    </p>
  )
}

function getAssetId(value: unknown): string | null {
  if (typeof value !== "object" || value === null || !("_ref" in value)) {
    return null
  }

  return typeof value._ref === "string" ? value._ref : null
}

export function parseRatio(value: unknown): number | null {
  if (typeof value !== "string") return null
  const match = value.match(/(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)/)
  if (!match) return null

  const width = Number(match[1])
  const height = Number(match[2])
  return width > 0 && height > 0 ? width / height : null
}

const noticeStyle = {
  color: "var(--card-muted-fg-color)",
  fontSize: 12,
  lineHeight: 1.5,
  marginTop: 8,
}

export function PageMediaVideoInput(props: ObjectInputProps<FileValue>) {
  const client = useClient({ apiVersion: "2026-09-26" })
  const assetId = getAssetId(props.value?.asset)
  const ratioPath = [...props.path.slice(0, -1), "recommendedRatio"]
  const expectedRatioLabel = useFormValue(ratioPath)
  const expectedRatio = parseRatio(expectedRatioLabel)
  const [loadedVideo, setLoadedVideo] = useState<{
    assetId: string
    url: string | null
    size?: number
  } | null>(null)
  const [loadedDimensions, setLoadedDimensions] = useState<{
    assetId: string
    dimensions: Dimensions | null
  } | null>(null)
  const assetUrl = loadedVideo?.assetId === assetId ? loadedVideo.url : null
  const dimensions =
    loadedDimensions?.assetId === assetId ? loadedDimensions.dimensions : null
  const isMarineFuelVideo = useFormValue([
    ...props.path.slice(0, -1),
    "slotId",
  ])
  const videoLimit =
    typeof isMarineFuelVideo === "string" &&
    isMarineFuelVideo.endsWith("-marine-fuel-video")
      ? maxMarineFuelVideoBytes
      : maxHomeHeroVideoBytes

  useEffect(() => {
    if (!assetId) return

    let isCurrent = true
    void client
      .fetch<{ url?: string; size?: number } | null>(
        `*[_id == $assetId][0]{url, size}`,
        { assetId }
      )
      .then((asset) => {
        if (isCurrent) {
          setLoadedVideo({
            assetId,
            url: asset?.url ?? null,
            size: asset?.size,
          })
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to read uploaded video asset", error)
        if (isCurrent) setLoadedVideo({ assetId, url: null })
      })

    return () => {
      isCurrent = false
    }
  }, [assetId, client])

  return (
    <div>
      {props.renderDefault(props)}
      {assetUrl ? (
        <video
          aria-hidden="true"
          src={assetUrl}
          preload="metadata"
          style={{ display: "none" }}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget
            setLoadedDimensions({
              assetId: assetId ?? "",
              dimensions: {
                width: video.videoWidth,
                height: video.videoHeight,
              },
            })
          }}
          onError={() => {
            console.error("Failed to load uploaded video metadata")
            if (assetId) setLoadedDimensions({ assetId, dimensions: null })
          }}
        />
      ) : null}
      {      typeof loadedVideo?.size === "number" &&
      loadedVideo.assetId === assetId &&
      loadedVideo.size > videoLimit ? (
        <p role="status" style={noticeStyle}>
          File video {formatFileSize(loadedVideo.size)} melebihi rekomendasi{" "}
          {formatFileSize(videoLimit)}. Pemutar memuat metadata dan memainkan
          video hanya setelah pengguna menekan tombol putar.
        </p>
      ) : null}
      <RatioNotice
        dimensions={dimensions}
        expectedRatio={expectedRatio}
        expectedRatioLabel={expectedRatioLabel}
        hasAsset={Boolean(assetId)}
      />
    </div>
  )
}

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(1)} MiB`
}
