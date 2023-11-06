'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProps } from './types'
import { useContext } from 'react'
import { FormContext } from '/context'

export const FormWrapper: React.FC<FormProps> = ({
  children,
  schema,
  onSubmit,
  className = '',
  buttonLabel = 'submit',
  revalidate,
}) => {
  const { defaultValues } = useContext(FormContext)
  console.log(defaultValues)

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <FormProvider {...form}>
      <form className={className} action={onSubmit}>
        <div className='flex flex-col gap-2'>{children}</div>

        <button
          className='bg-blue-500 px-5 py-2 rounded-md text-white w-full mt-2 hover:bg-blue-600'
          onClick={() => revalidate?.()}
        >
          {buttonLabel}
        </button>
      </form>
    </FormProvider>
  )
}
