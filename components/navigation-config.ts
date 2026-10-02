import type { TranslationKey } from "@/lib/i18n"
import {
  isPagePathVisible,
  type PageVisibilityMap,
} from "@/shared/page-visibility-registry"

export type NavigationItem = {
  label: string
  href: string
  descriptionKey?: TranslationKey
  children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang Kami",
    href: "/tentang-kami/profil-perusahaan",
    descriptionKey: "navAboutDescription",
    children: [
      {
        label: "Profil Perusahaan",
        href: "/tentang-kami/profil-perusahaan",
        descriptionKey: "navCompanyProfileDescription",
      },
      {
        label: "Harapan & Cita-Cita",
        href: "/tentang-kami/harapan-cita-cita",
        descriptionKey: "navHopesDescription",
      },
      {
        label: "Struktur Perusahaan",
        href: "/tentang-kami/struktur-perusahaan",
        descriptionKey: "navStructureDescription",
      },
      {
        label: "Client",
        href: "/tentang-kami/client",
        descriptionKey: "navClientDescription",
      },
      {
        label: "Legalitas",
        href: "/tentang-kami/legalitas",
        descriptionKey: "navLegalityDescription",
      },
      {
        label: "Karir",
        href: "/tentang-kami/karir",
        descriptionKey: "navCareerDescription",
      },
    ],
  },
  {
    label: "Produk",
    href: "/produk/kenali-produk",
    descriptionKey: "navProductsDescription",
    children: [
      {
        label: "Kenali Produk",
        href: "/produk/kenali-produk",
        descriptionKey: "navProductsOverviewDescription",
      },
      {
        label: "Penawaran",
        href: "/produk/penawaran",
        descriptionKey: "navOfferDescription",
      },
      {
        label: "Layanan",
        href: "/produk/armada",
        descriptionKey: "navServicesDescription",
      },
    ],
  },
  { label: "Jangkauan", href: "/jangkauan" },
  {
    label: "Artikel",
    href: "/artikel/anigos-news",
    descriptionKey: "navArticlesDescription",
    children: [
      {
        label: "Anigos News",
        href: "/artikel/anigos-news",
        descriptionKey: "navNewsDescription",
      },
      {
        label: "Publikasi",
        href: "/artikel/publikasi",
        descriptionKey: "navPublicationsDescription",
      },
      {
        label: "Landasan Informasi Publik",
        href: "/artikel/landasan-informasi-publik",
        descriptionKey: "navPublicInformationDescription",
      },
    ],
  },
  {
    label: "Keberlanjutan",
    href: "/keberlanjutan",
    children: [
      {
        label: "CSR",
        href: "/keberlanjutan/energi-berkelanjutan",
        descriptionKey: "navCsrDescription",
      },
      {
        label: "Keselamatan Operasional",
        href: "/keberlanjutan/keselamatan-operasional",
        descriptionKey: "navSafetyDescription",
      },
      {
        label: "Kemitraan & Tata Kelola",
        href: "/keberlanjutan/kemitraan-tata-kelola",
        descriptionKey: "navGovernanceDescription",
      },
      {
        label: "Pencapaian Perusahaan",
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
