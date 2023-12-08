import { Suspense } from 'react'
import { Clipboard, H, Spinner } from '/components'
import { createFile, getFiles } from '/server'
import { SubCategory } from '/types'
import { getImage } from '/utils'
import Image from 'next/image'

export default async function SubCategory() {
  const files = await getFiles()

  return (
    <div>
      <section className='pb-10'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add new link
        </H>
        <form
          action={createFile}
          className='p-5 m-10 border border-slate-400 shadow-md rounded-lg'
        >
          <input
            type='file'
            name='path'
            placeholder='upload file'
            className='border border-slate-500 rounded-md p-1 mr-5'
          />
          <input hidden name='name' value={Math.random()} />
          <button
            type='submit'
            className='bg-blue-600 px-4 py-2 text-white rounded-md'
          >
            Upload
          </button>
        </form>
      </section>

      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Files
        </H>
        <div className='grid grid-cols-12 gap-5 capitalize'>
          <Suspense fallback={<Spinner />}>
            {files?.slice().reverse().map((f) => (
              <div
                key={f.id}
                className='col-span-2 flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
              >
                <Image
                  src={getImage`${f.path}`}
                  className='w-full object-contain max-h-full max-w-full aspect-square'
                  width={100}
                  height={100}
                  alt=''
                />
                <Clipboard text={getImage`${f.path}`} />
              </div>
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  )
}
