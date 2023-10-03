import React from 'react'

export type DropDownProps = {
  children: React.ReactNode
  className?: string
  handleClose: () => void
  isOpen: boolean
}
