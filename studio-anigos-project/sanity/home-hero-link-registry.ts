export const homeHeroLinkMenus = [
  {
    value: "home",
    title: "Beranda",
    pages: [{ value: "home", title: "Beranda", path: "/" }],
  },
  {
    value: "about",
    title: "Tentang Kami",
    pages: [
      {
        value: "profil-perusahaan",
        title: "Profil Perusahaan",
        path: "/tentang-kami/profil-perusahaan",
      },
      {
        value: "harapan-cita-cita",
        title: "Harapan & Cita-Cita",
        path: "/tentang-kami/harapan-cita-cita",
      },
      {
        value: "struktur-perusahaan",
        title: "Struktur Perusahaan",
        path: "/tentang-kami/struktur-perusahaan",
      },
      {
        value: "kemitraan",
        title: "Kemitraan",
        path: "/tentang-kami/kemitraan",
      },
      {
        value: "legalitas",
        title: "Legalitas",
        path: "/tentang-kami/legalitas",
      },
      { value: "karir", title: "Karir", path: "/tentang-kami/karir" },
    ],
  },
  {
    value: "products",
    title: "Produk",
    pages: [
      {
        value: "kenali-produk",
        title: "Kenali Produk",
        path: "/produk/kenali-produk",
      },
      {
        value: "penawaran",
        title: "Penawaran",
        path: "/produk/penawaran",
      },
      { value: "armada", title: "Armada", path: "/produk/armada" },
    ],
  },
  {
    value: "coverage",
    title: "Jangkauan",
    pages: [
      {
        value: "jangkauan",
        title: "Jangkauan",
        path: "/jangkauan",
      },
    ],
  },
  {
    value: "articles",
    title: "Artikel",
    pages: [
      {
        value: "anigos-news",
        title: "Anigos News",
        path: "/artikel/anigos-news",
      },
      {
        value: "publikasi",
        title: "Publikasi",
        path: "/artikel/publikasi",
      },
      {
        value: "landasan-informasi-publik",
        title: "Landasan Informasi Publik",
        path: "/artikel/landasan-informasi-publik",
      },
    ],
  },
  {
    value: "sustainability",
    title: "Keberlanjutan",
    pages: [
      {
        value: "csr",
        title: "CSR",
        path: "/keberlanjutan/energi-berkelanjutan",
      },
      {
        value: "keselamatan-operasional",
        title: "Keselamatan Operasional",
        path: "/keberlanjutan/keselamatan-operasional",
      },
      {
        value: "kemitraan-tata-kelola",
        title: "Kemitraan & Tata Kelola",
        path: "/keberlanjutan/kemitraan-tata-kelola",
      },
      {
        value: "pencapaian-perusahaan",
        title: "Pencapaian Perusahaan",
        path: "/keberlanjutan",
      },
    ],
  },
] as const
