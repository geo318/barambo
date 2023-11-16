import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { CategoryProps } from './types'
import { useSubmitMessage } from '/hooks'
import { FormValues } from '/types'

export const useForm = (
  action: CategoryProps['action'],
  query: CategoryProps['query']
) => {
  const { setMessage, MessageBox } = useSubmitMessage()
  const params = useSearchParams()
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = async (data: FormValues) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob)
    })
    const res = await action(formData)
    if (res.error) setMessage({ error: res.error, success: '' })
    if (res.success) {
      setMessage({ error: '', success: 'Success' })
      ref?.current?.reset()
      query && params.get(query) && router.back()
    }
  }
  const param = query ? params.get(query) : undefined
  return { ref, handleSubmit, MessageBox, params, param }
}
