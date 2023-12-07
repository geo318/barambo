import Image from 'next/image'
import { CertSkeleton, CertSlider, H, Map, Section } from '/components'
import { getDictionary } from '/lib'
import { chocolate_about, ice_cream_about } from '/public'
import { PageProps } from '/types'
import { Suspense } from 'react'

export default async function About({ params: { lang } }: PageProps) {
  const { about, home } = await getDictionary(lang)
  return (
    <main className='flex flex-col lg:gap-36 gap-10 text-justify mb-10'>
      <Section className='bg-gold-light lg:py-28 py-10'>
        <H tag='h1' size='xl'>
          {about.h1}
        </H>
        <div className='flex gap-[7%] lg:flex-row flex-col'>
          <div className='shrink-1'>
            <h2 className='font-medium text-2xl pb-4 border-b border-secondary table mb-4 mt-8'>
              {about.sub}
            </h2>
            <div className='flex flex-col gap-10 font-normal text-lg text-secondary'>
              {about.p.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>
          <div className='basis-1/3 flex shrink-0 lg:mt-0 mt-4'>
            <div>
              <Image
                src={chocolate_about}
                alt=''
                className='max-w-full max-h-full object-contain top-10'
              />
            </div>
          </div>
        </div>
        <p className='mt-12 font-medium lg:text-2xl text-md'>{about.sum}</p>
      </Section>
      <Section>
        <H tag='h2' className='lg:mb-16 mb-4' size='md'>
          {about.mission.h2}
        </H>
        <div className='flex gap-[7%] lg:flex-row flex-col'>
          <div className='basis-1/3 shrink-0 lg:mb-0 mb-4'>
            <Image src={ice_cream_about} alt='' className='top-10' />
          </div>
          <div className='flex flex-col lg:gap-10 gap-4 font-normal lg:text-lg text-md text-secondary'>
            {about.mission.p.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </Section>
      <Suspense fallback={<CertSkeleton />}>
        <CertSlider lang={lang} text={home.certificates} />
      </Suspense>

      <Section>
        <Map text={home.export} />
      </Section>
    </main>
  )
}
