import Image from 'next/image'
import { H, Magnifier, Plus, Section } from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import { twMerge } from 'tailwind-merge'
import { barambinos } from '/public'

export default async function Product({ params: { lang } }: PageProps) {
  const { product, home } = await getDictionary(lang)
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
          <section className='grid grid-cols-4 gap-5'>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i}>
                <div className='relative w-full h-52'>
                  <Image
                    src={barambinos}
                    alt='banner'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-[1rem]'
                  />
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                  <h4 className='text-lg font-medium'>Barambino</h4>
                  <p className='text-sm text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quidem.
                  </p>
                </div>
              </div>
            ))}
          </section>
        </article>
      </Section>
    </main>
  )
}
