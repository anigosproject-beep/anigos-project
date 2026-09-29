import { useCallback } from "react"
import { PatchEvent, set, type ObjectInputProps } from "sanity"

import { findPageHeroMenu, pageHeroMenus } from "../page-hero-registry"

type SelectionValue = {
  menu?: string
  page?: string
}

export function PageHeroSelectionInput(
  props: ObjectInputProps<SelectionValue>
) {
  const value = props.value ?? {}
  const menu = findPageHeroMenu(value.menu)

  const updateSelection = useCallback(
    (next: SelectionValue) => {
      props.onChange(PatchEvent.from(set({ ...value, ...next })))
    },
    [props, value]
  )

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        maxWidth: 900,
      }}
    >
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pilih Menu</span>
        <select
          value={value.menu ?? ""}
          onChange={(event) =>
            updateSelection({ menu: event.currentTarget.value, page: "" })
          }
          style={selectStyle}
        >
          <option value="">Pilih menu</option>
          {pageHeroMenus.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pilih Halaman</span>
        <select
          value={
            menu?.pages.some((page) => page.value === value.page)
              ? value.page
              : ""
          }
          disabled={!menu}
          onChange={(event) =>
            updateSelection({ page: event.currentTarget.value })
          }
          style={selectStyle}
        >
          <option value="">
            {menu ? "Pilih halaman" : "Pilih menu terlebih dahulu"}
          </option>
          {menu?.pages.map((page) => (
            <option key={page.value} value={page.value}>
              {page.title}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

const selectStyle = {
  appearance: "none" as const,
  background: "var(--card-bg-color)",
  border: "1px solid var(--card-border-color)",
  borderRadius: 6,
  color: "var(--card-fg-color)",
  minHeight: 40,
  padding: "8px 12px",
  width: "100%",
}
