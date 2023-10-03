import { routes } from './routes'

export const navList = [
  { name: 'home', link: routes.home, menu: [] },
  { name: 'about', link: routes.about, menu: [] },
  { name: 'product', link: routes.product, menu: [] },
  { name: 'blog', link: routes.blog, menu: [] },
  { name: 'excursion', link: routes.excursion, menu: []},
  { name: 'contact', link: routes.contact, menu: [] },
] as const
