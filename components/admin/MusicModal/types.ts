import { MusicApi } from '@/types'

export type MusicModalProps = {
  defaults: MusicApi[number]
  isModalOpen: boolean
  setIsModalOpen: (prev: boolean | ((prev: boolean) => boolean)) => void
}
