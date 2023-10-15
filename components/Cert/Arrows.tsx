'use client'

import { twMerge } from 'tailwind-merge'
import { SwiperClass } from 'swiper/react'
import { Arrow } from '..'

export const SlideArrow = ({
  dir,
  swiper,
  className,
}: {
  dir: 'left' | 'right'
  swiper: SwiperClass | null
  className?: string
}) => {
  return (
    <Arrow
      className={twMerge(dir === 'left' && 'rotate-180 ', className)}
      onClick={() =>
        dir === 'left' ? swiper?.slidePrev(1) : swiper?.slideNext(1)
      }
    />
  )
}
