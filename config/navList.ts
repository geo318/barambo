import { routes } from './routes'

export const navList = [
  {
    name: 'products',
    link: '',
    menu: [
      { name: 'card', link: routes.card },
      { name: 'wallet', link: routes.wallet },
      { name: 'crypto', link: routes.crypto },
      { name: 'loan', link: routes.loan },
    ],
  },
  { name: 'partnership', link: routes.partnership, menu: [] },
  { name: 'about', link: routes.about, menu: [] },
  { name: 'contact', link: routes.contact, menu: [] },
] as const
