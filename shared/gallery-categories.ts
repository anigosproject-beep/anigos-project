export const galleryCategories = [
  { id: "partnership", label: { id: "Kemitraan", en: "Partnerships" } },
  {
    id: "transport",
    label: { id: "Transportasi & Armada", en: "Transport & Fleet" },
  },
  {
    id: "distribution",
    label: { id: "Distribusi Energi", en: "Energy Distribution" },
  },
  {
    id: "leadership",
    label: { id: "Komisaris & Direksi", en: "Commissioners & Directors" },
  },
  {
    id: "coverage",
    label: { id: "Jangkauan Layanan", en: "Service Coverage" },
  },
  {
    id: "services",
    label: { id: "Produk & Layanan", en: "Products & Services" },
  },
] as const

export type BuiltInGalleryCategory = (typeof galleryCategories)[number]["id"]
