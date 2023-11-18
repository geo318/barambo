'use client'

import { createContext, useState } from 'react'
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
  const [categoryId, setCategoryId] = useState<number>()
  const [query, setQuery] = useState<string>('')

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        categoryId,
        setCategoryId,
        query,
        setQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
