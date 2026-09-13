import { Clock3, Route, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KeselamatanOperasionalPage() {
  return (
    <CorporateTopicPage
      eyebrow="Keberlanjutan / Keselamatan Operasional"
      title="Distribusi yang tepat waktu, aman, dan bertanggung jawab."
      description="Keselamatan kerja dan ketepatan waktu menjadi prioritas dalam operasional distribusi BBM Petro Anigos."
      breadcrumbs={[
        { label: "Keberlanjutan", href: "/keberlanjutan" },
        { label: "Keselamatan Operasional", href: "/keberlanjutan/keselamatan-operasional" },
      ]}
      introEyebrow="Prioritas Operasional"
      introTitle="Keamanan menjadi bagian dari cara kami bekerja."
      introDescription="Company profile menempatkan ketepatan waktu dan operasional bebas kecelakaan sebagai sasaran kerja. Detail sertifikasi K3 belum tersedia dalam referensi."
      topics={[
        { title: "Bebas dari kecelakaan kerja", description: "Keselamatan menjadi pertimbangan utama dalam setiap operasional distribusi BBM.", icon: ShieldCheck },
        { title: "Ketepatan waktu", description: "Koordinasi distribusi diarahkan untuk memenuhi kebutuhan konsumen sesuai jadwal.", icon: Clock3 },
        { title: "Koordinasi rute", description: "Armada dan jaringan mitra membantu mendukung pengiriman sesuai kebutuhan wilayah.", icon: Route },
      ]}
      note="Data sertifikasi K3, prosedur operasional terperinci, dan metrik keselamatan belum tersedia untuk dipublikasikan."
      cta={{ label: "Lihat jangkauan", href: "/jangkauan" }}
    />
  )
}
