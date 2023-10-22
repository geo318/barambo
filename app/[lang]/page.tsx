import { Marcellus } from 'next/font/google'
import { Arrow, Button, Cert, H, MainSlider, Section, Stars } from '/components'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import {
  banner,
  barambinoArch,
  barambinos,
  chocolate,
  iceCream,
  map,
} from '/public'
import { brands } from '/config'
import { PageProps } from '/types'
import { getDictionary } from '/lib'

const marcellus = Marcellus({ weight: ['400'], subsets: ['latin'] })

export default async function Home({ params: { lang } }: PageProps) {
  const { home } = await getDictionary(lang)
  return (
    <main className='flex min-h-screen flex-col gap-36'>
      <div className='bg-[#FBF6F2] w-full pt-36'>
        <Section className='grid grid-cols-2 gap-[14vw] pb-12'>
          <H
            tag='h1'
            className={twMerge(
              marcellus.className,
              'text-[3.75vw] leading-snug txt-balance'
            )}
            style={{ fontWeight: 600 }}
          >
            Have you tasted our new ice cream?
          </H>
          <section className='flex flex-col gap-4 max-w-lg'>
            <h2 className='text-2xl font-medium text-primary'>
              Which ones is your favorite?
            </h2>
            <div className='border-b border-[#BEBEBE]' />
            <p className='txt-balance max-w-md text-lg font-normal text-secondary'>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and many web sites still
              in their infancy
            </p>
          </section>
        </Section>

        {/* <Section className='relative flex flex-col'>
          <Image src={banner} alt='banner' className='rounded-t-[5rem]' />
          <div className='absolute bottom-10 flex gap-4 justify-end self-end mr-[7vw]'>
            <Button className='bg-white w-16 h-16 !px-0'>
              <Arrow className='rotate-180' />
            </Button>
            <Button className='bg-white w-16 h-16 !px-0'>
              <Arrow />
            </Button>
          </div>
        </Section> */}
        <MainSlider />
      </div>
      <Section>
        <div className='flex'>
          <H tag='h2' className='text-[2.5vw]'>
            We procedure best products
          </H>
          <Stars className='ml-auto' />
        </div>
        <div className='flex justify-around mt-14'>
          <figure className='flex flex-col gap-10'>
            <div className='aspect-square bg-dark-brown w-full max-w-[25rem] rounded-t-[30rem] rounded-b-[3rem] flex items-end justify-center'>
              <Image
                src={chocolate}
                alt='chocolate'
                className='scale-[1.35] mb-5 ml-5'
              />
            </div>
            <figcaption className='text-[.8vw] font-medium text-secondary text-center'>
              <H tag='h5' className='text-[1.6vw] text-primary uppercase'>
                confectionary
              </H>
              Only the best chocolate
            </figcaption>
          </figure>
          <figure className='flex flex-col gap-10'>
            <div className='aspect-square bg-light-brown w-full max-w-[25rem] rounded-t-[30rem] rounded-b-[3rem] flex items-end justify-center'>
              <Image
                src={iceCream}
                alt='chocolate'
                className='scale-[1.35] -mb-5'
              />
            </div>
            <figcaption className='text-[.8vw] font-medium text-secondary text-center'>
              <H tag='h5' className='text-[1.6vw] text-primary uppercase'>
                ice cream
              </H>
              The real taste of an ice cream
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section className='flex flex-col gap-16'>
        <H tag='h2' className='text-[2.5vw]'>
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
            <H tag='h3' className='text-[2.5vw] w-full uppercase'>
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
          <H tag='h5' className='text-[3vw] mt-auto'>
            Discover our New Tasty product!
          </H>
          <Button className='w-36 h-12 bg-white mt-auto mr-auto mb-8 '>
            Learn More
          </Button>
        </section>
        <figure className='aspect-square w-full max-w-[25rem] rounded-t-[30rem] rounded-b-[3rem] flex items-end justify-center relative basis-1/3'>
          <Image
            src={barambinoArch}
            alt='barambino-arch'
            className='absolute inset-0 object-contain h-full w-full'
          />
          <Image
            src={barambinos}
            alt='chocolate'
            className='scale-[1.35] -mb-5'
          />
        </figure>
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
        <H tag='h5' className='text-[3vw] mt-auto'>
          Blog
        </H>
        <div className='grid grid-cols-2 grid-rows-1 gap-7'>
          <div className='row-span-2 aspect-square'>
            <Image
              src={banner}
              alt='last-article'
              className='object-cover h-full w-full rounded-[3rem]'
            />
            <H tag='h6' className='text-3xl mt-5 mb-4'>
              Decorative touches for your celebration1
            </H>
            <p className='leading-normal text-secondary text-lg'>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus
            </p>
          </div>
          <div className='grid grid-rows-2 grid-cols-1'>
            <div className='flex pb-7'>
              <Image
                src={banner}
                alt='last-article'
                className='object-cover w-[20vw] rounded-[3rem]'
              />
              <div className='text-3xl mt-5 mb-4 ml-5'>
                <H tag='h6' className='leading-normal pb-4'>
                  Decorative touches for your celebration1
                </H>
                <p className='leading-normal text-secondary text-lg'>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus
                </p>
              </div>
            </div>

            <div className='flex row-start-2 pt-7 border-t border-stone-300'>
              <Image
                src={banner}
                alt='last-article'
                className='col-start-2 object-cover w-[20vw] rounded-[3rem]'
              />
              <div className='text-3xl mt-5 mb-4 ml-5'>
                <H tag='h6' className='leading-normal pb-4'>
                  Decorative touches for your celebration1
                </H>
                <p className='leading-normal text-secondary text-lg'>
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
        <H tag='h5' className='text-[3vw] mt-auto'>
          Export
        </H>
        <div className='grid grid-cols-2 gap-[3rem] pt-14'>
          <div className='flex flex-col gap-8'>
            <p>
              The use of modern European technology and high-quality Belgian raw
              materials, constant control over production - allowed the company
              “Barambo” to meet the standards of the world`s leading countries.
              Barambo owns the certificate ISO22000: 2005.
            </p>
            <p>
              Since 2011 our team has been actively working on export. At
              present, sweets are exported to Ukraine, China, Azerbaijan,
              Russia, Malaysia and Singapore. At this stage, negotiations are
              also conducted with representatives of other countries.
            </p>
            <p>
              We try to maximize the various requirements set out in each
              country, to meet the quality, and price categories.
            </p>
            <p>
              We produce products not only under the brand “Barambo”, but also
              under your brand. Become our partner, get a reliable and
              high-quality premium chocolate - from Georgia. If you are
              interested in export, please contact us
            </p>
          </div>
          <Image
            src={map}
            alt='last-article'
            className='object-cover rounded-[3rem]'
          />
        </div>
      </Section>
    </main>
  )
}
