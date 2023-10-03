'use client'

import { TouchEventHandler, useEffect, useState } from 'react'
import { useScreenWidth } from '.'

export const useTouchScroll = ({
  turnLeft,
  turnRight,
}: {
  turnLeft: Function
  turnRight: Function
}) => {
  const [touchPosition, setTouchPosition] = useState<number | null>()
  const [touchEnd, setTouchEnd] = useState(false)
  const [diff, setDiff] = useState(0)
  const isMobile = useScreenWidth()

  const handleTouchEnd: TouchEventHandler<HTMLImageElement> = () => {
    setTouchEnd(true)
  }

  const handleTouchStart: TouchEventHandler<HTMLImageElement> = (e) => {
    setTouchEnd(false)
    if (!isMobile) return
    const touchDown = e.touches[0].clientX
    touchDown && setTouchPosition(() => touchDown)
  }
  const handleTouchMove: TouchEventHandler<HTMLImageElement> = (e) => {
    setTouchEnd(false)
    if (!isMobile) return
    const touchDown = touchPosition
    if (touchDown === null) return

    const currentTouch = e.touches[0].clientX
    const diff = touchDown && touchDown - currentTouch
    diff && setDiff(diff)
  }

  useEffect(() => {
    if (touchEnd && diff && diff > 10) {
      turnRight()
      setTouchPosition(null)
      setDiff(0)
      return
    }

    if (touchEnd && diff && diff < -10) {
      turnLeft()
      setTouchPosition(null)
      setDiff(0)
    }
  }, [diff, touchEnd, turnLeft, turnRight])

  return {
    isMobile,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  }
}
