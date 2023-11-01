'use client'

import Link from 'next/link'
import { BlogText } from '/types'
import { twMerge } from 'tailwind-merge'
import { useSearchParams } from 'next/navigation'

const switchItems = [
  { name: 'news', param: '?news' },
  { name: 'recept', param: '?recept' },
  { name: 'src', param: '?src' },
]

export const BlogSwitcher = ({ text }: { text: BlogText }) => {
  const params = useSearchParams()
  return (
    <ul className='flex gap-10 ml-20 items-end pb-3 uppercase'>
      {switchItems.map((item, i) => (
        <li
          className={twMerge(
            'text-lg font-medium',
            typeof params.get(item.name) === 'string' && 'border-b'
          )}
          key={item.name}
        >
          <Link href={item.param}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}
