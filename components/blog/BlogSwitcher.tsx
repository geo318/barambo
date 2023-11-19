'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useSearchParams } from 'next/navigation'
import { switchBlog } from '/config'
import { memo } from 'react'

export const BlogSwitcher = () => {
  const params = useSearchParams()
  return (
    <ul className='flex gap-10 ml-20 items-end pb-3 uppercase'>
      {switchBlog.map((item) => (
        <li
          className={twMerge(
            'text-lg font-medium border-b border-transparent',
            (params.get('filter') ?? 'news') === item.name && 'border-black'
          )}
          key={item.name}
        >
          <Link href={`?filter=${item.name}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default memo(BlogSwitcher)
