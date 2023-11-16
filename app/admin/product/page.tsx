import { Suspense } from 'react'
import {
  CloseModal,
  H,
  Portal,
  ProductForm,
  SearchParamsWrapper,
} from '/components'
import { routes } from '/config'
import {
  createProduct,
  editProduct,
  getProducts,
  getSubCategories,
} from '/server'
import { SubCategory } from '/types'
import { getImage } from '/utils'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import Link from 'next/link'

export default async function SubCategory({
  searchParams,
}: {
  searchParams: URLSearchParams & { edit?: number }
}) {
  const [products, subCategories] = await Promise.all([
    getProducts(),
    getSubCategories(),
  ])

  return (
    <div>
      <section className='flex gap-5 text-lg capitalize justify-center mb-10'>
        <Link
          href='?add-product'
          className={twMerge(
            'border-b border-transparent',
            !('edit-product' in searchParams) && 'font-medium border-black'
          )}
        >
          add products
        </Link>
        <Link
          href='?edit-product'
          className={twMerge(
            'border-b border-transparent',
            'edit-product' in searchParams && 'font-medium border-black'
          )}
        >
          edit products
        </Link>
      </section>
      <SearchParamsWrapper query={['edit', 'edit-product']} not>
        <section className='pb-10'>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Add Product
          </H>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductForm
              action={createProduct}
              subCategory={subCategories}
              products={products}
            />
          </Suspense>
        </section>
      </SearchParamsWrapper>
      <SearchParamsWrapper query={['edit', 'edit-product']}>
        <section>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Product list
          </H>
          <div className='grid grid-cols-3 gap-5 capitalize'>
            <Suspense fallback={<div>loading...</div>}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='flex flex-col gap-3 border border-slate-400 rounded-lg hover:shadow-lg p-5'
                >
                  <div className='flex flex-col'>
                    <h3>
                      title eng: <strong>{product.title_eng}</strong>
                    </h3>
                    <h3>
                      title geo: <strong>{product.title_geo}</strong>
                    </h3>
                  </div>
                  <div className='flex flex-col editor gap-2 py-5 border-y border-slate-600 '>
                    Description eng
                    <div
                      className='line-clamp-2 text-ellipsis'
                      dangerouslySetInnerHTML={{ __html: product.desc_eng }}
                    />
                    Description geo
                    <div
                      className='line-clamp-2 text-ellipsis'
                      dangerouslySetInnerHTML={{ __html: product.desc_geo }}
                    />
                  </div>

                  <Image
                    src={getImage`${product.thumbnail}`}
                    alt={product.title_eng}
                    className='w-full object-contain max-h-full max-w-full'
                    width='300'
                    height='100'
                  />
                  <Link
                    href={`?edit=${product.id}`}
                    className='hover:underline text-blue-800 font-medium text-xl border border-black text-center rounded-md mt-4'
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </Suspense>
          </div>
        </section>
      </SearchParamsWrapper>
      <SearchParamsWrapper query={['edit']}>
        <Portal>
          <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 py-5 rounded-xl'>
            <div className='max-h-[80vh] overflow-y-auto px-10 pt-2 pb-10'>
              <div className='flex py-3'>
                <h3 className='font-lg font-bold'>Edit Product</h3>
                <CloseModal
                  closeKey={`${routes.addProduct}?edit-product`}
                  className='p-0'
                />
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <ProductForm
                  action={editProduct}
                  subCategory={subCategories}
                  defaultValues={products.find(
                    (p) => p.id === Number(searchParams?.edit)
                  )}
                  query='edit'
                />
              </Suspense>
            </div>
          </div>
        </Portal>
      </SearchParamsWrapper>
    </div>
  )
}
