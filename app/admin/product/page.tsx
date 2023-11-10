import { Suspense } from 'react'
import { CloseModal, H, Portal, ProductForm } from '/components'
import { routes } from '/config'
import { FormContextProvider } from '/context'
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
      <FormContextProvider>
        {!('edit-product' in searchParams || 'edit' in searchParams) && (
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
        )}
        {('edit-product' in searchParams || 'edit' in searchParams) && (
          <section>
            <H tag='h1' size='md' className='mb-20 text-center'>
              Subcategory list
            </H>
            <div className='flex'>
              {products.map((product) => (
                <div key={product.id}>
                  <h1>{product.title_eng}</h1>
                  <h1>{product.title_geo}</h1>
                  <h1>{product.desc_eng}</h1>
                  <h1>{product.desc_geo}</h1>
                  <Image
                    src={getImage`${product.thumbnail}`}
                    alt={product.title_eng}
                    className='aspect-square'
                    width='100'
                    height='100'
                  />
                  <Link href={`?edit=${product.id}`}>Edit</Link>
                </div>
              ))}
            </div>
          </section>
        )}
        {'edit' in searchParams && (
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
                    checked={
                      subCategories.find(
                        (e) => e.id === Number(searchParams?.edit)
                      )?.categoryId
                    }
                    subCategory={subCategories}
                    edit={searchParams?.edit}
                    defaultValues={products.find(
                      (p) => p.id === Number(searchParams?.edit)
                    )}
                  />
                </Suspense>
              </div>
            </div>
          </Portal>
        )}
      </FormContextProvider>
    </div>
  )
}
