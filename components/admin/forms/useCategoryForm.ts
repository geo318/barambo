import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { CategoryProps } from './types'
import { useSubmitMessage } from '/hooks'

export const useCategoryForm = (action: CategoryProps['action']) => {
  const { setMessage, MessageBox } = useSubmitMessage()
  const params = useSearchParams()
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    const res = await action(formData)
    if (res.error) setMessage({ error: res.error, success: '' })
    if (res.success) {
      setMessage({ error: '', success: 'Success' })
      ref?.current?.reset()
      params.get('edit') && router.back()
    }
  }
  return { ref, handleSubmit, MessageBox }
}
