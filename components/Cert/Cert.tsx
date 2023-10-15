'use client'

import { Section } from '..'
import { Certificate } from '/types'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Parallax,
} from 'swiper/modules'
import { SlideArrow } from './Arrows'
import 'swiper/css'
import { useState } from 'react'

export function Cert({ text }: { text: Certificate }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  return (
    <Section>
      <div className='relative'>
        <SlideArrow
          dir='left'
          swiper={swiper}
          className='-ml-10 top-1/2 -translate-y-1/2 absolute'
        />

        <Swiper
          className='shrink-1'
          modules={[Navigation, Pagination, Scrollbar, A11y, Parallax]}
          onSwiper={(swiperRef) => setSwiper(swiperRef)}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          loop
        >
          {text.map(({ description, title }, index) => (
            <SwiperSlide key={index}>
              <h3>{title}</h3>
              <p className='break-before-all'>{description}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        <SlideArrow
          dir='right'
          swiper={swiper}
          className='-mr-10 right-0 top-1/2 -translate-y-1/2 absolute'
        />
      </div>
    </Section>
  )
}
