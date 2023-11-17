'use client'

import { useSearchParams } from 'next/navigation'

export const SearchParamsWrapper: React.FC<{
  children: React.ReactNode
  query: string[]
  not?: boolean
  param?: string | number
}> = ({ children, query, not, param }) => {
  const params = useSearchParams()
  const cond = query.some((q) =>
    param
      ? typeof params.get(q) === 'string' && params.get(q) == param
      : typeof params.get(q) === 'string'
  )

  const render = not ? !cond : cond
  return <>{render ? children : null}</>
}
