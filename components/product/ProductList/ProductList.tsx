'use client'

import { Product, Spinner } from '/components'
import { Locale } from '/types'
import { useProductList } from './useProductList'

export const ProductList: React.FC<{
  locale: Locale
}> = ({ locale }) => {
  const { products, lastFeedElementRef, isLoading } = useProductList()
  return (
    <section className='grid grid-cols-4 gap-6'>
      {isLoading ? (
        <Spinner />
      ) : (
        products?.map((p, i) => (
          <div key={i} ref={lastFeedElementRef}>
            <Product product={p} locale={locale} index={i} />
          </div>
        ))
      )}
    </section>
  )
}
