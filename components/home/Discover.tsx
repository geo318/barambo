'use server'

import Link from 'next/link'
import { Anima, Arc, Button, H, Section } from '..'
import { getDiscover } from '/server'
import { getImage, getLangKey, sleep } from '/utils'
import { DiscoverText, Locale } from '/types'

export async function Discover({
  text,
  lang,
}: {
  text: DiscoverText
  lang: Locale
}) {
  const discover = (await getDiscover())[0]

  await sleep(3000)

  return (
    <Section className='flex lg:flex-row flex-col items-center justify-center align-middle gap-[4vw] 3xl:gap-20'>
      <div className='lg:basis-1/3 flex flex-col h-full lg:self-stretch flex-1 lg:aspect-square'>
        <Anima className='mt-auto'>
          <H tag='h5' size='lg'>
            {discover.heading_eng}
          </H>
        </Anima>
        <Anima className='my-auto mr-auto'>
          <Link
            href={`/${lang}/product?subcategory=${discover.subcategoryId}`}
            className='hidden lg:block'
          >
            <Button className='w-36 h-12 bg-white'>
              {text.action}
            </Button>
          </Link>
        </Anima>
      </div>
      <Link href={`/${lang}/product?subcategory=${discover.subcategoryId}`}>
        <Arc
          src={getImage`${discover.thumbnail}`}
          arch={getImage`${discover.background}`}
          imgClassName='-mb-5 lg:scale-[1.2]'
        />
      </Link>
      <section className='basis-1/3 lg:aspect-square flex gap-5 flex-col ml-auto justify-around'>
        {text.discover.map(({ title }, i) => {
          const position = !i ? 'top' : 'bottom'
          return (
            <Anima key={title}>
              <div>
                <h6 className='lg:text-2xl text-md font-medium'>
                  {discover[`subheading_${position}_${getLangKey(lang)}`]}
                </h6>
                <p className='text-[#827C74] lg:text-lg text-xs lg:mt-3'>
                  {discover[`desc_${position}_${getLangKey(lang)}`]}
                </p>
              </div>
            </Anima>
          )
        })}
      </section>
    </Section>
  )
}

export const DiscoverSkeleton = () => (
  <Section className='flex lg:flex-row flex-col items-center justify-center align-middle gap-[4vw] 3xl:gap-20'>
    <div className='lg:basis-1/3 flex flex-col h-full lg:self-stretch flex-1 lg:aspect-square'>
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md mb-4 mt-auto' />
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md mb-auto' />
    </div>
    <div className='animate-pulse h-1/3 w-1/3 aspect-square bg-zinc-200 rounded-t-[30rem] rounded-b-[3rem]' />
    <section className='basis-1/3 lg:aspect-square flex gap-5 flex-col ml-auto justify-around'>
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md mt-auto' />
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md' />
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md' />
      <div className='animate-pulse h-10 w-1/2 bg-zinc-200 rounded-md mb-auto' />
    </section>
  </Section>
)