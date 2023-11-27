'use server'

import Image from 'next/image'
import { Portal, H, CloseModal } from '/components'
import { Locale } from '/types'
import { getImage, getLangKey } from '/utils'
import { getProduct } from '/server'

export async function ProductModal({
  id,
  lang,
}: {
  id?: number
  lang: Locale
}) {
  const product = id && (await getProduct(id))[0]
  return product ? (
    <Portal>
      <div className='xl:mx-48 lg:mx-28 mx-10 max-w-[110rem] mt-20'>
        <div className='z-50 block lg:p-9 p-3 relative bg-white lg:rounded-[3rem] rounded-xl'>
          <div className='flex'>
            <H tag='h3' size='lg' className='lg:mt-5'>
              {product[`title_${getLangKey(lang)}`]}
            </H>
            <CloseModal closeKey='/product' />
          </div>

          <section className='grid grid-cols-8 lg:gap-12'>
            <figure className='lg:col-span-3 col-span-8'>
              <Image
                src={getImage`${product.thumbnail}`}
                alt='product'
                className='rounded-lg object-contain aspect-square'
                width={400}
                height={400}
              />
            </figure>

            <div className='lg:col-span-4 col-span-8 font-lg'>
              <div className='lg:my-10 my-4 border-b border-[#bebebe]' />
              <div
                className='leading-loose text-secondary'
                dangerouslySetInnerHTML={{
                  __html: product[`desc_${getLangKey(lang)}`],
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </Portal>
  ) : null
}
