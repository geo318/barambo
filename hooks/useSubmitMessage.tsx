import { useState } from 'react'

export const useSubmitMessage = () => {
  const [message, setMessage] = useState({ error: '', success: '' })

  const MessageBox = (
    <>
      {message.error && (
        <p className='text-red-500 border border-red-300 rounded-md p-3'>
          ⚠️ {message.error}
        </p>
      )}
      {message.success && (
        <p className='text-green-500 font-bold border border-green-300 rounded-md p-3 mt-5'>
          ✅ {message.success}
        </p>
      )}
    </>
  )

  return { MessageBox, setMessage }
}
