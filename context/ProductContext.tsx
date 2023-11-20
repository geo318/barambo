'use client'

import { createContext, use, useState } from 'react'
import { Product, SetState } from '/types'
import { useSearchParams } from 'next/navigation'

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
  const params = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categoryId, setCategoryId] = useState<number | undefined>(
    // Number(params.get('category')) ?? undefined
  )
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
