'use client'

import { SliderProps } from './types'
import { FormWrapper, Input } from '/components'
import { sliderSchema } from '/schema'
import { useForm } from './useForm'

export const SliderForm = ({ action, edit, defaultValues }: SliderProps) => {
  const { MessageBox, handleSubmit, ref } = useForm(action)

  return (
    <FormWrapper
      schema={sliderSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues}
    >
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <Input name='order' label='Order' type='number' min={0} />
    </FormWrapper>
  )
}
