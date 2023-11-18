'use client'

import Image from 'next/image'
import { getImage, getLangKey } from '/utils'
import { twMerge } from 'tailwind-merge'
import { Minus, Plus } from '/components'
import { Locale } from '/types'
import { Fragment, memo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '/services'
import { useFilter } from './useFilter'

const Filter: React.FC<{
  lang: Locale
}> = ({ lang }) => {
  const { categories, open, toggleMenu, params, setActive } = useFilter()
  return (
    <section className='max-w-xs'>
      {categories.map((c, i) => (
        <Fragment key={c.id}>
          <div
            className={twMerge(
              'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb]',
              i >= 1 && 'text-secondary'
            )}
          >
            {c.thumbnail && (
              <Image
                src={getImage`${c.thumbnail}`}
                alt={c.name_eng ?? ''}
                width={25}
                height={25}
                className='max-h-6 max-w-6 h-auto'
              />
            )}
            {c[`name_${getLangKey(lang)}`]}
            {open[i] ||
            c.subCategories?.some(
              (e) => `${e.id}` == params.get('category')
            ) ? (
              <Minus
                onClick={() => toggleMenu(i)}
                className='ml-auto cursor-pointer'
              />
            ) : (
              <Plus
                onClick={() => toggleMenu(i)}
                className='ml-auto cursor-pointer'
              />
            )}
          </div>
          <div
            className={twMerge(
              'grid transition-all duration-300 ease-out',
              open[i] ||
                c.subCategories?.some(
                  (e) => `${e.id}` == params.get('category')
                )
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            )}
          >
            <ul className='overflow-hidden'>
              {c.subCategories?.map((sc) => (
                <li
                  key={sc.id}
                  className={twMerge(
                    'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb]',
                    i >= 1 && 'text-secondary'
                  )}
                  onClick={() => setActive(sc.id)}
                >
                  {sc.thumbnail && (
                    <Image
                      src={getImage`${sc.thumbnail}`}
                      alt={sc.name_eng ?? ''}
                      width={25}
                      height={25}
                      className='max-h-6 max-w-6 h-auto'
                    />
                  )}
                  {sc[`name_${getLangKey(lang)}`]}
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      ))}
    </section>
  )
}

export default memo(Filter)
