import Link from 'next/link'
import {
  BlogModal,
  BlogPages,
  BlogPosts,
  BlogPostsSkeleton,
  BlogSwitcher,
  H,
  SearchParamsWrapper,
  Section,
  Spinner,
} from '/components'
import { getDictionary } from '/lib'
import { Blog, PageProps } from '/types'
import { twMerge } from 'tailwind-merge'
import { countPosts } from '/server'
import { Suspense } from 'react'

export default async function Product({
  params: { lang },
  searchParams: { filter = 'news', recept, page = 1 },
}: PageProps & {
  searchParams: URLSearchParams & {
    filter?: Blog
    recept?: string
    page?: number
  }
}) {
  const { blog } = await getDictionary(lang)

  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28'>
        <section className='flex mb-10 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <ul className='flex gap-10 ml-20 items-end pb-3 uppercase'>
            <Suspense
              fallback={
                <div className='w-full max-w-xs animate-pulse bg-zinc-200 h-6' />
              }
            >
              <BlogSwitcher />
            </Suspense>
          </ul>
        </section>

        <article>
          <section
            className={twMerge(
              'grid grid-cols-3 gap-6',
              filter === 'recept' && 'grid-cols-4'
            )}
          >
            <Suspense>
              <BlogPosts>
                <BlogPostsSkeleton />
              </BlogPosts>
            </Suspense>
          </section>
        </article>
        <section className='mt-24 mx-auto flex gap-2 justify-center'>
          <Suspense fallback={<Spinner />}>
            <BlogPages />
          </Suspense>
        </section>
      </Section>
      <Suspense>
        <SearchParamsWrapper query={['recept']}>
          <BlogModal slug={recept} />
        </SearchParamsWrapper>
      </Suspense>
    </main>
  )
}
