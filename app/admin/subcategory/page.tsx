import { CategoryForm, CategoryList, CloseModal, H, Portal } from '/components'
import { routes } from '/config'
import { FormContextProvider } from '/context'
import { createSubCategory, getSubCategories } from '/server'
import { SubCategory } from '/types'

export default async function SubCategory({
  searchParams,
}: {
  searchParams: URLSearchParams & { edit?: string }
}) {
  const subCategories = await getSubCategories()

  return (
    <div className='grid grid-cols-2'>
      <FormContextProvider>
        <section className='border-r'>
          <H tag='h1' size='md' className='mb-20 text-center'>
            Add Subcategory
          </H>
          <div className='flex'>
            <section className='flex flex-col max-w-md mx-auto'>
              <CategoryForm action={createSubCategory} />
            </section>
          </div>
        </section>
        <section>
          <H tag='h1' size='md' className='mb-20 text-center'>
            category list
          </H>
          <div className='flex'>
            <section className='flex flex-col max-w-md mx-auto'>
              <CategoryList category={subCategories} />
            </section>
          </div>
        </section>
        {'edit' in searchParams && (
          <Portal>
            <div className='flex flex-col bg-white max-w-lg mx-auto mt-20 p-10 pt-5 rounded-xl'>
              <div className='flex py-3'>
                <h3 className='font-lg font-bold'>Edit Category</h3>
                <CloseModal closeKey={routes.addSubCategory} className='p-0' />
              </div>

              <CategoryForm action={createSubCategory} edit />
            </div>
          </Portal>
        )}
      </FormContextProvider>
    </div>
  )
}
