import { Suspense } from 'react'
import { ExcursionForm, H, Section, Spinner } from '/components'
import { getDictionary } from '/lib'
import { Locale } from '/types'

export default async function Excursion({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { excursion } = await getDictionary(lang)
  return (
    <main className='flex flex-col lg:gap-36 gap-10 lg:pt-30'>
      <Section className='lg:py-28 pt-10 pb-16'>
        <H tag='h1' size='lg'>
          {excursion.heading}
        </H>
        <div className='grid grid-cols-3 gap-[4%] lg:mt-20 mt-4'>
          <div className='lg:col-span-1 col-span-3'>
            <h2 className='text-lg font-medium capitalize'>{excursion.h2}</h2>
            <p className='text-secondary txt-balance lg:mt-10 mt-2'>
              {excursion.info}
            </p>
          </div>
          <div className='lg:col-span-2 col-span-3'>
            <Suspense fallback={<Spinner />}>
              <ExcursionForm texts={excursion} />
            </Suspense>
          </div>
        </div>
      </Section>
    </main>
  )
}
