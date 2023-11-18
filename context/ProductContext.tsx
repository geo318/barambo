'use client'

import { createContext, useState } from 'react'
import { Product, SetState } from '/types'

type TProductContext = {
  products?: Product[]
  setProducts?: SetState<Product[]>
  setId?: SetState<TProductContext['id']>
  id?: number
  query?: string
  setQuery?: SetState<string>
}

export const ProductContext = createContext<TProductContext>({
  id: undefined,
  setId: undefined,
  products: undefined,
  setProducts: undefined,
  query: undefined,
  setQuery: undefined,
})

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [id, setId] = useState<TProductContext['id']>(undefined)
  const [query, setQuery] = useState<string>('')

  return (
    <ProductContext.Provider
      value={{ products, setProducts, id, setId, query, setQuery }}
    >
      {children}
    </ProductContext.Provider>
  )
}
