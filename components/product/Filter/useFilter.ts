import { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '/services'
import { useSearchParams } from 'next/navigation'
import { ProductContext } from '/context'

export const useFilter = () => {
  const { categoryId, setCategoryId } = useContext(ProductContext)
  const {
    data: categories = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })
  const [open, setOpen] = useState<boolean[]>(
    Array.from({ length: categories.length }, () => false)
  )
  const params = useSearchParams()
  const toggleMenu = (i: number) => {
    setOpen((prev) => {
      const newArr = [...prev]
      newArr[i] = !prev[i]
      return newArr
    })
  }

  return {
    categories,
    error,
    isLoading,
    open,
    toggleMenu,
    categoryId,
    setCategoryId,
    params,
  }
}
