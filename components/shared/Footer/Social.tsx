import Link from 'next/link'
import { Fb, In, Yt, Tw } from '/components'

export const Social = () => (
  <div className='flex gap-3 lg:mr-auto lg:ml-0 ml-auto'>
    <Link href='https://www.facebook.com/barambo' target='_blank'>
      <Fb className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://www.instagram.com/barambo' target='_blank'>
      <Tw className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://t.me/barambo' target='_blank'>
      <Yt className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
    <Link href='https://www.linkedin.com/company/barambo' target='_blank'>
      <In className='lg:w-full lg:h-full w-8 h-8' />
    </Link>
  </div>
)
