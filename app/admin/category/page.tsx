import { CategoryForm, CategoryList, H } from '/components'
import { createMainCategory, getCategories } from '/server'
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
            <CategoryForm action={createMainCategory} />
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
    </div>
  )
}
