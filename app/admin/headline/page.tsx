import { Suspense } from 'react'
import {
  H,
  Portal,
  Spinner,
  CloseModal,
  HeadlineForm,
  SearchParamsWrapper,
} from '/components'
import { createHeadline, editHeadline, getHeadLine } from '/server/actions'
import { SubCategory } from '/types'
import Link from 'next/link'

export default async function SubCategory() {
  const headline = await getHeadLine()

  return (
    <div className='grid grid-cols-2 gap-2'>
      {!headline ||
        (!headline?.length && (
          <section className='pb-10'>
            <H tag='h1' size='md' className='mb-20 text-center'>
              Add Headline
            </H>
            <Suspense fallback={<Spinner />}>
              <HeadlineForm action={createHeadline} />
            </Suspense>
          </section>
        ))}

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Headline
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {headline.map((h) => (
              <div
                key={h.id}
                className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                Edit headline on homepage
                <div className='flex gap-3 ml-auto'>
                  <Link href={`?edit=${h.id}`}>Edit</Link>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<Spinner />}>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 py-5 rounded-xl'>
              <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
                <div className='flex py-3'>
                  <h3 className='font-lg font-bold'>Edit headline</h3>
                  <CloseModal className='p-0' />
                </div>
                <HeadlineForm
                  action={editHeadline}
                  defaultValues={headline}
                  query='edit'
                />
              </div>
            </div>
          </Portal>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  )
}
