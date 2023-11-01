import Image from 'next/image'
import {
  BlogModal,
  BlogSwitcher,
  Button,
  H,
  Section,
} from '/components'
import { getDictionary } from '/lib'
import { PageProps } from '/types'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

export default async function Product({
  params: { lang },
  searchParams,
}: PageProps & { searchParams: URLSearchParams & { recept?: string } }) {
  const { blog } = await getDictionary(lang)

  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28'>
        <section className='flex mb-10 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <BlogSwitcher text={blog} />
        </section>

        <article>
          <section
            className={twMerge(
              'grid grid-cols-3 gap-6',
              'recept' in searchParams && 'grid-cols-4'
            )}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className='flex aspect-square rounded-3xl relative overflow-hidden'
              >
                <Image
                  src={`https://picsum.photos/200?random${i + 1}`}
                  alt={`${i}`}
                  width={200}
                  height={200}
                  className='absolute inset-0 object-cover h-full w-full'
                />
                <Link
                  href={
                    'recept' in searchParams ? `?recept=${i}` : `/blog/${i + 1}`
                  }
                  className='mt-auto mx-auto mb-8 z-10'
                >
                  <Button className='bg-white w-36 h-10'>Read More</Button>
                </Link>
              </div>
            ))}
          </section>
        </article>
      </Section>
      <BlogModal isOpen={!!searchParams?.recept} />
    </main>
  )
}
