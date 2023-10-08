import Link from 'next/link'
import { NavbarProps } from './types'
import { Logo, Section } from '/components'
import { routes } from '/config'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'

export const Navbar: React.FC<NavbarProps> = ({ text, lang }) => {
  return (
    <header className='text-lg text-secondary'>
      <Section>
        <div className='flex items-center grow'>
          <Link href={`/${lang}${routes.home}`} className='mr-auto mt-auto pl-7'>
            <Logo className='w-[12.5rem] z-50' />
            <div className='logo-spacer relative before:content-[""] before:absolute before:top-0 before:-inset-x-7 before:h-8 before:rounded-b-3xl before:bg-white' />
          </Link>
          <Nav
            text={text}
            lang={lang}
            className='lg:flex hidden ml-auto pt-12 pb-10'
          />
          <div className='flex gap-6 ml-auto lg:hidden'>
            <Sidebar text={text} lang={lang} className='flex-col text-black' />
          </div>
        </div>
      </Section>
    </header>
  )
}
