'use server'

import Image from 'next/image'
import Link from 'next/link'
import { getImage, getLangKey } from '/utils'
import { Blog, Locale } from '/types'
import { getLatestPosts } from '/server'

export async function SimilarPosts({
  lang,
  id,
  filter,
}: {
  lang: Locale
  id: number
  filter: Blog
}) {
  const similarPosts = await getLatestPosts(filter ?? 'news')
  return (
    <>
      {similarPosts
        .filter((e) => e.id !== id)
        .slice(0, 4)
        .map((p) => (
          <Link key={p.id} href={`${p.slug}?filter=${filter ?? 'news'}`}>
            <div className='relative w-full aspect-square'>
              <Image
                src={getImage`${p.thumbnail}`}
                alt='banner'
                layout='fill'
                objectFit='cover'
                className='rounded-[1rem]'
              />
            </div>
            <div className='flex flex-col gap-2 mt-5'>
              <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'>
                {p[`title_${getLangKey(lang)}`]}
              </p>
            </div>
          </Link>
        ))}
    </>
  )
}

export const SimilarPostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className='relative w-full aspect-square'>
            <div className='rounded-[1rem] h-full w-full aspect-square animate-pulse bg-zinc-200' />
          </div>
          <div className='flex flex-col gap-2 mt-5'>
            <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed h-6 rounded-md animate-pulse bg-zinc-200' />
          </div>
        </div>
      ))}
    </>
  )
}
