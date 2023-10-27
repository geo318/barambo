import { useFlashMessage } from '@/components'
import { objToFormData } from '@/utils'
import { useEffect, useState } from 'react'

export const useUploadEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { FlashMessage, handleFlashMessage } = useFlashMessage(
    'something went wrong...'
  )

  const [isUploaded, setIsUploaded] = useState(false)

  useEffect(() => {
    return () => {
      setIsUploaded(false)
    }
  }, [])

  const handleSubmit = async (data: FormData) => {
    const formData = objToFormData(data)

    setIsLoading(true)
    try {
      const res = await fetch('/api/event', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('something went wrong...')
      setIsUploaded(true)
    } catch (e) {
      handleFlashMessage(!!'error')
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, handleSubmit, FlashMessage, isUploaded, setIsUploaded }
}
