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
  const {
    open,
    categories,
    toggleMenu,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
  } = useFilter()
  return (
    <section className='lg:max-w-xs lg:block flex flex-col gap-1'>
      {categories.map((c, i) => (
        <Fragment key={c.id}>
          <div
            className={twMerge(
              'flex lg:flex-row flex-col items-center cursor-pointer lg:gap-5 gap-1 lg:text-lg text-xs lg:w-auto lg:h-auto w-20 h-20 rounded-xl lg:rounded-none pt-4 lg:pb-4 pb-2 px-2 lg:border-t lg:border-b-0 lg:border-x-0 border border-[#ebebeb] text-secondary',
              c.id == categoryId &&
                'text-primary lg:bg-none bg-[#D9D9D9] bg-opacity-50'
            )}
            onClick={() => {
              setCategoryId?.((prev) => (prev === c.id ? undefined : `${c.id}`))
              setSubcategoryId?.(undefined)
            }}
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
            <span className='mt-auto lg:mt-0'>
              {c[`name_${getLangKey(lang)}`]}
            </span>
            {open[i] ? (
              <Minus
                onClick={() => toggleMenu(i)}
                className='ml-auto cursor-pointer lg:block hidden'
              />
            ) : (
              <Plus
                onClick={() => toggleMenu(i)}
                className='ml-auto cursor-pointer lg:block hidden'
              />
            )}
          </div>
          <div
            className={twMerge(
              'lg:grid transition-all duration-300 ease-out hidden',
              open[i] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            )}
          >
            <ul
              className={twMerge(
                'overflow-hidden uppercase',
                open[i] && 'border-t border-[#ebebeb]'
              )}
            >
              {c.subCategories?.map((sc) => (
                <li
                  key={sc.id}
                  className={twMerge(
                    'flex items-center gap-5 ml-10 text-lg pb-1 text-secondary cursor-pointer first:pt-5 last:pb-5',
                    subcategoryId === sc.id && 'text-primary underline'
                  )}
                  onClick={() => {
                    setSubcategoryId?.(
                      subcategoryId == sc.id ? undefined : `${sc.id}`
                    )
                    setCategoryId?.(undefined)
                  }}
                  data-id={sc.id}
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
