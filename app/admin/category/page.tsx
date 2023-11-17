import { Suspense } from 'react'
import {
  CategoryForm,
  CategoryList,
  CloseModal,
  H,
  Portal,
  SearchParamsWrapper,
  Spinner,
} from '/components'
import { routes } from '/config'
import {
  createMainCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from '/server'
import { Category } from '/types'

export default async function Category() {
  const categories = await getCategories()

  return (
    <div className='grid grid-cols-2'>
      <section className='border-r'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Main Category
        </H>
        <div className='flex'>
          <section className='flex flex-col max-w-md mx-auto'>
            <Suspense fallback={<Spinner />}>
              <CategoryForm action={createMainCategory} />
            </Suspense>
          </section>
        </div>
      </section>
      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          category list
        </H>
        <div className='flex'>
          <section className='flex flex-col max-w-md mx-auto'>
            <CategoryList category={categories} />
          </section>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <SearchParamsWrapper query={['edit']}>
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 p-10 pt-5 rounded-xl'>
              <div className='flex py-3'>
                <h3 className='font-lg font-bold'>Edit Category</h3>
                <CloseModal closeKey={routes.addCategory} className='p-0' />
              </div>
              <CategoryForm
                action={editCategory}
                deleteAction={deleteCategory}
                main={categories}
                query='edit'
              />
            </div>
          </Portal>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  )
}
