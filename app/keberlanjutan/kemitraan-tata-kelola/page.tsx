import { FileCheck2, Handshake, Scale } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KemitraanTataKelolaPage() {
  return (
    <CorporateTopicPage
      eyebrow="Keberlanjutan / Kemitraan & Tata Kelola"
      title="Hubungan baik yang dibangun dengan integritas."
      description="Petro Anigos menjaga hubungan dengan rekan usaha, konsumen, dan Pemerintah Republik Indonesia untuk menciptakan iklim bisnis yang sehat."
      breadcrumbs={[
        { label: "Keberlanjutan", href: "/keberlanjutan" },
        { label: "Kemitraan & Tata Kelola", href: "/keberlanjutan/kemitraan-tata-kelola" },
      ]}
      introEyebrow="Tata Kelola"
      introTitle="Kemitraan yang bertumbuh dari kejelasan dan kepatuhan."
      introDescription="Narasi ini menggunakan prinsip yang tercantum dalam company profile. Informasi struktur manajemen dan kebijakan tata kelola formal belum tersedia."
      topics={[
        { title: "Hubungan baik", description: "Menjaga hubungan dengan rekan usaha dan konsumen sebagai bagian dari cara perusahaan bekerja.", icon: Handshake },
        { title: "Kepatuhan", description: "Menjalankan usaha dengan dasar legalitas dan izin niaga yang tercantum dalam referensi perusahaan.", icon: FileCheck2 },
        { title: "Integritas", description: "Mendukung iklim bisnis yang sehat melalui transparansi dan profesionalisme.", icon: Scale },
      ]}
      note="Struktur manajemen, kebijakan tata kelola, dan indikator kepatuhan tambahan masih memerlukan data resmi perusahaan."
      cta={{ label: "Lihat kemitraan", href: "/tentang-kami/kemitraan" }}
    />
  )
}
