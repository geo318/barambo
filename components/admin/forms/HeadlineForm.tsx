'use client'

import { HeadlineProps } from './types'
import { FormWrapper, Input } from '/components'
import { certSchema } from '/schema'
import { useForm } from './useForm'

export const HeadlineForm = ({
  action,
  edit,
  defaultValues,
}: HeadlineProps) => {
  const { MessageBox, handleSubmit, ref } = useForm(action)

  return (
    <FormWrapper
      schema={certSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues}
    >
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      <Input name='title_eng' label='Title Eng' />
      <Input name='title_geo' label='Title Geo' />
      <Input name='subtitle_eng' label='Subtitle Eng' />
      <Input name='subtitle_geo' label='Subtitle Geo' />
      <Input name='desc_eng' label='Description eng' height={300} textarea />
      <Input name='desc_geo' label='Description geo' height={300} textarea />
    </FormWrapper>
  )
}
