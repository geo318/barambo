import Link from 'next/link'
import {
  BlogModal,
  BlogPosts,
  BlogPostsSkeleton,
  H,
  Section,
} from '/components'
import { getDictionary } from '/lib'
import { Blog, PageProps } from '/types'
import { twMerge } from 'tailwind-merge'
import { countPosts } from '/server'
import { switchBlog } from '/config'
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
  const pageCount = await countPosts(filter ?? 'news')

  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28'>
        <section className='flex mb-10 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <ul className='flex gap-10 ml-20 items-end pb-3 uppercase'>
            {switchBlog.map((item) => (
              <li
                className={twMerge(
                  'text-lg font-medium border-b border-transparent',
                  (filter ?? 'news') === item.name && 'border-black'
                )}
                key={item.name}
              >
                <Link href={`?filter=${item.name}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <article>
          <section
            className={twMerge(
              'grid grid-cols-3 gap-6',
              filter === 'recept' && 'grid-cols-4'
            )}
          >
            <Suspense fallback={<BlogPostsSkeleton />}>
              <BlogPosts filter={filter} lang={lang} page={page} />
            </Suspense>
          </section>
        </article>
        <div className='mt-24 mx-auto flex gap-2 justify-center'>
          {Array.from({ length: pageCount }).map((_, i) => (
            <Link
              key={i}
              href={`${filter ? `?filter=${filter ?? 'news'}&` : '?'}page=${
                i + 1
              }`}
              className={twMerge(
                'text-xl w-12 flex items-center justify-center rounded-md text-[#77838F] aspect-square',
                ((!page && !i) || page == i + 1) &&
                  'bg-[#E7DAD2] text-[#5A5A5A]'
              )}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </Section>
      <BlogModal isOpen={!!recept} slug={recept} />
    </main>
  )
}

export const dynamic = 'force-dynamic'
