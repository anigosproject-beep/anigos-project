export type NewsroomCategory = {
  slug: string
  name: string
  description: string
  subcategories: Array<{
    slug: string
    name: string
  }>
}

export type NewsroomArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  subcategory: string
  date: string
  readTime: string
  image: string
  featured?: boolean
  content: string[]
}

export const newsroomCategories: NewsroomCategory[] = [
  {
    slug: "perusahaan",
    name: "Perusahaan",
    description: "Kabar, langkah, dan perkembangan PT. Anigos Jaya Perkasa.",
    subcategories: [
      { slug: "berita-perusahaan", name: "Berita perusahaan" },
      { slug: "kemitraan", name: "Kemitraan" },
    ],
  },
  {
    slug: "operasional",
    name: "Operasional & Distribusi",
    description: "Cerita di balik proses distribusi BBM yang aman dan terkoordinasi.",
    subcategories: [
      { slug: "distribusi", name: "Distribusi" },
      { slug: "keselamatan", name: "Keselamatan operasional" },
    ],
  },
  {
    slug: "energi",
    name: "Energi & Produk",
    description: "Informasi produk, mutu, dan konteks energi untuk kebutuhan industri.",
    subcategories: [
      { slug: "produk", name: "Produk" },
      { slug: "informasi-energi", name: "Informasi energi" },
    ],
  },
  {
    slug: "keberlanjutan",
    name: "Keberlanjutan",
    description: "Perspektif tentang energi, tata kelola, dan hubungan yang bertanggung jawab.",
    subcategories: [
      { slug: "energi-berkelanjutan", name: "Energi berkelanjutan" },
      { slug: "tata-kelola", name: "Tata kelola" },
    ],
  },
]

export const newsroomArticles: NewsroomArticle[] = [
  {
    slug: "mengenal-peran-distribusi-bbm-industri",
    title: "Mengenal peran distribusi BBM dalam menjaga kesinambungan operasional industri",
    excerpt: "Distribusi yang terencana membantu pelanggan mengelola kebutuhan energi dengan lebih tertib, aman, dan terukur.",
    category: "operasional",
    subcategory: "distribusi",
    date: "2026-08-22",
    readTime: "5 menit",
    image: "/images/articles/article-operation.svg",
    featured: true,
    content: [
      "Kebutuhan BBM industri tidak berhenti pada ketersediaan produk. Ketepatan lokasi, jadwal, volume, dan moda pengiriman ikut menentukan kelancaran operasional pelanggan.",
      "Karena itu, proses distribusi perlu dimulai dari pemahaman kebutuhan yang jelas. Informasi titik bongkar, pola pemakaian, dan jadwal penerimaan menjadi bahan penting untuk menyusun pembahasan pengiriman.",
      "Petro Anigos mengembangkan pendekatan berbasis koordinasi agar kebutuhan produk dan dukungan logistik dapat dibahas secara menyeluruh bersama pelanggan.",
    ],
  },
  {
    slug: "memahami-b40-biosolar",
    title: "Memahami B40 Biosolar dan komposisinya",
    excerpt: "B40 menggabungkan biodiesel dan solar/HSD dalam komposisi yang perlu dipahami sesuai konteks penggunaannya.",
    category: "energi",
    subcategory: "produk",
    date: "2026-08-08",
    readTime: "4 menit",
    image: "/images/articles/article-b40.svg",
    content: [
      "B40 Biosolar merupakan campuran dengan komposisi 40% biodiesel dan 60% solar/HSD. Informasi komposisi membantu pengguna memahami karakter dasar produk sebelum membahas kebutuhan pengadaan.",
      "Pemilihan produk tetap perlu mempertimbangkan spesifikasi operasional, ketentuan yang berlaku, dan kebutuhan pengguna. Artikel ini berfungsi sebagai informasi awal, bukan pengganti konfirmasi teknis.",
    ],
  },
  {
    slug: "armada-dan-koordinasi-pengiriman",
    title: "Armada dan koordinasi pengiriman untuk kebutuhan antardaerah",
    excerpt: "Pilihan kapasitas armada membantu pembahasan distribusi disesuaikan dengan volume dan karakter kebutuhan pelanggan.",
    category: "operasional",
    subcategory: "distribusi",
    date: "2026-07-18",
    readTime: "6 menit",
    image: "/images/partnership/partnership-transportation.svg",
    content: [
      "Setiap kebutuhan pengiriman memiliki konteks yang berbeda. Volume, akses lokasi, frekuensi, dan waktu penerimaan menjadi pertimbangan dalam menentukan opsi distribusi.",
      "Armada darat dengan kapasitas yang beragam dapat menjadi bagian dari pembahasan awal. Untuk kebutuhan antarpulau, koordinasi moda transportasi juga perlu dilakukan secara bertahap.",
    ],
  },
  {
    slug: "membangun-kemitraan-distribusi-yang-bertanggung-jawab",
    title: "Membangun kemitraan distribusi yang bertanggung jawab",
    excerpt: "Kemitraan yang jelas membantu menjaga koordinasi, kepatuhan, dan kualitas layanan distribusi.",
    category: "perusahaan",
    subcategory: "kemitraan",
    date: "2026-06-30",
    readTime: "5 menit",
    image: "/images/partnership/partnership-business.svg",
    content: [
      "Kemitraan distribusi membutuhkan pembagian peran yang jelas dan komunikasi yang konsisten. Legalitas, kesiapan operasional, serta tanggung jawab layanan menjadi bagian dari proses verifikasi.",
      "Hubungan jangka panjang dibangun melalui transparansi informasi dan evaluasi kebutuhan yang dilakukan bersama.",
    ],
  },
]

export function getNewsroomSegments(
  articles: NewsroomArticle[] = newsroomArticles,
  categories: NewsroomCategory[] = newsroomCategories
) {
  const knownCategories = new Map(categories.map((category) => [category.slug, category]))
  const categorySlugs = Array.from(
    new Set([...categories.map((category) => category.slug), ...articles.map((article) => article.category)])
  )

  return categorySlugs
    .map((slug) => {
      const category = knownCategories.get(slug)
      const categoryArticles = articles
        .filter((article) => article.category === slug)
        .sort((a, b) => b.date.localeCompare(a.date))

      return {
        slug,
        name: category?.name ?? slug.replaceAll("-", " "),
        description:
          category?.description ?? `Artikel dan informasi dalam kategori ${slug.replaceAll("-", " ")}.`,
        subcategories: category?.subcategories ?? [],
        articles: categoryArticles,
      }
    })
    .filter((category) => category.articles.length > 0)
}

export function getArticleBySlug(slug: string) {
  return newsroomArticles.find((article) => article.slug === slug)
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}
