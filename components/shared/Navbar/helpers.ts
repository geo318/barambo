import { locales } from '/config'

export const checkPath = (path: string) =>
  !path.includes('about') &&
  path !== '/' &&
  !locales.some((l) => `/${l}` === path)
