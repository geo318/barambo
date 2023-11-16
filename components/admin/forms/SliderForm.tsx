'use client'

import { SliderProps } from './types'
import { FormWrapper, Input } from '/components'
import { sliderSchema } from '/schema'
import { useForm } from './useForm'

export const SliderForm = ({ action, query, defaultValues }: SliderProps) => {
  const { MessageBox, handleSubmit, param, ref } = useForm(action, query)

  return (
    <FormWrapper
      schema={sliderSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues}
    >
      {MessageBox}
      {param && <input name='id' defaultValue={param} hidden readOnly />}
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <Input name='order' label='Order' type='number' min={0} />
    </FormWrapper>
  )
}
