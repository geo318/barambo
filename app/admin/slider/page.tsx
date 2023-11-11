import { Suspense } from 'react'
import { CloseModal, H, Portal, SliderForm } from '/components'
import { routes } from '/config'
import {
  createProduct,
  createSlide,
  deleteSlide,
  editProduct,
  editSlide,
  getSlides,
} from '/server'
import { SubCategory } from '/types'
import { getImage } from '/utils'
import { twMerge } from 'tailwind-merge'
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
          <Suspense fallback={<div>loading...</div>}>
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

      {'edit' in searchParams && (
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
              <Suspense fallback={<div>Loading...</div>}>
                <SliderForm
                  action={editSlide}
                  defaultValues={slides.find(
                    (p) => p.id === Number(searchParams?.edit)
                  )}
                />
              </Suspense>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
