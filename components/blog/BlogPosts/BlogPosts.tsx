'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImage } from '/utils'
import { Button } from '/components'
import { useBlogPosts } from './useBlogPosts'

export function BlogPosts({
  children: skeleton,
}: {
  children?: React.ReactNode
}) {
  const { posts, isLoading, filter, lang } = useBlogPosts()
  return (
    <>
      {isLoading
        ? skeleton
        : posts?.map(({ id, thumbnail, slug }) => (
            <div
              key={id}
              className='flex aspect-square rounded-3xl relative overflow-hidden'
            >
              {thumbnail && (
                <Image
                  src={getImage`${thumbnail}`}
                  alt={`${id}`}
                  width={200}
                  height={200}
                  className='absolute inset-0 object-cover h-full w-full'
                />
              )}
              <Link
                href={
                  filter === 'recept'
                    ? `?filter=recept&recept=${slug}`
                    : `/${lang}/blog/${slug}?filter=${filter}`
                }
                className='mt-auto mx-auto lg:mb-8 mb-4 z-10'
              >
                <Button className='bg-white lg:w-36 lg:h-10 w-32 h-8 lg:text-xl text-md'>Read More</Button>
              </Link>
            </div>
          ))}
    </>
  )
}
