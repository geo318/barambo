import { twMerge } from 'tailwind-merge'
import { ButtonProps } from './types'

export function Button({
  children,
  className,
  variant = 'secondary',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'px-5 xl:py-4 py-2 gap-2 rounded-full bg-black hover:bg-slate-700 text-white',
    secondary: 'xl:px-8 px-5 py-2 rounded-full',
    general:
      'group flex gap-1 justify-center items-center text-sm font-semibold border border-black',
  }

  return (
    <button
      className={twMerge(variants['general'], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
