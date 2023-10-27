import { EventApi } from '@/types'

export type EventModalProps = {
  defaults: EventApi[number]
  isModalOpen: boolean
  setIsModalOpen: (prev: boolean | ((prev: boolean) => boolean)) => void
}
