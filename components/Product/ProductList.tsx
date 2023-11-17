import { Product } from '/components'
import { Locale, type Product as Products } from '/types'

export const ProductList: React.FC<{
  products: Products[]
  locale: Locale
}> = ({ products, locale }) => {
  return (
    <section className='grid grid-cols-4 gap-6'>
      {products.map((p, i) => (
        <Product key={i} product={p} locale={locale} />
      ))}
    </section>
  )
}
