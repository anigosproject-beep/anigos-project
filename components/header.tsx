"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

import { HeaderLanguageSelect } from "@/components/header-language-select"
import { HeaderMarketRibbon } from "@/components/header-market-ribbon"
import { navigationItems, type NavigationItem } from "@/components/navigation-config"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import { buttonVariants, Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function DesktopNavigation({ isScrolled }: { isScrolled: boolean }) {
  const { locale } = useLocale()
  const navigationLabels: Record<string, TranslationKey> = {
    Beranda: "home",
    "Tentang Kami": "about",
    Produk: "products",
    Jangkauan: "reach",
    Artikel: "articles",
    Keberlanjutan: "sustainability",
  }
  const childLabels: Record<string, TranslationKey> = {
    "Profil Perusahaan": "companyProfile",
    "Harapan & Cita-Cita": "hopes",
    "Struktur Perusahaan": "structure",
    Kemitraan: "partnership",
    Legalitas: "legality",
    "Kenali Produk": "productsOverview",
    Penawaran: "offer",
    Armada: "fleet",
    "Anigos News": "news",
    Publikasi: "publications",
    "Landasan Informasi Publik": "publicInformation",
    "Energi Berkelanjutan": "sustainableEnergy",
    "Keselamatan Operasional": "safety",
    "Kemitraan & Tata Kelola": "governance",
    "Pencapaian Perusahaan": "achievements",
  }

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={
                    isScrolled
                      ? "text-foreground hover:bg-muted hover:text-foreground data-popup-open:!bg-muted data-popup-open:!text-foreground data-open:!bg-muted data-open:!text-foreground"
                      : "text-background hover:bg-background/10 hover:text-background data-popup-open:!bg-background/10 data-popup-open:!text-background data-open:!bg-background/10 data-open:!text-background"
                  }
                >
                  {translate(locale, navigationLabels[item.label] ?? "home")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[420px] gap-1 p-2 text-foreground">
                    <div className="grid gap-1">
                      {item.children.map((child) => (
                        <NavigationMenuLink
                          key={child.href}
                          href={child.href}
                          className="flex-col items-start text-foreground hover:text-foreground focus:text-foreground"
                        >
                          <span className="font-medium">
                            {translate(locale, childLabels[child.label] ?? "home")}
                          </span>
                          {child.description ? (
                            <span className="text-xs text-muted-foreground">
                              {child.description}
                            </span>
                          ) : null}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href}
                className={
                  isScrolled
                    ? "text-foreground hover:bg-muted hover:text-foreground data-[active=true]:text-foreground"
                    : "text-background hover:bg-background/10 hover:text-background"
                }
              >
                {translate(locale, navigationLabels[item.label] ?? "home")}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNavigationItem({
  item,
  onNavigate,
  locale,
}: {
  item: NavigationItem
  onNavigate: () => void
  locale: "id" | "en"
}) {
  const navigationLabels: Record<string, TranslationKey> = {
    Beranda: "home",
    "Tentang Kami": "about",
    Produk: "products",
    Jangkauan: "reach",
    Artikel: "articles",
    Keberlanjutan: "sustainability",
  }
  const childLabels: Record<string, TranslationKey> = {
    "Profil Perusahaan": "companyProfile",
    "Harapan & Cita-Cita": "hopes",
    "Struktur Perusahaan": "structure",
    Kemitraan: "partnership",
    Legalitas: "legality",
    "Kenali Produk": "productsOverview",
    Penawaran: "offer",
    Armada: "fleet",
    "Anigos News": "news",
    Publikasi: "publications",
    "Landasan Informasi Publik": "publicInformation",
    "Energi Berkelanjutan": "sustainableEnergy",
    "Keselamatan Operasional": "safety",
    "Kemitraan & Tata Kelola": "governance",
    "Pencapaian Perusahaan": "achievements",
  }

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
        onClick={onNavigate}
      >
        {translate(locale, navigationLabels[item.label] ?? "home")}
      </Link>
    )
  }

  return (
    <Collapsible className="rounded-2xl border border-border">
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted">
        {translate(locale, navigationLabels[item.label] ?? "home")}
        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 pb-2">
        <div className="grid gap-1 border-t border-border pt-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={onNavigate}
            >
              {translate(locale, childLabels[child.label] ?? "home")}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Header() {
  const { locale, setLocale } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const content = {
    contact: translate(locale, "contact"),
    language: translate(locale, "language"),
    mobileMenu: translate(locale, "mobileMenu"),
    mobileDescription: translate(locale, "mobileDescription"),
  }

  useEffect(() => {
    if (prefersReducedMotion) return

    let previousScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - previousScrollY
      setIsScrolled(currentScrollY > 24)

      if (currentScrollY <= 24) {
        setIsVisible(true)
      } else if (Math.abs(scrollDelta) >= 4) {
        setIsVisible(scrollDelta < 0)
      }

      previousScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prefersReducedMotion])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-border/70 bg-background text-foreground shadow-sm"
          : "border-transparent bg-transparent text-background"
      }`}
      initial={false}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
        >
          <Image
            src={
              isScrolled
                ? "/logo/petro%20anigos.svg"
                : "/logo/petro%20anigos%20white.svg"
            }
            alt="Petro Anigos"
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="text-lg font-semibold tracking-tight">Petro Anigos</span>
        </Link>

        <DesktopNavigation isScrolled={isScrolled} />

        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <HeaderLanguageSelect
              locale={locale}
              setLocale={setLocale}
              label={content.language}
              variant={isScrolled ? "active" : "idle"}
            />
            <Link
              href="/produk/penawaran"
              className={buttonVariants({
                className: isScrolled
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background text-foreground hover:bg-background/90",
              })}
            >
              {content.contact}
            </Link>
          </div>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={
                  isScrolled
                    ? "text-foreground hover:bg-muted hover:text-foreground md:hidden"
                    : "text-background hover:bg-background/10 hover:text-background md:hidden"
                }
                aria-label="Buka menu navigasi"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(22rem,90vw)]">
            <SheetHeader>
              <SheetTitle>{content.mobileMenu}</SheetTitle>
              <SheetDescription>
                {content.mobileDescription}
              </SheetDescription>
            </SheetHeader>
            <nav
              className="flex flex-col gap-2 overflow-y-auto px-6 pb-6"
              aria-label="Navigasi mobile"
            >
              {navigationItems.map((item) => (
                <MobileNavigationItem
                  key={item.href}
                  item={item}
                  locale={locale}
                  onNavigate={() => undefined}
                />
              ))}
              <Link
                href="/produk/penawaran"
                className={buttonVariants({ className: "mt-3 w-full" })}
              >
                {content.contact}
              </Link>
              <HeaderLanguageSelect
                locale={locale}
                setLocale={setLocale}
                label={content.language}
                variant="active"
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <HeaderMarketRibbon isScrolled={isScrolled} />
    </motion.header>
  )
}
