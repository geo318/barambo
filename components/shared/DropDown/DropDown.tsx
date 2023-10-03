'use client'

import { twMerge } from 'tailwind-merge'
import { DropDownProps } from './types'
import { useDropDown } from './useDropDown'

export const DropDown: React.FC<DropDownProps> = ({
  children,
  className,
  handleClose,
  isOpen = false,
}) => {
  const { containerRef } = useDropDown({ handleClose })
  return (
    <>
      {isOpen && (
        <div className={twMerge('', className)} ref={containerRef}>
          {children}
        </div>
      )}
    </>
  )
}
