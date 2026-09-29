import {draftMode} from "next/headers"
import {redirect} from "next/navigation"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")
  const configuredSecret = process.env.SANITY_PREVIEW_SECRET

  if (
    !configuredSecret ||
    secret !== configuredSecret ||
    !slug ||
    !slug.startsWith("/") ||
    slug.startsWith("//")
  ) {
    return new Response("Invalid preview token or route.", {status: 401})
  }

  const draft = await draftMode()
  draft.enable()
  redirect(slug)
}
