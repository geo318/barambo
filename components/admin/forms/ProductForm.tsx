'use client'

import { ProductProps } from './types'
import { FormWrapper, Input, MultipleSelect, TinyMCE } from '/components'
import { productSchema } from '/schema'
import { useForm } from './useForm'
import { useMemo } from 'react'

export const ProductForm = ({
  query,
  action,
  deleteAction,
  defaultValues,
  subCategory,
}: ProductProps) => {
  const { MessageBox, handleSubmit, handleDelete, param, ref } =
    useForm(action, query, deleteAction)
  const options = useMemo(
    () =>
      subCategory.reduce((acc, c) => {
        acc.push({ id: c.id!, name: c.name_eng })
        return acc
      }, [] as { id: number; name: string }[]),
    [subCategory]
  )
  return (
    <>
      <FormWrapper
        schema={param ? productSchema(!!param) : productSchema()}
        onSubmit={handleSubmit}
        formRef={ref}
        defaultValues={defaultValues?.find((c) => c.id === Number(param))}
      >
        {MessageBox}
        {param && <input name='id' defaultValue={param} hidden readOnly />}
        <Input name='title_eng' label='Title Eng' />
        <Input name='title_geo' label='Title Geo' />
        <TinyMCE
          inputName='desc_eng'
          labelName='Description eng'
          height={300}
        />
        <TinyMCE
          inputName='desc_geo'
          labelName='Description geo'
          height={300}
        />
        <Input name='thumbnail' label='Thumbnail' type='file' />
        <MultipleSelect
          name='categoryIds'
          label='Category'
          options={options}
          placeholder='choose category'
        />
        <Input name='order' label='Order' type='number' min={0} />
      </FormWrapper>
      {param && deleteAction && (
        <form action={handleDelete}>
          <input name='id' value={param} hidden readOnly />
          <input
            type='submit'
            value='Delete'
            className='cursor-pointer hover:underline text-lg text-red-600 mt-5 float-right'
          />
        </form>
      )}
    </>
  )
}
