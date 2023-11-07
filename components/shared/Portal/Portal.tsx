'use client'

import { FC } from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from './usePortal'

const Portal: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mounted, ref } = usePortal()
  return mounted && ref.current
    ? createPortal(<>{children}</>, ref.current)
    : null
}

export default Portal
