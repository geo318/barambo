'use client'

import { useState } from 'react'
import { CategoryProps } from './types'
import { FormWrapper, Input } from '/components'
import { categorySchema } from '/schema'
import { useRouter } from 'next/navigation'

export const CategoryForm = ({
  main,
  action,
  edit,
  checked,
}: CategoryProps) => {
  const [message, setMessage] = useState({ error: '', success: '' })
  const router = useRouter()
  return (
    <FormWrapper
      schema={categorySchema}
      onSubmit={async (formData: FormData) => {
        const res = await action(formData)
        if (res.error) setMessage({ error: res.error, success: '' })
        if (res.success) {
          setMessage({ error: '', success: 'Success' })
          router.back()
        }
      }}
    >
      {message.error && (
        <p className='text-red-500 border border-red-300 rounded-md p-3'>
          ⚠️ {message.error}
        </p>
      )}
      {message.success && (
        <p className='text-green-500 font-bold border border-green-300 rounded-md p-3 mt-5'>
          ✅ {message.success}
        </p>
      )}
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
