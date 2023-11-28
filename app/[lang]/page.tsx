import {
  Arc,
  BlogSection,
  BlogSectionSkeleton,
  Button,
  Cert,
  H,
  MainSlider,
  Map,
  ReceptSection,
  ReceptSkeleton,
  Section,
  Stars,
} from '/components'
import { barambinoArch, barambinos2, chocolate, iceCream } from '/public'
import { brands } from '/config'
import { PageProps } from '/types'
import { getDictionary } from '/lib'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
        <div className='flex'>
          <H tag='h2' size='md'>
            We procedure best products
          </H>
          <Stars className='ml-auto lg:block hidden' />
        </div>
        <div className='flex justify-around lg:mt-14 mt-4 gap-5'>
          <Link href={`${lang}/product?category=2`}>
            <Arc
              src={chocolate}
              heading={home.arc.titles[0]}
              className='bg-dark-brown'
            />
          </Link>
          <Link href={`${lang}/product?category=3`}>
            <Arc
              src={iceCream}
              heading={home.arc.titles[1]}
              className='bg-light-brown'
              imgClassName='lg:ml-5 ml-0'
            />
          </Link>
        </div>
      </Section>
      <Section className='flex flex-col lg:gap-16 gap-4'>
        <H tag='h2' size='md'>
          {home.brands}
        </H>
        <div className='grid grid-cols-3 lg:gap-[4%] gap-2'>
          {brands.map(({ name, img, link }) => (
            <Link
              key={name}
              href={`/${lang}${link}`}
              className='lg:rounded-[3rem] rounded-2xl bg-gray bg-opacity-30 flex items-center justify-center lg:py-14 py-3'
            >
              <Image src={img} alt={name} className='px-4 lg:px-0' />
            </Link>
          ))}
        </div>
      </Section>
      <div className='lg:pt-20 lg:pb-32 py-8 relative bg-gold-light '>
        <Section className='z-10 p-0'>
          <div className='flex relative text-center lg:h-40 items-end'>
            <Stars className='[&_path]:fill-gold absolute left-6 lg:w-auto lg:h-auto w-8 h-8' />
            <H tag='h3' className='w-full uppercase' size='md'>
              {home.recept.title}
            </H>
          </div>

          <Suspense fallback={<ReceptSkeleton />}>
            <ReceptSection lang={lang} action={home.recept.action} />
          </Suspense>
        </Section>
      </div>
      <Section className='flex lg:flex-row flex-col items-center justify-center align-middle gap-[4vw] 3xl:gap-20'>
        <div className='lg:basis-1/3 flex flex-col h-full lg:self-stretch flex-1 lg:aspect-square'>
          <H tag='h5' className='mt-auto' size='lg'>
            {home.discover.heading}
          </H>
          <Link
            href={`/${lang}/product?category=10`}
            className='my-auto mr-auto hidden lg:block'
          >
            <Button className='w-36 h-12 bg-white'>
              {home.discover.action}
            </Button>
          </Link>
        </div>
        <Arc src={barambinos2} arch={barambinoArch} imgClassName='-mb-5 lg:scale-[1.2]' />
        <section className='basis-1/3 lg:aspect-square flex gap-5 flex-col ml-auto justify-around'>
          {home.discover.discover.map(({ title, description }) => (
            <div key={title}>
              <h6 className='lg:text-2xl text-md font-medium'>{title}</h6>
              <p className='text-[#827C74] lg:text-lg text-xs lg:mt-3'>
                {description}
              </p>
            </div>
          ))}
        </section>
      </Section>
      <Cert text={home.certificates} />
      <Section className='flex flex-col gap-[2rem]'>
        <H tag='h5' className='mt-auto' size='md'>
          {home.blog.title}
        </H>

        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogSection lang={lang} />
        </Suspense>
        <div className='border-b border-stone-300 w-full lg:py-8 pb-4' />
        <div className='flex'>
          <Link href={`/${lang}/blog`} className='mt-auto mb-8 z-10 ml-auto'>
            <Button className='w-32 lg:w-40 lg:h-14 h-10 bg-white text-sm lg:text-lg'>
              {home.blog.action}
            </Button>
          </Link>
        </div>
      </Section>
      <Section className='mb-14'>
        <Map text={home.export} />
      </Section>
    </main>
  )
}
