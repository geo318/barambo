import Image from 'next/image'
import {
  Button,
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
import { banner2 } from '/public'
import Link from 'next/link'

export default async function Product({ params: { lang } }: PageProps) {
  const { blog } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28'>
        <section className='flex mb-10 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <h4 className='text-2xl font-medium my-7'>switcher</h4>
        </section>

        <article>
          <section className='grid grid-cols-3 gap-6'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='flex aspect-square rounded-3xl relative overflow-hidden'
              >
                <Image
                  src={banner2}
                  alt={`${i}`}
                  className='absolute inset-0 object-cover h-full w-full'
                />
                <Link href={`/blog/${i}`} className='mt-auto mx-auto mb-8 z-10'>
                  <Button className='bg-white w-36 h-10'>
                    Read More
                  </Button>
                </Link>
              </div>
            ))}
          </section>
        </article>
      </Section>
      <ProductModal />
    </main>
  )
}
