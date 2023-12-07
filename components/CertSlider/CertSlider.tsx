'use server'

import { H, Section } from '..'
import { Cert } from './Cert'
import { getCertificates } from '/server'
import { CertText, Locale } from '/types'
import { sleep } from '/utils'

export async function CertSlider({
  lang,
  text,
}: {
  lang: Locale
  text: CertText
}) {
  const certificates = await getCertificates()
  await sleep(10000)
  return (
    <Cert certificates={certificates} lang={lang} text={text}>
      <CertSkeleton />
    </Cert>
  )
}

export const CertSkeleton = () => (
  <Section>
    <H tag='h2' size='md' className='lg:mb-16 mb-4'>
      <div className='animate-pulse w-1/3 h-14 bg-zinc-200  rounded-md' />
    </H>
    <div className='flex basis-1/3 gap-10 w-full'>
      <div className='animate-pulse w-full aspect-video bg-zinc-200 rounded-[2rem]' />
      <div className='animate-pulse w-full aspect-video bg-zinc-200 rounded-[2rem]' />
      <div className='animate-pulse w-full aspect-video bg-zinc-200 rounded-[2rem]' />
    </div>
  </Section>
)
