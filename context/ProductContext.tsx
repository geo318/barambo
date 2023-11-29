'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import { Product, SetState } from '/types'
import { debounce } from '/utils'

type TProductContext = {
  product?: Product
  setProduct?: SetState<Product | undefined>
  setCategoryId?: SetState<CategoryParam>
  categoryId?: CategoryParam
  subcategoryId?: CategoryParam
  setSubcategoryId?: SetState<CategoryParam>
  query?: string
  setQuery?: SetState<string>
  scrollY?: number
  setScrollY?: SetState<number>
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
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY)
    })
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      scrollY,
      setScrollY,
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
      scrollY,
      setScrollY,
    ]
  )

  return (
    <ProductContext.Provider value={memoizedSetValues}>
      {children}
    </ProductContext.Provider>
  )
}
