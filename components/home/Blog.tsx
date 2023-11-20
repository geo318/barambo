'use server'

import Image from 'next/image'
import { H } from '/components'
import { Locale } from '/types'
import { getHomepagePosts } from '/server'
import { getImage, getLangKey, sleep } from '/utils'
import Link from 'next/link'

export const BlogSection = async ({ lang }: { lang: Locale }) => {
  const posts = await getHomepagePosts()
  if (posts?.length < 3)
    return (
      <div className='text-lg text-secondary font-medium py-3'>
        Add more posts to display
      </div>
    )
  const [main, top, bottom] = posts
  return (
    <div className='flex gap-7'>
      <div className='row-span-2 basis-1/2'>
        <Link href={`/${lang}/blog/${main.slug}`} className=' aspect-video'>
          <Image
            src={getImage`${main.thumbnail}`}
            width={400}
            height={200}
            alt='last-article'
            className='object-cover w-full rounded-[3rem] aspect-video'
          />
        </Link>
        <Link href={`/${lang}/blog/${main.slug}`} className='pt-5 pb-4 block'>
          <H tag='h6' className='text-3xl line-clamp-2 text-ellipsis'>
            {main[`title_${getLangKey(lang)}`]}
          </H>
        </Link>
        <Link
          className='leading-normal text-secondary text-lg text-ellipsis line-clamp-2'
          href={`/${lang}/blog/${main.slug}`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: main[`content_${getLangKey(lang)}`],
            }}
          />
        </Link>
      </div>
      <div className='basis-1/2 grid grid-rows-2 grid-cols-1'>
        <div className='flex pb-7'>
          <Link className='basis-1/3' href={`/${lang}/blog/${top.slug}`}>
            <Image
              src={getImage`${top.thumbnail}`}
              alt='last-article'
              className='object-cover rounded-[3rem] aspect-square h-full w-full'
              width={100}
              height={100}
            />
          </Link>

          <Link
            className='text-3xl mt-5 ml-5 basis-2/3'
            href={`/${lang}/blog/${top.slug}`}
          >
            <H
              tag='h6'
              className='leading-normal pb-4 line-clamp-2 text-ellipsis'
            >
              {top[`title_${getLangKey(lang)}`]}
            </H>
            <div
              className='leading-normal text-secondary text-lg line-clamp-2 text-ellipsis'
              dangerouslySetInnerHTML={{
                __html: top[`content_${getLangKey(lang)}`],
              }}
            />
          </Link>
        </div>

        <div className='flex row-start-2 pt-7 border-t border-stone-300'>
          <Link
            className='basis-1/3 flex-grow line-clamp-2 text-ellipsis'
            href={`/${lang}/blog/${bottom.slug}`}
          >
            <Image
              src={getImage`${bottom.thumbnail}`}
              alt='last-article'
              className='col-start-2 object-cover w-[20vw] rounded-[3rem] aspect-square'
              width={100}
              height={100}
            />
          </Link>
          <Link
            className='text-3xl mt-5 ml-5 basis-2/3'
            href={`/${lang}/blog/${bottom.slug}`}
          >
            <H
              tag='h6'
              className='leading-normal pb-4 line-clamp-2 text-ellipsis'
            >
              {bottom[`title_${getLangKey(lang)}`]}
            </H>
            <div
              className='leading-normal text-secondary text-lg line-clamp-2 text-ellipsis'
              dangerouslySetInnerHTML={{
                __html: bottom[`content_${getLangKey(lang)}`],
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export const BlogSectionSkeleton = () => {
  return (
    <div className='flex gap-7'>
      <div className='row-span-2 basis-1/2'>
        <div className='relative w-full aspect-video'>
          <div className='absolute inset-0 bg-zinc-200 animate-pulse rounded-3xl' />
        </div>
        <div className='mt-5 mb-4'>
          <div className='h-12 bg-zinc-200 animate-pulse rounded-md' />
        </div>
        <div className='leading-normal text-secondary text-lg'>
          <div className='h-20 bg-zinc-200 animate-pulse rounded-md' />
        </div>
      </div>
      <div className='basis-1/2 grid grid-rows-2 grid-cols-1'>
        <div className='flex pb-7'>
          <div className='basis-1/3'>
            <div className='aspect-square bg-zinc-200 animate-pulse rounded-3xl' />
          </div>

          <div className='flex flex-col gap-4 text-3xl mt-5 ml-5 basis-2/3'>
            <div className='h-12 bg-zinc-200 animate-pulse rounded-md' />
            <div className='h-16 bg-zinc-200 animate-pulse rounded-md' />
          </div>
        </div>

        <div className='flex row-start-2 pt-7 border-t border-stone-300'>
          <div className='basis-1/3 flex-grow'>
            <div className='aspect-square bg-zinc-200 animate-pulse rounded-3xl' />
          </div>
          <div className='flex flex-col gap-4 text-3xl mt-5 ml-5 basis-2/3'>
            <div className='h-12 bg-zinc-200 animate-pulse rounded-md' />
            <div className='h-16 bg-zinc-200 animate-pulse rounded-md' />
          </div>
        </div>
      </div>
    </div>
  )
}
