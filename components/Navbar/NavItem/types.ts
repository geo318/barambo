import { locales, navList } from '/config'
import { SharedText } from '/types'

export type NavItemProps = (typeof navList)[number] & {
  text: SharedText['header']
  lang: (typeof locales)[number]
  className?: string
  toggle?: () => void
}
