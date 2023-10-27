import Image from 'next/image'
import { H, Section } from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'

export default async function Product({ params: { lang } }: PageProps) {
  const { product, home } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='bg-gold-light py-28'>
        <H tag='h1' size='xl'>
          {product.h1}
        </H>
      </Section>
    </main>
  )
}
