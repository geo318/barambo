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
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Get the latest news from Barambo',
}

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
      <Section className='lg:py-28 py-10'>
        <section className='flex lg:flex-row flex-col lg:mb-10 mb-4 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <ul className='flex gap-10 lg:ml-20 lg:items-end pb-3 uppercase'>
            <Suspense
              fallback={
                <div className='w-full max-w-xs animate-pulse bg-zinc-200 h-6' />
              }
            >
              <BlogSwitcher text={blog.switcher} />
            </Suspense>
          </ul>
        </section>

        <article>
          <section
            className={twMerge(
              'grid lg:grid-cols-3 grid-cols-2 gap-6',
              filter === 'recept' && 'lg:grid-cols-4 grid-cols-2'
            )}
          >
            <Suspense>
              <BlogPosts action={blog.action}>
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
          <BlogModal slug={recept} lang={lang} />
        </SearchParamsWrapper>
      </Suspense>
    </main>
  )
}
