'use client'

import { useSearchParams } from 'next/navigation'

export const SearchParamsWrapper: React.FC<{
  children: React.ReactNode
  query: string[]
  not?: boolean
}> = ({ children, query, not }) => {
  const params = useSearchParams()
  const cond = query.some((q) => typeof params.get(q) === 'string')

  const render = not ? !cond : cond
  return <>{render ? children : null}</>
}
