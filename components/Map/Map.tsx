import Image from 'next/image'
import { map, map_hovered } from '/public'
import { H } from '/components'
import { Export } from '/types'

export const Map = (text: { text: Export }) => {
  return (
    <>
      <H tag='h5' className='mt-auto' size='md'>
        {text.text.h2}
      </H>
      <div className='lg:grid grid-cols-2 gap-[3rem] pt-14 flex flex-col-reverse'>
        <div className='flex flex-col gap-8'>
          {text.text.p.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
        <div className='relative group'>
          <Image
            src={map}
            alt='last-article'
            className='object-cover rounded-[3rem] top-5'
          />
          <Image
            src={map_hovered}
            alt='last-article'
            className='object-cover rounded-[3rem] absolute inset-0 opacity-0 group-hover:opacity-100 duration-300 transition-opacity z-10'
          />
        </div>
      </div>
    </>
  )
}
