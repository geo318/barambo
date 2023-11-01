'use client'

import { useSwitchForms } from './useSwitchForms'
import { twMerge } from 'tailwind-merge'

export function SwitchForms() {
  const { activeForm, toggleForm } = useSwitchForms()
  return (
    <section className='grow max-w-sm mx-auto'>
      <div className='flex gap-5 text-slate-600 justify-center my-10'>
        <h4
          onClick={toggleForm('music')}
          className={twMerge(
            'cursor-pointer hover:text-black',
            activeForm === 'music' &&
              'text-black font-semibold border-b-2 border-app-blue'
          )}
        >
          Add Music
        </h4>
        <h4
          onClick={toggleForm('event')}
          className={twMerge(
            'cursor-pointer hover:text-black',
            activeForm === 'event' &&
              'text-black font-semibold border-b-2 border-app-blue'
          )}
        >
          Add Event
        </h4>
      </div>
    </section>
  )
}
