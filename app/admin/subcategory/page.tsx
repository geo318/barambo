import { Suspense } from 'react'
import {
  CategoryForm,
  CategoryList,
  CloseModal,
  H,
  Portal,
  SearchParamsWrapper,
} from '/components'
import { routes } from '/config'
import { FormContextProvider } from '/context'
import {
  createSubCategory,
  deleteSubcategory,
  editSubCategory,
  getCategories,
  getSubCategories,
} from '/server'
import { SubCategory } from '/types'

export default async function SubCategory({
  searchParams,
}: {
  searchParams: URLSearchParams & { edit?: number }
}) {
  const [subCategories, categories] = await Promise.all([
    getSubCategories(),
    getCategories(),
  ])

  return (
    <div className='grid grid-cols-2'>
      <FormContextProvider>
        <section className='border-r'>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Add Subcategory
          </H>
          <div className='flex'>
            <section className='flex flex-col max-w-md mx-auto'>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryForm action={createSubCategory} main={categories} />
              </Suspense>
            </section>
          </div>
        </section>
        <section>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Subcategory list
          </H>
          <div className='flex'>
            <section className='flex flex-col max-w-md mx-auto'>
              <CategoryList
                category={subCategories}
                action={deleteSubcategory}
              />
            </section>
          </div>
        </section>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 p-10 pt-5 rounded-xl'>
              <div className='flex py-3'>
                <h3 className='font-lg font-bold'>Edit Category</h3>
                <CloseModal closeKey={routes.addSubCategory} className='p-0' />
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryForm
                  action={editSubCategory}
                  main={categories}
                  checked={
                    subCategories.find(
                      (e) => e.id === Number(searchParams?.edit)
                    )?.categoryId
                  }
                  query='edit'
                />
              </Suspense>
            </div>
          </Portal>
        </SearchParamsWrapper>
      </FormContextProvider>
    </div>
  )
}
