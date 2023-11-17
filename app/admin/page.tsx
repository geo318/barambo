import Image from 'next/image'
import { getProducts } from '/server'
import { getImage } from '/utils'

export default async function Admin() {
  const products = await getProducts()
  return (
    <div>
      <div className='relative'>
        <h1 className='pb-0 text-xl font-semibold text-center'>
          Upload new track info
        </h1>
      </div>
      <div className='grid grid-cols-3'>
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
          </div>
        ))}
      </div>
    </div>
  )
}
