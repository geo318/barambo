import Link from 'next/link'
import { NavbarProps } from './types'
import { Logo, Section } from '/components'
import { routes } from '/config'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { Header, Spacer } from './Header'

export const Navbar: React.FC<NavbarProps> = ({ text, lang, isHomepage }) => {
  return (
    <Header>
      <Section>
        <div className='flex items-center grow'>
          <Link
            href={`/${lang}${routes.home}`}
            className={'mr-auto mt-auto lg:pl-7 slide-down'}
          >
            <Logo className='lg:w-[12.5rem] mt-auto w-32 z-50' />
            <Spacer className='lg:block hidden' />
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
    </Header>
  )
}
