export const maxHomeHeroSlides = 4
export const recommendedHomeHeroVideoBytes = 8 * 1024 * 1024
export const maxHomeHeroVideoBytes = 50 * 1024 * 1024
export const recommendedMarineFuelVideoBytes = 32 * 1024 * 1024
export const maxMarineFuelVideoBytes = 64 * 1024 * 1024
export const marineFuelSlotsByVariant = {
  home: ["home-marine-fuel-background", "home-marine-fuel-video"],
  product: ["product-marine-fuel-background", "product-marine-fuel-video"],
} as const
export const productTransportImageSlots = {
  land: "product-transport-land-image",
  sea: "product-transport-sea-image",
  partner: "product-transport-partner-image",
} as const
