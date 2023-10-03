import Link from 'next/link'
import { Button, MasterCard } from '/components'
import { card } from '/public'
import { routes } from './routes'
import { locales } from './locales'

export const cards = (lang: typeof locales[number]) =>
  [
    {
      image: card,
      name: 'card',
      button: (text: string) => (
        <Link href={`/${lang}${routes.order}`}>
          <Button variant='primary' className='py-2 mr-auto'>
            <MasterCard />
            {text}
          </Button>
        </Link>
      ),
    },
    {
      image: card,
      name: 'wallet',
      button: (text: string) => (
        <Link href={`/${lang}${routes.wallet}`}>
          <Button className='py-2 mr-auto bg-app-blue text-white border-transparent hover:bg-[#19B2E6]'>
            {text}
          </Button>
        </Link>
      ),
    },
    {
      image: card,
      name: 'loan',
      button: (text: string) => (
        <Link href={`/${lang}${routes.loan}`}>
          <Button className='py-2 mr-auto bg-[#F395F5] text-white border-transparent hover:bg-[#f18cf3]'>
            {text}
          </Button>
        </Link>
      ),
    },
    {
      image: card,
      name: 'crypto',
      button: (text: string) => (
        <Link href={`/${lang}${routes.crypto}`}>
          <Button className='py-2 mr-auto bg-[#4ECDC4] text-white border-transparent hover:bg-[#47bbb3]'>
            {text}
          </Button>
        </Link>
      ),
    },
  ] as const
