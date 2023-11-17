'use client'

import { CertProps } from './types'
import { FormWrapper, Input } from '/components'
import { certSchema } from '/schema'
import { useForm } from './useForm'

export const CertForm = ({
  query,
  action,
  deleteAction,
  defaultValues,
}: CertProps) => {
  const { MessageBox, handleSubmit, handleDelete, param, ref } = useForm(
    action,
    query,
    deleteAction
  )

  return (
    <>
      <FormWrapper
        schema={certSchema}
        onSubmit={handleSubmit}
        formRef={ref}
        defaultValues={defaultValues?.find((c) => c.id === Number(param))}
      >
        {MessageBox}
        {param && <input name='id' defaultValue={param} hidden readOnly />}
        <Input name='title_eng' label='Title Eng' />
        <Input name='title_geo' label='Title Geo' />
        <Input name='desc_eng' label='Description eng' height={300} textarea />
        <Input name='desc_geo' label='Description geo' height={300} textarea />
        <Input name='order' label='Order' type='number' min={0} />
      </FormWrapper>
      {param && deleteAction && (
        <form action={handleDelete}>
          <input name='id' value={param} hidden readOnly />
          <input
            type='submit'
            value='Delete'
            className='cursor-pointer hover:underline text-lg text-red-600 mt-5 float-right'
          />
        </form>
      )}
    </>
  )
}
