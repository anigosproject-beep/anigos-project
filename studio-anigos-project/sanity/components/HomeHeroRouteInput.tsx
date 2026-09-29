import { useEffect, useState } from "react"
import { PatchEvent, set, type StringInputProps } from "sanity"

import { homeHeroLinkMenus } from "../home-hero-link-registry"

export function HomeHeroRouteInput(props: StringInputProps) {
  const [selectedMenu, setSelectedMenu] = useState("")
  const selectedPage = homeHeroLinkMenus
    .flatMap((menu) =>
      menu.pages.map((page) => ({ menu: menu.value, path: page.path }))
    )
    .find((page) => page.path === props.value)
  const menu = homeHeroLinkMenus.find((item) => item.value === selectedMenu)

  useEffect(() => {
    setSelectedMenu(selectedPage?.menu ?? "")
  }, [selectedPage?.menu, props.value])

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pilih Menu</span>
        <select
          onChange={(event) => setSelectedMenu(event.currentTarget.value)}
          style={selectStyle}
          value={selectedMenu}
        >
          <option value="">Pilih menu</option>
          {homeHeroLinkMenus.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pilih Halaman</span>
        <select
          disabled={!menu}
          onChange={(event) =>
            props.onChange(PatchEvent.from(set(event.currentTarget.value)))
          }
          style={selectStyle}
          value={
            menu?.pages.some((page) => page.path === props.value)
              ? props.value
              : ""
          }
        >
          <option value="">
            {menu ? "Pilih halaman" : "Pilih menu terlebih dahulu"}
          </option>
          {menu?.pages.map((page) => (
            <option key={page.value} value={page.path}>
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
