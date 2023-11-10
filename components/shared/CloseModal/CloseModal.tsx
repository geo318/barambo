'use client'

import { useRouter } from 'next/navigation'
import { Close } from '/components'
import { useEsc } from '/hooks'
import { twMerge } from 'tailwind-merge'

export const CloseModal = ({ closeKey = '', className = '' }) => {
  const router = useRouter()
  const toggleModal = () =>
    closeKey ? router.replace(closeKey) : router.back()

  useEsc(toggleModal)

  return (
    <div
      className={twMerge('p-2 cursor-pointer ml-auto', className)}
      onClick={toggleModal}
    >
      <Close />
      <div className='fixed inset-0 -z-10' onClick={toggleModal} />
    </div>
  )
}
