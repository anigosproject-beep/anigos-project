type SeedRole =
  | "hero"
  | "pageHero"
  | "sectionBackground"
  | "card"
  | "article"
  | "partnership"
  | "team"
  | "pattern"
  | "brand"

export type MediaLibrarySeedItem = {
  key: string
  label: string
  role: SeedRole
  publicPath?: string
  recommendedPath: string
  routePaths: string[]
  description: string
  technicalNotes: string
}

export const mediaLibrarySeed: MediaLibrarySeedItem[] = [
  ["home-hero-01", "Homepage hero 01", "hero", "/images/hero/home-01.webp", "media/home/hero/home-01", ["/"], "Hero slide pembuka dengan ruang teks di kiri.", "WebP/AVIF, minimal 1920x1080, full-bleed."],
  ["home-hero-02", "Homepage hero 02", "hero", "/images/hero/home-02.webp", "media/home/hero/home-02", ["/"], "Hero slide untuk pesan produk berkualitas.", "WebP/AVIF, minimal 1920x1080, sisakan ruang negatif di kiri."],
  ["home-hero-03", "Homepage hero 03", "hero", "/images/hero/home-03.webp", "media/home/hero/home-03", ["/"], "Hero slide armada dan distribusi tepat waktu.", "WebP/AVIF, minimal 1920x1080, subjek tidak menutup teks."],
  ["home-hero-04", "Homepage hero 04", "hero", "/images/hero/home-04.webp", "media/home/hero/home-04", ["/"], "Hero slide kemitraan energi berkelanjutan.", "WebP/AVIF, minimal 1920x1080, kontras cukup untuk overlay."],
  ["page-hero-tentang-kami", "Page hero Tentang Kami fallback", "pageHero", "/images/page-hero/tentang-kami.webp", "media/page-hero/tentang-kami", ["/tentang-kami/*", "/artikel/*", "/produk/*"], "Fallback page hero untuk halaman internal.", "WebP/AVIF, minimal 1920x720, aman untuk teks putih."],
  ["page-hero-produk", "Page hero Produk", "pageHero", undefined, "media/page-hero/produk", ["/produk/*"], "Hero khusus halaman produk.", "WebP/AVIF, minimal 1920x720."],
  ["page-hero-jangkauan", "Page hero Jangkauan", "pageHero", undefined, "media/page-hero/jangkauan", ["/jangkauan"], "Hero konteks jangkauan distribusi.", "WebP/AVIF, minimal 1920x720."],
  ["page-hero-artikel", "Page hero Artikel", "pageHero", undefined, "media/page-hero/artikel", ["/artikel/*"], "Hero editorial untuk newsroom.", "WebP/AVIF, minimal 1920x720."],
  ["page-hero-keberlanjutan", "Page hero Keberlanjutan", "pageHero", undefined, "media/page-hero/keberlanjutan", ["/keberlanjutan/*"], "Hero energi dan tata kelola berkelanjutan.", "WebP/AVIF, minimal 1920x720."],
  ["article-operation", "Article card Operasional", "article", "/images/articles/article-operation.svg", "media/cards/articles/article-operation", ["/artikel", "/artikel/[slug]"], "Ilustrasi artikel distribusi dan operasional.", "SVG saat ini; foto pengganti rasio 4:3 atau 16:10."],
  ["article-b40", "Article card B40", "article", "/images/articles/article-b40.svg", "media/cards/articles/article-b40", ["/artikel", "/artikel/[slug]"], "Ilustrasi artikel produk B40 Biosolar.", "SVG saat ini; pertahankan area aman untuk crop."],
  ["partnership-transportation", "Partnership Transportasi", "partnership", "/images/partnership/partnership-transportation.svg", "media/cards/partnership/transportation", ["/", "/produk/armada", "/tentang-kami/kemitraan"], "Visual armada dan transportasi.", "SVG mock saat ini; foto final rasio portrait 5:6."],
  ["partnership-distribution", "Partnership Distribusi", "partnership", "/images/partnership/partnership-distribution.svg", "media/cards/partnership/distribution", ["/", "/produk/armada"], "Visual distribusi antarwilayah.", "SVG mock saat ini; foto final rasio portrait 5:6."],
  ["partnership-business", "Partnership Bisnis", "partnership", "/images/partnership/partnership-business.svg", "media/cards/partnership/business", ["/", "/produk/armada"], "Visual kemitraan bisnis.", "SVG mock saat ini; foto final rasio portrait 5:6."],
  ["resources-energy", "Resource Energi", "card", "/images/resources/resource-energy.svg", "media/cards/resources/energy", ["/"], "Ilustrasi card resource energi.", "SVG; area visual aman untuk crop responsif."],
  ["resources-safety", "Resource Keselamatan", "card", "/images/resources/resource-safety.svg", "media/cards/resources/safety", ["/"], "Ilustrasi card keselamatan operasional.", "SVG; area visual aman untuk crop responsif."],
  ["resources-publication", "Resource Publikasi", "card", "/images/resources/resource-publication.svg", "media/cards/resources/publication", ["/"], "Ilustrasi card publikasi.", "SVG; area visual aman untuk crop responsif."],
  ["home-section-01-pattern", "Homepage section pattern", "pattern", "/images/patterns/home-section-01/home-section-01-pattern.svg", "media/patterns/home/home-section-01", ["/", "/tentang-kami/harapan-cita-cita"], "Pattern dekoratif section utama.", "SVG transparan; gunakan opacity rendah."],
  ["team-portrait-placeholder", "Team portrait placeholder", "team", "/images/team/portrait-placeholder.svg", "media/team/portrait-placeholder", ["/tentang-kami/struktur-perusahaan"], "Placeholder portrait struktur perusahaan.", "Ganti per anggota dengan crop portrait konsisten."],
  ["brand-logo", "Logo Petro Anigos", "brand", "/logo/petro anigos.svg", "media/brand/logo", ["global header", "global footer"], "Logo utama pada background terang.", "SVG; jangan di-crop atau diubah proporsinya."],
  ["brand-logo-white", "Logo Petro Anigos white", "brand", "/logo/petro anigos white.svg", "media/brand/logo-white", ["global header", "global footer"], "Logo putih untuk background gelap.", "SVG; pertahankan clear space brand."],
].map(([key, label, role, publicPath, recommendedPath, routePaths, description, technicalNotes]) => ({
  key,
  label,
  role,
  publicPath,
  recommendedPath,
  routePaths,
  description,
  technicalNotes,
}))
