'use server'

import { Portal, H, VideoPlayer, CloseModal } from '/components'
import { getPost } from '/server'

export const BlogModal = async ({ isOpen = false, slug = '' }) => {
  const recept = await getPost(slug)
  return (
    <>
      {isOpen && (
        <Portal>
          <div className='xl:mx-48 lg:mx-28 mx-10 max-w-[110rem] mt-20'>
            <div className='z-50 block p-9 relative bg-white rounded-[3rem]'>
              <section className='grid grid-cols-8 gap-12'>
                <figure className='col-span-4'>
                  <VideoPlayer link={recept.link!} />
                </figure>

                <div className='col-span-4 font-lg'>
                  <div className='flex'>
                    <H tag='h3' size='lg' className=''>
                      {recept.title_geo}
                    </H>
                    <CloseModal closeKey='?filter=recept'/>
                  </div>
                  <div className='my-10 border-b border-[#bebebe]' />
                  <ul className='mt-10 flex flex-col gap-5 text-lg leading-normal'>
                    <li>
                      <div className='text-secondary'>Preparation time:</div>5
                      minutes
                    </li>
                    <li>
                      <div className='text-secondary'>Serving:</div> 2 people
                    </li>
                    <li className='txt-balance'>
                      <div className='text-secondary'>Ingredients:</div>
                      200 ml of 35% cream 2-3 spoons of barambino chocolate
                      cream
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
