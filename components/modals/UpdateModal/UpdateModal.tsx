'use client'

import { Portal, CloseIcon } from '@/components'
import { DeleteModal } from './DeleteModal'
import { Props } from './type'

export function UpdateModal({
  isDeleting,
  children,
  handleDelete,
  toggleModal,
  toggleDeleteDialog,
}: Props) {
  return (
    <>
      <Portal>
        {!isDeleting && (
          <div className='max-w-lg mx-auto mt-20'>
            <div className='z-50 block p-5 relative bg-white rounded-md'>
              <div className='flex'>
                <h3 className='font-medium text-center my-2 mx-auto pl-9'>
                  Change values and submit
                </h3>
                <div className='p-2 cursor-pointer' onClick={toggleModal}>
                  <CloseIcon />
                </div>
              </div>

              {children}

              <div
                className='text-red-500 hover:underline cursor-pointer text-right pt-5 text-sm font-medium'
                onClick={toggleDeleteDialog}
              >
                Delete?
              </div>
            </div>
            <div
              className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0'
              onClick={toggleModal}
            />
          </div>
        )}
        {isDeleting && (
          <DeleteModal
            handleDelete={handleDelete}
            toggleModal={toggleDeleteDialog}
          />
        )}
      </Portal>
    </>
  )
}
