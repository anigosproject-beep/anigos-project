import type { MetadataRoute } from "next"

import { newsroomArticles } from "@/lib/newsroom-data"

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://petroanigos.com"
).replace(/\/$/, "")

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/tentang-kami/profil-perusahaan", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/tentang-kami/harapan-cita-cita", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tentang-kami/struktur-perusahaan", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tentang-kami/kemitraan", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tentang-kami/legalitas", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/tentang-kami/karir", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/produk/kenali-produk", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/produk/penawaran", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/produk/armada", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/jangkauan", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/artikel/anigos-news", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/artikel/publikasi", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/artikel/landasan-informasi-publik", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/keberlanjutan", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/keberlanjutan/energi-berkelanjutan", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/keberlanjutan/keselamatan-operasional", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/keberlanjutan/kemitraan-tata-kelola", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/kebijakan-data", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/ketentuan-cookies", priority: 0.4, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }))

  const articles = newsroomArticles.map((article) => ({
    url: `${siteUrl}/artikel/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.8 : 0.7,
  }))

  return [...routes, ...articles]
}
