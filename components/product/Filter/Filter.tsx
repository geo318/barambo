'use client'

import Image from 'next/image'
import { getImage, getLangKey } from '/utils'
import { twMerge } from 'tailwind-merge'
import { Minus, Plus } from '/components'
import { Locale } from '/types'
import { Fragment, memo } from 'react'
import { useFilter } from './useFilter'

const Filter: React.FC<{
  lang: Locale
}> = ({ lang }) => {
  const { categories, open, toggleMenu, params, setCategoryId, categoryId } =
    useFilter()
  return (
    <section className='max-w-xs'>
      {categories.map((c, i) => (
        <Fragment key={c.id}>
          <div
            className={twMerge(
              'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb] text-secondary', 
              open[i] && 'text-primary'
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
            {open[i] ? (
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
              open[i] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            )}
          >
            <ul
              className={twMerge(
                'overflow-hidden uppercase',
                open[i] && 'border-t border-[#ebebeb] py-5'
              )}
            >
              {c.subCategories?.map((sc) => (
                <li
                  key={sc.id}
                  className={twMerge(
                    'flex items-center gap-5 ml-10 text-lg pb-1 text-secondary cursor-pointer',
                    categoryId === sc.id && 'text-primary'
                  )}
                  onClick={() => setCategoryId?.(sc.id)}
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
