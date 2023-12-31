'use server'

import Image from 'next/image'
import { Anima, H } from '/components'
import { Locale } from '/types'
import { getHomepagePosts } from '/server'
import { getImage, getLangKey, purgeTags } from '/utils'
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
      <div className='row-span-2 basis-1/2 hidden lg:block'>
        <Anima>
          <Link href={`/${lang}/blog/${main.slug}`} className='aspect-video'>
            <Image
              src={getImage`${main.thumbnail}`}
              width={400}
              height={200}
              alt='last-article'
              className='object-cover w-full rounded-[3rem] aspect-video'
            />
          </Link>
        </Anima>
        <Anima>
          <Link href={`/${lang}/blog/${main.slug}`} className='pt-5 pb-4 block'>
            <H tag='h6' className='text-3xl line-clamp-2 text-ellipsis'>
              {main[`title_${getLangKey(lang)}`]}
            </H>
          </Link>
        </Anima>
        <Anima>
          <Link
            className='leading-normal text-secondary text-lg text-ellipsis line-clamp-2'
            href={`/${lang}/blog/${main.slug}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: purgeTags(main[`content_${getLangKey(lang)}`]),
              }}
            />
          </Link>
        </Anima>
      </div>
      <div className='lg:basis-1/2 w-full lg:w-auto grid grid-rows-2 grid-cols-1'>
        <div className='flex pb-7'>
          <Link className='basis-1/3' href={`/${lang}/blog/${top.slug}`}>
            <Anima>
              <Image
                src={getImage`${top.thumbnail}`}
                alt='last-article'
                className='object-cover lg:rounded-[3rem] rounded-xl aspect-square h-full w-full'
                width={250}
                height={250}
              />
            </Anima>
          </Link>

          <Link
            className='text-3xl mt-5 ml-5 basis-2/3'
            href={`/${lang}/blog/${top.slug}`}
          >
            <Anima>
              <H
                tag='h6'
                className='leading-normal pb-4 line-clamp-2 text-ellipsis'
                size='md'
              >
                {top[`title_${getLangKey(lang)}`]}
              </H>
            </Anima>
            <Anima>
              <div
                className='leading-normal text-secondary lg:text-lg text-xs line-clamp-2 text-ellipsis'
                dangerouslySetInnerHTML={{
                  __html: purgeTags(top[`content_${getLangKey(lang)}`]),
                }}
              />
            </Anima>
          </Link>
        </div>

        <div className='flex row-start-2 pt-7 border-t border-stone-300'>
          <Link
            className='basis-1/3 flex-grow line-clamp-2 text-ellipsis'
            href={`/${lang}/blog/${bottom.slug}`}
          >
            <Anima>
              <Image
                src={getImage`${bottom.thumbnail}`}
                alt='last-article'
                className='object-cover lg:rounded-[3rem] rounded-xl aspect-square h-full w-full'
                width={250}
                height={250}
              />
            </Anima>
          </Link>
          <Link
            className='text-3xl mt-5 ml-5 basis-2/3'
            href={`/${lang}/blog/${bottom.slug}`}
          >
            <Anima>
              <H
                tag='h6'
                className='leading-normal pb-4 line-clamp-2 text-ellipsis'
                size='md'
              >
                {bottom[`title_${getLangKey(lang)}`]}
              </H>
            </Anima>
            <Anima>
              <div
                className='leading-normal text-secondary lg:text-lg text-xs line-clamp-2 text-ellipsis'
                dangerouslySetInnerHTML={{
                  __html: purgeTags(bottom[`content_${getLangKey(lang)}`]),
                }}
              />
            </Anima>
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
