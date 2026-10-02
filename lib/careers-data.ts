import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

export type CareerBenefit = {
  title: string
  description: string
  icon: LucideIcon
}

export type CareerOpening = {
  sanityId: string
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
    description:
      "Kontribusi setiap peran ikut menjaga distribusi energi yang mendukung aktivitas industri Indonesia.",
    icon: Sparkles,
  },
  {
    title: "Budaya yang saling mendukung",
    description:
      "Kami membangun komunikasi terbuka, kerja sama lintas fungsi, dan ruang untuk bertumbuh bersama.",
    icon: HeartHandshake,
  },
  {
    title: "Belajar dari lapangan",
    description:
      "Kamu akan berhadapan dengan konteks nyata distribusi, pelanggan, mitra, dan operasional.",
    icon: GraduationCap,
  },
  {
    title: "Standar kerja yang aman",
    description:
      "Keselamatan, kepatuhan, dan integritas menjadi bagian dari cara kami mengambil keputusan.",
    icon: ShieldCheck,
  },
  {
    title: "Kolaborasi lintas peran",
    description:
      "Ide yang baik dapat datang dari berbagai fungsi dan dibahas dengan perspektif yang beragam.",
    icon: Users,
  },
  {
    title: "Ruang untuk berkembang",
    description:
      "Kami menghargai inisiatif, tanggung jawab, dan keinginan untuk meningkatkan kualitas kerja.",
    icon: BriefcaseBusiness,
  },
]
