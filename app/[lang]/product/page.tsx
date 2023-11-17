import { Filter, H, Magnifier, ProductModal, Section } from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import { getAllCategories, getProducts } from '/server'
import { ProductList } from '/components/Product/ProductList'
import { ProductContextProvider } from '/context'

export default async function Product({
  params: { lang },
  searchParams: { category, id },
}: PageProps & {
  searchParams: URLSearchParams & {
    id?: string
    category?: string
  }
}) {
  const { product } = await getDictionary(lang)
  const categories = await getAllCategories()
  const products = await getProducts()

  return (
    <main className='flex flex-col gap-36'>
      <ProductContextProvider>
        <Section className='py-28 flex gap-20'>
          <aside>
            <H tag='h1' size='xl'>
              {product.h1}
            </H>
            <h4 className='text-2xl font-medium my-7'>
              What it is so special about us?
            </h4>
            <Filter lang={lang} categories={categories} />
          </aside>
          <article>
            <div className='relative mb-14 mt-10'>
              <Magnifier className='absolute left-0 mt-1/2 translate-y-1/2' />
              <input
                type='text'
                name='search'
                placeholder='Search'
                className='border-0 border-b pl-5 w-52 '
              />
            </div>
            <ProductList products={products} locale={lang} />
          </article>
        </Section>
      </ProductContextProvider>
    </main>
  )
}
