import { routes } from './routes'
export const footer = [
  {
    name: 'products',
    list: [
      { name: 'card', link: routes.card },
      { name: 'wallet', link: routes.wallet },
      { name: 'crypto', link: routes.crypto },
      { name: 'loan', link: routes.loan },
    ],
  },
  {
    name: 'wallypay',
    list: [
      { name: 'about', link: routes.about },
      { name: 'partnership', link: routes.partnership },
      { name: 'terms', link: routes.terms },
    ],
  },
  {
    name: 'contact',
    list: [
      { name: 'phone', link: '+995 032 256 05 55' },
      { name: 'email', link: 'support@wallypay.eu' },
      {
        name: 'address',
        link: 'https://maps.app.goo.gl/j6jXCvbkr67ARVvH7',
      },
    ],
  },
] as const
