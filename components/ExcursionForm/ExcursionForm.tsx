'use client'

import { Button, Input, Spinner } from '/components'
import { useEmailForm } from './useExcursionForm'
import { FormProvider } from 'react-hook-form'
import { type Excursion, type EmailForm as TEmailForm } from '/types'
import { excursionForm } from '/config'
import { Fragment } from 'react'

export const ExcursionForm = ({ texts }: { texts: Excursion }) => {
  const { props, message, isLoading, submitHandler, form } = useEmailForm()

  return (
    <>
      <h3 className='py-5 text-3xl font-semibold'>{texts.heading}</h3>
      {message.error && (
        <p className='text-red-500 border border-red-300 rounded-md p-3'>
          ⚠️ {message.error}
        </p>
      )}
      {message.success && (
        <p className='text-green-500 font-bold border border-green-300 rounded-md p-3 mt-5'>
          ✅ {message.success}
        </p>
      )}
      <FormProvider {...form}>
        <form
          method='post'
          className='grid grid-cols-2 gap-6 mt-8 relative'
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {isLoading && (
            <div className='absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center'>
              <Spinner />
            </div>
          )}
          {(
            Object.entries(excursionForm) as [
              keyof TEmailForm,
              (typeof excursionForm)[keyof TEmailForm]
            ][]
          ).map(([key, _]) => (
            <Fragment key={key}>
              <div
                className={`flex flex-col gap-2 ${
                  excursionForm[key].required
                    ? 'lg:col-span-1 col-span-2'
                    : 'col-span-2'
                }`}
              >
                <Input
                  {...props(key)}
                  textarea={props(key).type === 'textarea'}
                  placeholder={texts.inputs[key].placeholder}
                  label={texts.inputs[key].label}
                  className='rounded-none border-t-0 border-x-0 border-b outline-none text-sm px-0'
                  labelClassName='font-medium text-lg'
                />
              </div>
            </Fragment>
          ))}

          <Button type='submit' disabled={isLoading} className='h-16 w-48'>
            {texts.button}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
