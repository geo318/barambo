import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest } from 'next/server'
import { locales, defaultLocale, localeInfo } from '/config'

export const getLocale = (request: NextRequest) => {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export const getLangKey = (locale: string) => {
  return localeInfo.find((item) => item.key === locale)!.name
}
