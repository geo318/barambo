'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Portal, Close, H } from '/components'
import { Router } from 'next/router'
import { useEsc } from '/hooks'
import Image from 'next/image'
import { banner3, barambino, barambinos } from '/public'

export function ProductModal() {
  const params = useSearchParams()
  const isOpen = params.has('id')
  const router = useRouter()
  const toggleModal = () => router.replace('/product')
  useEsc(toggleModal)

  return (
    <>
      {isOpen && (
        <Portal>
          <div className='xl:mx-48 lg:mx-28 mx-10 max-w-[110rem] mt-20'>
            <div className='z-50 block p-9 relative bg-white rounded-[3rem]'>
              <div className='flex'>
                <H tag='h3' size='lg' className='mt-5'>
                  HARMONY – WAFER CAKE WITH COCONUT
                </H>
                <div
                  className='p-2 cursor-pointer ml-auto'
                  onClick={toggleModal}
                >
                  <Close />
                </div>
              </div>

              <section className='grid grid-cols-8 gap-12'>
                <figure className='col-span-3'>
                  <Image
                    src={barambinos}
                    alt='product'
                    className='rounded-lg object-contain'
                  />
                </figure>

                <div className='col-span-4 font-lg'>
                  <div className='my-10 border-b border-[#bebebe]'/>
                  <p className='leading-loose text-secondary'>
                    Nutritional data for 100g: energy value 531 kcal, total fat
                    30.8g, total protein 6.4g, carbohydrates 58.9 g.Storage
                    Temperature: 13 - 23°С.
                  </p>
                  <ul className='mt-10 flex flex-col gap-1'>
                    <li>Wight: 225 g</li>
                    <li>Package: Carton</li>
                    <li>Shelf-life: 8 months</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
