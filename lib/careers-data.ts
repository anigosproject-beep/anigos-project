import type { LucideIcon } from "lucide-react"
import { BriefcaseBusiness, GraduationCap, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react"

export type CareerBenefit = {
  title: string
  description: string
  icon: LucideIcon
}

export type CareerOpening = {
  slug: string
  title: string
  department: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
}

export const careerBenefits: CareerBenefit[] = [
  {
    title: "Bekerja dengan tujuan",
    description: "Kontribusi setiap peran ikut menjaga distribusi energi yang mendukung aktivitas industri Indonesia.",
    icon: Sparkles,
  },
  {
    title: "Budaya yang saling mendukung",
    description: "Kami membangun komunikasi terbuka, kerja sama lintas fungsi, dan ruang untuk bertumbuh bersama.",
    icon: HeartHandshake,
  },
  {
    title: "Belajar dari lapangan",
    description: "Kamu akan berhadapan dengan konteks nyata distribusi, pelanggan, mitra, dan operasional.",
    icon: GraduationCap,
  },
  {
    title: "Standar kerja yang aman",
    description: "Keselamatan, kepatuhan, dan integritas menjadi bagian dari cara kami mengambil keputusan.",
    icon: ShieldCheck,
  },
  {
    title: "Kolaborasi lintas peran",
    description: "Ide yang baik dapat datang dari berbagai fungsi dan dibahas dengan perspektif yang beragam.",
    icon: Users,
  },
  {
    title: "Ruang untuk berkembang",
    description: "Kami menghargai inisiatif, tanggung jawab, dan keinginan untuk meningkatkan kualitas kerja.",
    icon: BriefcaseBusiness,
  },
]

export const careerOpenings: CareerOpening[] = [
  {
    slug: "staff-operasional-distribusi",
    title: "Staff Operasional Distribusi",
    department: "Operasional",
    location: "Jakarta / Hybrid",
    type: "Full-time",
    summary: "Mendukung koordinasi jadwal, dokumen, dan komunikasi distribusi bersama pelanggan serta mitra transportasi.",
    responsibilities: [
      "Membantu menyiapkan kebutuhan administrasi dan koordinasi pengiriman.",
      "Memantau informasi jadwal, volume, dan status distribusi.",
      "Menjaga dokumentasi operasional tetap rapi dan mudah ditelusuri.",
    ],
  },
  {
    slug: "sales-account-executive",
    title: "Sales & Account Executive",
    department: "Komersial",
    location: "Jakarta",
    type: "Full-time",
    summary: "Membangun hubungan dengan calon pelanggan dan membantu menerjemahkan kebutuhan energi menjadi solusi layanan.",
    responsibilities: [
      "Mengembangkan komunikasi dengan pelanggan industri dan calon mitra.",
      "Memahami kebutuhan pelanggan untuk menyiapkan pembahasan penawaran.",
      "Menjaga tindak lanjut dan pembaruan informasi akun secara konsisten.",
    ],
  },
]

export function getCareerOpening(slug: string) {
  return careerOpenings.find((opening) => opening.slug === slug)
}
