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
      className={twMerge(
        dir === 'left' && 'rotate-180',
        'cursor-pointer',
        className
      )}
      onClick={() => {
        dir === 'left' ? swiper?.slidePrev() : swiper?.slideNext()
      }}
    />
  )
}
