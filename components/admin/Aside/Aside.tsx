'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Logo } from '/components'

export function Aside({ className }: { className: string }) {
  const pathName = usePathname()

  return (
    <aside
      className={twMerge(
        'fixed left-0 inset-y-0 w-[15rem] bg-slate-50 border-r border-slate-100 shadow-xl flex flex-col gap-10',
        className
      )}
    >
      <Link href='/'>
        <Logo className='p-3 mt-6' />
      </Link>

      <nav className='flex flex-col gap-5 justify-between px-10'>
        <Link
          href='/admin/category'
          className={`${
            pathName === '/admin/music' ? 'font-semibold' : ''
          } px-3 hover:underline`}
        >
          Add Category
        </Link>
        <Link
          href='/admin/product'
          className={`${
            pathName === '/admin/event' ? 'font-semibold' : ''
          } px-3 hover:underline`}
        >
          Add Product
        </Link>
      </nav>
    </aside>
  )
}
