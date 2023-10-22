'use client'

import Image from 'next/image'
import { Arrow, Button, Section } from '..'
import { banner, banner2, banner3 } from '/public'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useState } from 'react'

import 'swiper/css'

export const MainSlider = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  return (
    <Section className='relative'>
      <Swiper
        onSwiper={(swiperRef) => setSwiper(swiperRef)}
        navigation={true}
        className='rounded-t-[5rem]'
        loop
      >
        {[banner, banner2, banner3].map((img) => (
          <SwiperSlide key={img.src} className='!h-auto'>
            <Image src={img} alt='banner' className='min-h-full w-full object-cover' />
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
    </Section>
  )
}
