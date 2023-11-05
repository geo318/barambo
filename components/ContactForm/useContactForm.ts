import { useState } from 'react'
import { emailSchema } from '/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { objToFormData } from '/utils'
import { contactForm } from '/config/forms/contact'

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

  const props = (key: keyof typeof contactForm) => ({
    name: key,
    type: contactForm[key].type,
    required: contactForm[key].required,
  })

  return {
    props,
    message,
    isLoading,
    submitHandler,
    form,
  }
}
