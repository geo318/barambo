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
    <figure className='flex flex-col gap-10'>
      <div
        className={twMerge(
          'aspect-square w-full max-w-[25rem] rounded-t-[30rem] rounded-b-[3rem] flex items-end justify-center relative',
          className
        )}
      >
        {arch && (
          <Image
            src={arch}
            alt={arch.src}
            className='absolute inset-0 object-contain h-full w-full'
          />
        )}
        <Image
          src={src}
          alt={src.src}
          className={twMerge('scale-[1.35] mb-5', imgClassName)}
        />
      </div>
      {!!heading && !!sub && (
        <figcaption className='text-[.8vw] font-medium text-secondary text-center'>
          <H tag='h5' className='text-[1.6vw] text-primary uppercase'>
            {heading}
          </H>
          {sub}
        </figcaption>
      )}
    </figure>
  )
}
