import { NextRequest } from 'next/server'
import { getLocale } from '/utils'

export const GET = async (request: NextRequest) => {
  const locale = getLocale(request)

  console.log(locale)
  return new Response(locale, { status: 201 })
}
