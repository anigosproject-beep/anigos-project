"use client"

import { BookOpenCheck, FileCheck2, Info, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function LandasanInformasiPublikPage() {
  return (
    <CorporateTopicPage
      eyebrow="Artikel / Landasan Informasi Publik"
      title="Informasi yang berangkat dari fakta dan sumber yang jelas."
      description="Halaman ini menjelaskan landasan informasi publik Petro Anigos berdasarkan company profile dan data perusahaan yang tersedia."
      breadcrumbs={[
        { label: "Artikel", href: "/artikel" },
        { label: "Landasan Informasi Publik", href: "/artikel/landasan-informasi-publik" },
      ]}
      introEyebrow="Prinsip Informasi"
      introTitle="Transparan tentang apa yang diketahui dan apa yang belum tersedia."
      introDescription="Data yang ditampilkan di website dirangkai dari referensi perusahaan. Informasi yang belum terverifikasi tidak diisi dengan asumsi."
      topics={[
        { title: "Sumber yang jelas", description: "Fakta legal, produk, dan operasional dirangkum dari company profile PT. Anigos Jaya Perkasa.", icon: BookOpenCheck },
        { title: "Batas informasi", description: "Data seperti jumlah armada, kontak cabang, harga, dan metrik ESG hanya ditampilkan jika tersedia dan terverifikasi.", icon: Info },
        { title: "Dokumen legal", description: "Informasi legalitas mengacu pada nomor dan keterangan yang tercantum dalam referensi perusahaan.", icon: FileCheck2 },
        { title: "Komunikasi bertanggung jawab", description: "Copy website dirancang untuk membantu calon konsumen memahami layanan tanpa membuat klaim yang tidak didukung sumber.", icon: ShieldCheck },
      ]}
      note="Halaman ini bukan pengganti dokumen legal resmi. Untuk kebutuhan verifikasi atau kerja sama, silakan hubungi Petro Anigos melalui kanal resmi."
      cta={{ label: "Hubungi kami", href: "/produk/penawaran" }}
    />
  )
}
