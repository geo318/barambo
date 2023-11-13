'use server'

import { H, Section } from '/components'
import { Swipe } from './Swipe'
import { getSlides } from '/server'

export const MainSlider = async () => {
  const slides = await getSlides()

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
        <Swipe slides={slides} />
      </Section>
    </>
  )
}
