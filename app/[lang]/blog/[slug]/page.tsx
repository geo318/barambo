import Image from 'next/image'
import {
  H,
  Section,
  SimilarPosts,
  BlogSwitcher,
  SimilarPostsSkeleton,
} from '/components'
import { banner3 } from '/public'
import { getDictionary } from '/lib'
import { Locale } from '/types'
import { getPost, getPostsSlugs } from '/server'
import { checkStringFalsy, getImage, getLangKey } from '/utils'
import { Suspense } from 'react'

export default async function Post({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) {
  const { blog } = await getDictionary(lang)
  const post = await getPost(slug)
  return (
    <main className='flex flex-col lg:gap-36 gap-4'>
      <Section className='lg:py-28 py-10'>
        <section className='flex lg:mb-10 gap-5 lg:flex-row flex-col'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <ul className='flex lg:gap-10 lg:ml-20 items-end pb-3 uppercase'>
            <Suspense
              fallback={
                <div className='w-full max-w-xs animate-pulse bg-zinc-200 h-6' />
              }
            >
              <BlogSwitcher text={blog.switcher} />
            </Suspense>
          </ul>
        </section>
        {checkStringFalsy(post.banner) && (
          <Image
            src={getImage`${post.banner!}`}
            alt='banner'
            className='max-h-80 lg:rounded-[3rem] rounded-md object-cover lg:my-16 my-4'
            width={1500}
            height={300}
          />
        )}
        <article>
          <H tag='h1' size='lg'>
            {post[`title_${getLangKey(lang)}`]}
          </H>
          <div className='flex gap-[6%] mt-16'>
            <div className='gap-3 justify-center lg:flex hidden'>
              <div className='border-b border-[#C4C4C4] w-10 self-start mt-3' />
            </div>

            <div className='flex flex-col gap-10 w-full'>
              <div
                className='text-lg leading-relaxed text-secondary flex flex-col gap-14 [&_p:has(img)]:flex [&_*]:whitespace-normal [&_p:has(img)]:flex-wrap [&_p:has(img)]:gap-4'
                dangerouslySetInnerHTML={{
                  __html: post[`content_${getLangKey(lang)}`],
                }}
              />
            </div>
          </div>
        </article>
        <section className='grid lg:grid-cols-4 grid-cols-2 gap-6 mt-36'>
          <Suspense fallback={<SimilarPostsSkeleton />}>
            <SimilarPosts lang={lang} id={post.id}>
              <SimilarPostsSkeleton />
            </SimilarPosts>
          </Suspense>
        </section>
      </Section>
    </main>
  )
}

export const generateStaticParams = async () => {
  const posts = await getPostsSlugs()
  return posts.map(({ slug }) => ({ slug }))
}
