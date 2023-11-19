import { ChangeEvent, useContext, useEffect } from 'react'
import { ProductContext } from '/context'

export const useSearch = () => {
  const { query, setQuery, setCategoryId } = useContext(ProductContext)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery?.(() => e.target.value)
  }

  useEffect(() => {
    if (query) setCategoryId?.(undefined)
    return () => {
      setQuery?.('')
    }
  }, [query, setCategoryId, setQuery])
  return { handleSearch }
}
