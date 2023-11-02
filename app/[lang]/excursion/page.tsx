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
    <main className='flex flex-col gap-36 pt-30'>
      <Section className='py-28'>
        <H tag='h1' size='md'>
          {excursion.heading}
        </H>
        <div className='grid grid-cols-3 gap-[4%] mt-20'>
          <div className='col-span-1'>
            <h2 className='text-lg font-medium'>{excursion.h2}</h2>
            <p className='text-secondary txt-balance mt-10'>{excursion.info}</p>
          </div>
          <div className='col-span-2'>
            <Suspense fallback={<Spinner />}>
              <ExcursionForm texts={excursion} />
            </Suspense>
          </div>
        </div>
      </Section>
    </main>
  )
}
