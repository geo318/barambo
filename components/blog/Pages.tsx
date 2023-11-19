'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { countPosts } from '/services'
import { Blog } from '/types'
import { memo } from 'react'

export const BlogPages = () => {
  const params = useSearchParams()
  const filter = params.get('filter')
  const page = Number(params.get('page')) || 1

  const { data: pageCount } = useQuery({
    queryKey: ['pageCount', params.get('filter') ?? 'news'],
    queryFn: () => countPosts((params.get('filter') as Blog) ?? 'news'),
  })
  return (
    <>
      {Array.from({ length: pageCount ?? 0 }).map((_, i) => (
        <Link
          key={i}
          href={`${filter ? `?filter=${filter ?? 'news'}&` : '?'}page=${i + 1}`}
          className={twMerge(
            'text-xl w-12 flex items-center justify-center rounded-md text-[#77838F] aspect-square',
            ((!page && !i) || page == i + 1) && 'bg-[#E7DAD2] text-[#5A5A5A]'
          )}
        >
          {i + 1}
        </Link>
      ))}
    </>
  )
}

export default memo(BlogPages)