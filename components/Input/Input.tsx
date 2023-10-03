'use client'

import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export const Input = ({
  name,
  type,
  textarea,
  className,
  placeholder,
  label,
  ...props
}: JSX.IntrinsicElements['input'] & { textarea?: boolean; label?: string }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <label className='capitalize font-bold text-sm'>
        {label}
        {props.required ? '*' : ''}
      </label>
      {!textarea ? (
        <input
          {...(name && register(name))}
          {...{ props, type, placeholder }}
          className={twMerge(
            'p-3 border border-gray-900 rounded-lg focus:outline-app-blue',
            className
          )}
        />
      ) : (
        <textarea
          {...(name && register(name))}
          {...{ props, type, placeholder }}
          className='p-3 border border-gray-900 rounded-lg focus:outline-app-blue'
          rows={5}
        />
      )}
      <div className='text-red-600 text-xs mb-3 pl-2'>
        {name && name in errors && <span>{`${errors[name]?.message}`}</span>}
      </div>
    </>
  )
}
