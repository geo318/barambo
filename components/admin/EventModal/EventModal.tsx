'use client'

import { revalidateMusicData } from '@/actions'
import { UpdateModal, UploadEventForm } from '@/components'
import { useEventModal } from './useEventModal'
import { EventModalProps } from './types'

export const EventModal: React.FC<EventModalProps> = (props) => {
  const {
    handleSubmit,
    isLoading,
    isDeleting,
    handleDelete,
    toggleDeleteDialog,
    toggleModal,
    isModalOpen,
    FlashMessage,
  } = useEventModal(props)

  return (
    <div>
      <FlashMessage />
      {isModalOpen ? (
        <UpdateModal
          isDeleting={isDeleting}
          handleDelete={handleDelete}
          toggleDeleteDialog={toggleDeleteDialog}
          toggleModal={toggleModal}
        >
          <UploadEventForm
            defaultValues={props.defaults}
            handleSubmit={handleSubmit}
            revalidate={revalidateMusicData}
            edit
          />
        </UpdateModal>
      ) : null}
    </div>
  )
}
