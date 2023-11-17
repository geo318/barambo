'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input, Select } from '/components'
import { categorySchema, subCategorySchema } from '/schema'
import { useForm } from './useForm'

export const CategoryForm = ({
  deleteAction,
  subCategory,
  action,
  query,
  main,
}: CategoryProps) => {
  const { MessageBox, handleSubmit, handleDelete, param, ref } = useForm(
    action,
    query,
    deleteAction
  )
  const defaultValues = (subCategory ?? main)?.find(
    (e) => e.id === Number(param)
  )
  const checked = subCategory?.find(
    (e) => e.id === defaultValues?.id
  )?.categoryId

  return (
    <>
      <FormWrapper
        schema={subCategory ? subCategorySchema : categorySchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        formRef={ref}
      >
        {MessageBox}
        {param && <input name='id' defaultValue={param} hidden readOnly />}
        {subCategory && (
          <Select
            name='categoryId'
            placeholder='choose category'
            options={
              main?.reduce((acc, c) => {
                acc.push({ id: c.id, name: c.name_eng })
                return acc
              }, [] as { id?: number; name: string }[]) ?? []
            }
            selected={checked}
            defaultValue={checked}
          />
        )}
        <Input name='name_eng' label='Name Eng' />
        <Input name='name_geo' label='Name Geo' />
        <Input name='order' label='Order' type='number' min={0} />
        <Input name='thumbnail' label='Thumbnail' type='file' />
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
