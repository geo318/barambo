'use server'

import { H, Section } from '/components'
import { Swipe } from './Swipe'
import { getHeadLine, getSlides } from '/server'
import { Locale } from '/types'
import { getLangKey } from '/utils'

export const MainSlider = async ({ lang }: { lang: Locale }) => {
  const slides = await getSlides()
  const headline = (await getHeadLine())[0]

  return (
    <div className='flex lg:flex-col flex-col-reverse lg:gap-10 gap-4'>
      <Section className='flex justify-between shrink-1 lg:flex-row flex-col'>
        <H tag='h1' className='leading-snug shrink-1 lg:w-[40%]' size='xl'>
          {headline[`title_${getLangKey(lang)}`]}
        </H>
        <section className='flex flex-col lg:gap-4 gap-2 lg:max-w-lg lg:mt-8 lg:ml-auto lg:mr-[10%] shrink-0 grow'>
          <h2 className='text-2xl font-medium text-primary mt-4 lg:mt-0'>
            {headline[`subtitle_${getLangKey(lang)}`]}
          </h2>
          <div className='border-b border-[#BEBEBE]' />
          <p className='txt-balance max-w-md text-lg font-normal text-secondary'>
            {headline[`desc_${getLangKey(lang)}`]}
          </p>
        </section>
      </Section>
      <Section className='relative'>
        <Swipe slides={slides} />
      </Section>
    </div>
  )
}
