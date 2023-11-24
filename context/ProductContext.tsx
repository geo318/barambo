'use client'

import { createContext, useMemo, useState } from 'react'
import { Product, SetState } from '/types'

type TProductContext = {
  products?: Product[]
  setProducts?: SetState<Product[]>
  setCategoryId?: SetState<CategoryParam>
  categoryId?: CategoryParam
  subcategoryId?: CategoryParam
  setSubcategoryId?: SetState<CategoryParam>
  query?: string
  setQuery?: SetState<string>
}
type CategoryParam = string | null | undefined

export const ProductContext = createContext<TProductContext>({})

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [categoryId, setCategoryId] = useState<CategoryParam>()
  const [subcategoryId, setSubcategoryId] = useState<CategoryParam>()
  const [query, setQuery] = useState<string>('')

  const memoizedSetValues = useMemo(
    () => ({
      products,
      setProducts,
      categoryId,
      setCategoryId,
      subcategoryId,
      setSubcategoryId,
      query,
      setQuery,
    }),
    [
      products,
      setProducts,
      categoryId,
      setCategoryId,
      query,
      setQuery,
      setSubcategoryId,
      subcategoryId,
    ]
  )

  return (
    <ProductContext.Provider value={memoizedSetValues}>
      {children}
    </ProductContext.Provider>
  )
}
