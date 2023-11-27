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
                <Link
                  className='absolute inset-0 z-10'
                  href={
                    filter === 'recept'
                      ? ''
                      : `/${lang}/blog/${p.slug}?filter=${filter}`
                  }
                />
                {p.thumbnail && (
                  <Image
                    src={getImage`${p.thumbnail}`}
                    alt={`${p.id}`}
                    width={200}
                    height={200}
                    className='absolute inset-0 object-cover h-full w-full'
                  />
                )}
                {filter === 'recept' && (
                  <Link
                    href={`?filter=recept&recept=${p.slug}`}
                    className='mt-auto mx-auto lg:mb-8 mb-4 z-10'
                  >
                    <Button className='bg-white lg:w-36 lg:h-10 w-32 h-8 lg:text-xl text-md'>
                      Read More
                    </Button>
                  </Link>
                )}
              </div>
              {filter !== 'recept' && (
                <Link
                  href={`/${lang}/blog/${p.slug}?filter=${filter}`}
                  className='py-2 lg:block hidden line-clamp-2 text-ellipsis'
                >
                  {p[`title_${getLangKey(lang)}`]}
                </Link>
              )}
            </div>
          ))}
    </>
  )
}
