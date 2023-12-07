import { Suspense } from 'react'
import {
  H,
  Portal,
  Spinner,
  CloseModal,
  DiscoverForm,
  SearchParamsWrapper,
} from '/components'
import {
  createDiscover,
  editDiscover,
  getDiscover,
  getSubCategories,
} from '/server'
import Link from 'next/link'

export default async function Discovery() {
  const [discover, subCategories] = await Promise.all([
    getDiscover(),
    getSubCategories(),
  ])

  return (
    <div className='grid grid-cols-2 gap-2'>
      {!discover?.length && (
        <section className='pb-10'>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Edit Discover section
          </H>
          <Suspense fallback={<Spinner />}>
            <DiscoverForm action={createDiscover} subCategory={subCategories} />
          </Suspense>
        </section>
      )}

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Discover
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {discover.map((h) => (
              <div
                key={h.id}
                className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                {h.heading_eng}
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
                  <h3 className='font-lg font-bold'>Edit Discovery section </h3>
                  <CloseModal className='p-0' />
                </div>
                <DiscoverForm
                  action={editDiscover}
                  defaultValues={discover}
                  subCategory={subCategories}
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
