import { objToFormData } from '@/utils'
import { useState } from 'react'
import { MusicModalProps } from './types'
import { revalidateMusicData } from '@/actions'
import { useFlashMessage } from '@/components'

export const useMusicModal = ({
  defaults,
  isModalOpen,
  setIsModalOpen,
}: MusicModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { FlashMessage, handleFlashMessage } = useFlashMessage()

  const toggleModal = () => setIsModalOpen((prev) => !prev)
  const toggleDeleteDialog = () => setIsDeleting((prev) => !prev)

  const handleSubmit = async (data: FormData) => {
    const formData = objToFormData(data)
    setIsLoading(true)
    try {
      const res = await fetch(`/api/music?id=${defaults.id}`, {
        method: 'PATCH',
        body: formData,
      })
      if (res.status !== 201) throw new Error()

      toggleModal()
      handleFlashMessage()
      revalidateMusicData()
      setIsLoading(false)
    } catch (e) {
      handleFlashMessage(!!'error')
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/music?id=${defaults.id}`, {
        method: 'DELETE',
      })
      if (res.status !== 202) throw new Error()

      handleFlashMessage()
      revalidateMusicData()
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
