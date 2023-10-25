import Image from 'next/image'
import { Cert, H, Map, Section } from '/components'
import { getDictionary } from '/lib'
import { chocolate_about, ice_cream_about } from '/public'
import { PageProps } from '/types'

export default async function About({ params: { lang } }: PageProps) {
  const { about, home } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='bg-gold-light py-28'>
        <H tag='h1' size='xl'>
          {about.h1}
        </H>
        <div className='flex gap-[7%]'>
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
          <div className='basis-1/3 flex shrink-0'>
            <div>
              <Image
                src={chocolate_about}
                alt=''
                className='max-w-full max-h-full object-contain top-10 sticky'
              />
            </div>
          </div>
        </div>
        <p className='mt-12 font-medium text-2xl'>{about.sum}</p>
      </Section>
      <Section>
        <H tag='h2' className='mb-16' size='md'>
          {about.mission.h2}
        </H>
        <div className='flex gap-[7%]'>
          <div className='basis-1/3 shrink-0'>
            <Image src={ice_cream_about} alt='' className='sticky top-10' />
          </div>
          <div className='flex flex-col gap-10 font-normal text-lg text-secondary'>
            {about.mission.p.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </Section>
      <Cert text={home.certificates} />

      <Section>
        <Map text={home.export} />
      </Section>
    </main>
  )
}
