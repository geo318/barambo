'use client'

import { useSearchParams } from 'next/navigation'
import { use, useEffect, useRef, useState } from 'react'

export const usePortal = () => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  const scrollPosition = useSearchParams().get('s')
  useEffect(() => {
    window.scrollTo(0, Number(scrollPosition))
  }, [scrollPosition])

  useEffect(() => {
    const portal = document.createElement('div')
    portal.setAttribute('id', 'portal')
    portal.classList.add('fixed', 'inset-0', 'z-50')
    const backdrop = document.createElement('div')
    backdrop.classList.add(
      'backdrop',
      'fixed',
      'inset-0',
      'overflow-y-auto',
      'backdrop-blur-sm',
      'bg-black',
      'bg-opacity-30',
      '-z-10'
    )
    backdrop.addEventListener('click', () => portal.remove())
    portal.append(backdrop)

    const body = document.querySelector('body')

    if (body) {
      body.append(portal)
      body.classList.add('overflow-hidden')
    }

    ref.current = portal
    setMounted(true)

    return () => {
      portal.remove()
      backdrop.removeEventListener('click', () => portal.remove())
      if (body) {
        body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  return { mounted, ref }
}
