import {
  Arc,
  Button,
  Cert,
  H,
  MainSlider,
  Map,
  Recept,
  ReceptSkeleton,
  Section,
  Stars,
} from '/components'
import { twMerge } from 'tailwind-merge'
import { banner, barambinoArch, barambinos, chocolate, iceCream } from '/public'
import { brands } from '/config'
import { PageProps } from '/types'
import { getDictionary } from '/lib'
import { Suspense } from 'react'
import Image from 'next/image'
import { getPaginatedPosts, getPaginatedProducts } from '/server'
import Link from 'next/link'

export default async function Home({ params: { lang } }: PageProps) {
  const { home } = await getDictionary(lang)
  return (
    <main className='flex min-h-screen flex-col gap-36'>
      <div className='bg-[#FBF6F2] w-full pt-36'>
        <Suspense fallback={<div>Loading...</div>}>
          <MainSlider />
        </Suspense>
      </div>
      <Section>
        <div className='flex'>
          <H tag='h2' size='md'>
            We procedure best products
          </H>
          <Stars className='ml-auto' />
        </div>
        <div className='flex justify-around mt-14'>
          <Link href={`${lang}/product?category=2`}>
            <Arc
              src={chocolate}
              heading='confectionary'
              sub='Only the best chocolate'
              className='bg-dark-brown'
            />
          </Link>
          <Link href={`${lang}/product?category=3`}>
            <Arc
              src={iceCream}
              heading='ice cream'
              sub='The real taste of an ice cream'
              className='bg-light-brown'
              imgClassName='ml-5'
            />
          </Link>
        </div>
      </Section>
      <Section className='flex flex-col gap-16'>
        <H tag='h2' size='md'>
          Our Brands
        </H>
        <div className='grid grid-cols-3 gap-[4vw]'>
          {brands.map(({ name, img, link }) => (
            <Link
              key={name}
              href={`/${lang}${link}`}
              className='rounded-[3rem] bg-gray bg-opacity-30 flex items-center justify-center py-14'
            >
              <Image src={img} alt={name} />
            </Link>
          ))}
        </div>
      </Section>
      <div className='pt-20 pb-32 relative bg-gold-light '>
        <Section className='z-10'>
          <div className='flex relative text-center h-40 items-end'>
            <Stars className='[&_path]:fill-gold absolute left-0' />
            <H tag='h3' className='w-full uppercase' size='md'>
              barambo recipes
            </H>
          </div>

          <Suspense fallback={<ReceptSkeleton />}>
            <Recept lang={lang} />
          </Suspense>
        </Section>
      </div>
      <Section className='flex items-center justify-center align-middle gap-[4vw] 3xl:gap-20'>
        <section className='basis-1/3 flex flex-col h-full self-stretch flex-1 aspect-square'>
          <H tag='h5' className='mt-auto' size='lg'>
            Discover our New Tasty product!
          </H>
          <Link
            href={`/${lang}/product?category=2`}
            className='my-auto mr-auto'
          >
            <Button className='w-36 h-12 bg-white'>Learn More</Button>
          </Link>
        </section>
        <Arc src={barambinos} arch={barambinoArch} imgClassName='-mb-5' />
        <section className='basis-1/3 aspect-square flex flex-col ml-auto justify-around'>
          <div>
            <h6 className='text-2xl font-medium'>100% Natural Ingredients</h6>
            <p className='text-[#827C74] text-lg mt-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          <div className=''>
            <h6 className='text-2xl font-medium'>
              Only the best for you child
            </h6>
            <p className='text-[#827C74] text-lg mt-3'>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum
            </p>
          </div>
        </section>
      </Section>
      <Cert text={home.certificates} />
      <Section className='flex flex-col gap-[2rem]'>
        <H tag='h5' className='mt-auto' size='md'>
          Blog
        </H>

        <div className='flex gap-7'>
          <div className='row-span-2 basis-1/2'>
            <div>
              <Image
                src={banner}
                alt='last-article'
                className='object-cover h-full w-full rounded-[3rem] aspect-video'
              />
            </div>
            <H tag='h6' className='text-3xl mt-5 mb-4'>
              Decorative touches for your celebration1
            </H>
            <p className='leading-normal text-secondary text-lg'>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus
            </p>
          </div>
          <div className='basis-1/2 grid grid-rows-2 grid-cols-1'>
            <div className='flex pb-7'>
              <div className='basis-1/3'>
                <Image
                  src={banner}
                  alt='last-article'
                  className='object-cover rounded-[3rem] aspect-square h-full w-full'
                />
              </div>

              <div className='text-3xl mt-5 ml-5 basis-2/3'>
                <H tag='h6' className='leading-normal pb-4'>
                  Decorative touches for your celebration1
                </H>
                <p className='leading-normal text-secondary text-lg line-clamp-2 text-ellipsis'>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus
                </p>
              </div>
            </div>

            <div className='flex row-start-2 pt-7 border-t border-stone-300'>
              <div className='basis-1/3 flex-grow'>
                <Image
                  src={banner}
                  alt='last-article'
                  className='col-start-2 object-cover w-[20vw] rounded-[3rem] aspect-square'
                />
              </div>
              <div className='text-3xl mt-5 ml-5 basis-2/3'>
                <H tag='h6' className='leading-normal pb-4'>
                  Decorative touches for your celebration1
                </H>
                <p className='leading-normal text-secondary text-lg line-clamp-2 text-ellipsis'>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-stone-300 w-full py-8' />
        <div className='flex'>
          <Button className='w-48 h-14 bg-white mt-auto mb-8 z-10 ml-auto'>
            See All Articles
          </Button>
        </div>
      </Section>
      <Section className='mb-14'>
        <Map text={home.export} />
      </Section>
    </main>
  )
}
