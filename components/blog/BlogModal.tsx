'use server'

import { Portal, H, VideoPlayer, CloseModal } from '/components'
import { getPost } from '/server'
import { getLangKey } from '/utils'

export const BlogModal = async ({ slug = '', lang = 'en' }) => {
  const recept = await getPost(slug)
  return (
    <Portal>
      <div className='xl:mx-48 lg:mx-28 mx-10 max-w-[110rem] mt-20'>
        <div className='z-50 block p-9 relative bg-white rounded-[3rem]'>
          <section className='grid grid-cols-8 gap-12'>
            <figure className='col-span-4'>
              {recept.link && <VideoPlayer link={recept.link} />}
            </figure>

            <div className='col-span-4 font-lg'>
              <div className='flex'>
                <H tag='h3' size='lg' className=''>
                  {recept.title_geo}
                </H>
                <CloseModal closeKey='?filter=recept' />
              </div>
              <div className='my-10 border-b border-[#bebebe]' />
              <div
                className='mt-10 flex flex-col gap-5 text-lg leading-normal'
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
