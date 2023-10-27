'use client'

import { Button, Spinner } from '@/components'
import { useUploadEvent } from './useUploadEvent'
import { revalidateEventData } from '@/actions'
import { UploadEventForm } from '../UploadForm'

export function UploadEvent() {
  const { isLoading, handleSubmit, FlashMessage, isUploaded, setIsUploaded } =
    useUploadEvent()
  return (
    <>
      <FlashMessage />
      {isUploaded ? (
        <div className='flex flex-col items-center justify-center max-w-sm h-24 bg-gray-100 rounded-md'>
          <Button
            className='border border-gray-200 hover:ring-2 rounded-sm'
            onClick={() => setIsUploaded(false)}
          >
            Upload again
          </Button>
        </div>
      ) : (
        <UploadEventForm
          handleSubmit={handleSubmit}
          revalidate={revalidateEventData}
        />
      )}
      {!isLoading ? null : (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}
