import { FooterUl } from './FooterUl'
import { Logo, Section } from '/components'
import { SharedText } from '/types'
import { footer, locales } from '/config'
import { Social } from './Social'
import { footerBg } from '/public'
import Image from 'next/image'

export const Footer = ({
  text,
  lang,
}: {
  text: SharedText['footer']
  lang: (typeof locales)[number]
}) => {
  return (
    <footer className='bg-app-blue-dark relative lg:min-h-[40rem] flex flex-col overflow-hidden lg:bg-transparent bg-[#E7DAD2] lg:pt-0 pt-8 lg:rounded-none rounded-t-3xl'>
      <Image
        src={footerBg}
        alt='bg'
        className='object-cover object-top h-full w-full absolute -z-10 lg:block hidden'
      />
      <Section className='max-w-[100rem] mx-auto lg:grid xl:grid-cols-2 grid-cols-3 flex flex-col-reverse mt-auto lg:pb-24 pb-10 md:px-14'>
        <section className='xl:col-span-1 text-center flex lg:flex-col gap-7 items-center mt-10 lg:mt-0'>
          <Logo className='lg:max-w-[11rem] max-w-[6rem] mr-auto' />
          <p className='text-left txt-balanced text-secondary text-lg mr-auto lg:block hidden'></p>
          <div className='flex flex-col lg:mr-auto lg:ml-0 mr-0 ml-auto lg:gap-7 gap-2'>
            <Social />
            <p className='mr-auto text-center text-[#71737A] lg:text-sm text-xs'>
              {text.copy}
            </p>
          </div>
        </section>
        <section className='grid lg:gap-10 gap-5 grid-cols-3 xl:col-span-1 lg:col-span-2'>
          {footer.map(({ name, list }) => (
            <FooterUl
              key={name}
              sec={name}
              items={list}
              text={text}
              heading={text.heading[name]}
              lang={lang}
            />
          ))}
        </section>
      </Section>
    </footer>
  )
}
