'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input, TinyMCE } from '/components'
import { categorySchema } from '/schema'
import { useCategoryForm } from './useCategoryForm'

export const ProductForm = ({ action, edit, subCategory }: CategoryProps) => {
  const { MessageBox, handleSubmit, ref } = useCategoryForm(action)
  return (
    <FormWrapper schema={categorySchema} onSubmit={handleSubmit} formRef={ref}>
      {MessageBox}
      {edit && <input name='id' defaultValue={edit} hidden readOnly />}
      <Input name='title_eng' label='Title Eng' />
      <Input name='title_geo' label='Title Geo' />
      <TinyMCE
        inputName='Description_eng'
        labelName='Description_eng'
        height={300}
      />
      <TinyMCE
        inputName='Description_geo'
        labelName='Description_geo'
        height={300}
      />
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <label className='text-sm font-bold'>Choose Category</label>
      <select
        name='category'
        placeholder='choose category'
        className='px-2 py-3 border border-black rounded-md mb-5'
      >
        {subCategory?.map((c) => (
          <option value={c.id} key={c.id}>
            {c.name_eng}
          </option>
        ))}
      </select>
    </FormWrapper>
  )
}
