import type { MetadataRoute } from "next"

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://petroanigos.com"
).replace(/\/$/, "")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/tentang-kami/karir/lamar"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
