import { useState } from 'react'
import { useToggleBodyScroll } from '/hooks'

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)
  useToggleBodyScroll({ toggle: isOpen })

  return { isOpen, toggleMenu }
}
