import Image from "next/image"
import Link from "next/link"

import { navigationItems } from "@/components/navigation-config"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const companyLinks = navigationItems.find(
    (item) => item.label === "Tentang Kami"
  )
  const productLinks = navigationItems.find((item) => item.label === "Produk")
  const standaloneLinks = navigationItems.filter(
    (item) => !item.children && item.label !== "Beranda"
  )
  const informationLinks = [
    ...standaloneLinks,
    { label: "Kebijakan Data", href: "/kebijakan-data" },
    { label: "Ketentuan Cookies", href: "/ketentuan-cookies" },
  ]

  return (
    <footer id="kontak" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo/petro%20anigos%20white.svg"
                alt="Petro Anigos"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-semibold tracking-tight">Petro Anigos</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">
              Mitra terpercaya untuk solusi energi dan kebutuhan industri yang
              berkelanjutan.
            </p>
            <Link
              href="/produk/penawaran"
              className={buttonVariants({
                className:
                  "mt-6 bg-background text-foreground hover:bg-background/90",
              })}
            >
              Ajukan Penawaran
            </Link>
          </div>

          <FooterLinkGroup title="Perusahaan" items={companyLinks?.children} />
          <FooterLinkGroup title="Produk" items={productLinks?.children} />
          <FooterLinkGroup title="Informasi" items={informationLinks} />
        </div>

        <Separator className="my-10 bg-background/15" />

        <div className="flex flex-col gap-4 text-sm text-background/70 md:flex-row md:items-center md:justify-between">
          <address className="not-italic">
            Komplek Ruko Saung Bambu B3, Bekasi Utara, Kota Bekasi 17122
          </address>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="mailto:anigospetro@gmail.com" className="hover:text-background">
              anigospetro@gmail.com
            </a>
            <a href="tel:+622188383549" className="hover:text-background">
              021-88383549
            </a>
          </div>
        </div>

        <div className="mt-5 text-xs text-background/50">
          © {new Date().getFullYear()} PT. Anigos Jaya Perkasa. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  items,
}: {
  title: string
  items?: { label: string; href: string }[]
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <nav className="mt-4 flex flex-col gap-3 text-sm text-background/70">
        {items?.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-background">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
