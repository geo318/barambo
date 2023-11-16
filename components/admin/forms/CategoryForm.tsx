'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input, Select } from '/components'
import { categorySchema, subCategorySchema } from '/schema'
import { useForm } from './useForm'

export const CategoryForm = ({
  main,
  action,
  query,
  checked,
}: CategoryProps) => {
  const { MessageBox, handleSubmit, param, ref } = useForm(action, query)
  return (
    <FormWrapper
      schema={main ? subCategorySchema : categorySchema}
      onSubmit={handleSubmit}
      formRef={ref}
    >
      {MessageBox}
      {param && (
        <input
          name='id'
          defaultValue={param}
          hidden
          readOnly
        />
      )}
      {main && (
        <Select
          name='categoryId'
          placeholder='choose category'
          options={main.reduce((acc, c) => {
            acc.push({ id: c.id, name: c.name_eng })
            return acc
          }, [] as { id?: number; name: string }[])}
          selected={checked}
          defaultValue={checked}
        />
      )}
      <Input name='name_eng' label='Name Eng' />
      <Input name='name_geo' label='Name Geo' />
      <Input name='order' label='Order' type='number' min={0} />
      <Input name='thumbnail' label='Thumbnail' type='file' />
    </FormWrapper>
  )
}
