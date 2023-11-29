'use client'

import { createContext, useMemo, useState } from 'react'
import { Product, SetState } from '/types'

type TProductContext = {
  product?: Product
  setProduct?: SetState<Product | undefined>
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
  const [product, setProduct] = useState<Product | undefined>()
  const [categoryId, setCategoryId] = useState<CategoryParam>()
  const [subcategoryId, setSubcategoryId] = useState<CategoryParam>()
  const [query, setQuery] = useState<string>('')

  const memoizedSetValues = useMemo(
    () => ({
      product,
      setProduct,
      categoryId,
      setCategoryId,
      subcategoryId,
      setSubcategoryId,
      query,
      setQuery,
    }),
    [
      product,
      setProduct,
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
