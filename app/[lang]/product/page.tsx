import {
  H,
  Filter,
  Search,
  Section,
  ProductList,
  ProductSkeleton,
  SearchParamsWrapper,
  ProductModal,
} from '/components'
import { getAllCategories, getPaginatedProducts } from '/server'
import { ProductContextProvider } from '/context'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

const queryClient = new QueryClient()

export default async function Product({
  params: { lang },
  searchParams: { id },
}: PageProps & {
  searchParams: URLSearchParams & {
    id?: number
  }
}) {
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
    <main className='flex flex-col lg:gap-36'>
      <Section className='lg:hidden'>
        <H tag='h1' size='sm' className='mt-10'>
          {product.h1}
        </H>
      </Section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <ProductContextProvider>
            <Section className='lg:py-28 py-4 lg:mb-0 mb-10 flex lg:gap-20 gap-3'>
              <aside className='lg:w-max lg:shrink-0'>
                <H tag='h1' size='lg' className='lg:block hidden'>
                  {product.h1}
                </H>
                <h4 className='text-2xl font-medium my-7 lg:block hidden'>
                  What it is so special about us?
                </h4>
                <Suspense>
                  <Filter lang={lang} />
                </Suspense>
              </aside>
              <article className='grow'>
                <Suspense>
                  <Search />
                </Suspense>

                <Suspense fallback={<ProductSkeleton />}>
                  <ProductList locale={lang}>
                    <ProductSkeleton />
                  </ProductList>
                </Suspense>
              </article>
            </Section>
            <Suspense>
              <SearchParamsWrapper query={['name']}>
                <ProductModal />
              </SearchParamsWrapper>
            </Suspense>
          </ProductContextProvider>
        </Suspense>
      </HydrationBoundary>
    </main>
  )
}
