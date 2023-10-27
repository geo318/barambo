import { objToFormData } from '@/utils'
import { useState } from 'react'
import { EventModalProps } from './types'
import { revalidateEventData } from '@/actions'
import { useFlashMessage } from '@/components'

export const useEventModal = ({
  defaults,
  isModalOpen,
  setIsModalOpen,
}: EventModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { FlashMessage, handleFlashMessage } = useFlashMessage()

  const toggleModal = () => setIsModalOpen((prev) => !prev)
  const toggleDeleteDialog = () => setIsDeleting((prev) => !prev)

  const handleSubmit = async (data: FormData) => {
    const formData = objToFormData(data)
    setIsLoading(true)
    try {
      const res = await fetch(`/api/event?id=${defaults.id}`, {
        method: 'PATCH',
        body: formData,
      })
      if (res.status !== 201) throw new Error()

      handleFlashMessage()
      revalidateEventData()
      toggleModal()
      setIsLoading(false)
    } catch (e) {
      handleFlashMessage(!!'error')
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/event?id=${defaults.id}`, {
        method: 'DELETE',
      })
      if (res.status !== 202) throw new Error()

      handleFlashMessage()
      revalidateEventData()
      toggleDeleteDialog()
      toggleModal()
    } catch {
      handleFlashMessage(!!'error')
    }
  }

  return {
    isLoading,
    handleSubmit,
    toggleDeleteDialog,
    isDeleting,
    handleDelete,
    toggleModal,
    isModalOpen,
    FlashMessage,
  }
}
