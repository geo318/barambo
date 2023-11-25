import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '/services'
import { useSearchParams } from 'next/navigation'
import { ProductContext } from '/context'

export const useFilter = () => {
  const { categoryId, setCategoryId, setSubcategoryId, subcategoryId } =
    useContext(ProductContext)
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
      (id) => Number(params.get('category')) === id
    )
  )

  useEffect(() => {
    const [category, subcategory] = ['category', 'subcategory'].map((key) =>
      params.get(key)
    )
    if (category) setCategoryId?.(category)
    if (subcategory) setSubcategoryId?.(subcategory)
  }, [setCategoryId, params, setSubcategoryId])

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
    subcategoryId,
    setSubcategoryId,
    params,
  }
}
