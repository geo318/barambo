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
  const { posts, isLoading, filter } = useBlogPosts()
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
                    : `/blog/${slug}?filter=${filter}`
                }
                className='mt-auto mx-auto mb-8 z-10'
              >
                <Button className='bg-white w-36 h-10'>Read More</Button>
              </Link>
            </div>
          ))}
    </>
  )
}