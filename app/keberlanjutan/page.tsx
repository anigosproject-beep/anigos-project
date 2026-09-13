import { Handshake, Leaf, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KeberlanjutanPage() {
  return (
    <CorporateTopicPage
      eyebrow="Keberlanjutan"
      title="Menjalankan usaha dengan tanggung jawab yang lebih luas."
      description="Bagi Petro Anigos, keberlanjutan berangkat dari energi yang lebih bersih, keselamatan operasional, dan kontribusi terhadap masyarakat."
      breadcrumbs={[{ label: "Keberlanjutan", href: "/keberlanjutan" }]}
      introEyebrow="Pendekatan Kami"
      introTitle="Keberlanjutan bukan sekadar jargon."
      introDescription="Narasi ini dirangkum dari company profile. Data ESG formal, sertifikasi, dan angka dampak belum tersedia sehingga tidak ditampilkan sebagai klaim kuantitatif."
      topics={[
        {
          title: "Energi lebih bersih",
          description: "B40 Biosolar mencampurkan 40% biodiesel dan 60% solar sebagai bagian dari program pemerintah terkait energi nabati.",
          icon: Leaf,
        },
        {
          title: "Keselamatan operasional",
          description: "Ketepatan waktu dan keamanan menjadi prioritas dalam setiap proses distribusi BBM.",
          icon: ShieldCheck,
        },
        {
          title: "Kontribusi sosial",
          description: "Perusahaan berkomitmen menjadi mitra yang handal serta berkontribusi pada kesejahteraan masyarakat.",
          icon: Handshake,
        },
      ]}
      note="Catatan transparansi: halaman ini belum memuat sertifikasi lingkungan/K3, program CSR spesifik, atau metrik emisi karena datanya belum tercantum dalam referensi perusahaan."
      cta={{ label: "Lihat produk", href: "/produk/kenali-produk" }}
    />
  )
}
