import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const useSwitchForms = () => {
  const params = useSearchParams()
  const activeFrom = params.get('form') as 'event' | 'music'

  const [activeForm, setActiveForm] = useState<'music' | 'event'>(
    activeFrom || 'music'
  )

  const toggleForm = (form: typeof activeForm) => {
    return () => {
      switch (form) {
        case 'music':
          setActiveForm('music')
          break
        case 'event':
          setActiveForm('event')
      }
    }
  }

  return { activeForm, toggleForm }
}
