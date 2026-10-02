import {
  PatchEvent,
  set,
  useFormValue,
  type ArrayOfObjectsInputProps,
} from "sanity"

import { findPageMediaPage } from "../page-media-registry"

type SupportingMediaSlot = {
  _key: string
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
  const selection = useFormValue(["selection"])
  const selectedMenu =
    typeof selection === "object" &&
    selection !== null &&
    "menu" in selection &&
    typeof selection.menu === "string"
      ? selection.menu
      : undefined
  const selectedPage =
    typeof selection === "object" &&
    selection !== null &&
    "page" in selection &&
    typeof selection.page === "string"
      ? selection.page
      : undefined
  const page = findPageMediaPage(selectedMenu, selectedPage)
  const pageSlots = page?.slots ?? []
  const existingSlotIds = new Set(slots.map((slot) => slot.slotId))
  const missingSlots = pageSlots.filter((slot) => !existingSlotIds.has(slot.id))

  function addMissingSlots() {
    const newSlots = missingSlots.map((slot) => ({
      _key: slot.id,
      slotId: slot.id,
      pagePath: page?.path ?? "",
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
            Tambahkan {missingSlots.length} slot media
          </button>
          <span style={{ color: "var(--card-muted-fg-color)", fontSize: 13 }}>
            Slot ini belum memiliki field untuk diisi. Tambahkan slot terlebih
            dahulu; media lain tidak akan berubah.
          </span>
        </div>
      )}
      {props.renderDefault(props)}
    </div>
  )
}
