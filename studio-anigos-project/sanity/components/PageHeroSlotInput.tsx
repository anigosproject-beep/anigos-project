import {
  PatchEvent,
  set,
  useFormValue,
  type ObjectInputProps,
} from "sanity"

import { findPageHeroPage } from "../page-hero-registry"

type PageHeroSlot = {
  pageKey?: string
  pagePath?: string
  pageName?: { id?: string; en?: string }
  title?: { id?: string; en?: string }
  subtitle?: { id?: string; en?: string }
  currentSource?: string
  [key: string]: unknown
}

export function PageHeroSlotInput(props: ObjectInputProps<PageHeroSlot>) {
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
  const page = findPageHeroPage(selectedMenu, selectedPage)
  const slotMissing = !props.value && Boolean(page)

  function restoreSlot() {
    if (!page) return

    props.onChange(
      PatchEvent.from(
        set({
          pageKey: page.pageKey,
          pagePath: page.path,
          pageName: page.pageName,
          title: page.heading,
          subtitle: page.subtitle,
          currentSource: page.currentSource,
        })
      )
    )
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {slotMissing && (
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
            onClick={restoreSlot}
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
            Pulihkan slot Page Hero
          </button>
          <span style={{ color: "var(--card-muted-fg-color)", fontSize: 13 }}>
            Slot ini hilang. Pulihkan strukturnya; asset dan konten lain tidak
            akan berubah.
          </span>
        </div>
      )}
      {props.renderDefault(props)}
    </div>
  )
}
