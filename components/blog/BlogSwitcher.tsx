'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useParams, useSearchParams } from 'next/navigation'
import { switchBlog } from '/config'
import { memo } from 'react'
import { Switcher } from '/types'

export const BlogSwitcher = ({ text }: { text: Switcher }) => {
  const params = useSearchParams()
  const lang = useParams().lang
  return (
    <ul className='flex gap-10 lg:ml-20 items-end pb-3 uppercase'>
      {switchBlog.map((item) => (
        <li
          className={twMerge(
            'text-lg font-medium border-b border-transparent',
            (params.get('filter') ?? 'news') === item.name && 'border-black'
          )}
          key={item.name}
        >
          <Link href={`/${lang}/blog?filter=${item.name}`}>
            {text[item.name]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default memo(BlogSwitcher)
