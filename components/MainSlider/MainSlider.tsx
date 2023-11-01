'use client'

import Image from 'next/image'
import { Arrow, Button, H, Section } from '/components'
import { banner, banner2, banner3 } from '/public'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Marcellus } from 'next/font/google'

import 'swiper/css'

export const MainSlider = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  return (
    <>
      <Section className='grid grid-cols-2 gap-[14vw] pb-12'>
        <H tag='h1' className='leading-snug txt-balance' size='xl'>
          Have you tasted our new ice cream?
        </H>
        <section className='flex flex-col gap-4 max-w-lg'>
          <h2 className='text-2xl font-medium text-primary'>
            Which ones is your favorite?
          </h2>
          <div className='border-b border-[#BEBEBE]' />
          <p className='txt-balance max-w-md text-lg font-normal text-secondary'>
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and many web sites still in their
            infancy
          </p>
        </section>
      </Section>
      <Section className='relative'>
        <Swiper
          onSwiper={(swiperRef) => setSwiper(swiperRef)}
          navigation={true}
          className='rounded-t-[5rem]'
          loop
        >
          {[banner, banner2, banner3].map((img) => (
            <SwiperSlide key={img.src} className='!h-auto'>
              <Image
                src={img}
                alt='banner'
                className='min-h-full w-full object-cover'
              />
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
    </>
  )
}
