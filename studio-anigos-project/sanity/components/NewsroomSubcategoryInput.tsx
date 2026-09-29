import { useEffect, useState } from "react"
import {
  PatchEvent,
  set,
  unset,
  type StringInputProps,
  useClient,
  useFormValue,
} from "sanity"

type Subcategory = { slug: string; name: string }
type CategoryReference = { _ref?: string }

export function NewsroomSubcategoryInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2026-09-26" })
  const categoryValue = useFormValue([
    ...props.path.slice(0, -1),
    "category",
  ]) as CategoryReference | undefined
  const categoryId = categoryValue?._ref
  const value = props.value
  const onChange = props.onChange
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([])
      setLoadError(null)
      setLoading(false)
      return
    }

    let current = true
    setLoading(true)
    setLoadError(null)
    void client
      .fetch<Subcategory[]>(
        `*[_id == $categoryId][0].subcategories[]{
          "slug": slug.current,
          name
        }`,
        { categoryId }
      )
      .then((result) => {
        if (current) setSubcategories(result ?? [])
      })
      .catch((error: unknown) => {
        console.error("Failed to load newsroom article subcategories", error)
        if (current) {
          setSubcategories([])
          setLoadError("Subkategori gagal dimuat. Periksa koneksi Studio.")
        }
      })
      .finally(() => {
        if (current) setLoading(false)
      })

    return () => {
      current = false
    }
  }, [categoryId, client])

  useEffect(() => {
    if (
      !loading &&
      !loadError &&
      value &&
      !subcategories.some((item) => item.slug === value)
    ) {
      onChange(PatchEvent.from(unset()))
    }
  }, [loadError, loading, onChange, subcategories, value])

  return (
    <div>
      <select
        aria-label="Pilih subkategori artikel"
        disabled={!categoryId || loading || subcategories.length === 0}
        onChange={(event) =>
          onChange(PatchEvent.from(set(event.currentTarget.value)))
        }
        style={selectStyle}
        value={subcategories.some((item) => item.slug === value) ? value : ""}
      >
        <option value="">
          {!categoryId
            ? "Pilih kategori terlebih dahulu"
            : loading
              ? "Memuat subkategori…"
              : subcategories.length
                ? "Pilih subkategori"
                : "Kategori ini belum memiliki subkategori"}
        </option>
        {subcategories.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      {loadError ? (
        <p
          role="alert"
          style={{ color: "var(--card-critical-fg-color)", marginTop: 8 }}
        >
          {loadError}
        </p>
      ) : null}
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
