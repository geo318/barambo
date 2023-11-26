'use server'

import { Portal, H, VideoPlayer, CloseModal } from '/components'
import { getPost } from '/server'
import { getLangKey } from '/utils'

export const BlogModal = async ({ slug = '', lang = 'en' }) => {
  const recept = await getPost(slug)
  return (
    <Portal>
      <div className='xl:mx-48 lg:mx-28 mx-10 max-w-[110rem] mt-20'>
        <div className='z-50 block p-9 relative bg-white lg:rounded-[3rem] rounded-2xl'>
          <section className='lg:grid flex flex-col-reverse grid-cols-8 gap-12'>
            <figure className='lg:col-span-4 col-span-8'>
              {recept.link && <VideoPlayer link={recept.link} />}
            </figure>

            <div className='lg:col-span-4 col-span-8 font-lg'>
              <div className='flex'>
                <H tag='h3' size='lg'>
                  {recept.title_geo}
                </H>
                <CloseModal closeKey='?filter=recept' />
              </div>
              <div className='lg:my-10 my-4 border-b border-[#bebebe]' />
              <div
                className='mt-10 flex flex-col text-lg leading-normal max-h-[25rem] overflow-y-auto'
                dangerouslySetInnerHTML={{
                  __html: recept[`content_${getLangKey(lang)}`],
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </Portal>
  )
}
