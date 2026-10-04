import { PatchEvent, set, type StringInputProps } from "sanity"

const fallbackColor = "#2e3092"

export function ThemeColorInput(props: StringInputProps) {
  const color =
    typeof props.value === "string" && /^#[0-9a-f]{6}$/i.test(props.value)
      ? props.value
      : fallbackColor

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {props.renderDefault(props)}
      <label
        style={{
          alignItems: "center",
          display: "flex",
          gap: 10,
        }}
      >
        <input
          aria-label="Pilih warna dasar aplikasi"
          onChange={(event) =>
            props.onChange(PatchEvent.from(set(event.currentTarget.value)))
          }
          style={{
            border: "1px solid var(--card-border-color)",
            borderRadius: 6,
            cursor: "pointer",
            height: 40,
            padding: 3,
            width: 56,
          }}
          type="color"
          value={color}
        />
        <span style={{ color: "var(--card-muted-fg-color)", fontSize: 12 }}>
          Pilih warna atau masukkan kode HEX.
        </span>
      </label>
    </div>
  )
}
