'use client'

import { Burger, Close, Switcher } from '/components'
import { Nav } from './Nav'
import { NavbarProps } from './types'
import { useSidebar } from './useSidebar'
import { twMerge } from 'tailwind-merge'

export const Sidebar = (props: NavbarProps) => {
  const { isOpen, toggle } = useSidebar()
  return (
    <>
      {!isOpen ? (
        <Burger
          fill='#000'
          className='self-center cursor-pointer lg:hidden'
          onClick={toggle}
        />
      ) : (
        <Close className='cursor-pointer ml-auto' onClick={toggle} />
      )}
      <aside
        className={twMerge(
          isOpen ? 'translate-y-[5rem]' : 'translate-y-full',
          'flex flex-col fixed inset-0 bg-[#F5EFEC] p-5 z-50 shadow-md transition-transform'
        )}
      >
        <Nav
          {...props}
          toggle={toggle}
          navItemClassName='relative flex shadow-none'
        />
        <Switcher className='flex gap-4 mt-10'/>
      </aside>
    </>
  )
}
