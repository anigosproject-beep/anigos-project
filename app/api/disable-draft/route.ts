import {draftMode} from "next/headers"
import {redirect} from "next/navigation"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const slug = searchParams.get("slug") ?? "/"

  if (!slug.startsWith("/") || slug.startsWith("//")) {
    return new Response("Invalid preview route.", {status: 400})
  }

  const draft = await draftMode()
  draft.disable()
  redirect(slug)
}
