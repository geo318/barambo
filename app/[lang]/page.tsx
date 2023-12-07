import {
  H,
  Map,
  Stars,
  Anima,
  Button,
  Section,
  Discover,
  MainSlider,
  CertSlider,
  BlogSection,
  CertSkeleton,
  ReceptSection,
  ReceptSkeleton,
  DiscoverSkeleton,
  BlogSectionSkeleton,
  HomeCategorySection,
  HomeCategorySkeleton,
} from '/components'
import Image from 'next/image'
import Link from 'next/link'
import { brands } from '/config'
import { PageProps } from '/types'
import { getDictionary } from '/lib'
import { Suspense } from 'react'

export default async function Home({ params: { lang } }: PageProps) {
  const { home } = await getDictionary(lang)

  return (
    <main className='flex min-h-screen flex-col lg:gap-36 gap-7'>
      <div className='bg-[#FBF6F2] w-full lg:pt-24 pt-7 pb-7 lg:pb-0'>
        <Suspense
          fallback={
            <div className='h-[40rem] w-full bg-zinc-200 animate-pulse rounded-t-[5rem]' />
          }
        >
          <MainSlider lang={lang} />
        </Suspense>
      </div>
      <Section>
        <div className='flex delay-0 transition-transform duration-150'>
          <Anima>
            <H tag='h2' size='md'>
              {home.categories.title}
            </H>
          </Anima>
          <Anima
            className='ml-auto delay-500'
            animationStart={['opacity-50', 'scale-0']}
            animationEnd={['opacity-100', 'scale-100']}
          >
            <Stars className='lg:block hidden' />
          </Anima>
        </div>

        <Suspense fallback={<HomeCategorySkeleton />}>
          <HomeCategorySection lang={lang} />
        </Suspense>
      </Section>

      <Section className='flex flex-col lg:gap-16 gap-4'>
        <Anima>
          <H tag='h2' size='md'>
            {home.brands}
          </H>
        </Anima>
        <div className='grid grid-cols-3 lg:gap-[4%] gap-2'>
          {brands.map(({ name, img, link }) => (
            <Link
              key={name}
              href={`/${lang}${link}`}
              className='lg:rounded-[3rem] rounded-2xl bg-gray bg-opacity-30 flex items-center justify-center lg:py-14 py-3 hover:scale-105 transition-all duration-200'
            >
              <Anima>
                <Image src={img} alt={name} className='px-4 lg:px-0' />
              </Anima>{' '}
            </Link>
          ))}
        </div>
      </Section>
      <div className='lg:pt-20 lg:pb-32 py-8 relative bg-gold-light '>
        <Section className='z-10 p-0'>
          <div className='flex relative text-center lg:h-40 items-end'>
            <Anima
              className='ml-auto delay-500 absolute left-6'
              animationStart={['opacity-50', 'scale-0']}
              animationEnd={['opacity-100', 'scale-100']}
            >
              <Stars className='[&_path]:fill-gold lg:w-auto lg:h-auto w-8 h-8' />
            </Anima>

            <Anima
              animationStart={['opacity-0', '-translate-y-10']}
              animationEnd={['opacity-100', 'translate-y-0']}
              className='w-full'
            >
              <H tag='h3' className='uppercase' size='md'>
                {home.recept.title}
              </H>
            </Anima>
          </div>

          <Suspense fallback={<ReceptSkeleton />}>
            <ReceptSection lang={lang} action={home.recept.action} />
          </Suspense>
        </Section>
      </div>

      <Suspense fallback={<DiscoverSkeleton />}>
        <Discover lang={lang} text={home.discover} />
      </Suspense>

      <Suspense fallback={<CertSkeleton />}>
        <CertSlider lang={lang} text={home.certificates} />
      </Suspense>

      <Section className='flex flex-col gap-[2rem]'>
        <H tag='h5' className='mt-auto' size='md'>
          {home.blog.title}
        </H>

        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogSection lang={lang} />
        </Suspense>
        <div className='border-b border-stone-300 w-full lg:py-8 pb-4' />
        <Anima>
          <div className='flex'>
            <Link href={`/${lang}/blog`} className='mt-auto mb-8 z-10 ml-auto'>
              <Button className='w-32 lg:w-40 lg:h-14 h-10 bg-white text-sm lg:text-lg'>
                {home.blog.action}
              </Button>
            </Link>
          </div>
        </Anima>
      </Section>
      <Section className='mb-14'>
        <Map text={home.export} />
      </Section>
    </main>
  )
}
