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
  labelClassName,
  options,
  ...props
}: JSX.IntrinsicElements['input'] & {
  textarea?: boolean
  label?: string
  labelClassName?: string
  options?: { label: string; value: string }[] | null
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      {!options && (
        <label
          className={twMerge('capitalize font-bold text-sm', labelClassName)}
        >
          {label}
          {props.required ? '*' : ''}
        </label>
      )}
      {options ? (
        <div className='flex lg:gap-10 gap-4 flex-wrap'>
          {options.map((o) => (
            <div
              key={o.value}
              className='flex gap-4 items-center justify-center shrink-0'
            >
              <input
                type='radio'
                {...(name && register(name))}
                id={name}
                value={o.value.toLocaleLowerCase()}
              />
              <label htmlFor={o.value}>{o.label}</label>
            </div>
          ))}
        </div>
      ) : !textarea ? (
        <input
          {...(name && register(name))}
          {...{ ...props, type, placeholder }}
          className={twMerge(
            'p-3 border border-gray-900 rounded-lg focus:outline-app-blue',
            className
          )}
        />
      ) : (
        <textarea
          {...(name && register(name))}
          {...{ type, placeholder }}
          className={twMerge(
            'p-3 border border-gray-900 rounded-lg focus:outline-app-blue',
            className
          )}
          rows={5}
        />
      )}
      <div className='text-red-600 text-xs mb-3 pl-2'>
        {name && name in errors && <span>{`${errors[name]?.message}`}</span>}
      </div>
    </>
  )
}
