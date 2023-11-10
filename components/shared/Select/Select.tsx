'use client'

import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export const Select = ({
  name,
  className,
  placeholder,
  label,
  labelClassName,
  options,
  selected,
  ...props
}: JSX.IntrinsicElements['select'] & {
  label?: string
  labelClassName?: string
  options: { id?: number; name: string }[]
  selected?: number
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label className={twMerge(labelClassName)}>{label}</label>
      <select
        className={twMerge(
          'px-2 py-3 border border-black rounded-md mb-5',
          className
        )}
        {...(name && register(name))}
        {...{ ...props, placeholder }}
      >
        {options.map((c) => (
          <option value={c.id} key={c.id} defaultValue={selected}>
            {c.name}
          </option>
        ))}
      </select>
      <div className='text-red-600 text-xs mb-3 pl-2'>
        {name && name in errors && <span>{`${errors[name]?.message}`}</span>}
      </div>
    </>
  )
}
