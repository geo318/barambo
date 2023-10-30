'use client'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const Header = ({
  children,
  className,
  ...props
}: JSX.IntrinsicElements['header']) => {
  const path = usePathname()
  return (
    <header
      className={twMerge(
        'text-lg text-secondary',
        className,
        !path.includes('about') && path !== '/' && 'bg-gold-light'
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export const Spacer = () => {
  const path = usePathname()
  return (
    <div
      className={twMerge(
        !path.includes('about') && path !== '/'
          ? 'before:bg-gold-light'
          : 'before:bg-white',
        'logo-spacer relative before:content-[""] before:absolute before:top-0 before:-inset-x-7 before:h-8 before:rounded-b-3xl'
      )}
    />
  )
}
