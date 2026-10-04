import type { TranslationKey } from "@/lib/i18n"
import {
  isPagePathVisible,
  type PageVisibilityMap,
} from "@/shared/page-visibility-registry"

export type NavigationItem = {
  label: string
  labelKey: TranslationKey
  href: string
  descriptionKey?: TranslationKey
  children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  { label: "Beranda", labelKey: "home", href: "/" },
  {
    label: "Tentang Kami",
    labelKey: "about",
    href: "/tentang-kami/profil-perusahaan",
    descriptionKey: "navAboutDescription",
    children: [
      {
        label: "Profil Perusahaan",
        labelKey: "companyProfile",
        href: "/tentang-kami/profil-perusahaan",
        descriptionKey: "navCompanyProfileDescription",
      },
      {
        label: "Harapan & Cita-Cita",
        labelKey: "hopes",
        href: "/tentang-kami/harapan-cita-cita",
        descriptionKey: "navHopesDescription",
      },
      {
        label: "Struktur Perusahaan",
        labelKey: "structure",
        href: "/tentang-kami/struktur-perusahaan",
        descriptionKey: "navStructureDescription",
      },
      {
        label: "Client",
        labelKey: "clientNav",
        href: "/tentang-kami/client",
        descriptionKey: "navClientDescription",
      },
      {
        label: "Legalitas",
        labelKey: "legality",
        href: "/tentang-kami/legalitas",
        descriptionKey: "navLegalityDescription",
      },
      {
        label: "Karir",
        labelKey: "career",
        href: "/tentang-kami/karir",
        descriptionKey: "navCareerDescription",
      },
    ],
  },
  {
    label: "Produk",
    labelKey: "products",
    href: "/produk/kenali-produk",
    descriptionKey: "navProductsDescription",
    children: [
      {
        label: "Kenali Produk",
        labelKey: "productsOverview",
        href: "/produk/kenali-produk",
        descriptionKey: "navProductsOverviewDescription",
      },
      {
        label: "Penawaran",
        labelKey: "offer",
        href: "/produk/penawaran",
        descriptionKey: "navOfferDescription",
      },
      {
        label: "Layanan",
        labelKey: "services",
        href: "/produk/armada",
        descriptionKey: "navServicesDescription",
      },
    ],
  },
  { label: "Jangkauan", labelKey: "reach", href: "/jangkauan" },
  {
    label: "Artikel",
    labelKey: "articles",
    href: "/artikel/anigos-news",
    descriptionKey: "navArticlesDescription",
    children: [
      {
        label: "Anigos News",
        labelKey: "news",
        href: "/artikel/anigos-news",
        descriptionKey: "navNewsDescription",
      },
      {
        label: "Publikasi",
        labelKey: "publications",
        href: "/artikel/publikasi",
        descriptionKey: "navPublicationsDescription",
      },
      {
        label: "Landasan Informasi Publik",
        labelKey: "publicInformation",
        href: "/artikel/landasan-informasi-publik",
        descriptionKey: "navPublicInformationDescription",
      },
    ],
  },
  {
    label: "Keberlanjutan",
    labelKey: "sustainability",
    href: "/keberlanjutan",
    children: [
      {
        label: "CSR",
        labelKey: "csr",
        href: "/keberlanjutan/energi-berkelanjutan",
        descriptionKey: "navCsrDescription",
      },
      {
        label: "Keselamatan Operasional",
        labelKey: "safety",
        href: "/keberlanjutan/keselamatan-operasional",
        descriptionKey: "navSafetyDescription",
      },
      {
        label: "Kemitraan & Tata Kelola",
        labelKey: "governance",
        href: "/keberlanjutan/kemitraan-tata-kelola",
        descriptionKey: "navGovernanceDescription",
      },
      {
        label: "Pencapaian Perusahaan",
        labelKey: "achievements",
        href: "/keberlanjutan",
        descriptionKey: "navAchievementsDescription",
      },
    ],
  },
]

export function getVisibleNavigationItems(
  visibility: PageVisibilityMap
): NavigationItem[] {
  return navigationItems.flatMap((item) => {
    if (!item.children) {
      return isPagePathVisible(item.href, visibility) ? [item] : []
    }

    const children = item.children.filter((child) =>
      isPagePathVisible(child.href, visibility)
    )
    return children.length > 0 ? [{ ...item, children }] : []
  })
}
