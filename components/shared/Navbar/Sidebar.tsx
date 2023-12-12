'use client'

import { Burger, Close, Switcher } from '/components'
import { Nav } from './Nav'
import { NavbarProps } from './types'
import { useSidebar } from './useSidebar'
import { twMerge } from 'tailwind-merge'
import { Suspense } from 'react'

export const Sidebar = (props: NavbarProps) => {
  const { isOpen, toggleMenu } = useSidebar()
  return (
    <>
      {!isOpen ? (
        <Burger
          fill='#000'
          className='self-center cursor-pointer lg:hidden'
          onClick={toggleMenu}
        />
      ) : (
        <Close className='cursor-pointer ml-auto' onClick={toggleMenu} />
      )}
      <aside
        className={twMerge(
          isOpen
            ? 'translate-y-[5rem]'
            : 'translate-y-full opacity-0 pointer-events-none select-none',
          'flex flex-col fixed inset-0 bg-[#F5EFEC] p-5 z-50 shadow-md transition-transform'
        )}
      >
        <Nav
          {...props}
          toggle={toggleMenu}
          navItemClassName='relative flex shadow-none'
        />
        <Suspense>
          <Switcher className='flex gap-4 mt-10' />
        </Suspense>
      </aside>
    </>
  )
}
