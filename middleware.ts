import { NextFetchEvent, NextResponse } from 'next/server'
import { locales } from '/config'
import { getLocale } from '/utils'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'

const authMiddleWare = withAuth({})

export default function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/admin')) return authMiddleWare(request, event)

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (!pathnameIsMissingLocale) return NextResponse.next()

  const locale = getLocale(request)
  return NextResponse.redirect(
    new URL(`/${locale}/${pathname}`, request.nextUrl)
  )
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
