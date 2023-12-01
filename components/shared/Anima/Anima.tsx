'use client'

import { twMerge } from 'tailwind-merge'
import { useObserver } from '/hooks'

export function Anima({
  children,
  className,
  animationStart,
  animationEnd,
}: {
  children: React.ReactNode
  className?: string
  animationStart?: string[]
  animationEnd?: string[]
}) {
  const { ref } = useObserver<HTMLDivElement>({ animationStart, animationEnd })
  return (
    <div
      ref={ref}
      className={twMerge('transition-all duration-300 delay-300', className)}
    >
      {children}
    </div>
  )
}
