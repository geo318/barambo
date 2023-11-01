import Image from 'next/image'
import { BlogSwitcher, H, Section } from '/components'
import { banner3 } from '/public'
import { getDictionary } from '/lib'
import { Locale } from '/types'
import Link from 'next/link'

export default async function Post({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) {
  const { blog } = await getDictionary(lang)
  return (
    <main className='flex flex-col gap-36'>
      <Section className='py-28'>
        <section className='flex mb-10 gap-5'>
          <H tag='h1' size='xl'>
            {blog.h1}
          </H>
          <BlogSwitcher text={blog} />
        </section>
        <Image
          src={banner3}
          alt='banner'
          className='max-h-80 rounded-[3rem] object-cover my-16'
        />
        <article>
          <H tag='h1' size='lg'>
            New Blog Post: {slug}
          </H>
          <div className='flex gap-[6%] mt-16'>
            <div className='flex gap-3 justify-center'>
              <p>08.08.2021</p>
              <div className='border-b border-[#C4C4C4] w-10 self-start mt-3' />
            </div>

            <div className='flex flex-col gap-10'>
              <p className='text-lg leading-relaxed text-secondary'>
                “Barambo” LTD is a Georgian Confectionary Company producing
                chocolate/sweets and it was founded on March 11th 2009. It is
                the unique one in Southern Caucasus by its volume, quality and
                production technology. Using the European technologies and
                high-quality goods from Belgium, permanent control of the
                production gave the possibility to the company to achieve the
                standards of the world`s leader countries. Production quality
                control is executed on every step of production.
              </p>
              <p className='text-lg leading-relaxed text-secondary'>
                Goods quality is strictly controlled, production is checked in
                high technologically equipped lab and production distribution
                net is under company supervision. From “Barambo” LTD foundation
                time its goal was that the plant should achieve international
                ISO22000:2005 standard requirements which are based on HACCP
                principles and this standard includes the whole chain -
                receiving and storage of the goods, production preparation,
                production storage and its distribution to the customers.
                Considering food safety risk control, company made the priority
                - production quality. Because of it there were mounted modern
                European (Germany, Belgium) equipment. There are only highest
                quality goods for Belgium which are supplied to “Barambo” by
                worldwide famous company - “Barry Callebaut”.
              </p>
            </div>
          </div>
        </article>
        <section className='grid grid-cols-4 gap-6 mt-36'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Link key={i} href={`${4 + i}`}>
              <div className='relative w-full aspect-square'>
                <Image
                  src={`https://picsum.photos/200?random${i + 1}`}
                  alt='banner'
                  layout='fill'
                  objectFit='cover'
                  className='rounded-[1rem]'
                />
              </div>
              <div className='flex flex-col gap-2 mt-5'>
                <p className='text-lg text-secondary line-clamp-2 text-ellipsis leading-relaxed'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quidem.
                </p>
              </div>
            </Link>
          ))}
        </section>
      </Section>
    </main>
  )
}
