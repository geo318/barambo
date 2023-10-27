import { useFlashMessage } from '@/components'
import { objToFormData } from '@/utils'
import { revalidateTag } from 'next/cache'
import { useState } from 'react'

export const useUploadMusic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { FlashMessage, handleFlashMessage } = useFlashMessage(
    'something went wrong...'
  )

  const handleSubmit = async (data: FormData) => {
    const formData = objToFormData(data)
    setIsLoading(true)
    try {
      const res = await fetch('/api/music', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('something went wrong...')

      setIsLoaded(true)
    } catch (e) {
      handleFlashMessage(!!'error')
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, handleSubmit, FlashMessage, isLoaded, setIsLoaded }
}
