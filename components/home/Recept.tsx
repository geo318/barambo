'use server'

import Image from 'next/image'
import { Button } from '/components'
import { Locale } from '/types'
import { getHomepageRecept } from '/server'
import Link from 'next/link'
import { getImage } from '/utils'

export const ReceptSection = async ({ lang }: { lang: Locale }) => {
  const receipts = await getHomepageRecept()
  if (!receipts?.length)
    return (
      <div className='text-lg text-secondary font-medium py-3'>
        Add more posts to display
      </div>
    )
  return (
    <div className='lg:grid flex overflow-x-auto whitespace-nowrap flex-nowrap grid-cols-4 gap-8 mt-16'>
      {receipts?.map((recept, i) => (
        <div
          key={recept.id}
          className='flex lg:min-w-auto min-w-[50%] snap-mandatory lg:px-0 first:ml-6 last:mr-6 shrink-0 aspect-square rounded-3xl relative overflow-hidden'
        >
          <Image
            src={getImage`${recept.thumbnail}`}
            alt={`brands-${i}`}
            height={200}
            width={200}
            className='absolute inset-0 object-cover h-full w-full'
          />
          <Link
            href={`/${lang}/blog?filter=recept&recept=${recept.slug}`}
            className='mt-auto mx-auto mb-8 z-10'
          >
            <Button className='w-36 h-10 bg-white'>Read More</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export const ReceptSkeleton = () => {
  return (
    <div className='grid grid-cols-4 gap-8 mt-16'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className='flex aspect-square rounded-3xl relative overflow-hidden bg-zinc-200 animate-pulse'
        >
          <Button className='w-36 h-10 bg-white mt-auto mx-auto mb-8 z-10'>
            Read More
          </Button>
        </div>
      ))}
    </div>
  )
}
