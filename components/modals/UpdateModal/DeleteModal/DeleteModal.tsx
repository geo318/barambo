import { Props } from './type'

export const DeleteModal: React.FC<Props> = ({ toggleModal, handleDelete }) => {
  return (
    <div className='bg-white rounded-md p-5 max-w-lg mx-auto mt-24'>
      <h5 className='mb-4 font-medium'>You sure want to proceed?</h5>
      <div className='flex'>
        <button
          className='py-1 px-5 bg-blue-500 rounded-md text-white hover:bg-blue-600 mr-auto'
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          className='text-red-500 hover:underline cursor-pointer text-sm font-medium'
          onClick={handleDelete}
        >
          Yes, delete
        </button>
      </div>
    </div>
  )
}
