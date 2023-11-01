'use client'

import { useRouter } from 'next/navigation'
import { Close } from '/components'
import { useEsc } from '/hooks'

export const CloseModal = () => {
  const router = useRouter()
  const toggleModal = () => router.replace('?recept')
  useEsc(toggleModal)
  return (
    <div className='p-2 cursor-pointer ml-auto' onClick={toggleModal}>
      <Close />
      <div className='fixed inset-0 -z-10' onClick={toggleModal} />
    </div>
  )
}
