import { eventSchemaApi } from '@/schema'
import { useEffect, useState } from 'react'
import { EventApi } from '@/types'
import { useFlashMessage } from '@/components'
import { useRouter } from 'next/navigation'

export const useEventList = (eventListPromise: Promise<EventApi>) => {
  const [eventList, setEventList] = useState<EventApi>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeEvent, setActiveEvent] = useState<EventApi[number]>(
    {} as EventApi[number]
  )
  const router = useRouter()
  const { FlashMessage, handleFlashMessage } = useFlashMessage()

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const eventData = await eventListPromise
        const parsedEventData = eventSchemaApi.parse(eventData)
        setEventList(parsedEventData)
      } catch (e) {
        handleFlashMessage(!!'error')
      }

      setIsLoading(false)
    })()
  }, [eventListPromise, handleFlashMessage])

  const addNew = () => {
    router.push('/admin?form=event')
  }

  return {
    eventList,
    isLoading,
    activeEvent,
    setActiveEvent,
    FlashMessage,
    isModalOpen,
    setIsModalOpen,
    addNew,
  }
}
