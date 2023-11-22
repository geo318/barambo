'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Arrow, Button } from '/components'
import { useState } from 'react'
import { Slider } from '/types'
import { getBlurImage, getImage } from '/utils'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import 'swiper/css'

export const Swipe: React.FC<{ slides: Slider[] }> = ({ slides }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [isLoaded, setIsLoaded] = useState(true)
  return (
    <Swiper
      onSwiper={(swiperRef) => setSwiper(swiperRef)}
      navigation={true}
      className='rounded-t-[5rem]'
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }}
      loop
    >
      {slides.map((s) => (
        <SwiperSlide key={s.id} className='!h-[40rem]'>
          <Image
            src={getImage`${s.thumbnail}`}
            className={twMerge(
              'min-h-full w-full object-cover bg-no-repeat bg-cover transition-opacity',
              isLoaded ? 'opacity-1' : 'opacity-0'
            )}
            width={1500}
            height={500}
            alt='banner'
            onLoadStart={() => setIsLoaded(false)}
            onLoadingComplete={() => setIsLoaded(true)}
            priority
          />
          <div
            className={twMerge(
              'absolute block inset-0 backdrop-blur-lg transition-opacity',
              isLoaded ? 'opacity-0' : 'opacity-1'
            )}
          >
            <div
              className='min-h-full w-full object-cover bg-no-repeat bg-cover'
              style={{
                backgroundImage: `url(${getBlurImage`${s.thumbnail}`})`,
              }}
            />
          </div>
        </SwiperSlide>
      ))}
      <div className='absolute bottom-10 flex gap-4 right-0 mr-[7vw] z-10'>
        <Button
          className='bg-white w-16 h-16 !px-0'
          onClick={() => swiper?.slidePrev()}
        >
          <Arrow className='rotate-180' />
        </Button>
        <Button
          className='bg-white w-16 h-16 !px-0'
          onClick={() => swiper?.slideNext()}
        >
          <Arrow />
        </Button>
      </div>
    </Swiper>
  )
}
