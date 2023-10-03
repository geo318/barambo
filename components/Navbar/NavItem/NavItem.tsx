'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { NavItemProps } from './types'

export const NavItem: React.FC<NavItemProps> = ({
  name,
  link,
  text,
  lang,
  toggle,
  className,
}) => {
  return (
    <li className='list-none font-medium text-lg relative'>
      <Link
        href={link ? `/${lang}${link}` : '#'}
        onClick={toggle}
        className={twMerge(
          'hover:opacity-70 py-1 transition-opacity duration-200 capitalize',
          className
        )}
      >
        {text[name]}
      </Link>
    </li>
  )
}
