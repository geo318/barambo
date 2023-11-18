import { Filter, H, Magnifier, Search, Section } from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import { getAllCategories, getPaginatedProducts, getProducts } from '/server'
import { ProductList } from '/components/Product/ProductList'
import { ProductContextProvider } from '/context'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

const queryClient = new QueryClient()

export default async function Product({ params: { lang } }: PageProps) {
  const { product } = await getDictionary(lang)
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['products'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getPaginatedProducts(pageParam),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories,
    }),
  ])

  return (
    <main className='flex flex-col gap-36'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductContextProvider>
          <Section className='py-28 flex gap-20'>
            <aside>
              <H tag='h1' size='lg'>
                {product.h1}
              </H>
              <h4 className='text-2xl font-medium my-7'>
                What it is so special about us?
              </h4>
              <Suspense fallback={<div>Loading...</div>}>
                <Filter lang={lang} />
              </Suspense>
            </aside>
            <article>
              <Search />
              <Suspense fallback={<div>Loading...</div>}>
                <ProductList locale={lang} />
              </Suspense>
            </article>
          </Section>
        </ProductContextProvider>
      </HydrationBoundary>
    </main>
  )
}
