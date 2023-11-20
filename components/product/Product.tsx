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
  index: number
}> = ({ product, locale, index }) => {
  return (
    <>
      <Link className={twMerge('cursor-pointer')} href={`?id=${product.id}`}>
        <div className='relative w-full bg-zinc-200 bg-opacity-50 aspect-square flex items-center'>
          <Image
            src={getImage`${product.thumbnail}`}
            alt='banner'
            className='rounded-3xl w-full max-w-full max-h-full object-contain p-2 aspect-square'
            width={200}
            height={200}
            priority={index < 5}
          />
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <div
            className='text-lg text-secondary line-clamp-3 text-ellipsis leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: product[`desc_${getLangKey(locale)}`],
            }}
          />
          <div className='border-b my-2 border-[#bebebe]' />
          <h4 className='text-lg font-medium truncate'>
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

export const ProductSkeleton = ({ num = 12 }) => (
  <>
    {Array.from({ length: num }).map((_, i) => (
      <div key={i}>
        <div className='relative w-full bg-zinc-200 animate-pulse bg-opacity-50 rounded-3xl aspect-square' />
        <div className='flex flex-col gap-2 mt-5'>
          <div className='text-lg text-secondary line-clamp-3 text-ellipsis leading-relaxed h-10 bg-zinc-200 animate-pulse' />
          <div className='border-b my-2 border-[#bebebe]' />
          <h4 className='text-lg font-medium truncate h-6 bg-zinc-200 animate-pulse' />
        </div>
      </div>
    ))}
  </>
)
