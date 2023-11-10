import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useClickOutSide } from '/hooks'

export const useMultipleSelect = (name: string) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()
  const [values, setValues] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutSide<HTMLDivElement>({ cb: () => setIsOpen(false) })

  useEffect(() => {
    setValue(name, values.toString(), {
      shouldDirty: true,
      shouldTouch: true,
    })
  }, [values, setValue, name])

  const handleSelect = (id: number) => {
    setValues((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id)

      return [...prev, id]
    })
  }

  const toggleMenu = () => setIsOpen((prev) => !prev)
  return { ref, isOpen, toggleMenu, register, errors, values, handleSelect }
}
