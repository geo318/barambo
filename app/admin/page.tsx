import { getProducts } from '/server'

export default async function Admin() {
  getProducts()
  return (
    <div>
      <div className='relative'>
        <h1 className='pb-0 text-xl font-semibold text-center'>
          Upload or edit items
        </h1>
      </div>
    </div>
  )
}
