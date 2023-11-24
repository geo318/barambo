'use client'

import { H, Section, Spinner } from '/components'
import { Certificate } from '/types'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { SlideArrow } from './Arrows'
import { useRef, useState } from 'react'
import { useScreenWidth } from '/hooks'
import { Slide } from './Slide'
import 'swiper/css'
import 'swiper/css/pagination'

export function Cert({ text }: { text: Certificate }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const { isMobile, isLoading } = useScreenWidth(1024)
  const swiperRef = useRef(null)

  return (
    <Section>
      <H tag='h2' size='md' className='lg:mb-16 mb-4'>
        {text.h2}
      </H>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      {isMobile === false && (
        <div className='relative'>
          <SlideArrow
            dir='left'
            swiper={swiper}
            className='-ml-10 top-1/2 -translate-y-1/2 absolute'
          />

          <Swiper
            modules={[Navigation]}
            onSwiper={(swiperRef) => setSwiper(swiperRef)}
            spaceBetween={50}
            slidesPerView={3}
            navigation={true}
            ref={swiperRef}
            loop
          >
            {text.list.map(({ description, title }, index) => {
              const num = Math.floor(index / 3)
              const i = index + 1 - num * 3
              return (
                <SwiperSlide
                  key={index}
                  className='border-2 border-[#ddd] rounded-3xl p-[1.6vw] !h-auto'
                >
                  <Slide i={i} description={description} title={title} />
                </SwiperSlide>
              )
            })}
          </Swiper>

          <SlideArrow
            dir='right'
            swiper={swiper}
            className='-mr-10 right-0 top-1/2 -translate-y-1/2 absolute swiper-button-next'
          />
        </div>
      )}
      {isMobile === true && (
        <div className='flex flex-nowrap snap-mandatory overflow-x-auto gap-6 pb-3'>
          {text.list.map(({ description, title }, index) => {
            const num = Math.floor(index / 3)
            const i = index + 1 - num * 3
            return (
              <div
                key={index}
                className='border-2 border-[#ddd] rounded-3xl py-3 px-5 min-w-[15rem]'
              >
                <Slide i={i} description={description} title={title} />
              </div>
            )
          })}
        </div>
      )}
    </Section>
  )
}
