'use client'

import { CertProps } from './types'
import { FormWrapper, Input } from '/components'
import { certSchema } from '/schema'
import { useForm } from './useForm'

export const CertForm = ({ action, query, defaultValues }: CertProps) => {
  const { MessageBox, handleSubmit, param, ref } = useForm(action, query)

  return (
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
  )
}
