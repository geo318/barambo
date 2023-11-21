'use client'

import { Fragment, useState } from 'react'
import { Addresses } from '/types'
import { twMerge } from 'tailwind-merge'
import { AvatarIcon, EmailIcon, Minus, PhoneIcon, Plus } from '/components'

export const Accordion = ({ addresses }: { addresses: Addresses }) => {
  const [open, setOpen] = useState<boolean[]>([])

  const toggleMenu = (i: number) => {
    setOpen((prev) => {
      const newArr = [...prev]
      newArr[i] = !prev[i]
      return newArr
    })
  }
  return (
    <section>
      {addresses.map((c, i) => (
        <Fragment key={c.location}>
          <div
            className={twMerge(
              'flex items-center gap-5 text-base py-4 px-2 border-t border-[#ebebeb] text-secondary truncate',
              open[i] && 'text-primary'
            )}
          >
            {c.location}
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
                open[i] && 'border-t border-[#ebebeb]'
              )}
            >
              <li
                className={twMerge(
                  'flex items-center gap-5 text-lg pb-1 text-secondary cursor-pointer first:pt-5 last:pb-5'
                )}
              >
                <AvatarIcon className='w-5' />
                {c.name}
              </li>
              <li
                className={twMerge(
                  'flex items-center gap-5 text-lg pb-1 text-secondary cursor-pointer first:pt-5 last:pb-5'
                )}
              >
                <EmailIcon className='w-5' />
                {c.email}
              </li>
              <li
                className={twMerge(
                  'flex items-center gap-5 text-lg pb-1 text-secondary cursor-pointer first:pt-5 last:pb-5'
                )}
              >
                <PhoneIcon className='w-5' />
                {c.phone}
              </li>
            </ul>
          </div>
        </Fragment>
      ))}
    </section>
  )
}
