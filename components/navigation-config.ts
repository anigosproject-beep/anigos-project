export type NavigationItem = {
  label: string
  href: string
  description?: string
  children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang Kami",
    href: "/tentang-kami/profil-perusahaan",
    description: "Mengenal identitas dan cara kami bekerja.",
    children: [
      {
        label: "Profil Perusahaan",
        href: "/tentang-kami/profil-perusahaan",
        description: "Identitas, visi, misi, dan nilai perusahaan.",
      },
      {
        label: "Harapan & Cita-Cita",
        href: "/tentang-kami/harapan-cita-cita",
        description: "Arah kontribusi dan cita-cita perusahaan.",
      },
      {
        label: "Struktur Perusahaan",
        href: "/tentang-kami/struktur-perusahaan",
        description: "Struktur dan jaringan operasional perusahaan.",
      },
      {
        label: "Kemitraan",
        href: "/tentang-kami/kemitraan",
        description: "Mitra strategis yang mendukung layanan kami.",
      },
      {
        label: "Legalitas",
        href: "/tentang-kami/legalitas",
        description: "Informasi legalitas dan perizinan perusahaan.",
      },
      {
        label: "Karir",
        href: "/tentang-kami/karir",
        description: "Bergabung dan berkembang bersama Petro Anigos.",
      },
    ],
  },
  {
    label: "Produk",
    href: "/produk/kenali-produk",
    description: "Solusi BBM untuk kebutuhan industri.",
    children: [
      {
        label: "Kenali Produk",
        href: "/produk/kenali-produk",
        description: "Mengenal produk dan spesifikasi BBM.",
      },
      {
        label: "Penawaran",
        href: "/produk/penawaran",
        description: "Ajukan kebutuhan dan dapatkan penawaran.",
      },
      {
        label: "Armada",
        href: "/produk/armada",
        description: "Kapabilitas armada dan distribusi kami.",
      },
    ],
  },
  { label: "Jangkauan", href: "/jangkauan" },
  {
    label: "Artikel",
    href: "/artikel/anigos-news",
    description: "Berita, publikasi, dan landasan informasi Petro Anigos.",
    children: [
      {
        label: "Anigos News",
        href: "/artikel/anigos-news",
        description: "Berita dan kabar terbaru dari Petro Anigos.",
      },
      {
        label: "Publikasi",
        href: "/artikel/publikasi",
        description: "Publikasi dan materi informasi perusahaan.",
      },
      {
        label: "Landasan Informasi Publik",
        href: "/artikel/landasan-informasi-publik",
        description: "Pedoman hukum untuk artikel dan publikasi.",
      },
    ],
  },
  {
    label: "Keberlanjutan",
    href: "/keberlanjutan",
    children: [
      {
        label: "Energi Berkelanjutan",
        href: "/keberlanjutan/energi-berkelanjutan",
        description: "Peran B40 Biosolar dalam mendukung energi berbasis nabati.",
      },
      {
        label: "Keselamatan Operasional",
        href: "/keberlanjutan/keselamatan-operasional",
        description: "Komitmen terhadap distribusi BBM yang aman dan profesional.",
      },
      {
        label: "Kemitraan & Tata Kelola",
        href: "/keberlanjutan/kemitraan-tata-kelola",
        description: "Transparansi, integritas, dan kemitraan yang bertanggung jawab.",
      },
      {
        label: "Pencapaian Perusahaan",
        href: "/keberlanjutan/pencapaian-perusahaan",
        description: "Milestone dan perkembangan operasional perusahaan.",
      },
    ],
  },
]
