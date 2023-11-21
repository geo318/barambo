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

export default async function Contact({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { contact } = await getDictionary(lang)
  const { main, secondary } = contact.addresses
  return (
    <main className='flex flex-col gap-36 pt-30'>
      <Section className='py-28'>
        <H tag='h1' size='xl'>
          {contact.h1}
        </H>
        <div className='grid grid-cols-12 gap-[4%] mt-10'>
          <div className='col-span-5 bg-gold-light rounded-[3rem] py-14 px-12'>
            <h2 className='text-lg font-medium'>{contact.h2}</h2>
            <section className='mt-9 text-secondary text-lg mb-14'>
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
          <div className='col-span-7'>
            <Suspense fallback={<Spinner />}>
              <ContactForm texts={contact} />
            </Suspense>
          </div>
        </div>
      </Section>
    </main>
  )
}
