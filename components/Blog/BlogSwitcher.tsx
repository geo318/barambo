'use client'

import Link from 'next/link'
import { BlogText } from '/types'
import { twMerge } from 'tailwind-merge'
import { useSearchParams } from 'next/navigation'

const switchItems = [{ name: 'news' }, { name: 'recept' }, { name: 'csr' }]

export const BlogSwitcher = ({ text }: { text: BlogText }) => {
  const params = useSearchParams()
  return (
    <ul className='flex gap-10 ml-20 items-end pb-3 uppercase'>
      {switchItems.map((item) => (
        <li
          className={twMerge(
            'text-lg font-medium border-b border-transparent',
            params.get('filter') === item.name && 'border-black'
          )}
          key={item.name}
        >
          <Link href={`?filter=${item.name}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}
