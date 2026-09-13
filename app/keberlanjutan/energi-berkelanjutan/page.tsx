import { Droplets, Leaf, Scale } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function EnergiBerkelanjutanPage() {
  return (
    <CorporateTopicPage
      eyebrow="Keberlanjutan / Energi Berkelanjutan"
      title="Mengenal peran B40 dalam transisi energi."
      description="B40 Biosolar menjadi bagian dari portofolio Petro Anigos untuk mendukung kebutuhan industri sekaligus mengikuti program mandatori biodiesel pemerintah."
      breadcrumbs={[
        { label: "Keberlanjutan", href: "/keberlanjutan" },
        { label: "Energi Berkelanjutan", href: "/keberlanjutan/energi-berkelanjutan" },
      ]}
      introEyebrow="B40 Biosolar"
      introTitle="Komposisi yang mudah dipahami, standar yang tetap diperhatikan."
      introDescription="Produk B40 dijelaskan dalam company profile sebagai campuran 40% biodiesel dan 60% solar, dengan mutu dan spesifikasi yang mengacu pada Ditjen Migas RI."
      topics={[
        { title: "40% biodiesel", description: "Bagian biodiesel dalam komposisi B40 yang mengikuti program pemerintah.", icon: Leaf },
        { title: "60% solar", description: "Bagian bahan bakar minyak jenis solar dalam komposisi B40.", icon: Droplets },
        { title: "Sesuai spesifikasi", description: "Mutu produk mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia.", icon: Scale },
      ]}
      cta={{ label: "Pelajari produk", href: "/produk/kenali-produk" }}
    />
  )
}
