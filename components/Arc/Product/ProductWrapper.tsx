'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const ProductWrapper: React.FC<JSX.IntrinsicElements['div']> = ({
  children,
  className,
  ...props
}) => {
  const router = useRouter()
  const pathName = usePathname()
  return (
    <div
      className={twMerge('cursor-pointer', className)}
      {...props}
      onClick={() => {
        router.push(`${pathName}?id`)
      }}
    >
      {children}
    </div>
  )
}
