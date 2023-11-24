'use client'

import { Burger, Close } from '/components'
import { Nav } from './Nav'
import { NavbarProps } from './types'
import { useSidebar } from './useSidebar'

export const Sidebar = (props: NavbarProps) => {
  const { isOpen, toggle } = useSidebar()
  return (
    <>
      <Burger
        fill='#000'
        className='self-center cursor-pointer lg:hidden'
        onClick={toggle}
      />
      {isOpen && (
        <>
          <aside className='flex flex-col fixed inset-y-0 right-0 w-72 bg-white p-5 z-50 shadow-md'>
            <Close className='cursor-pointer ml-auto' onClick={toggle} />
            <div>
              <Nav
                {...props}
                toggle={toggle}
                navItemClassName='relative flex shadow-none'
              />
            </div>
          </aside>
          <div
            className='z-40 inset-0 fixed bg-black bg-opacity-30'
            onClick={toggle}
          />
        </>
      )}
    </>
  )
}
