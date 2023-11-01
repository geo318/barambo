'use client'

import { FormWrapper, Input } from '/components'
import { categorySchema } from '/schema'
import { Category } from '/types'

export const CategoryForm = ({
  main,
  action,
}: {
  main?: Category[]
  action?: (formData: FormData) => Promise<Response | undefined>
}) => {
  return (
    <FormWrapper schema={categorySchema} onSubmit={action}>
      <div className='flex gap-4 mb-4'>
        {main &&
          main.map((c, i) => (
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
