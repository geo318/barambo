'use client'

import { HomeCategoryProps } from './types'
import { FormWrapper, Input, Select } from '/components'
import { homeCategorySchema } from '/schema'
import { useForm } from './useForm'
import { Category } from '/types'

export const HomeCategoryForm = ({
  action,
  query,
  defaultValues,
  category,
}: HomeCategoryProps & { category: Category[] }) => {
  const { MessageBox, handleSubmit, param, ref } = useForm(action, query)
  const defaults = defaultValues?.find((c) => c.id === Number(param))
  const checked = category?.find((e) => e.id === defaults?.categoryId)?.id

  return (
    <FormWrapper
      schema={homeCategorySchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues?.find((c) => c.id === Number(param))}
    >
      {MessageBox}
      {param && <input name='id' defaultValue={param} hidden readOnly />}
      <Input name='heading_eng' label='Title Eng' />
      <Input name='heading_geo' label='Title Geo' />
      <Input name='thumbnail' label='Image' type='file' />
      <Input name='color' label='Color' placeholder='#ebebeb' />
      <Select
        name='categoryId'
        placeholder='choose category'
        options={
          category?.reduce((acc, c) => {
            acc.push({ id: c.id, name: c.name_eng })
            return acc
          }, [] as { id?: number; name: string }[]) ?? []
        }
        selected={checked}
        defaultValue={checked}
      />
    </FormWrapper>
  )
}
