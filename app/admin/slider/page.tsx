import { Suspense } from 'react'
import {
  CloseModal,
  H,
  Portal,
  SearchParamsWrapper,
  SliderForm,
  Spinner,
} from '/components'
import { routes } from '/config'
import { createSlide, deleteSlide, editSlide, getSlides } from '/server'
import { SubCategory } from '/types'
import { getImage } from '/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function SubCategory({
  searchParams,
}: {
  searchParams: URLSearchParams & { edit?: number }
}) {
  const slides = await getSlides()

  return (
    <div>
      <section className='pb-10'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Product
        </H>
        <Suspense fallback={<div>Loading...</div>}>
          <SliderForm action={createSlide} />
        </Suspense>
      </section>

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Slides
        </H>
        <div className='grid grid-cols-1 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                <div className='flex gap-3'>
                  <Link href={`?edit=${slide.id}`}>Edit</Link>
                  <form action={deleteSlide}>
                    <input type='hidden' name='id' value={slide.id} />
                    <button
                      type='submit'
                      className='text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </form>
                </div>

                <Image
                  src={getImage`${slide.thumbnail}`}
                  className='w-full object-contain max-h-full max-w-full'
                  width={1500}
                  height={500}
                  alt=''
                />
              </div>
            ))}
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 py-5 rounded-xl'>
              <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
                <div className='flex py-3'>
                  <h3 className='font-lg font-bold'>Edit slide</h3>
                  <CloseModal
                    closeKey={`${routes.addSlider}?edit-product`}
                    className='p-0'
                  />
                </div>
                <SliderForm
                  action={editSlide}
                  deleteAction={deleteSlide}
                  defaultValues={slides}
                />
              </div>
            </div>
          </Portal>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  )
}
