'use client'

import { twMerge } from 'tailwind-merge'
import { Arrow } from '..'
import { Certificate } from '/types'
import { useState } from 'react'

export function Cert({ text }: { text: Certificate }) {
  const [position, setPosition] = useState(0)
  return (
    <div className='w-full overflow-hidden'>
      <Arrow
        className='rotate-180'
        onClick={() => {
          setPosition(
            position < 1 ? Math.ceil(text.length / 3) - 1 : position - 1
          )
        }}
      />
      <ul
        className={twMerge(
          'flex gap-10 w-max transition-transform duration-200'
        )}
        style={{ transform: `translateX(-${position * (300 / text.length)}%)` }}
      >
        {text.map(({ description, title }, index) => (
          <li key={index} className='basis-1/3'>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
      <Arrow
        onClick={() =>
          setPosition(position > text.length / 3 - 1 ? 0 : position + 1)
        }
      />
    </div>
  )
}
