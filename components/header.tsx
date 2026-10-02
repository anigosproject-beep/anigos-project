"use client"

import Image from "next/image"
import Link from "@/components/site-link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { HeaderLanguageSelect } from "@/components/header-language-select"
import { HeaderMarketRibbon } from "@/components/header-market-ribbon"
import {
  getVisibleNavigationItems,
  type NavigationItem,
} from "@/components/navigation-config"
import { useLocale } from "@/components/locale-provider"
import { useTheme } from "@/components/theme-provider"
import { useHeaderAppearance } from "@/components/header-appearance-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import { usePageVisibility } from "@/components/page-visibility-provider"
import { MotionButtonLink, Button } from "@/components/ui/button"
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

function DesktopNavigation({ isSolid }: { isSolid: boolean }) {
  const { locale } = useLocale()
  const { visibility } = usePageVisibility()
  const navigationItems = getVisibleNavigationItems(visibility)
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
    Client: "clientNav",
    Legalitas: "legality",
    Karir: "career",
    "Kenali Produk": "productsOverview",
    Penawaran: "offer",
    Layanan: "services",
    "Anigos News": "news",
    Publikasi: "publications",
    "Landasan Informasi Publik": "publicInformation",
    "Energi Berkelanjutan": "csr",
    CSR: "csr",
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
                    isSolid
                      ? "text-foreground hover:bg-muted focus:bg-muted active:bg-muted hover:text-foreground data-popup-open:!bg-muted data-popup-open:!text-foreground data-open:!bg-muted data-open:!text-foreground"
                      : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10 hover:text-white data-popup-open:!bg-white/10 data-popup-open:!text-white data-open:!bg-white/10 data-open:!text-white"
                  }
                >
                  {translate(locale, navigationLabels[item.label] ?? "home")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[420px] gap-1 p-2 text-foreground">
                    <div className="grid gap-1">
                      {item.children.map((child) => {
                        const descriptionKey =
                          child.href === "/keberlanjutan/energi-berkelanjutan"
                            ? "navCsrDescription"
                            : child.descriptionKey

                        return (
                          <NavigationMenuLink
                            key={child.href}
                            href={child.href}
                            className="flex-col items-start text-foreground hover:text-foreground focus:text-foreground"
                          >
                            <span className="font-medium">
                              {translate(locale, childLabels[child.label] ?? "home")}
                            </span>
                            {descriptionKey ? (
                              <span className="text-xs text-muted-foreground">
                                {translate(locale, descriptionKey)}
                              </span>
                            ) : null}
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href}
                className={
                  isSolid
                    ? "text-foreground hover:bg-muted focus:bg-muted active:bg-muted hover:text-foreground data-[active=true]:bg-muted/50 data-[active=true]:focus:bg-muted data-[active=true]:text-foreground"
                    : "text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/10 hover:text-white data-[active=true]:bg-transparent data-[active=true]:focus:bg-white/10"
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
    Client: "clientNav",
    Legalitas: "legality",
    Karir: "career",
    "Kenali Produk": "productsOverview",
    Penawaran: "offer",
    Layanan: "services",
    "Anigos News": "news",
    Publikasi: "publications",
    "Landasan Informasi Publik": "publicInformation",
    "Energi Berkelanjutan": "csr",
    CSR: "csr",
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
  const { theme, setTheme } = useTheme()
  const { forceSolid } = useHeaderAppearance()
  const { visibility, isVisible: isPathVisible } = usePageVisibility()
  const visibleNavigationItems = getVisibleNavigationItems(visibility)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const newsroomLandingRoutes = new Set([
    "/artikel/anigos-news",
    "/artikel/publikasi",
    "/artikel/landasan-informasi-publik",
  ])
  const isArticleTemplate =
    /^\/artikel\/[^/]+$/.test(pathname) &&
    !newsroomLandingRoutes.has(pathname)
  const isCategoryGalleryPage = pathname === "/artikel/publikasi/kategori"
  const isSolid =
    isScrolled || forceSolid || isArticleTemplate || isCategoryGalleryPage
  const content = {
    contact: translate(locale, "contact"),
    language: translate(locale, "language"),
    mobileMenu: translate(locale, "mobileMenu"),
    mobileDescription: translate(locale, "mobileDescription"),
    theme: theme === "dark" ? translate(locale, "switchToLight") : translate(locale, "switchToDark"),
  }

  useEffect(() => {
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
    const frame = window.requestAnimationFrame(handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.getBoundingClientRect().height}px`
      )
    }

    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(header)

    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty("--site-header-height")
    }
  }, [])

  return (
    <motion.header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isSolid
          ? "border-b border-border/70 bg-background text-foreground shadow-sm"
          : "border-transparent bg-transparent text-white"
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
        {visibility.home !== false ? <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
        >
          <Image
            src={
              isSolid
                ? "/logo/petro%20anigos.svg"
                : "/logo/petro%20anigos%20white.svg"
            }
            alt="PT. Anigos Jaya Perkasa"
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="text-lg font-semibold tracking-tight">PT. Anigos Jaya Perkasa</span>
        </Link> : (
          <div className="flex shrink-0 items-center gap-3">
            <Image
              src={
                isSolid
                  ? "/logo/petro%20anigos.svg"
                  : "/logo/petro%20anigos%20white.svg"
              }
              alt="PT. Anigos Jaya Perkasa"
              width={44}
              height={44}
              priority
              className="h-11 w-11 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight">PT. Anigos Jaya Perkasa</span>
          </div>
        )}

        <DesktopNavigation isSolid={isSolid} />

        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={isSolid ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={content.theme}
              title={content.theme}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <HeaderLanguageSelect
              locale={locale}
              setLocale={setLocale}
              label={content.language}
              variant={isSolid ? "active" : "idle"}
            />
            {isPathVisible("/hubungi-kami") && <MotionButtonLink
              href="/hubungi-kami"
              className={
                isSolid
                  ? "bg-base-color text-base-color-foreground hover:bg-base-color/90 hover:text-base-color-foreground focus-visible:text-base-color-foreground"
                  : "bg-white text-black hover:bg-white/90 hover:text-black focus-visible:bg-white focus-visible:text-black active:bg-white/80 active:text-black"
              }
            >
              {content.contact}
            </MotionButtonLink>}
          </div>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={
                  isSolid
                    ? "text-foreground hover:bg-muted hover:text-foreground md:hidden"
                    : "text-white hover:bg-white/10 hover:text-white md:hidden"
                }
                aria-label={translate(locale, "openNavigation")}
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
              aria-label={translate(locale, "mobileNavigation")}
            >
              {visibleNavigationItems.map((item) => (
                <MobileNavigationItem
                  key={item.href}
                  item={item}
                  locale={locale}
                  onNavigate={() => undefined}
                />
              ))}
              {isPathVisible("/hubungi-kami") && <MotionButtonLink
                href="/hubungi-kami"
                className="mt-3 w-full"
              >
                {content.contact}
              </MotionButtonLink>}
              <HeaderLanguageSelect
                locale={locale}
                setLocale={setLocale}
                label={content.language}
                variant="active"
              />
              <Button
                variant="outline"
                className="mt-2 w-full justify-center"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
                {content.theme}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <HeaderMarketRibbon isScrolled={isSolid} />
    </motion.header>
  )
}
