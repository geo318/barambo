import Image from 'next/image'
import { CategoryList, H } from '/components'
import { create, getCategories } from '/server'
import { selectCategorySchema } from '/schema'

export default async function Category() {
  const cat = await getCategories()
  return (
    <div>
      <H tag='h1' size='md'>
        Add New category or change existing one
      </H>
      <CategoryList category={cat} />
      <form action={create} className='mt-20 flex flex-col'>
        <input placeholder='enter category name' name='name' />
        <input placeholder='enter category icon' name='icon' type='file' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
