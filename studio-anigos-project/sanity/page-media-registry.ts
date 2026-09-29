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
            id: "home-marine-fuel-background",
            title: "Latar Marine Fuel",
            sectionName: "Marine Fuel",
            mediaType: "image",
            container: "Latar full-bleed; tinggi 100svh; crop responsif",
            fit: "cover",
            expectedRatio: "16:9 disarankan; crop responsif",
            currentSource:
              "/images/distribution/fuel-distribution.png (fallback lokal)",
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
            title: "Video di Cerita perusahaan",
            sectionName: "Cerita perusahaan",
            mediaType: "video",
            container: "16:9 (aspect-video)",
            fit: "cover",
            expectedRatio: "16:9",
            currentSource: "/video-hero/0914.mp4 (video lokal)",
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
        title: "Kemitraan",
        path: "/tentang-kami/kemitraan",
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
            id: "product-introduction-video",
            title: "Video di Mengenal produk",
            sectionName: "Mengenal produk",
            mediaType: "video",
            container: "16:9 (aspect-video)",
            fit: "cover",
            expectedRatio: "16:9",
            currentSource: "/video-hero/0914.mp4 (video lokal)",
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
