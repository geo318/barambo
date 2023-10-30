'use client'

import { useEffect, useRef, useState } from 'react'

export const usePortal = () => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const portal = document.createElement('div')
    portal.setAttribute('id', 'portal')
    portal.classList.add(
      'fixed',
      'inset-0',
      'overflow-y-auto',
      'backdrop-blur-sm',
      'bg-black',
      'bg-opacity-50',
      'z-50'
    )

    document.querySelector<HTMLElement>('body')!.append(portal)
    ref.current = portal
    setMounted(true)

    return () => portal.remove()
  }, [])

  return { mounted, ref }
}
