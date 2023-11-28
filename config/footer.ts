import { routes } from './routes'
export const footer = [
  {
    name: 'col_1',
    list: [
      { name: 'brands', link: routes.product + '?category=1' },
      { name: 'confectionary', link: routes.product + '?category=2' },
      { name: 'ice', link: routes.product + '?category=3' },
      { name: 'products', link: routes.product },
    ],
  },
  {
    name: 'col_2',
    list: [
      { name: 'news', link: routes.blog },
      { name: 'csr', link: routes.blog + '?filter=csr' },
      { name: 'recipes', link: routes.blog + '?filter=recept' },
    ],
  },
  {
    name: 'col_3',
    list: [
      { name: 'about', link: routes.about },
      { name: 'excursion', link: routes.excursion },
      { name: 'contact', link: routes.contact },
    ],
  },
] as const
