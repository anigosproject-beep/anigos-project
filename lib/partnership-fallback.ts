import type {PartnershipPageResponse} from "@/lib/sanity-content-types"

export type PartnershipItem = NonNullable<NonNullable<PartnershipPageResponse["showcase"]>[number]>

export const mockActivePartners: PartnershipItem[] = [
  {
    _id: "mock-partner-nusantara-logistik",
    name: "PT Nusantara Logistik Energi",
    partnerSince: "2021-04-12",
    portfolio:
      "Kemitraan distribusi energi untuk mendukung kebutuhan operasional armada dan fasilitas industri di wilayah Jabodetabek.",
    body:
      "PT Nusantara Logistik Energi menjadi mitra aktif dalam pengelolaan kebutuhan bahan bakar, koordinasi pengiriman, dan penguatan layanan distribusi yang tepat waktu.",
    partnershipBackground:
      "Kemitraan ini dibangun untuk menjawab kebutuhan operasional armada dan fasilitas industri yang memerlukan pasokan energi terjadwal, komunikasi yang jelas, serta dukungan distribusi yang dapat diandalkan.\n\nKolaborasi antara kedua perusahaan mencakup koordinasi kebutuhan, penjadwalan pengiriman, pemantauan layanan, dan evaluasi berkala agar aktivitas partner dapat berjalan secara konsisten. Setiap tahapan dikoordinasikan oleh tim operasional untuk menjaga ketepatan waktu, kesiapan armada, dan kesinambungan pasokan.\n\nPendekatan ini memberi ruang bagi kedua pihak untuk menyesuaikan layanan dengan perubahan kebutuhan lapangan, sekaligus mempertahankan standar keselamatan dan kualitas layanan yang telah disepakati.",
    partnershipClosing:
      "Melalui kerja sama yang terukur dan komunikasi yang berkelanjutan, kemitraan ini terus dikembangkan untuk memberikan dukungan energi yang aman, tepat waktu, dan relevan dengan kebutuhan operasional.",
    portfolioDocument: {
      url: "/documents/mock-portofolio-kemitraan-nusantara.pdf",
      originalFilename: "Portofolio-Kemitraan-Nusantara-Logistik.pdf",
    },
    logo: {url: "/images/partnership/partnership-transportation.svg", alt: "Logo PT Nusantara Logistik Energi"},
    image: {url: "/images/partnership/partnership-transportation.svg"},
    gallery: [
      {url: "/images/partnership/partnership-transportation.svg", alt: "Armada dan layanan transportasi energi untuk kebutuhan operasional partner."},
      {url: "/images/partnership/partnership-business.svg", alt: "Kolaborasi bisnis dan koordinasi layanan antara tim Anigos dan partner."},
      {url: "/images/partnership/partnership-distribution.svg", alt: "Distribusi energi dan dukungan operasional menuju lokasi partner."},
    ],
  },
  {
    _id: "mock-partner-cakrawala-industri",
    name: "PT Cakrawala Industri Mandiri",
    partnerSince: "2022-08-03",
    portfolio:
      "Penyediaan solusi energi untuk mendukung kesinambungan proses produksi dan kegiatan industri.",
    body:
      "Kerja sama mencakup perencanaan kebutuhan, penjadwalan pasokan, dan dukungan komunikasi antara tim operasional dan pelanggan.",
    partnershipBackground:
      "Kemitraan ini mendukung kesinambungan proses produksi melalui perencanaan pasokan dan koordinasi operasional yang terarah.",
    partnershipClosing:
      "Kolaborasi akan terus dievaluasi agar tetap selaras dengan kebutuhan industri.",
    logo: {url: "/images/partnership/partnership-business.svg", alt: "Logo PT Cakrawala Industri Mandiri"},
    image: {url: "/images/partnership/partnership-business.svg"},
    gallery: [{url: "/images/partnership/partnership-business.svg"}],
  },
  {
    _id: "mock-partner-maritim-sejahtera",
    name: "PT Maritim Sejahtera Transport",
    partnerSince: "2023-01-18",
    portfolio:
      "Kolaborasi layanan transportasi dan distribusi untuk menjangkau titik operasional dengan kebutuhan energi yang beragam.",
    body:
      "Mitra aktif ini mendukung koordinasi transportasi, kesiapan armada, dan pelaksanaan pengiriman sesuai standar keselamatan operasional.",
    partnershipBackground:
      "Kemitraan ini berangkat dari kebutuhan koordinasi transportasi dan distribusi energi untuk mendukung titik operasional dengan karakteristik yang beragam.",
    partnershipClosing:
      "Kerja sama dijalankan dengan mengutamakan kesiapan armada, keselamatan, dan ketepatan layanan.",
    logo: {url: "/images/partnership/partnership-distribution.svg", alt: "Logo PT Maritim Sejahtera Transport"},
    image: {url: "/images/partnership/partnership-distribution.svg"},
    gallery: [{url: "/images/partnership/partnership-distribution.svg"}],
  },
]
