import { H } from '/components'

export default function Category() {
  async function create(formData: FormData) {
    'use server'
    const id = 'id'
  }


  return (
    <div>
      <H tag='h1' size='md'>
        Add New category or change existing one
      </H>
      <form action={create} className='mt-20 flex flex-col'>
        <input placeholder='enter category' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
