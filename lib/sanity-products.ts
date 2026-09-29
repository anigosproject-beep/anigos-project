import {getSanityClientForCurrentMode} from "@/lib/sanity-client"
import {PRODUCT_QUERY} from "@/lib/sanity-queries"
import type {SanityProduct} from "@/lib/sanity-content-types"

export async function getSanityProducts(lang: "id" | "en") {
  const client = await getSanityClientForCurrentMode()
  const products = await client.fetch<SanityProduct[]>(PRODUCT_QUERY, {lang})

  return products.filter((product) => product._id && product.name)
}
