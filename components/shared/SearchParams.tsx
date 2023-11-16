'use client'

import { useSearchParams } from 'next/navigation'

export const SearchParamsWrapper: React.FC<{
  children: React.ReactNode
  query: string[]
  not?: boolean
}> = ({ children, query, not }) => {
  const params = useSearchParams()
  const render = query.some((q) => params.get(q)) && !not
  return <>{render ? children : null}</>
}
