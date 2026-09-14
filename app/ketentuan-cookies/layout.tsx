import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ketentuan Cookies",
  description: "Penjelasan penggunaan cookies pada website Petro Anigos.",
}

export default function CookiesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
