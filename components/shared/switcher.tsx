'use client'

import Link from 'next/link'
import { locales, emojis, localeInfo } from '/config'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function Switcher() {
  const pathname = usePathname()
  return (
    <ul className='flex font-medium text-lg gap-4 ml-auto'>
      {localeInfo?.map((locale) => (
        <li
          key={locale.key}
          className={twMerge(
            pathname.startsWith(`/${locale.key}`) && 'border-b border-primary text-primary'
          )}
        >
          <Link
            href={pathname.replace(/^\/(en|ka)/, `/${locale.key}`)}
            className='hover:opacity-80 transition-opacity duration-200 uppercase'
          >
            {locale.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
