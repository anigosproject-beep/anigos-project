export const pageVisibilityGroups = [
  {
    key: "home",
    title: "Beranda",
    pages: [{ key: "home", title: "Halaman Beranda", path: "/" }],
  },
  {
    key: "about",
    title: "Tentang Kami",
    pages: [
      {
        key: "companyProfile",
        title: "Profil Perusahaan",
        path: "/tentang-kami/profil-perusahaan",
      },
      {
        key: "aspirations",
        title: "Harapan & Cita-Cita",
        path: "/tentang-kami/harapan-cita-cita",
      },
      {
        key: "companyStructure",
        title: "Struktur Perusahaan",
        path: "/tentang-kami/struktur-perusahaan",
      },
      { key: "clients", title: "Client", path: "/tentang-kami/client" },
      { key: "legality", title: "Legalitas", path: "/tentang-kami/legalitas" },
      { key: "careers", title: "Karir", path: "/tentang-kami/karir" },
      {
        key: "careerApplication",
        title: "Formulir Lamaran",
        path: "/tentang-kami/karir/lamar",
      },
      {
        key: "legacyPartnerDetail",
        title: "Detail Mitra Lama",
        path: "/tentang-kami/kemitraan/*",
      },
    ],
  },
  {
    key: "products",
    title: "Produk",
    pages: [
      {
        key: "productOverview",
        title: "Kenali Produk",
        path: "/produk/kenali-produk",
      },
      { key: "productOffers", title: "Penawaran", path: "/produk/penawaran" },
      {
        key: "offerRequest",
        title: "Formulir Pengajuan Penawaran",
        path: "/produk/penawaran/ajukan",
      },
      { key: "fleetServices", title: "Layanan Armada", path: "/produk/armada" },
      { key: "productsIndex", title: "Halaman Produk", path: "/produk" },
    ],
  },
  {
    key: "reach",
    title: "Jangkauan",
    pages: [{ key: "reach", title: "Jangkauan", path: "/jangkauan" }],
  },
  {
    key: "articles",
    title: "Artikel",
    pages: [
      { key: "articlesIndex", title: "Halaman Artikel", path: "/artikel" },
      { key: "anigosNews", title: "Anigos News", path: "/artikel/anigos-news" },
      { key: "publications", title: "Publikasi", path: "/artikel/publikasi" },
      {
        key: "publicationCategories",
        title: "Kategori Publikasi",
        path: "/artikel/publikasi/kategori",
      },
      {
        key: "publicInformation",
        title: "Landasan Informasi Publik",
        path: "/artikel/landasan-informasi-publik",
      },
      { key: "articleDetails", title: "Detail Artikel", path: "/artikel/*" },
    ],
  },
  {
    key: "sustainability",
    title: "Keberlanjutan",
    pages: [
      {
        key: "sustainabilityHome",
        title: "Keberlanjutan & Pencapaian",
        path: "/keberlanjutan",
      },
      {
        key: "sustainableEnergy",
        title: "Energi Berkelanjutan",
        path: "/keberlanjutan/energi-berkelanjutan",
      },
      {
        key: "operationalSafety",
        title: "Keselamatan Operasional",
        path: "/keberlanjutan/keselamatan-operasional",
      },
      {
        key: "governance",
        title: "Kemitraan & Tata Kelola",
        path: "/keberlanjutan/kemitraan-tata-kelola",
      },
    ],
  },
  {
    key: "information",
    title: "Informasi",
    pages: [
      { key: "contact", title: "Hubungi Kami", path: "/hubungi-kami" },
      {
        key: "emailContact",
        title: "Formulir Email",
        path: "/hubungi-kami/email",
      },
      { key: "dataPolicy", title: "Kebijakan Data", path: "/kebijakan-data" },
      {
        key: "cookieTerms",
        title: "Ketentuan Cookies",
        path: "/ketentuan-cookies",
      },
    ],
  },
] as const

export type PageVisibilityGroupKey =
  (typeof pageVisibilityGroups)[number]["key"]
export type PageVisibilityKey =
  (typeof pageVisibilityGroups)[number]["pages"][number]["key"]

export type PageVisibilityGroups = Partial<
  Record<PageVisibilityGroupKey, Partial<Record<PageVisibilityKey, boolean>>>
>

export type PageVisibilityMap = Record<PageVisibilityKey, boolean>

export function createPageVisibilityMap(
  groups?: PageVisibilityGroups | null,
  defaultEnabled = true
): PageVisibilityMap {
  const visibility = {} as PageVisibilityMap

  for (const group of pageVisibilityGroups) {
    const groupSettings = groups?.[group.key]
    for (const page of group.pages) {
      const enabled = groupSettings?.[page.key]
      visibility[page.key] = enabled === undefined ? defaultEnabled : enabled
    }
  }

  return visibility
}

export function findPageVisibilityEntry(pathname: string) {
  const normalizedPath = normalizePath(pathname)
  const entries = pageVisibilityGroups.flatMap((group) => [...group.pages])
  const exactMatch = entries.find((page) => page.path === normalizedPath)
  if (exactMatch) return exactMatch

  return entries
    .filter((page) => page.path.endsWith("/*"))
    .sort((left, right) => right.path.length - left.path.length)
    .find((page) => normalizedPath.startsWith(page.path.slice(0, -1)))
}

export function isPagePathVisible(
  pathname: string,
  visibility: PageVisibilityMap
) {
  const page = findPageVisibilityEntry(pathname)
  return page ? visibility[page.key] !== false : true
}

function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || "/"
  if (path === "/") return path
  return path.replace(/\/+$/, "")
}
