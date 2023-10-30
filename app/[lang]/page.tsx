import { Marcellus } from 'next/font/google'
import {
  Arc,
  Button,
  Cert,
  H,
  MainSlider,
  Map,
  Section,
  Stars,
} from '/components'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { banner, barambinoArch, barambinos, chocolate, iceCream } from '/public'
import { brands } from '/config'
import { PageProps } from '/types'
import { getDictionary } from '/lib'

export default async function Home({ params: { lang } }: PageProps) {
  const { home } = await getDictionary(lang)

  return (
    <main className='flex min-h-screen flex-col gap-36'>
      <div className='bg-[#FBF6F2] w-full pt-36'>
        <MainSlider />
      </div>
      <Section>
        <div className='flex'>
          <H tag='h2' size='md'>
            We procedure best products
          </H>
          <Stars className='ml-auto' />
        </div>
        <div className='flex justify-around mt-14'>
          <Arc
            src={chocolate}
            heading='confectionary'
            sub='Only the best chocolate'
            className='bg-dark-brown'
          />
          <Arc
            src={iceCream}
            heading='ice cream'
            sub='The real taste of an ice cream'
            className='bg-light-brown'
            imgClassName='ml-5'
          />
        </div>
      </Section>

      <Section className='flex flex-col gap-16'>
        <H tag='h2' size='md'>
          Our Brands
        </H>
        <div className='grid grid-cols-3 gap-[4vw]'>
          {brands.map(({ name, img }) => (
            <div
              key={name}
              className='rounded-[3rem] bg-gray bg-opacity-30 flex items-center justify-center py-14'
            >
              <Image src={img} alt={name} />
            </div>
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
          <nav className='w-full items-center justify-center'>
            <ul className='flex gap-12 mt-8 justify-center'>
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className={twMerge(
                    'text-[#888] hover:text-secondary',
                    !i && 'text-primary pointer-events-none'
                  )}
                >
                  category-{i}
                </li>
              ))}
            </ul>
          </nav>
          <div className='grid grid-cols-4 gap-8 mt-12'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='flex aspect-square rounded-3xl relative overflow-hidden'
              >
                <Image
                  src={banner}
                  alt={`${i}`}
                  className='absolute inset-0 object-cover h-full w-full'
                />
                <Button className='w-36 h-10 bg-white mt-auto mx-auto mb-8 z-10'>
                  Read More
                </Button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section className='flex items-center justify-center align-middle gap-[4vw] 3xl:gap-20'>
        <section className='basis-1/3 flex flex-col h-full self-stretch flex-1 aspect-square'>
          <H tag='h5' className='mt-auto' size='lg'>
            Discover our New Tasty product!
          </H>
          <Button className='w-36 h-12 bg-white mt-auto mr-auto mb-8'>
            Learn More
          </Button>
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
