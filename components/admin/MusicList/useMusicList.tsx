import { musicSchemaApi } from '@/schema'
import { use, useEffect, useState } from 'react'
import { MusicApi } from '@/types'
import { useFlashMessage } from '@/components'
import { useRouter } from 'next/navigation'

export const useMusicList = (musicListPromise: Promise<MusicApi>) => {
  const [musicList, setMusicList] = useState<MusicApi>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeMusic, setActiveMusic] = useState<MusicApi[number]>(
    {} as MusicApi[number]
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { FlashMessage, handleFlashMessage } = useFlashMessage()
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const musicData = await musicListPromise
        const parsedMusicData = musicSchemaApi.parse(musicData)
        setMusicList(parsedMusicData.reverse())
      } catch (e) {
        handleFlashMessage(!!'error')
      }

      setIsLoading(false)
    })()
  }, [musicListPromise, handleFlashMessage])

  const addNew = () => {
    router.push('/admin?form=music')
  }

  return {
    musicList,
    isLoading,
    activeMusic,
    setActiveMusic,
    isModalOpen,
    setIsModalOpen,
    FlashMessage,
    addNew,
  }
}
