import { createElement } from 'react'
import { CustomHeading } from './types'
import { twMerge } from 'tailwind-merge'
import { Marcellus } from 'next/font/google'

const font = Marcellus({ weight: ['400'], subsets: ['latin'] })

export const H: React.FC<CustomHeading> = ({ tag, ...props }) =>
  createElement(tag, {
    ...props,
    className: twMerge(props.className, font.className),
  })
