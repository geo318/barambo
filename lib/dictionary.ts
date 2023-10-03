import { Locale } from '/types'

export const dictionaries = {
  en: () => import('/dictionaries/en.json').then((m) => m.default),
  ka: () => import('/dictionaries/ka.json').then((m) => m.default),
}

export const termsDictionaries = {
  en: () => import('/dictionaries/terms_en.json').then((m) => m.default),
  ka: () => import('/dictionaries/terms_ka.json').then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
export const getTermsDictionary = async (locale: Locale) =>
  termsDictionaries[locale]()
