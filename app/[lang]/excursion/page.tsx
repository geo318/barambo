import { Suspense } from 'react'
import { ExcursionForm, Section, Spinner } from '/components'
import { getDictionary } from '/lib'
import { Locale } from '/types'

export default async function Excursion({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { excursion } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28 flex gap-20'>
        <div>{excursion.heading}</div>
        <Suspense fallback={<Spinner />}>
          <ExcursionForm texts={excursion} />
        </Suspense>
      </Section>
    </main>
  )
}
