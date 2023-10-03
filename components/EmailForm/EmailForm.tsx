'use client'
import { Input } from '../Input'
import { useEmailForm } from './useEmailForm'
import { FormProvider } from 'react-hook-form'
import { OrderFormText, type EmailForm as TEmailForm } from '/types'
import { orderCardFormInitialValues } from '/config'
import { Fragment } from 'react'
import { Spinner } from '../shared'

export const EmailForm = ({ texts }: { texts: OrderFormText }) => {
  const { props, message, isLoading, submitHandler, orderCardForm, form } =
    useEmailForm()

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
            Object.entries(orderCardFormInitialValues) as [
              keyof TEmailForm,
              TEmailForm[keyof TEmailForm]
            ][]
          ).map(([key, _]) => (
            <Fragment key={key}>
              {key === 'message' && (
                <p className='text-base font-bold col-span-2 text-app-blue'>
                  {texts.upload}
                </p>
              )}
              <div
                className={`flex flex-col gap-2 ${
                  orderCardForm[key].required
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
              {key === 'id_image_facing_back' && (
                <p className='text-base font-bold col-span-2 text-app-blue'>
                  {texts.selfie}
                </p>
              )}
            </Fragment>
          ))}
          <label className='flex gap-5 col-span-2 '>
            <input type='checkbox' required />
            <span>{texts.verify}</span>
          </label>

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

export default EmailForm
