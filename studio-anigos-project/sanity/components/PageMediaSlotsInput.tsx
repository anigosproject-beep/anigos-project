import { PatchEvent, set, type ArrayOfObjectsInputProps } from "sanity"

import { findPageMediaPage } from "../page-media-registry"

type SupportingMediaSlot = {
  _key?: string
  slotId?: string
  pagePath?: string
  sectionName?: string
  mediaType?: "image" | "video"
  containerRatio?: string
  fit?: "cover" | "contain"
  recommendedRatio?: string
  currentSource?: string
  [key: string]: unknown
}

export function PageMediaSlotsInput(
  props: ArrayOfObjectsInputProps<SupportingMediaSlot>
) {
  const slots = props.value ?? []
  const homeSlots =
    findPageMediaPage("home", "home")?.slots.filter(
      (slot) =>
        slot.id.startsWith("home-product-logo-") ||
        slot.id === "home-marine-fuel-background"
    ) ?? []
  const existingSlotIds = new Set(slots.map((slot) => slot.slotId))
  const missingSlots = homeSlots.filter(
    (slot) => !existingSlotIds.has(slot.id)
  )

  function addMissingSlots() {
    const newSlots = missingSlots.map((slot) => ({
      _key: slot.id,
      slotId: slot.id,
      pagePath: "/",
      sectionName: slot.sectionName,
      mediaType: slot.mediaType,
      containerRatio: slot.container,
      fit: slot.fit,
      recommendedRatio: slot.expectedRatio,
      currentSource: slot.currentSource,
    }))

    props.onChange(PatchEvent.from(set([...slots, ...newSlots])))
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {missingSlots.length > 0 && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={addMissingSlots}
            style={{
              background: "var(--card-bg-color)",
              border: "1px solid var(--card-border-color)",
              borderRadius: 6,
              color: "var(--card-fg-color)",
              cursor: "pointer",
              font: "inherit",
              fontWeight: 600,
              minHeight: 40,
              padding: "8px 12px",
            }}
          >
            Siapkan {missingSlots.length} slot media
          </button>
          <span style={{ color: "var(--card-muted-fg-color)", fontSize: 13 }}>
            Menambahkan slot yang belum tersedia tanpa mengubah gambar lain.
          </span>
        </div>
      )}
      {props.renderDefault(props)}
    </div>
  )
}
