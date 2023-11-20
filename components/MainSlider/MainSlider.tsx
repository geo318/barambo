'use server'

import { H, Section } from '/components'
import { Swipe } from './Swipe'
import { getSlides } from '/server'

export const MainSlider = async () => {
  const slides = await getSlides()

  return (
    <>
      <Section className='flex justify-between pb-10 shrink-1'>
        <H tag='h1' className='leading-snug shrink-1 w-[40%]' size='xl'>
          Have you tasted our new ice cream?
        </H>
        <section className='flex flex-col gap-4 max-w-lg mt-8 ml-auto mr-[10%] shrink-0 grow'>
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
