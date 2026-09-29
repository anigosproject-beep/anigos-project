import {NextRequest, NextResponse} from 'next/server'
import {JANGKAUAN_QUERY} from '@/lib/sanity-queries'
import {sanityClient} from '@/lib/sanity-client'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'id'
  const page = await sanityClient.fetch(JANGKAUAN_QUERY, {lang})

  return NextResponse.json(page ?? null, {
    headers: {'Cache-Control': 'no-store'},
  })
}
