import { useEffect, useState } from 'react'

export const useScreenWidth = (screen = 700) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsMobile(() => {
      const check = window.innerWidth < screen
      setIsLoading(false)
      return check
    })
  }, [setIsMobile, screen])

  return { isMobile, isLoading }
}
