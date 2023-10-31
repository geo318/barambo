import { createElement } from 'react'
import { CustomHeading } from './types'
import { twMerge } from 'tailwind-merge'
import { Marcellus } from 'next/font/google'

const font = Marcellus({ weight: ['400'], subsets: ['latin'] })

const variants = {
  md: '[font-size:_clamp(1.5rem,2.5vw,3rem)]',
  lg: '[font-size:_clamp(1.75rem,3vw,4rem)]',
  xl: '[font-size:_clamp(2rem,3.75vw,5rem)]',
  sm: '[font-size:_clamp(1rem,1.5vw,2rem)]',
} as const

export const H: React.FC<CustomHeading> = ({ tag, size, ...props }) =>
  createElement(tag, {
    className: twMerge(props.className, font.className, size && variants[size]),
    style: {
      ...props.style,
      ...(size === 'xl' && { fontWeight: 600 }),
    },
    ...props,
  })
