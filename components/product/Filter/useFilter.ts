import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '/services'
import { useSearchParams } from 'next/navigation'
import { ProductContext } from '/context'

export const useFilter = () => {
  const { categoryId, setCategoryId } = useContext(ProductContext)
  const params = useSearchParams()
  const {
    data: categories = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })
  const [open, setOpen] = useState<boolean[]>(
    Array.from(
      categories.map((c) => c.id),
      (id) => Number(params.get('section')) === id
    )
  )
  const toggleMenu = (i: number) => {
    setOpen((prev) => {
      const newArr = [...prev]
      newArr[i] = !prev[i]
      return newArr
    })
  }

  useEffect(() => {
    setCategoryId?.(
      params.get('category') ? Number(params.get('category')) : undefined
    )
    return () => {
      setCategoryId?.(undefined)
    }
  }, [setCategoryId, params])

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
