import Link from 'next/link'
import { NavbarProps } from './types'
import { Button, Logo } from '/components'
import { routes } from '/config'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'

export const Navbar: React.FC<NavbarProps> = ({ text, lang }) => {
  return (
    <header className='text-lg py-5 xl:px-16 px-5 text-secondary'>
      <div className='flex items-center grow'>
        <Link href={`/${lang}${routes.home}`} className='mr-auto'>
          <Logo className='w-[12.5rem]' />
        </Link>
        <Nav text={text} lang={lang} className='lg:flex hidden ml-auto' />
        <div className='flex gap-6 ml-auto lg:hidden'>
          <Sidebar text={text} lang={lang} className='flex-col text-black' />
        </div>
      </div>
    </header>
  )
}
