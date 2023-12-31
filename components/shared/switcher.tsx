'use client'

import Link from 'next/link'
import { localeInfo } from '/config'
import { usePathname, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function Switcher({ className = '' }) {
  const pathname = usePathname()
  const params = useSearchParams()
  let searchParams = '?'

  for (const [key, value] of params.entries()) {
    searchParams += `${key}=${value}&`
  }

  return (
    <ul className={twMerge('font-medium text-lg gap-4', className)}>
      {localeInfo?.map((locale) => (
        <li
          key={locale.key}
          className={twMerge(
            'border-y border-transparent mt-2',
            pathname.startsWith(`/${locale.key}`) &&
              'border-b-primary text-primary'
          )}
        >
          <Link
            href={
              pathname.replace(/^\/(en|ka)/, `/${locale.key}`) + searchParams
            }
            className='hover:opacity-80 transition-opacity duration-200 uppercase'
          >
            {locale.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
