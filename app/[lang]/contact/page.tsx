import { Suspense } from 'react'
import {
  Accordion,
  ContactForm,
  EmailIcon,
  FaxIcon,
  H,
  PhoneIcon,
  PinIcon,
  Section,
  Spinner,
} from '/components'
import { getDictionary } from '/lib'
import { Locale } from '/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Contact us for any questions or suggestions',
}

export default async function Contact({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { contact } = await getDictionary(lang)
  const { main, secondary } = contact.addresses
  return (
    <main className='flex flex-col gap-36 lg:pt-30'>
      <Section className='lg:py-28 pt-10 pb-14'>
        <H tag='h1' size='xl'>
          {contact.h1}
        </H>
        <div className='grid grid-cols-12 gap-[4%] mt-10 -ml-6 -mr-6 lg:ml-0 lg:mr-0'>
          <div className='lg:col-span-5 col-span-12 bg-gold-light lg:rounded-[3rem] lg:py-14 py-6 lg:px-12 px-6'>
            <h2 className='text-lg font-medium'>{contact.h2}</h2>
            <section className='mt-9 text-secondary lg:text-lg text-xs mb-14'>
              <p className='text-sm flex gap-6'>
                <PhoneIcon className='w-5' />
                {main.phone}
              </p>
              <p className='text-sm flex gap-6 mt-2'>
                <FaxIcon className='w-5' />
                {main.fax}
              </p>
              <p className='text-sm flex gap-6 mt-4'>
                <EmailIcon className='w-5' />
                {main.email}
              </p>
              <p className='text-sm flex gap-6 mt-4'>
                <PinIcon className='w-5' />
                {main.address}
              </p>
            </section>
            <Suspense fallback={<Spinner />}>
              <Accordion addresses={secondary} />
            </Suspense>
          </div>
          <div className='lg:col-span-7 col-span-12 lg:mb-0 mb-14 lg:px-0 px-6'>
            <Suspense fallback={<Spinner />}>
              <ContactForm texts={contact} />
            </Suspense>
          </div>
        </div>
      </Section>
    </main>
  )
}
