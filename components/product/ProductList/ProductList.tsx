'use client'

import { Product, ProductSkeleton } from '/components'
import { Locale } from '/types'
import { useProductList } from './useProductList'

export const ProductList: React.FC<{
  children: React.ReactNode
  locale: Locale
}> = ({ children: skeleton, locale }) => {
  const {
    lastFeedElementRef,
    isFetchingNextPage,
    isLoading,
    products,
    isFetched,
  } = useProductList()
  return (
    <section className='grid grid-cols-1 gap-6'>
      {isFetched && !products?.length && (
        <div className='font-medium text-lg py-5 text-secondary'>
          No products found
        </div>
      )}
      {isLoading
        ? skeleton
        : products?.map((p, i) => (
            <div key={i} ref={lastFeedElementRef}>
              <Product product={p} locale={locale} index={i} />
            </div>
          ))}
      {isFetchingNextPage && <ProductSkeleton num={4} />}
    </section>
  )
}
