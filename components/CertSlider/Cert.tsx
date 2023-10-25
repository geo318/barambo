'use client'

import { BadgeOne, BadgeThree, BadgeTwo, H, Section } from '..'
import { Certificate } from '/types'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { SlideArrow } from './Arrows'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'

export function Cert({ text }: { text: Certificate }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const swiperRef = useRef(null)

  return (
    <Section>
      <H tag='h2' size='md' className='mb-16'>
        {text.h2}
      </H>
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
                <div className='flex gap-[2vw] shrink-1 items-center'>
                  <div className='grow flex max-w-[2.5rem] max-h-[3rem]'>
                    {i === 1 && <BadgeOne />}
                    {i === 2 && <BadgeTwo />}
                    {i === 3 && <BadgeThree />}
                  </div>

                  <H
                    tag='h3'
                    className='text-[1.5vw] line-clamp-2 text-ellipsis overflow-hidden'
                    title={title}
                  >
                    {title}
                  </H>
                </div>

                <p
                  className='break-before-all text-lg leading-normal mt-4 line-clamp-3 text-ellipsis'
                  title={description}
                >
                  {description}
                </p>
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
    </Section>
  )
}
