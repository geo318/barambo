'use client'

import { createContext, useState } from 'react'
import { Product, SetState } from '/types'

type TProductContext = {
  products?: Product[]
  setProducts?: SetState<Product[]>
  setId?: SetState<TProductContext['id']>
  id?: number
}

export const ProductContext = createContext<TProductContext>({
  id: undefined,
  setId: undefined,
  products: undefined,
  setProducts: undefined,
})

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [id, setId] = useState<TProductContext['id']>(undefined)

  return (
    <ProductContext.Provider value={{ products, setProducts, id, setId }}>
      {children}
    </ProductContext.Provider>
  )
}
