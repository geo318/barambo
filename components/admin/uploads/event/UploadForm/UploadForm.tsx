'use client'

import { FormWrapper, Input } from '@/components'
import { eventSchema as schema } from '@/schema'
import { Props } from './types'
import { Event } from '@/types'
import { dateFormatter } from '@/components/Events/helper'

export function UploadEventForm({
  handleSubmit,
  defaultValues,
  revalidate,
  edit,
}: Props<Event> & { edit?: boolean }): JSX.Element {
  return (
    <FormWrapper
      schema={edit ? schema.optional() : schema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      className='bg-white'
      revalidate={revalidate}
    >
      <Input name='date' label='Date' placeholder={dateFormatter(new Date())} />
      <Input name='location' placeholder='Event place/location' />
      <Input name='description' placeholder='Event details' />
      <Input
        name='url'
        placeholder='https://example.com/some-url'
        label='Link'
      />
    </FormWrapper>
  )
}
