import { CategoryForm, CategoryList, H } from '/components'
import { createMainCategory, createSubCategory, getCategories } from '/server'

export default async function Category() {
  const cat = await getCategories()
  return (
    <div className='grid grid-cols-2'>
      <section className='border-r'>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Secondary Category
        </H>
        <div className='flex'>
          <section className='flex flex-col max-w-md mx-auto'>
            <CategoryList category={cat} />
            <div className='my-10 border-b' />
            <CategoryForm main={cat} action={createSubCategory} />
          </section>
        </div>
      </section>
      <section>
        <H tag='h1' size='md' className='mb-20 text-center'>
          Add Main Category
        </H>
        <div className='flex'>
          <section className='flex flex-col max-w-md mx-auto'>
            <CategoryList category={cat} />
            <div className='my-10 border-b' />
            <CategoryForm action={createMainCategory} />
          </section>
        </div>
      </section>
    </div>
  )
}
