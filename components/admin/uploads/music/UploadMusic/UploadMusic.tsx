'use client'

import { Button, Spinner, UploadMusicForm } from '@/components'
import { useUploadMusic } from './useUploadMusic'
import { revalidateMusicData } from '@/actions'

export function UploadMusic() {
  const { isLoading, isLoaded, setIsLoaded, handleSubmit, FlashMessage } =
    useUploadMusic()

  return (
    <>
      <FlashMessage />
      {!isLoading ? (
        !isLoaded ? (
          <UploadMusicForm
            handleSubmit={handleSubmit}
            revalidate={revalidateMusicData}
          />
        ) : (
          <div className='flex flex-col items-center justify-center max-w-sm h-24 bg-gray-100 rounded-md'>
            <Button
              className='border border-gray-200 hover:ring-2 rounded-sm'
              onClick={() => setIsLoaded(false)}
            >
              Upload again
            </Button>
          </div>
        )
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}
