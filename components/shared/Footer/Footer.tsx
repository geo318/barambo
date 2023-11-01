import { FooterUl } from './FooterUl'
import { FooterCurve, Logo, Section } from '/components'
import { SharedText } from '/types'
import { footer, locales } from '/config'
import Link from 'next/link'
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
    <footer className='bg-app-blue-dark relative min-h-[40rem] flex flex-col overflow-hidden'>
      <Image
        src={footerBg}
        alt='bg'
        className='object-cover object-top h-full w-full absolute -z-10'
      />
      <Section className='max-w-[100rem] mx-auto grid grid-cols-2 mt-auto pb-24'>
        <section className='col-span-1 text-center hidden xl:flex flex-col gap-7 items-center'>
          <Logo className='max-w-[11rem] mr-auto' />
          <p className='text-left txt-balanced text-secondary text-lg'>
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose
          </p>
          <Social />
          <p className='mr-auto text-center text-[#71737A] text-sm'>
            {text.copy}
          </p>
        </section>
        <section className='grid gap-10 md:grid-cols-3 col-span-1'>
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
