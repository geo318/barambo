import { Product } from '/components'
import { type Product as Products } from '/types'

export const ProductList: React.FC<{ products: Products[] }> = ({
  products,
}) => {
  return (
    <section className='grid grid-cols-4 gap-6'>
      {products.map((p, i) => (
        <Product key={i} product={p} />
      ))}
    </section>
  )
}
