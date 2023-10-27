'use client'

import { revalidateMusicData } from '@/actions'
import { UpdateModal, UploadMusicForm } from '@/components'
import { useMusicModal } from './useMusicModal'
import { MusicModalProps } from './types'

export const MusicModal: React.FC<MusicModalProps> = (props) => {
  const {
    handleSubmit,
    isDeleting,
    handleDelete,
    toggleDeleteDialog,
    toggleModal,
    isModalOpen,
    FlashMessage,
  } = useMusicModal(props)

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
          <UploadMusicForm
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
