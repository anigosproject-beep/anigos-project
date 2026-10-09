const allowedHomeHeroEmbedHosts = new Set([
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
])

export function getAllowedHomeHeroEmbedUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) return undefined

  try {
    const url = new URL(value)
    if (
      url.protocol !== "https:" ||
      url.port ||
      url.username ||
      url.password ||
      !allowedHomeHeroEmbedHosts.has(url.hostname)
    ) {
      return undefined
    }

    const isYouTubeEmbed =
      [
        "youtube.com",
        "www.youtube.com",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(url.hostname) &&
      /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname)
    const isVimeoEmbed =
      url.hostname === "player.vimeo.com" &&
      /^\/video\/[0-9]+$/.test(url.pathname)

    return isYouTubeEmbed || isVimeoEmbed ? url.toString() : undefined
  } catch {
    return undefined
  }
}
