import type { ArrayOfObjectsInputProps } from "sanity"

type LocalizedText = {
  id?: string
  en?: string
}

type HeroSlide = {
  _key: string
  isActive?: boolean
  position?: number
  eyebrow?: LocalizedText
  title?: LocalizedText
}

export function HomeHeroSlidesInput(
  props: ArrayOfObjectsInputProps<HeroSlide>
) {
  const slides = props.value ?? []
  const openItem = props.members.find(
    (member) => member.kind === "item" && member.open
  )
  const selectedKey =
    openItem?.kind === "item" ? openItem.key : (slides[0]?._key ?? "")

  function selectSlide(key: string) {
    const selected = slides.find((slide) => slide._key === key)
    if (!selected) return

    for (const member of props.members) {
      if (member.kind === "item" && member.open && member.key !== key) {
        props.onItemCollapse(member.key)
      }
    }
    props.onItemExpand(key)
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <label style={{ display: "grid", gap: 6, maxWidth: 420 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pilih Slide</span>
        <select
          aria-label="Pilih Slide Home Hero"
          disabled={slides.length === 0}
          onChange={(event) => selectSlide(event.currentTarget.value)}
          style={selectStyle}
          value={selectedKey}
        >
          {slides.map((slide, index) => {
            const name = slide.eyebrow?.id || slide.eyebrow?.en

            return (
              <option key={slide._key} value={slide._key}>
                {String(slide.position ?? index + 1).padStart(2, "0")} —{" "}
                {name ||
                  slide.title?.id ||
                  slide.title?.en ||
                  "Slide tanpa nama"}{" "}
                {slide.isActive === false ? "(Nonaktif)" : "(Aktif)"}
              </option>
            )
          })}
        </select>
      </label>
      {props.renderDefault(props)}
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
