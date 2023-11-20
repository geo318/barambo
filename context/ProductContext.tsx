'use client'

import { createContext, useMemo, useState } from 'react'
import { Product, SetState } from '/types'

type TProductContext = {
  products?: Product[]
  setProducts?: SetState<Product[]>
  setCategoryId?: SetState<number | undefined>
  categoryId?: number
  query?: string
  setQuery?: SetState<string>
}

export const ProductContext = createContext<TProductContext>({})

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [categoryId, setCategoryId] = useState<number | undefined>()
  const [query, setQuery] = useState<string>('')

  const memoizedSetValues = useMemo(
    () => ({
      products,
      setProducts,
      categoryId,
      setCategoryId,
      query,
      setQuery,
    }),
    [products, setProducts, categoryId, setCategoryId, query, setQuery]
  )

  return (
    <ProductContext.Provider value={memoizedSetValues}>
      {children}
    </ProductContext.Provider>
  )
}
