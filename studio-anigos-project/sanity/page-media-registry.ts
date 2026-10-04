import { marineFuelSlotsByVariant } from "../../shared/sanity-content-contracts"

export const pageMediaMenus = [
  {
    value: "home",
    title: "Beranda",
    pages: [
      {
        value: "home",
        title: "Halaman Beranda",
        path: "/",
        slots: [
          {
            id: "home-about-background",
            title: "Gambar di Tentang Kami",
            sectionName: "Tentang Kami",
            mediaType: "image",
            container:
              "Full-bleed; tinggi min. 28rem / 32rem / 37.5rem; rasio dinamis",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource: "/images/company/office.png (fallback lokal)",
          },
          {
            id: marineFuelSlotsByVariant.home[0],
            title: "Marine Fuel — Latar cadangan (gambar)",
            sectionName: "Marine Fuel",
            mediaType: "image",
            container: "Latar full-bleed; tinggi 100svh; crop responsif",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource:
              "Unggah gambar di slot ini untuk mengganti latar cadangan Marine Fuel.",
          },
          {
            id: marineFuelSlotsByVariant.home[1],
            title: "Marine Fuel — Video",
            sectionName: "Marine Fuel",
            mediaType: "video",
            container: "Pemutar video responsif 16:9",
            fit: "cover",
            expectedRatio: "16:9 disarankan",
            currentSource:
              "Unggah video di slot ini untuk ditampilkan di pemutar Marine Fuel.",
          },
          ...Array.from({ length: 4 }, (_, index) => ({
            id: `home-product-logo-${index + 1}`,
            title: `Logo produk segmen 1 — ${String(index + 1).padStart(2, "0")}`,
            sectionName: "Produk & Layanan — Logo",
            mediaType: "image" as const,
            container: "Wadah logo seragam 180 × 80 px; responsif",
            fit: "contain" as const,
            expectedRatio:
              "Rasio bebas; gunakan logo PNG/SVG dengan latar transparan",
            currentSource: "Unggah logo untuk segmen Produk & Layanan",
          })),
          {
            id: "home-resource-card-1",
            title: "Kartu pintasan 1 — CSR",
            sectionName: "Pintasan halaman",
            mediaType: "image",
            container: "Kartu responsif 4:3",
            fit: "cover",
            expectedRatio: "4:3 disarankan; gambar mengikuti Page Hero tujuan",
            currentSource:
              "Gambar diambil otomatis dari Page Hero halaman tujuan",
            linkedPagePath: "/keberlanjutan/energi-berkelanjutan",
          },
          {
            id: "home-resource-card-2",
            title: "Kartu pintasan 2 — Keselamatan Operasional",
            sectionName: "Pintasan halaman",
            mediaType: "image",
            container: "Kartu responsif 4:3",
            fit: "cover",
            expectedRatio: "4:3 disarankan; gambar mengikuti Page Hero tujuan",
            currentSource:
              "Gambar diambil otomatis dari Page Hero halaman tujuan",
            linkedPagePath: "/keberlanjutan/keselamatan-operasional",
          },
          {
            id: "home-resource-card-3",
            title: "Kartu pintasan 3 — Publikasi",
            sectionName: "Pintasan halaman",
            mediaType: "image",
            container: "Kartu responsif 4:3",
            fit: "cover",
            expectedRatio: "4:3 disarankan; gambar mengikuti Page Hero tujuan",
            currentSource:
              "Gambar diambil otomatis dari Page Hero halaman tujuan",
            linkedPagePath: "/artikel/publikasi",
          },
        ],
      },
    ],
  },
  {
    value: "about",
    title: "Tentang Kami",
    pages: [
      {
        value: "company-profile",
        title: "Profil Perusahaan",
        path: "/tentang-kami/profil-perusahaan",
        slots: [
          {
            id: "company-profile-story-video",
            title: "Profil Perusahaan — Video cerita",
            sectionName: "Cerita perusahaan",
            mediaType: "video",
            container: "16:9 (aspect-video)",
            fit: "cover",
            expectedRatio: "16:9",
            currentSource:
              "/video-hero/0914.mp4 (fallback lokal; diganti setelah upload dan publish)",
          },
          {
            id: "company-profile-journey-background",
            title: "Gambar di Perjalanan Perusahaan",
            sectionName: "Perjalanan Perusahaan",
            mediaType: "image",
            container:
              "Full-bleed; tinggi min. 28rem / 32rem / 37.5rem; rasio dinamis",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource:
              "/images/page-hero/tentang-kami.webp (fallback lokal)",
          },
        ],
      },
      {
        value: "aspirations",
        title: "Harapan dan Cita-Cita",
        path: "/tentang-kami/harapan-cita-cita",
        slots: [
          {
            id: "aspirations-intro-image",
            title: "Gambar di Energi yang bergerak, harapan yang tumbuh",
            sectionName: "Energi yang bergerak, harapan yang tumbuh",
            mediaType: "image",
            container:
              "Kolom responsif; tinggi min. 22rem / 28rem / 32rem; rasio dinamis",
            fit: "contain",
            expectedRatio: "Rasio bebas; seluruh gambar harus terlihat",
            currentSource:
              "/images/patterns/home-section-01/home-section-01-pattern.svg",
          },
        ],
      },
      {
        value: "partnership",
        title: "Client",
        path: "/tentang-kami/client",
        slots: [
          {
            id: "partnership-intro-image",
            title: "Gambar di Mitra Transportir Resmi",
            sectionName: "Mitra Transportir Resmi",
            mediaType: "image",
            container: "16:9",
            fit: "cover",
            expectedRatio: "16:9",
            currentSource: "/images/partnership/partnership-transportation.svg",
          },
        ],
      },
    ],
  },
  {
    value: "products",
    title: "Produk",
    pages: [
      {
        value: "product-overview",
        title: "Kenali Produk",
        path: "/produk/kenali-produk",
        slots: [
          {
            id: marineFuelSlotsByVariant.product[0],
            title: "Marine Fuel — Latar cadangan (gambar)",
            sectionName: "Marine Fuel",
            mediaType: "image",
            container: "Latar full-bleed; tinggi 100svh; crop responsif",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource:
              "Unggah gambar di slot ini untuk mengganti latar cadangan Marine Fuel.",
          },
          {
            id: marineFuelSlotsByVariant.product[1],
            title: "Marine Fuel — Video",
            sectionName: "Marine Fuel",
            mediaType: "video",
            container: "Pemutar video responsif 16:9",
            fit: "cover",
            expectedRatio: "16:9 disarankan",
            currentSource:
              "Unggah video di slot ini untuk ditampilkan di pemutar Marine Fuel.",
          },
          {
            id: "product-introduction-video",
            title: "Kenali Produk — Video pengantar",
            sectionName: "Mengenal produk",
            mediaType: "video",
            container: "16:9 (aspect-video)",
            fit: "cover",
            expectedRatio: "16:9",
            currentSource:
              "/video-hero/0914.mp4 (fallback lokal; diganti setelah upload dan publish)",
          },
        ],
      },
    ],
  },
  {
    value: "coverage",
    title: "Jangkauan",
    pages: [
      {
        value: "coverage",
        title: "Halaman Jangkauan",
        path: "/jangkauan",
        slots: [
          {
            id: "coverage-requirement-background",
            title: "Gambar di Verifikasi kebutuhan",
            sectionName: "Verifikasi kebutuhan",
            mediaType: "image",
            container: "Full-bleed; tinggi mengikuti konten; rasio dinamis",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource: "/images/distribution/distribution-map.png",
          },
          {
            id: "coverage-work-flipcard-1",
            title: "Flipcard 1",
            sectionName: "Perencanaan pengiriman bisnis",
            mediaType: "image",
            container:
              "Grid responsif 3 kolom; tinggi minimum 18.25rem; rasio kartu mengikuti lebar kolom",
            fit: "cover",
            expectedRatio:
              "Rasio responsif; sumber lanskap disarankan dan dapat di-crop",
            currentSource: "/images/distribution/distribution-map.png",
          },
          {
            id: "coverage-work-flipcard-2",
            title: "Flipcard 2",
            sectionName: "Perencanaan pengiriman bisnis",
            mediaType: "image",
            container:
              "Grid responsif 3 kolom; tinggi minimum 18.25rem; rasio kartu mengikuti lebar kolom",
            fit: "cover",
            expectedRatio:
              "Rasio responsif; sumber lanskap disarankan dan dapat di-crop",
            currentSource: "/images/distribution/fuel-distribution.png",
          },
          {
            id: "coverage-work-flipcard-3",
            title: "Flipcard 3",
            sectionName: "Perencanaan pengiriman bisnis",
            mediaType: "image",
            container:
              "Grid responsif 3 kolom; tinggi minimum 18.25rem; rasio kartu mengikuti lebar kolom",
            fit: "cover",
            expectedRatio:
              "Rasio responsif; sumber lanskap disarankan dan dapat di-crop",
            currentSource: "/images/partnership/transport-carrier.png",
          },
        ],
      },
    ],
  },
] as const

export type PageMediaMenu = (typeof pageMediaMenus)[number]
export type PageMediaMenuValue = PageMediaMenu["value"]
export type PageMediaPage = PageMediaMenu["pages"][number]
export type PageMediaSlot = PageMediaPage["slots"][number]

export const pageMediaFieldNames = {
  home: "homeSlots",
  "company-profile": "companyProfileSlots",
  aspirations: "aspirationsSlots",
  partnership: "partnershipSlots",
  "product-overview": "productsSlots",
  coverage: "coverageSlots",
} as const

export function findPageMediaMenu(value: string | undefined) {
  return pageMediaMenus.find((menu) => menu.value === value)
}

export function findPageMediaPage(
  menuValue: string | undefined,
  pageValue: string | undefined
) {
  return findPageMediaMenu(menuValue)?.pages.find(
    (page) => page.value === pageValue
  )
}
