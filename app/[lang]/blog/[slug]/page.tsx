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
import { getImage, getLangKey } from '/utils'
import { Suspense } from 'react'
import { locales } from '/config'

export default async function Post({
  params,
}: {
  params: { slug?: string; lang: Locale }
}) {
  const { blog } = await getDictionary(params.lang)
  const post = await getPost(params?.slug ?? '')
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
        <Image
          src={post.banner ? getImage`${post.banner}` : banner3}
          alt='banner'
          className='max-h-80 rounded-[3rem] object-cover my-16'
          width={1500}
          height={300}
        />
        <article>
          <H tag='h1' size='lg'>
            {post[`title_${getLangKey(params.lang)}`]}
          </H>
          <div className='flex gap-[6%] mt-16'>
            <div className='flex gap-3 justify-center'>
              <div className='border-b border-[#C4C4C4] w-10 self-start mt-3' />
            </div>

            <div className='flex flex-col gap-10'>
              <div
                className='text-lg leading-relaxed text-secondary flex flex-col gap-14'
                dangerouslySetInnerHTML={{
                  __html: post[`content_${getLangKey(params.lang)}`],
                }}
              />
            </div>
          </div>
        </article>
        <section className='grid grid-cols-4 gap-6 mt-36'>
          <Suspense fallback={<SimilarPostsSkeleton />}>
            <SimilarPosts lang={params.lang} id={post.id}>
              <SimilarPostsSkeleton />
            </SimilarPosts>
          </Suspense>
        </section>
      </Section>
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await getPostsSlugs()
  const slugArr = posts?.map((p) => ({
    slug: p?.slug,
  })) as { lang: Locale; slug: string }[]

  for (let i = 0; i < locales.length; i++) {
    for (let j = 0; j < slugArr.length; j++) {
      slugArr[j].lang = locales[i]
    }
  }
  return slugArr
}
