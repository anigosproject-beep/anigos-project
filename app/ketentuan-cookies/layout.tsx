import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ketentuan Cookies",
  description: "Penjelasan penggunaan cookies pada website PT. Anigos Jaya Perkasa.",
}

export default function CookiesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
