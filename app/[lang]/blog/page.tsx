import Image from 'next/image'
import Link from 'next/link'
import { BlogModal, BlogSwitcher, Button, H, Section } from '/components'
import { getDictionary } from '/lib'
import { Blog, PageProps } from '/types'
import { twMerge } from 'tailwind-merge'
import { getPaginatedPosts } from '/server'
import { getImage } from '/utils'

export default async function Product({
  params: { lang },
  searchParams,
}: PageProps & {
  searchParams: URLSearchParams & {
    filter?: Blog
    recept?: string
    page?: number
  }
}) {
  const { blog } = await getDictionary(lang)
  const posts = await getPaginatedPosts(
    searchParams?.filter ?? 'news',
    searchParams?.page ?? 0
  )

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
              searchParams?.filter === 'recept' && 'grid-cols-4'
            )}
          >
            {posts.map(({ id, thumbnail, slug }) => (
              <div
                key={id}
                className='flex aspect-square rounded-3xl relative overflow-hidden'
              >
                {thumbnail && (
                  <Image
                    src={getImage`${thumbnail}`}
                    alt={`${id}`}
                    width={200}
                    height={200}
                    className='absolute inset-0 object-cover h-full w-full'
                  />
                )}
                <Link
                  href={
                    searchParams?.filter === 'recept'
                      ? `?filter=recept&recept=${slug}`
                      : `/blog/${slug}`
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
      <BlogModal
        isOpen={'recept' in searchParams}
        slug={searchParams?.recept}
      />
    </main>
  )
}
