'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { NavItemProps } from './types'
import { usePathname } from 'next/navigation'
import { locales } from '/config'

export const NavItem: React.FC<NavItemProps> = ({
  name,
  link,
  text,
  lang,
  toggle,
  className,
}) => {
  const path = usePathname().split('/').pop()
  return (
    <li className='list-none font-medium text-lg relative'>
      <Link
        href={link ? `/${lang}${link}` : '#'}
        onClick={toggle}
        className={twMerge(
          'hover:opacity-70 transition-opacity duration-200 capitalize border-b border-transparent',
          `/${locales.some((l) => l === path) ? '' : path}` === link
            ? 'text-primary lg:border-black'
            : 'text-secondary',
          className
        )}
      >
        {text[name]}
      </Link>
    </li>
  )
}
