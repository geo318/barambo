'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input } from '/components'
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
      <div className='flex gap-4 mb-4'>
        {main?.map((c, i) => (
          <Input
            key={c.id}
            name={`cat.${c.id}`}
            label={c['name_eng']}
            type='checkbox'
            defaultChecked={edit ? checked?.some((e) => +e === c.id) : !i}
            value={c.id}
          />
        ))}
      </div>
      <Input name='name_eng' label='Name Eng' />
      <Input name='name_geo' label='Name Geo' />
      <Input name='order' label='Order' type='number' min={0} />
      <Input name='thumbnail' label='Thumbnail' type='file' />
    </FormWrapper>
  )
}
