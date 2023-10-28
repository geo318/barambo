import Image from 'next/image'
import { Category } from '/types'

export function CategoryList({ category }: { category: Category[] }) {
  return (
    <div>
      {category.map((c) => {
        return (
          <div key={c.id} className='flex justify-between'>
            <div>{c.name}</div>
            <Image
              src={`http://localhost:3244/${c.thumbnail}`}
              height={200}
              width={200}
              alt=''
            />
          </div>
        )
      })}
    </div>
  )
}
