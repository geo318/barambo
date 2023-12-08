import Link from 'next/link'
import { Fb, Ig, Yt, Tk } from '/components'

export const Social = () => (
  <div className='flex gap-3 lg:mr-auto lg:ml-0 ml-auto'>
    <Link href='https://www.facebook.com/barambo.ge' target='_blank'>
      <Fb className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://www.tiktok.com/@barambo_?lang=en' target='_blank'>
      <Tk className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://www.youtube.com/@BaramboChannel' target='_blank'>
      <Yt className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://www.linkedin.com/barmchocolate' target='_blank'>
      <Ig className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
  </div>
)
