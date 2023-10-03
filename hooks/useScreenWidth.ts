'use client'

import { useEffect, useState } from 'react'

export const useScreenWidth = (screen = 700) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(() => window.innerWidth < screen)
  }, [setIsMobile, screen])

  return isMobile
}
