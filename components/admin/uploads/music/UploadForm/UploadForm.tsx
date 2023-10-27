'use client'

import { FormWrapper, Input } from '@/components'
import { musicSchema as schema } from '@/schema'
import { Props } from './types'
import { Music } from '@/types/general'

export function UploadMusicForm({
  handleSubmit,
  defaultValues,
  revalidate,
  edit,
}: Props<Music> & { edit?: boolean }): JSX.Element {
  return (
    <FormWrapper
      schema={edit ? schema({ partial: true }) : schema()}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      className='bg-white'
      revalidate={revalidate}
    >
      <Input name='title' placeholder='give music some name' label='Title' />
      <Input name='thumbnail' type='file' label='Image - max 5MB' />
      <Input
        name='url'
        placeholder='https://example.com/some-url'
        label='Link'
      />
    </FormWrapper>
  )
}
