const defaultSiteUrl = "https://anigosjayaperkasa.com"
const configuredSiteUrl =
  process.env.VERCEL_ENV === "production"
    ? defaultSiteUrl
    : process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "")
