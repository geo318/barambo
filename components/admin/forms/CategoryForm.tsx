'use client'

import { CategoryProps } from './types'
import { FormWrapper, Input } from '/components'
import { categorySchema } from '/schema'

export const CategoryForm = ({ main, action, edit }: CategoryProps) => {
  return (
    <FormWrapper
      schema={edit ? categorySchema.partial() : categorySchema}
      onSubmit={edit ? action : action}
    >
      <div className='flex gap-4 mb-4'>
        {main?.map((c, i) => (
          <Input
            key={c.id}
            name={`cat.${c.id}`}
            label={c['name_eng']}
            type='checkbox'
            defaultChecked={!i}
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
