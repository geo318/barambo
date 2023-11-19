'use server'

import Image from 'next/image'
import Link from 'next/link'
import { getPaginatedPosts } from '/server'
import { Blog } from '/types'
import { getImage } from '/utils'
import { Button } from '/components'

export async function BlogPosts({
  lang,
  filter,
  page,
}: {
  lang: string
  filter: Blog
  page: number
}) {
  const posts = await getPaginatedPosts(filter ?? 'news', page)
  return (
    <>
      {posts.map(({ id, thumbnail, slug }) => (
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

export const BlogPostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className='flex aspect-square rounded-3xl overflow-hidden'>
          <div className='object-cover h-full w-full animate-pulse bg-zinc-200' />
        </div>
      ))}
    </>
  )
}
