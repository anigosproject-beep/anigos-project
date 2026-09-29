import {getSanityClientForCurrentMode, sanityImageUrl} from "@/lib/sanity-client"

export type SiteSettings = {
  companyName: string
  address: string
  email: string
  phone: string
  whatsapp: string
  mapsUrl?: string
  logo?: string
  uiTheme?: Partial<Record<UiThemeToken, string>>
}

export type UiThemeToken =
  | "baseColor"
  | "baseColorForeground"
  | "primary"
  | "primaryForeground"
  | "accent"
  | "accentForeground"
  | "background"
  | "foreground"
  | "muted"
  | "mutedForeground"
  | "border"
  | "card"

const hexLuminance = (value: unknown) => {
  if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) return null
  const channels = [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset + 1, offset + 3), 16) / 255)
  const linear = channels.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2])
}

const contrastRatio = (foreground: unknown, background: unknown) => {
  const foregroundLuminance = hexLuminance(foreground)
  const backgroundLuminance = hexLuminance(background)
  if (foregroundLuminance === null || backgroundLuminance === null) return null
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

const readableForeground = (background: unknown, preferred: unknown) => {
  const preferredContrast = contrastRatio(preferred, background)
  if (preferredContrast !== null && preferredContrast >= 4.5) return preferred as string

  const blackContrast = contrastRatio("#000000", background) ?? 0
  const whiteContrast = contrastRatio("#ffffff", background) ?? 0
  return blackContrast >= whiteContrast ? "#000000" : "#ffffff"
}

export function resolveUiTheme(theme?: Partial<Record<UiThemeToken, string>>) {
  const baseColor =
    theme?.baseColor && /^#[0-9a-f]{6}$/i.test(theme.baseColor)
      ? theme.baseColor
      : theme?.primary && /^#[0-9a-f]{6}$/i.test(theme.primary)
        ? theme.primary
        : "#0f0f0f"
  const baseColorForeground = readableForeground(
    baseColor,
    theme?.baseColorForeground ?? theme?.primaryForeground,
  )

  return {
    ...theme,
    baseColor,
    baseColorForeground,
    primary: baseColor,
    primaryForeground: baseColorForeground,
    ...(theme?.accent ? {
      accentForeground: readableForeground(theme.accent, theme?.accentForeground),
    } : {}),
  }
}

export async function getSanitySiteSettings(): Promise<SiteSettings | null> {
  const client = await getSanityClientForCurrentMode()
  const row = await client.fetch<{
    companyName?: string
    address?: string
    email?: string
    phone?: string
    whatsapp?: string
    mapsUrl?: string
    logo?: {asset?: {_ref?: string}}
    uiTheme?: Partial<Record<UiThemeToken, string>>
  } | null>(
    `*[_type == "siteSettings"][0]{companyName, address, email, phone, whatsapp, mapsUrl, logo, uiTheme}`,
  )

  if (!row) return null

  return {
    companyName: row.companyName || "PT. Anigos Jaya Perkasa",
    address:
      row.address ||
      "Komplek Ruko Saung Bambu B3, Bekasi Utara, Kota Bekasi 17122",
    email: row.email || "anigospetro@gmail.com",
    phone: row.phone || "021-88383549",
    whatsapp: row.whatsapp ?? "",
    mapsUrl: row.mapsUrl,
    logo: sanityImageUrl(row.logo),
    uiTheme: row.uiTheme,
  }
}
