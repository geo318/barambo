import Image from 'next/image'
import Link from 'next/link'
import { Category } from '/types'
import { getImage } from '/utils'

export function CategoryList({ category }: { category: Category[] }) {
  return (
    <div className='flex flex-col gap-'>
      {category.map((c, i) => {
        return (
          <div className='flex gap-5' key={c.id}>
            <div className='flex gap-2'>
              <div className='w-2 shrink-0'>{i + 1}</div>
              <Image
                src={getImage`${c.thumbnail}`}
                width={20}
                height={20}
                className='max-h-6 col-span-1'
                alt=''
              />
            </div>
            <div className='col-span-4'>{c['name_eng']}</div>
            <div className='col-span-4'>{c['name_geo']}</div>

            <Link
              href={`?edit=${c.id}`}
              className='text-blue-600 hover:underline ml-auto'
            >
              Edit
            </Link>
          </div>
        )
      })}
    </div>
  )
}
