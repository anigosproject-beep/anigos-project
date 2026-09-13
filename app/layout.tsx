import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Header } from "@/components/header"
import { PageTransition } from "@/components/motion"
import { LocaleProvider } from "@/components/locale-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://petroanigos.com"
).replace(/\/$/, "")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Petro Anigos | Distributor BBM Industri",
    template: "%s | Petro Anigos",
  },
  description:
    "Petro Anigos menyediakan solusi distribusi BBM industri yang aman, profesional, dan dapat diandalkan untuk kebutuhan bisnis di Indonesia.",
  robots: {
    index: true,
    follow: true,
  },
}

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <LocaleProvider>
            <TooltipProvider>
              <div className="flex min-h-svh flex-col">
                <Header />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <CookieConsent />
              </div>
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
