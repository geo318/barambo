import { twMerge } from 'tailwind-merge'
import { Switcher } from '/components'
import { NavItem } from './NavItem'
import { NavbarProps } from './types'
import { navList } from '/config'
import { Suspense } from 'react'

export const Nav: React.FC<NavbarProps & { toggle?: () => void }> = ({
  text,
  lang,
  toggle,
  className,
  navItemClassName,
}) => (
  <>
    <nav
      className={twMerge(
        'flex gap-6 font-medium text-lg text-secondary mr-[8%]',
        className
      )}
    >
      {navList.map((item) => (
        <NavItem
          key={item.name}
          {...item}
          text={text}
          lang={lang}
          className={navItemClassName}
          toggle={toggle}
        />
      ))}
    </nav>
    <Suspense>
      <Switcher className='hidden lg:flex' />
    </Suspense>
  </>
)
