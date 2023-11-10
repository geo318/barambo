'use client'

import { twMerge } from 'tailwind-merge'
import { useMultipleSelect } from './useMultipleSelect'

export const MultipleSelect = ({
  name,
  type,
  label,
  options,
  className,
  placeholder,
  labelClassName,
  ...props
}: JSX.IntrinsicElements['input'] & {
  label?: string
  options: { id: number; name: string }[]
  labelClassName?: string
}) => {
  const { ref, isOpen, toggleMenu, register, errors, handleSelect, values } =
    useMultipleSelect(name!)
  return (
    <div className='relative'>
      <label
        className={twMerge('capitalize font-bold text-sm', labelClassName)}
      >
        {label}
        {props.required ? '*' : ''}
      </label>

      <input {...register(name!)} {...{ ...props, type, placeholder }} hidden />
      <div
        className={twMerge(
          'flex gap-2 border border-gray-900 rounded-lg focus:outline-app-blue h-12 p-2',
          className
        )}
        onClick={toggleMenu}
      >
        {values.length ? (
          values.map((v) => (
            <div
              key={v}
              className='bg-gray-900 px-2 py-1 rounded-lg border border-slate-300'
              onClick={() => handleSelect(v)}
            >
              {options.find((o) => o.id === v)?.name}
            </div>
          ))
        ) : (
          <div className='bg-gray-900 px-2 py-1 rounded-lg text-sm text-secondary'>
            {placeholder}
          </div>
        )}
      </div>

      <div className='absolute z-10 w-full mt-1' ref={ref}>
        {isOpen && (
          <ul className='bg-white flex flex-col gap-2 border border-slate-200 rounded-md shadow-md'>
            {options.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => handleSelect(id)}
                className='p-3 hover:bg-zinc-100 cursor-pointer flex'
              >
                {name}
                <input
                  type='checkbox'
                  checked={values.includes(id)}
                  className='ml-auto cursor-pointer'
                  readOnly
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='text-red-600 text-xs my-2 pl-2'>
        {name && name in errors && <span>{`${errors[name]?.message}`}</span>}
      </div>
    </div>
  )
}
