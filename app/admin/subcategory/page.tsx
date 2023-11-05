import { CategoryForm, CategoryList, H } from '/components'
import { createSubCategory, getSubCategories } from '/server'
import { SubCategory } from '/types'

export default async function SubCategory() {
  const subCategories = await getSubCategories()

  return (
    <div className='grid grid-cols-2'>
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
    </div>
  )
}
