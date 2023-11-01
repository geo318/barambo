import Image from 'next/image'
import { map } from '/public'
import { H } from '..'
import { Export } from '/types'

export const Map = (text: { text: Export }) => {
  return (
    <>
      <H tag='h5' className='mt-auto' size='md'>
        {text.text.h2}
      </H>
      <div className='grid grid-cols-2 gap-[3rem] pt-14'>
        <div className='flex flex-col gap-8'>
          {text.text.p.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
        <Image
          src={map}
          alt='last-article'
          className='object-cover rounded-[3rem] sticky top-5'
        />
      </div>
    </>
  )
}
