'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImage, getLangKey } from '/utils'
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
        : posts?.map((p) => (
            <div key={p.id}>
              <div className='flex aspect-square rounded-3xl relative overflow-hidden'>
                {p.thumbnail && (
                  <Image
                    src={getImage`${p.thumbnail}`}
                    alt={`${p.id}`}
                    width={200}
                    height={200}
                    className='absolute inset-0 object-cover h-full w-full'
                  />
                )}
                <Link
                  href={
                    filter === 'recept'
                      ? `?filter=recept&recept=${p.slug}`
                      : `/${lang}/blog/${p.slug}?filter=${filter}`
                  }
                  className='mt-auto mx-auto lg:mb-8 mb-4 z-10'
                >
                  <Button className='bg-white lg:w-36 lg:h-10 w-32 h-8 lg:text-xl text-md'>
                    Read More
                  </Button>
                </Link>
              </div>
              <span className='py-2 lg:block hidden line-clamp-2 text-ellipsis'>
                {p[`title_${getLangKey(lang)}`]}
              </span>
            </div>
          ))}
    </>
  )
}
