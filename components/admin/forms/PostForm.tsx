'use client'

import { PostProps } from './types'
import { FormWrapper, Input, Select, TinyMCE } from '/components'
import { useForm } from './useForm'
import { postSchema } from '/schema'

export const PostForm = ({ action, query, defaultValues }: PostProps) => {
  const { param, MessageBox, handleSubmit, ref } = useForm(action, query)

  return (
    <FormWrapper
      schema={postSchema}
      onSubmit={handleSubmit}
      formRef={ref}
      defaultValues={defaultValues}
    >
      {MessageBox}
      {param && (
        <input
          name='id'
          defaultValue={param}
          hidden
          readOnly
        />
      )}
      <Input name='title_eng' label='Title Eng' />
      <Input name='title_geo' label='Title Geo' />
      <TinyMCE inputName='content_eng' labelName='Blog Eng' height={300} />
      <TinyMCE inputName='content_geo' labelName='Blog geo' height={300} />
      <Input name='thumbnail' label='Thumbnail image' type='file' />
      <Input name='banner' label='Blog banner' type='file' defaultValue='' />
      <Input name='link' label='Youtube Link' />
      <Select
        name='type'
        label='Type (news, recept or csr)'
        options={[{ name: 'news' }, { name: 'recept' }, { name: 'csr' }]}
      />
      <Input name='order' label='Order' type='number' min={0} />
    </FormWrapper>
  )
}
