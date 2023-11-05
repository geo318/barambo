import { useState } from 'react'
import { excursionForm } from '/config'
import { emailSchema } from '/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { objToFormData } from '/utils'

export const useEmailForm = () => {
  const [message, setMessage] = useState({ error: '', success: '' })
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(emailSchema),
  })

  const submitHandler = async (data: FieldValues) => {
    setIsLoading(true)

    const formData = objToFormData(data)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send`, {
        method: 'POST',
        body: formData,
      })
      form.reset()
      if (res.status !== 200) throw new Error('Something went wrong')

      setMessage({ error: '', success: 'Email sent successfully' })
    } catch (err) {
      setMessage({ error: 'Something went wrong', success: '' })
    } finally {
      setIsLoading(false)
    }
  }

  const props = (key: keyof typeof excursionForm) => ({
    name: key,
    type: excursionForm[key].type,
    required: excursionForm[key].required,
  })

  return {
    props,
    message,
    isLoading,
    submitHandler,
    form,
  }
}
