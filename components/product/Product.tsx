import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { Locale, type Product as TProduct } from '/types'
import { generateSlug, getImage, getLangKey } from '/utils'
import { useContext } from 'react'
import { ProductContext } from '/context'

export const Product: React.FC<{
  product: TProduct
  locale: Locale
  index: number
}> = ({ product, locale, index }) => {
  const { setProduct } = useContext(ProductContext)
  return (
    <Link
      href={`?name=${generateSlug(product.title_eng)}`}
      className={twMerge('cursor-pointer')}
      onClick={setProduct?.bind(null, product)}
    >
      <div className='relative w-full bg-zinc-200 lg:rounded-3xl rounded-md bg-opacity-50 aspect-square lg:flex items-center'>
        <h4 className='text-md text-[.5rem] truncate lg:hidden top-2 left-2 px-2 pt-1'>
          {product[`title_${getLangKey(locale)}`]}
        </h4>
        <Image
          src={getImage`${product.thumbnail}`}
          alt='banner'
          className='w-full max-w-full max-h-full object-contain p-2 pt-0 lg:pt-2  aspect-square'
          width={200}
          height={200}
          priority={index < 5}
        />
      </div>
      <div className='lg:flex hidden flex-col gap-2 mt-5'>
        <div
          className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'
          dangerouslySetInnerHTML={{
            __html: product[`desc_${getLangKey(locale)}`],
          }}
        />
        <div className='border-b my-2 border-[#bebebe]' />
        <h4 className='text-md font-medium truncate'>
          {product[`title_${getLangKey(locale)}`]}
        </h4>
      </div>
    </Link>
  )
}

export const ProductSkeleton = ({ num = 12 }) => (
  <>
    {Array.from({ length: num }).map((_, i) => (
      <div key={i}>
        <div className='relative w-full bg-zinc-200 animate-pulse bg-opacity-50 lg:rounded-3xl rounded-md aspect-square' />
        <div className='lg:flex hidden flex-col gap-2 mt-5'>
          <div className='text-lg text-secondary line-clamp-3 text-ellipsis leading-relaxed h-10 bg-zinc-200 animate-pulse' />
          <div className='border-b my-2 border-[#bebebe]' />
          <h4 className='text-lg font-medium truncate h-6 bg-zinc-200 animate-pulse' />
        </div>
      </div>
    ))}
  </>
)
