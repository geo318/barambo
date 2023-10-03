'use client'

import Link from 'next/link'
import { locales, emojis } from '/config'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function Switcher() {
  const pathname = usePathname()
  return (
    <ul className='flex font-medium text-sm'>
      {locales?.map((locale) => (
        <li
          key={locale}
          className={twMerge(pathname.startsWith(`/${locale}`) && 'hidden')}
        >
          <Link
            href={pathname.replace(/^\/(en|ka)/, `/${locale}`)}
            className='hover:opacity-80 transition-opacity duration-200'
          >
            {`${emojis[locale]} ${locale}`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
