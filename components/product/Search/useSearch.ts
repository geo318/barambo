import { ChangeEvent, useContext } from "react"
import { ProductContext } from "/context"

export const useSearch = () => {
  const { setQuery } = useContext(ProductContext)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery?.(() => e.target.value)
  }
  return { handleSearch }
}
