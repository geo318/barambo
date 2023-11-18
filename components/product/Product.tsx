import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { Locale, type Product as TProduct } from '/types'
import { getImage, getLangKey } from '/utils'
import { Suspense } from 'react'
import { ProductModal, SearchParamsWrapper } from '/components'

export const Product: React.FC<{
  product: TProduct
  locale: Locale
}> = ({ product, locale }) => {
  return (
    <>
      <Link className={twMerge('cursor-pointer')} href={`?id=${product.id}`}>
        <div className='relative w-full h-52'>
          <Image
            src={getImage`${product.thumbnail}`}
            alt='banner'
            className='rounded-[1rem] w-full h-full object-contain'
            width={200}
            height={200}
          />
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <div
            className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: product[`desc_${getLangKey(locale)}`],
            }}
          />
          <div className='border-b my-2 border-[#bebebe]' />
          <h4 className='text-lg font-medium'>
            {product[`title_${getLangKey(locale)}`]}
          </h4>
        </div>
      </Link>
      <Suspense>
        <SearchParamsWrapper query={['id']} param={product.id}>
          <ProductModal product={product} lang={locale} />
        </SearchParamsWrapper>
      </Suspense>
    </>
  )
}
