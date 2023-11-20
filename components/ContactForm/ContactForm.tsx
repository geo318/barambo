'use client'

import { Button, Input, Spinner } from '/components'
import { useEmailForm } from './useContactForm'
import { FormProvider } from 'react-hook-form'
import { Contact, type ContactForm as TContactForm } from '/types'
import { Fragment } from 'react'
import { contactForm } from '/config/forms/contact'

export const ContactForm = ({ texts }: { texts: Contact }) => {
  const { props, MessageBox, isLoading, submitHandler, form } = useEmailForm()

  return (
    <>
      {MessageBox}
      <div className='h-5' />
      <FormProvider {...form}>
        <form
          method='post'
          className='grid grid-cols-2 gap-6 relative'
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {isLoading && (
            <div className='absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center'>
              <Spinner />
            </div>
          )}
          {(
            Object.entries(contactForm) as [
              keyof TContactForm,
              (typeof contactForm)[keyof TContactForm]
            ][]
          ).map(([key, _]) => (
            <Fragment key={key}>
              <div
                className={`flex flex-col gap-2 ${
                  contactForm[key].required
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
                  options={contactForm[key].options?.map(
                    (o) => texts.options[o.key]
                  )}
                />
              </div>
            </Fragment>
          ))}

          <Button
            type='submit'
            disabled={isLoading}
            className='h-16 w-48 ml-auto col-span-2 mr-3 mb-3'
          >
            {texts.button}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
