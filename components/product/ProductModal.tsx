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
        <div className='z-50 block p-9 relative bg-white rounded-[3rem]'>
          <div className='flex'>
            <H tag='h3' size='lg' className='mt-5'>
              {product[`title_${getLangKey(lang)}`]}
            </H>
            <CloseModal closeKey='/product' />
          </div>

          <section className='grid grid-cols-8 gap-12'>
            <figure className='col-span-3'>
              <Image
                src={getImage`${product.thumbnail}`}
                alt='product'
                className='rounded-lg object-contain aspect-square'
                width={400}
                height={400}
              />
            </figure>

            <div className='col-span-4 font-lg'>
              <div className='my-10 border-b border-[#bebebe]' />
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
