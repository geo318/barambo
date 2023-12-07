'use server'

import Link from 'next/link'
import { Anima, Arc } from '/components'
import { getHomeCategories } from '/server'
import { getImage, getLangKey, sleep } from '/utils'
import { Locale } from '/types'

export async function HomeCategorySection({ lang }: { lang: Locale }) {
  const HomeCategories = await getHomeCategories()

  return (
    <div className='flex justify-around lg:mt-14 mt-4 gap-5'>
      {HomeCategories.map((cat) => (
        <Anima
          key={cat.id}
          animationStart={['translate-y-20', 'scale-80', 'opacity-30']}
          animationEnd={['translate-y-0', 'scale-100', 'opacity-100']}
        >
          <Link href={`${lang}/product?category=${cat.categoryId}`}>
            <Arc
              src={getImage`${cat.thumbnail}`}
              heading={cat[`heading_${getLangKey(lang)}`]}
              style={{ backgroundColor: cat.color }}
            />
          </Link>
        </Anima>
      ))}
    </div>
  )
}

export const HomeCategorySkeleton = () => (
  <div className='flex justify-around lg:mt-14 mt-4 gap-5'>
    {Array.from({ length: 2 }).map((_, i) => (
      <div
        key={i}
        className='h-full w-full aspect-square animate-pulse bg-zinc-200 rounded-t-[30rem] rounded-b-[3rem]'
      />
    ))}
  </div>
)
