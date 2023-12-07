import { Suspense } from 'react'
import {
  H,
  Portal,
  Spinner,
  CloseModal,
  SearchParamsWrapper,
  HomeCategoryForm,
} from '/components'
import { createHomeCategory, editHomeCategory, getCategories, getHomeCategories } from '/server'
import Link from 'next/link'

export default async function HomeCategory() {
  const [HomeCategory, categories] = await Promise.all([
    getHomeCategories(),
    getCategories(),
  ])

  return (
    <div className='grid grid-cols-2 gap-2'>
      {HomeCategory?.length < 2 && (
        <section className='pb-10'>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Edit Homepage Categories
          </H>
          <Suspense fallback={<Spinner />}>
            <HomeCategoryForm
              action={createHomeCategory}
              category={categories}
            />
          </Suspense>
        </section>
      )}

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Homepage Categories
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {HomeCategory.map((h) => (
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
                  <h3 className='font-lg font-bold'>Edit Home Categories </h3>
                  <CloseModal className='p-0' />
                </div>
                <HomeCategoryForm
                  action={editHomeCategory}
                  category={categories}
                  defaultValues={HomeCategory}
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
