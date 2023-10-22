import { routes } from './routes'
export const footer = [
  {
    name: 'col_1',
    list: [
      { name: 'card', link: routes.about },
      { name: 'wallet', link: routes.about },
      { name: 'crypto', link: routes.about },
      { name: 'loan', link: routes.about },
    ],
  },
  {
    name: 'col_2',
    list: [
      { name: 'about', link: routes.about },
      { name: 'partnership', link: routes.about },
      { name: 'terms', link: routes.about },
    ],
  },
  {
    name: 'col_3',
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
