import Image from 'next/image'
import Link from 'next/link'
import { BlogSwitcher, H, Section } from '/components'
import { banner3 } from '/public'
import { getDictionary } from '/lib'
import { Blog, Locale } from '/types'
import { getLatestPosts, getPost } from '/server'
import { getImage, getLangKey } from '/utils'
import { switchBlog } from '/config'
import { twMerge } from 'tailwind-merge'

export default async function Post({
  params: { slug, lang },
  searchParams: { filter },
}: {
  params: { slug: string; lang: Locale }
  searchParams: { filter: Blog }
}) {
  const { blog } = await getDictionary(lang)
  const post = await getPost(slug)
  const similarPosts = await getLatestPosts(filter ?? 'news')
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
                <Link href={`/${lang}/blog?filter=${item.name}`}>
                  {item.name}
                </Link>
              </li>
            ))}
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
            {post[`title_${getLangKey(lang)}`]}
          </H>
          <div className='flex gap-[6%] mt-16'>
            <div className='flex gap-3 justify-center'>
              <div className='border-b border-[#C4C4C4] w-10 self-start mt-3' />
            </div>

            <div className='flex flex-col gap-10'>
              <div
                className='text-lg leading-relaxed text-secondary flex flex-col gap-14'
                dangerouslySetInnerHTML={{
                  __html: post[`content_${getLangKey(lang)}`],
                }}
              />
            </div>
          </div>
        </article>
        <section className='grid grid-cols-4 gap-6 mt-36'>
          {similarPosts
            .filter((e) => e.id !== post.id)
            .slice(0, 4)
            .map((p) => (
              <Link key={p.id} href={`${p.slug}?filter=${filter ?? 'news'}`}>
                <div className='relative w-full aspect-square'>
                  <Image
                    src={getImage`${p.thumbnail}`}
                    alt='banner'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-[1rem]'
                  />
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                  <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'>
                    {p[`title_${getLangKey(lang)}`]}
                  </p>
                </div>
              </Link>
            ))}
        </section>
      </Section>
    </main>
  )
}
