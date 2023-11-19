'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImage, getLangKey } from '/utils'
import { Blog, Locale } from '/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { getLatestPosts } from '/services'

export function SimilarPosts({
  children: skeleton,
  lang,
  id,
}: {
  children: React.ReactNode
  lang: Locale
  id: number
}) {
  const params = useSearchParams()
  const filter = params.get('filter') as Blog
  const { data: similarPosts, isLoading } = useQuery({
    queryKey: ['similar', filter ?? 'news'],
    queryFn: () => getLatestPosts(filter ?? 'news'),
  })
  return (
    <>
      {isLoading
        ? skeleton
        : similarPosts
            ?.filter((e) => e.id !== id)
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
