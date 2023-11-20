import { ChangeEvent, useContext, useEffect } from 'react'
import { ProductContext } from '/context'

export const useSearch = () => {
  const { query, setQuery, setCategoryId } = useContext(ProductContext)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery?.(() => e.target.value)
  }
  const clearSearch = () => {
    setQuery?.(() => '')
  }

  useEffect(() => {
    if (query) setCategoryId?.(undefined)
  }, [query, setCategoryId])
  return { handleSearch, query, clearSearch }
}
