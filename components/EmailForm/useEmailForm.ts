import { useState } from 'react'
import { orderCardForm } from '/config'
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send`, {
        method: 'POST',
        body: formData,
      })
      form.reset()
      setMessage({ error: '', success: 'Email sent successfully' })
    } catch (err) {
      setMessage({ error: 'Something went wrong', success: '' })
    } finally {
      setIsLoading(false)
    }
  }

  const props = (key: keyof typeof orderCardForm) => ({
    name: key,
    type: orderCardForm[key].type,
    required: orderCardForm[key].required,
  })

  return {
    orderCardForm,
    props,
    message,
    isLoading,
    submitHandler,
    form,
  }
}
