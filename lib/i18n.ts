export const locales = ["id", "en"] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  id: "ID",
  en: "EN",
}

export const messages = {
  id: {
    home: "Beranda",
    about: "Tentang Kami",
    products: "Produk",
    reach: "Jangkauan",
    articles: "Artikel",
    sustainability: "Keberlanjutan",
    companyProfile: "Profil Perusahaan",
    hopes: "Harapan & Cita-Cita",
    structure: "Struktur Perusahaan",
    partnership: "Kemitraan",
    legality: "Legalitas",
    productsOverview: "Kenali Produk",
    offer: "Penawaran",
    fleet: "Armada",
    news: "Anigos News",
    publications: "Publikasi",
    publicInformation: "Landasan Informasi Publik",
    sustainableEnergy: "Energi Berkelanjutan",
    safety: "Keselamatan Operasional",
    governance: "Kemitraan & Tata Kelola",
    achievements: "Pencapaian Perusahaan",
    contact: "Hubungi Kami",
    mobileMenu: "Menu navigasi",
    mobileDescription: "Jelajahi informasi Petro Anigos.",
    language: "Bahasa",
  },
  en: {
    home: "Home",
    about: "About Us",
    products: "Products",
    reach: "Coverage",
    articles: "Articles",
    sustainability: "Sustainability",
    companyProfile: "Company Profile",
    hopes: "Aspirations & Goals",
    structure: "Company Structure",
    partnership: "Partnerships",
    legality: "Legal Information",
    productsOverview: "Explore Products",
    offer: "Request an Offer",
    fleet: "Fleet",
    news: "Anigos News",
    publications: "Publications",
    publicInformation: "Public Information Basis",
    sustainableEnergy: "Sustainable Energy",
    safety: "Operational Safety",
    governance: "Partnerships & Governance",
    achievements: "Company Milestones",
    contact: "Contact Us",
    mobileMenu: "Navigation menu",
    mobileDescription: "Explore Petro Anigos information.",
    language: "Language",
  },
} as const

export type TranslationKey = keyof (typeof messages)["id"]

export function translate(locale: Locale, key: TranslationKey) {
  return messages[locale][key]
}
