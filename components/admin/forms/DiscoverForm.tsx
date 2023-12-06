'use client'

import { DiscoverProps } from './types'
import { FormWrapper, Input, Select } from '/components'
import { discoverSchema } from '/schema'
import { useForm } from './useForm'
import { SubCategory } from '/types'

export const DiscoverForm = ({
  query,
  action,
  subCategory,
  defaultValues,
}: DiscoverProps & { subCategory: SubCategory[] }) => {
  const { MessageBox, handleSubmit, param, ref } = useForm(action, query)
  const defaults = defaultValues?.find((c) => c.id === Number(param))
  const checked = subCategory?.find(
    (e) => e.id === defaults?.subcategoryId
  )?.id

  return (
    <FormWrapper
      schema={discoverSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues?.find((c) => c.id === Number(param))}
    >
      {MessageBox}
      {param && <input name='id' defaultValue={param} hidden readOnly />}
      <Input name='heading_eng' label='Heading Eng' />
      <Input name='heading_geo' label='Heading Geo' />
      <Input name='subheading_top_eng' label='Subheading Top Eng' />
      <Input name='subheading_top_geo' label='Subheading Top Geo' />
      <Input name='subheading_bottom_eng' label='Subheading Bottom Eng' />
      <Input name='subheading_bottom_geo' label='Subheading Bottom Geo' />
      <Input name='desc_top_eng' label='Desc Top Eng' />
      <Input name='desc_top_geo' label='Desc Top Geo' />
      <Input name='desc_bottom_eng' label='Desc Bottom Eng' />
      <Input name='desc_bottom_geo' label='Desc Bottom Geo' />
      <Input name='thumbnail' label='Thumbnail' type='file' />
      <Input name='background' label='Background' type='file' />
      <Input name='button' label='Action Button' />
      <Select
        name='subcategoryId'
        placeholder='choose category'
        options={
          subCategory?.reduce((acc, c) => {
            acc.push({ id: c.id, name: c.name_eng })
            return acc
          }, [] as { id?: number; name: string }[]) ?? []
        }
        selected={checked}
        defaultValue={checked}
      />
    </FormWrapper>
  )
}
