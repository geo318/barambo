import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { type Product as TProduct } from '/types'
import { getImage } from '/utils'

export const Product: React.FC<{ product: TProduct }> = ({ product }) => {
  return (
    <Link className={twMerge('cursor-pointer')} href='?id'>
      <div className='relative w-full h-52'>
        <Image
          src={getImage`${product.thumbnail}`}
          alt='banner'
          className='rounded-[1rem] w-full h-full object-cover'
          width={300}
          height={300}
        />
      </div>
      <div className='flex flex-col gap-2 mt-5'>
        <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quidem.
        </p>
        <div className='border-b my-2 border-[#bebebe]' />
        <h4 className='text-lg font-medium'>Barambino</h4>
      </div>
    </Link>
  )
}
