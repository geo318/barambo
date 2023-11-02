import { Suspense } from 'react'
import { ContactForm, H, Section, Spinner } from '/components'
import { getDictionary } from '/lib'
import { Locale } from '/types'

export default async function Contact({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { contact } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36 pt-30'>
      <Section className='py-28'>
        <H tag='h1' size='md'>
          {contact.h1}
        </H>
        <div className='grid grid-cols-3 gap-[4%] mt-20'>
          <div className='col-span-1'>
            {/* <h2 className='text-lg font-medium'>{contact.h2}</h2>
            <p className='text-secondary txt-balance mt-10'>{contact.info}</p> */}
          </div>
          <div className='col-span-2'>
            <Suspense fallback={<Spinner />}>
              <ContactForm texts={contact} />
            </Suspense>
          </div>
        </div>
      </Section>
    </main>
  )
}
