import { useCallback, useContext, useMemo, useRef } from 'react'
import { PRODUCT_PAGE } from '/config'
import { getProducts } from '/services'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Product } from '/types'
import { useDebounce } from '/hooks'
import { ProductContext } from '/context'

export const useProductList = () => {
  const { query, categoryId } = useContext(ProductContext)
  const debouncedQuery = useDebounce({ query })

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery({
    queryHash: debouncedQuery + categoryId,
    queryKey: ['products'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getProducts(pageParam, debouncedQuery, categoryId),
    getNextPageParam: (lastPage) =>
      lastPage.products.length < PRODUCT_PAGE
        ? undefined
        : Number(lastPage.page) + 1,
  })

  const products = useMemo(
    () =>
      data?.pages.reduce((acc, curr) => {
        acc.push(...curr.products)
        return acc
      }, [] as Product[]),
    [data]
  )
  const observer = useRef<IntersectionObserver | null>()

  const lastFeedElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      })

      if (node) observer!.current!.observe(node)
    },
    [isLoading, fetchNextPage]
  )

  return {
    isFetchingNextPage,
    lastFeedElementRef,
    categoryId,
    isFetching,
    isFetched,
    isLoading,
    products,
    error,
  }
}
