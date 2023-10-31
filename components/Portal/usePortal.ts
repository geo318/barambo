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
      'bg-opacity-30',
      'z-50'
    )
    const body = document.querySelector<HTMLElement>('body')
    if (body) {
      body.append(portal)
      body.classList.add('overflow-hidden')
    }

    ref.current = portal
    setMounted(true)

    return () => {
      portal.remove()
      if (body) body.classList.remove('overflow-hidden')
    }
  }, [])

  return { mounted, ref }
}
