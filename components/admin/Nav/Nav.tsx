'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathName = usePathname()

  return (
    <nav className='flex py-2 mt-20 md:mt-0 justify-between'>
      <Link
        href='/admin/music'
        className={`${
          pathName === '/admin/music' ? 'font-semibold' : ''
        } px-3 hover:underline`}
      >
        Music List
      </Link>
      <Link
        href='/admin/event'
        className={`${
          pathName === '/admin/event' ? 'font-semibold' : ''
        } px-3 hover:underline`}
      >
        Event List
      </Link>
    </nav>
  )
}
