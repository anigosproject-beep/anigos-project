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
import {
  getSanitySiteSettings,
  resolveUiTheme,
  type UiThemeToken,
} from "@/lib/sanity-site-settings"
import type { Metadata } from "next"
import { cookies, draftMode, headers } from "next/headers"
import { notFound } from "next/navigation"
import {
  PageVisibilityGate,
  PageVisibilityProvider,
} from "@/components/page-visibility-provider"
import { getPageVisibilityMap } from "@/lib/page-visibility"
import { isSanityAvailabilityError } from "@/lib/sanity-client"
import {
  createPageVisibilityMap,
  isPagePathVisible,
} from "@/shared/page-visibility-registry"

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
  const [siteSettings, visibilityResult, requestHeaders, cookieStore] =
    await Promise.all([
      getSanitySiteSettings().catch((error: unknown) => {
        console.error("Unable to load site settings from Sanity", error)
        return null
      }),
      getPageVisibilityMap()
        .then((visibility) => ({ visibility, available: true }))
        .catch((error: unknown) => {
          if (isSanityAvailabilityError(error)) {
            console.warn(
              "Sanity page visibility timed out; using the default visible-page configuration."
            )
          } else {
            console.error(
              "Unable to load page visibility settings from Sanity.",
              error
            )
          }
          return {
            visibility: createPageVisibilityMap(null, true),
            available: false,
          }
        }),
      headers(),
      cookies(),
    ])
  const { isEnabled: isDraftPreviewEnabled } = await draftMode()
  const { visibility, available: visibilityAvailable } = visibilityResult
  const initialLocale = cookieStore.get("locale")?.value === "en" ? "en" : "id"
  const pathname = requestHeaders.get("x-page-pathname") ?? "/"
  if (
    visibilityAvailable &&
    !isDraftPreviewEnabled &&
    !isPagePathVisible(pathname, visibility)
  ) {
    notFound()
  }
  const themeStyle: React.CSSProperties & Record<`--${string}`, string> = {}
  const uiTheme = resolveUiTheme(siteSettings?.uiTheme)
  for (const [token, variable] of Object.entries(themeTokens) as Array<
    [UiThemeToken, `--${string}`]
  >) {
    const value = uiTheme?.[token]
    if (value) themeStyle[variable] = value
  }

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <body style={themeStyle}>
        <ThemeProvider>
          <LocaleProvider initialLocale={initialLocale}>
            <TooltipProvider>
              <PageVisibilityProvider initialVisibility={visibility}>
                <div className="flex min-h-svh flex-col">
                  <HeaderAppearanceProvider>
                    <Header />
                    <main className="flex-1">
                      <PageVisibilityGate bypass={isDraftPreviewEnabled}>
                        <PageTransition>{children}</PageTransition>
                      </PageVisibilityGate>
                    </main>
                    <Footer />
                    <CookieConsent />
                  </HeaderAppearanceProvider>
                </div>
              </PageVisibilityProvider>
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
