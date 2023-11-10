'use client'

import { ProductProps } from './types'
import { FormWrapper, Input, Select, TinyMCE } from '/components'
import { productSchema } from '/schema'
import { useCategoryForm } from './useCategoryForm'

export const ProductForm = ({
  action,
  edit,
  subCategory,
  checked,
}: ProductProps) => {
  const { MessageBox, handleSubmit, ref } = useCategoryForm(action)
  return (
    <FormWrapper schema={productSchema} onSubmit={handleSubmit} formRef={ref}>
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      <Input name='title_eng' label='Title Eng' />
      <Input name='title_geo' label='Title Geo' />
      <TinyMCE inputName='desc_eng' labelName='Description_eng' height={300} />
      <TinyMCE inputName='desc_geo' labelName='Description_geo' height={300} />
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <label className='text-sm font-bold'>Choose Category</label>
      <Select
        name='categoryIds'
        placeholder='choose category'
        options={subCategory.reduce((acc, c) => {
          acc.push({ id: c.id, name: c.name_eng })
          return acc
        }, [] as { id?: number; name: string }[])}
        selected={checked}
      />
      <Input name='order' label='Order' type='number' min={0} />
    </FormWrapper>
  )
}
