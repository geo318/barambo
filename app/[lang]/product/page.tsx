import Image from 'next/image'
import {
  H,
  Magnifier,
  Plus,
  ProductModal,
  ProductWrapper,
  Section,
} from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import { twMerge } from 'tailwind-merge'

export default async function Product({ params: { lang } }: PageProps) {
  const { product } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28 flex gap-20'>
        <aside>
          <H tag='h1' size='xl'>
            {product.h1}
          </H>
          <h4 className='text-2xl font-medium my-7'>
            What it is so special about us?
          </h4>
          <section className='max-w-xs'>
            {['Brands', 'Confectionery', 'Ice cream'].map((c, i) => (
              <div
                key={c}
                className={twMerge(
                  'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb]',
                  i >= 1 && 'text-secondary'
                )}
              >
                {c}
                <Plus className='ml-auto' />
              </div>
            ))}
          </section>
        </aside>
        <article>
          <div className='relative mb-14 mt-10'>
            <Magnifier className='absolute left-0 mt-1/2 translate-y-1/2' />
            <input
              type='text'
              name='search'
              placeholder='Search'
              className='border-0 border-b pl-5 w-52 '
            />
          </div>
          <section className='grid grid-cols-4 gap-6'>
            {Array.from({ length: 16 }).map((_, i) => (
              <ProductWrapper key={i}>
                <div className='relative w-full h-52'>
                  <Image
                    src={`https://picsum.photos/200?random${i + 1}`}
                    alt='banner'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-[1rem]'
                  />
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                  <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quidem.
                  </p>
                  <div className='border-b my-2 border-[#bebebe]' />
                  <h4 className='text-lg font-medium'>Barambino</h4>
                </div>
              </ProductWrapper>
            ))}
          </section>
        </article>
      </Section>
      <ProductModal />
    </main>
  )
}
