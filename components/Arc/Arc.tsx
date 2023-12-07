import Image from 'next/image'
import { H } from '/components'
import { twMerge } from 'tailwind-merge'
import { ArcProps } from './types'

export const Arc: React.FC<ArcProps> = ({
  sub,
  src,
  arch,
  heading,
  className,
  imgClassName,
}) => {
  return (
    <figure className='flex flex-col lg:gap-10 gap-5'>
      <div
        className={twMerge(
          'aspect-square w-full max-w-[25rem] rounded-t-[30rem] rounded-b-[3rem] flex items-end justify-center relative',
          className
        )}
      >
        {arch && (
          <Image
            src={arch}
            alt='arch image'
            className='inset-0 object-contain h-full w-full absolute'
            width={500}
            height={500}
          />
        )}
        <Image
          src={src}
          alt='background'
          width={500}
          height={500}
          className={twMerge('lg:scale-[1.35] scale-110 mb-5', imgClassName)}
        />
      </div>
      {!!heading && (
        <figcaption className='font-medium lg:text-base text-sm text-secondary text-center'>
          <H tag='h5' className='text-primary uppercase' size='sm'>
            {heading}
          </H>
          {sub}
        </figcaption>
      )}
    </figure>
  )
}
