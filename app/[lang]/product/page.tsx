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
import { getAllCategories } from '/server'
import { getImage, getLangKey } from '/utils'
import Link from 'next/link'

export default async function Product({
  params: { lang },
  searchParams: { category, id },
}: PageProps & {
  searchParams: URLSearchParams & {
    id?: string
    category?: string
  }
}) {
  const { product } = await getDictionary(lang)
  const categories = await getAllCategories()

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
            {categories.map((c, i) => (
              <>
                <div
                  key={c.id}
                  className={twMerge(
                    'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb]',
                    i >= 1 && 'text-secondary'
                  )}
                >
                  {c.thumbnail && (
                    <Image
                      src={getImage`${c.thumbnail}`}
                      alt={c.name_eng ?? ''}
                      width={25}
                      height={25}
                      className='max-h-6 max-w-6'
                    />
                  )}
                  {c[`name_${getLangKey(lang)}`]}
                  <Link href={`?category=${c.name_eng}`}>
                    <Plus className='ml-auto' />
                  </Link>
                </div>
                <ul>
                  {c.subCategories?.map((sc) => (
                    <li
                      key={sc.id}
                      className={twMerge(
                        'flex items-center gap-5 text-lg py-4 px-2 border-t border-[#ebebeb]',
                        i >= 1 && 'text-secondary'
                      )}
                    >
                      {sc.thumbnail && (
                        <Image
                          src={getImage`${sc.thumbnail}`}
                          alt={sc.name_eng ?? ''}
                          width={25}
                          height={25}
                          className='max-h-6 max-w-6'
                        />
                      )}
                      {sc[`name_${getLangKey(lang)}`]}
                      <Link href={`?category=${sc.name_eng}`}>
                        <Plus className='ml-auto' />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
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
      <ProductModal isOpen={!!id} />
    </main>
  )
}
