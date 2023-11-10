'use client'

import { ProductProps } from './types'
import { FormWrapper, Input, MultipleSelect, TinyMCE } from '/components'
import { productSchema } from '/schema'
import { useCategoryForm } from './useCategoryForm'
import { useMemo } from 'react'

export const ProductForm = ({
  action,
  edit,
  subCategory,
  checked,
  defaultValues,
}: ProductProps) => {
  const { MessageBox, handleSubmit, ref } = useCategoryForm(action)
  const options = useMemo(
    () =>
      subCategory.reduce((acc, c) => {
        acc.push({ id: c.id!, name: c.name_eng })
        return acc
      }, [] as { id: number; name: string }[]),
    [subCategory]
  )
  return (
    <FormWrapper
      schema={productSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues}
    >
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      <Input name='title_eng' label='Title Eng' />
      <Input name='title_geo' label='Title Geo' />
      <TinyMCE inputName='desc_eng' labelName='Description_eng' height={300} />
      <TinyMCE inputName='desc_geo' labelName='Description_geo' height={300} />
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <MultipleSelect
        name='categoryIds'
        label='Category'
        options={options}
        placeholder='choose category'
      />
      <Input name='order' label='Order' type='number' min={0} />
    </FormWrapper>
  )
}
