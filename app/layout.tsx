import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Header } from "@/components/header"
import { HeaderAppearanceProvider } from "@/components/header-appearance-provider"
import { PageTransition } from "@/components/motion"
import { LocaleProvider } from "@/components/locale-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getSanitySiteSettings, resolveUiTheme, type UiThemeToken } from "@/lib/sanity-site-settings"
import type { Metadata } from "next"

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://petroanigos.com"
).replace(/\/$/, "")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PT. Anigos Jaya Perkasa | Distributor BBM Industri",
    template: "%s | PT. Anigos Jaya Perkasa",
  },
  description:
    "PT. Anigos Jaya Perkasa menyediakan solusi distribusi BBM industri yang aman, profesional, dan dapat diandalkan untuk kebutuhan bisnis di Indonesia.",
  robots: {
    index: true,
    follow: true,
  },
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const themeTokens: Record<UiThemeToken, `--${string}`> = {
  baseColor: "--base-color",
  baseColorForeground: "--base-color-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  background: "--background",
  foreground: "--foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
  card: "--card",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getSanitySiteSettings()
  const themeStyle: React.CSSProperties & Record<`--${string}`, string> = {}
  const uiTheme = resolveUiTheme(siteSettings?.uiTheme)
  for (const [token, variable] of Object.entries(themeTokens) as Array<[UiThemeToken, `--${string}`]>) {
    const value = uiTheme?.[token]
    if (value) themeStyle[variable] = value
  }

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body style={themeStyle}>
        <ThemeProvider>
          <LocaleProvider>
            <TooltipProvider>
              <div className="flex min-h-svh flex-col">
                <HeaderAppearanceProvider>
                  <Header />
                  <main className="flex-1">
                    <PageTransition>{children}</PageTransition>
                  </main>
                  <Footer />
                  <CookieConsent />
                </HeaderAppearanceProvider>
              </div>
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
