'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProps } from './types'
import { useContext } from 'react'
import { FormContext } from '/context'

export const FormWrapper: React.FC<FormProps> = ({
  schema,
  formRef,
  onSubmit,
  children,
  className,
  buttonLabel = 'submit',
  defaultValues,
}) => {
  const { defaultValues: formDefaults } = useContext(FormContext)

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? formDefaults,
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit && form.handleSubmit(onSubmit)}
        className={className}
        ref={formRef}
      >
        <div className='flex flex-col gap-2'>{children}</div>

        <button className='bg-blue-500 px-5 py-2 rounded-md text-white w-full mt-2 hover:bg-blue-600'>
          {buttonLabel}
        </button>
      </form>
    </FormProvider>
  )
}
