import { NextRequest, NextResponse } from 'next/server'
import { locales } from './config'
import { getLocale } from './utils'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (!pathnameIsMissingLocale) return NextResponse.next()

  const locale = getLocale(request)
  return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.nextUrl))
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
