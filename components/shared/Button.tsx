import { twMerge } from 'tailwind-merge'
import { ButtonProps } from './types'
import { Marcellus } from 'next/font/google'
const marcellus = Marcellus({ weight: ['400'], subsets: ['latin'] })

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
      'group flex gap-1 justify-center items-center text-primary text-xl font-normal border-[.1875rem] border-[#040404] shadow-[5px_5px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] transition-all',
  }

  return (
    <button
      className={twMerge(
        variants['general'],
        variants[variant],
        marcellus.className,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
