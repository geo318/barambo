import Image from 'next/image'
import { Category } from '/types'

export function CategoryList({ category }: { category: Category[] }) {
  return (
    <div className='flex flex-col gap-3'>
      {category.map((c, i) => {
        return (
          <div className='flex gap-5' key={c.id}>
            <span>{i + 1}</span>
            <div className='grid grid-cols-9'>
              <Image
                src={`http://localhost:3244${c.thumbnail}`}
                width={20}
                height={20}
                className='max-h-6 col-span-1'
                alt=''
              />
              <div className='col-span-4'>{c['name_eng']}</div>
              <div className='col-span-4'>{c['name_geo']}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
