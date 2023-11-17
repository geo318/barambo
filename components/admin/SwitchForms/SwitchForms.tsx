'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useSearchParams } from 'next/navigation'

export function SwitchForms({ name }: { name?: string }) {
  const params = useSearchParams()
  return (
    <section className='flex gap-5 text-lg capitalize justify-center mb-10'>
      <Link
        href='?add-item'
        className={twMerge(
          'border-b border-transparent',
          typeof params.get('edit-item') !== 'string' &&
            'font-medium border-black'
        )}
      >
        add {name}
      </Link>
      <Link
        href='?edit-item'
        className={twMerge(
          'border-b border-transparent',
          typeof params.get('edit-item') === 'string' &&
            'font-medium border-black'
        )}
      >
        edit {name}
      </Link>
    </section>
  )
}
