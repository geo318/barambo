'use client'

import { twMerge } from 'tailwind-merge'
import { useObserver } from '/hooks'

export function Anima({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { ref } = useObserver<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={twMerge('transition-all duration-300 delay-100', className)}
    >
      {children}
    </div>
  )
}
