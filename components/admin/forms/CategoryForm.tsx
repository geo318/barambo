'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input, Select } from '/components'
import { categorySchema } from '/schema'
import { useCategoryForm } from './useCategoryForm'

export const CategoryForm = ({
  main,
  action,
  edit,
  checked,
}: CategoryProps) => {
  const { MessageBox, handleSubmit, ref } = useCategoryForm(action)
  return (
    <FormWrapper schema={categorySchema} onSubmit={handleSubmit} formRef={ref}>
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      {main && (
        <Select
          name='categoryId'
          placeholder='choose category'
          options={main.reduce((acc, c) => {
            acc.push({ id: c.id, name: c.name_eng })
            return acc
          }, [] as { id?: number; name: string }[])}
          selected={checked}
        />
      )}
      <Input name='name_eng' label='Name Eng' />
      <Input name='name_geo' label='Name Geo' />
      <Input name='order' label='Order' type='number' min={0} />
      <Input name='thumbnail' label='Thumbnail' type='file' />
    </FormWrapper>
  )
}
