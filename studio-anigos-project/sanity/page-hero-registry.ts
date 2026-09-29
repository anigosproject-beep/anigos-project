export type LocalizedHeroText = {
  id: string
  en: string
}

type PageHeroDefinition = {
  value: string
  title: string
  path: string
  pageKey: string
  pageName: LocalizedHeroText
  heading: LocalizedHeroText
  subtitle: LocalizedHeroText
  currentSource: string
}

export const pageHeroMenus = [
  {
    value: "about",
    title: "Tentang Kami",
    pages: [
      {
        value: "profil-perusahaan",
        title: "Profil Perusahaan",
        path: "/tentang-kami/profil-perusahaan",
        pageKey: "profil-perusahaan",
        pageName: { id: "Tentang Kami", en: "About Us" },
        heading: { id: "Profil Perusahaan", en: "Company Profile" },
        subtitle: {
          id: "Mengenal PT. Anigos Jaya Perkasa dan Petro Anigos sebagai distributor Bahan Bakar Industri untuk kebutuhan konsumen di Indonesia.",
          en: "Learn about PT. Anigos Jaya Perkasa and Petro Anigos as an industrial fuel distributor serving customers across Indonesia.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "harapan-cita-cita",
        title: "Harapan & Cita-Cita",
        path: "/tentang-kami/harapan-cita-cita",
        pageKey: "harapan-cita-cita",
        pageName: { id: "Tentang Kami", en: "About Us" },
        heading: {
          id: "Harapan & Cita-Cita Perusahaan",
          en: "Company Aspirations & Goals",
        },
        subtitle: {
          id: "Distribusi Hari Ini, Kontribusi untuk Negeri",
          en: "Distribution Today, Contribution for the Nation",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "struktur-perusahaan",
        title: "Struktur Perusahaan",
        path: "/tentang-kami/struktur-perusahaan",
        pageKey: "struktur-perusahaan",
        pageName: { id: "Tentang Kami", en: "About Us" },
        heading: { id: "Struktur Perusahaan", en: "Company Structure" },
        subtitle: {
          id: "Mengenal kerangka tata kelola, kepemimpinan, dan fungsi kerja yang mendukung operasional PT. Anigos Jaya Perkasa.",
          en: "Explore the governance, leadership, and functional framework that supports PT. Anigos Jaya Perkasa's operations.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "kemitraan",
        title: "Kemitraan",
        path: "/tentang-kami/kemitraan",
        pageKey: "kemitraan",
        pageName: { id: "Tentang Kami", en: "About Us" },
        heading: { id: "Kemitraan", en: "Partnerships" },
        subtitle: {
          id: "Membangun kerja sama yang bertanggung jawab untuk mendukung distribusi Bahan Bakar Industri ke berbagai wilayah Indonesia.",
          en: "Building responsible cooperation to support industrial fuel distribution across Indonesia.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "legalitas",
        title: "Legalitas",
        path: "/tentang-kami/legalitas",
        pageKey: "legalitas",
        pageName: { id: "Tentang Kami", en: "About Us" },
        heading: { id: "Legalitas", en: "Legal Information" },
        subtitle: {
          id: "Informasi legal dan perizinan yang menjadi dasar operasional PT. Anigos Jaya Perkasa sebagai distributor Bahan Bakar Industri.",
          en: "Legal and licensing information forming the operational basis of PT. Anigos Jaya Perkasa as an industrial fuel distributor.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "karir",
        title: "Karir",
        path: "/tentang-kami/karir",
        pageKey: "karir",
        pageName: { id: "Tentang Kami / Karir", en: "About Us / Careers" },
        heading: {
          id: "Tumbuh bersama energi yang menggerakkan Indonesia.",
          en: "Grow with the energy that moves Indonesia.",
        },
        subtitle: {
          id: "Kami mencari orang-orang yang ingin bekerja dengan tujuan, menjaga kualitas, dan membangun distribusi energi yang dapat diandalkan.",
          en: "We are looking for people who want to work with purpose, maintain quality, and build reliable energy distribution.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "lamar-karir",
        title: "Formulir Lamaran Karir",
        path: "/tentang-kami/karir/lamar",
        pageKey: "lamar-karir",
        pageName: {
          id: "Karir / Lamaran",
          en: "Careers / Application",
        },
        heading: {
          id: "Ceritakan langkah berikutnya.",
          en: "Tell us about your next step.",
        },
        subtitle: {
          id: "Lengkapi data singkat dan lampirkan CV terbaru. Tim kami akan meninjau profil yang masuk sesuai kebutuhan posisi.",
          en: "Complete the short form and attach your latest CV. Our team will review incoming profiles based on position needs.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
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
        pageKey: "kenali-produk",
        pageName: { id: "Produk", en: "Products" },
        heading: {
          id: "Bahan Bakar Industri untuk kebutuhan operasional Anda.",
          en: "Industrial fuel for your operational needs.",
        },
        subtitle: {
          id: "Petro Anigos menyediakan Solar/HSD dan B40 Biosolar dengan mutu serta spesifikasi yang mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia.",
          en: "Petro Anigos supplies Diesel/HSD and B40 Biosolar with quality and specifications aligned with the standards of Indonesia's Directorate General of Oil and Gas.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "penawaran",
        title: "Penawaran",
        path: "/produk/penawaran",
        pageKey: "penawaran",
        pageName: { id: "Produk / Penawaran", en: "Products / Offer" },
        heading: {
          id: "Mulai dari kebutuhan, kami siapkan pembahasannya.",
          en: "Starting with your needs, we prepare the discussion.",
        },
        subtitle: {
          id: "Sampaikan kebutuhan BBM industri Anda agar tim Petro Anigos dapat membantu meninjau produk, volume, lokasi, jadwal, dan skema distribusi yang sesuai.",
          en: "Share your industrial fuel requirements so the Petro Anigos team can review suitable products, volume, location, schedule, and distribution arrangements.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "armada",
        title: "Armada",
        path: "/produk/armada",
        pageKey: "armada",
        pageName: { id: "Produk / Armada", en: "Products / Fleet" },
        heading: {
          id: "Kapasitas armada yang mengikuti skala kebutuhan.",
          en: "Fleet capacity that follows your needs.",
        },
        subtitle: {
          id: "Armada tangki BBM Petro Anigos tersedia dalam beberapa variasi kapasitas untuk mendukung kebutuhan distribusi mulai dari skala kecil hingga industri besar.",
          en: "Petro Anigos fuel tankers are available in various capacities to support distribution needs from small operations to large industries.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "ajukan-penawaran",
        title: "Ajukan Penawaran",
        path: "/produk/penawaran/ajukan",
        pageKey: "ajukan-penawaran",
        pageName: { id: "Produk / Penawaran", en: "Products / Offer" },
        heading: {
          id: "Ajukan kebutuhan BBM industri Anda.",
          en: "Submit your industrial fuel requirements.",
        },
        subtitle: {
          id: "Lengkapi informasi awal agar tim Petro Anigos dapat memahami kebutuhan produk, volume, lokasi, dan moda distribusi yang diperlukan.",
          en: "Complete the initial information so the Petro Anigos team can understand the required product, volume, location, and distribution mode.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
    ],
  },
  {
    value: "coverage",
    title: "Jangkauan",
    pages: [
      {
        value: "jangkauan",
        title: "Halaman Jangkauan",
        path: "/jangkauan",
        pageKey: "jangkauan",
        pageName: { id: "Jangkauan nasional", en: "National coverage" },
        heading: {
          id: "Distribusi BBM industri di seluruh Indonesia.",
          en: "Industrial fuel distribution across Indonesia.",
        },
        subtitle: {
          id: "Petro Anigos melayani kebutuhan bisnis di seluruh Indonesia melalui koordinasi distribusi BBM industri, perencanaan operasional, dan dukungan pengiriman yang terukur.",
          en: "Petro Anigos supports business customers nationwide through coordinated industrial fuel distribution, operational planning, and delivery support across Indonesia.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
    ],
  },
  {
    value: "articles",
    title: "Artikel",
    pages: [
      {
        value: "artikel",
        title: "Artikel",
        path: "/artikel",
        pageKey: "artikel",
        pageName: { id: "Artikel", en: "Articles" },
        heading: {
          id: "Wawasan dan informasi PT. Anigos Jaya Perkasa.",
          en: "Insights and information from PT. Anigos Jaya Perkasa.",
        },
        subtitle: {
          id: "Temukan berita, publikasi, dan landasan informasi yang membantu memahami cara PT. Anigos Jaya Perkasa melayani kebutuhan energi industri.",
          en: "Explore news, publications, and public information about how PT. Anigos Jaya Perkasa serves industrial energy needs.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "anigos-news",
        title: "Anigos News",
        path: "/artikel/anigos-news",
        pageKey: "anigos-news",
        pageName: { id: "Artikel / Anigos News", en: "Articles / Anigos News" },
        heading: {
          id: "Newsroom PT. Anigos Jaya Perkasa.",
          en: "PT. Anigos Jaya Perkasa Newsroom.",
        },
        subtitle: {
          id: "Kabar, perspektif, dan informasi yang membantu memahami energi, distribusi, serta cara kami bekerja.",
          en: "News, perspectives, and information about energy, distribution, and how we work.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "publikasi",
        title: "Publikasi",
        path: "/artikel/publikasi",
        pageKey: "publikasi",
        pageName: { id: "Artikel / Publikasi", en: "Articles / Publications" },
        heading: {
          id: "Dokumentasi publikasi Petro Anigos.",
          en: "Petro Anigos publications.",
        },
        subtitle: {
          id: "Jelajahi dokumentasi visual dan publikasi perusahaan yang disusun berdasarkan kategori.",
          en: "Explore company visual documentation and publications organized by category.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "landasan-informasi-publik",
        title: "Landasan Informasi Publik",
        path: "/artikel/landasan-informasi-publik",
        pageKey: "landasan-informasi-publik",
        pageName: {
          id: "Artikel / Landasan Informasi Publik",
          en: "Articles / Public Information",
        },
        heading: {
          id: "Informasi yang berangkat dari fakta dan sumber yang jelas.",
          en: "Information grounded in facts and clear sources.",
        },
        subtitle: {
          id: "Halaman ini menjelaskan landasan informasi publik PT. Anigos Jaya Perkasa berdasarkan company profile dan data perusahaan yang tersedia.",
          en: "This page explains the public information basis of PT. Anigos Jaya Perkasa using its company profile and available company data.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
    ],
  },
  {
    value: "information",
    title: "Informasi",
    pages: [
      {
        value: "kebijakan-data",
        title: "Kebijakan Data",
        path: "/kebijakan-data",
        pageKey: "kebijakan-data",
        pageName: { id: "Kebijakan Data", en: "Data Policy" },
        heading: {
          id: "Sumber dan penggunaan informasi di website Petro Anigos.",
          en: "Sources and use of information on the Petro Anigos website.",
        },
        subtitle: {
          id: "Halaman ini menjelaskan sumber, status, keterbatasan, dan etika penggunaan informasi cuaca serta pasar yang ditampilkan pada website.",
          en: "This page explains the sources, status, limitations, and ethical use of weather and market information displayed on the website.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
      {
        value: "ketentuan-cookies",
        title: "Ketentuan Cookies",
        path: "/ketentuan-cookies",
        pageKey: "ketentuan-cookies",
        pageName: { id: "Ketentuan Cookies", en: "Cookie Terms" },
        heading: {
          id: "Cara kami menggunakan cookies di website Petro Anigos.",
          en: "How we use cookies on the Petro Anigos website.",
        },
        subtitle: {
          id: "Kami menggunakan cookies secara terbatas untuk mendukung fungsi dasar website dan menghormati pilihan pengunjung.",
          en: "We use cookies in a limited way to support basic website functions and respect visitor choices.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
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
        pageKey: "energi-berkelanjutan",
        pageName: {
          id: "Tanggung Jawab Sosial Perusahaan",
          en: "Corporate Social Responsibility",
        },
        heading: {
          id: "CSR: Tumbuh bersama masyarakat melalui kontribusi yang bermakna.",
          en: "CSR: Growing with communities through meaningful contributions.",
        },
        subtitle: {
          id: "Dokumentasi kegiatan CSR Petro Anigos dari tahun ke tahun, sebagai catatan kontribusi dan kebersamaan dengan masyarakat.",
          en: "A year-by-year record of Petro Anigos CSR activities and its contributions alongside communities.",
        },
        currentSource: "/images/page-hero/tentang-kami.webp",
      },
    ],
  },
] as const satisfies ReadonlyArray<{
  value: string
  title: string
  pages: readonly PageHeroDefinition[]
}>

export function findPageHeroMenu(value: string | undefined) {
  return pageHeroMenus.find((menu) => menu.value === value)
}
