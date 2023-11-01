'use client'

import { Input, Spinner } from '/components'
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
                />
              </div>
            </Fragment>
          ))}

          <button
            type='submit'
            className='text-white bg-app-blue hover:bg-[#56aee9] py-3 text-lg font-extrabold tracking-wide rounded-lg col-span-2 disabled:opacity-50 disabled:cursor-default'
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  )
}
