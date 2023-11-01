import { locales } from '/config'
import { SharedText } from '/types'

export type NavbarProps = {
  text: SharedText['header']
  lang: (typeof locales)[number]
  className?: string
  navItemClassName?: string
}
