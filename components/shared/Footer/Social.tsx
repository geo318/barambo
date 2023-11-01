import Link from 'next/link'
import { Fb, In, Yt, Tw } from '/components'

export const Social = () => (
  <div className='flex gap-3 mr-auto'>
    <Link href='https://www.facebook.com/barambo' target='_blank'>
      <Fb />
    </Link>
    <Link href='https://www.instagram.com/barambo' target='_blank'>
      <Tw />
    </Link>
    <Link href='https://t.me/barambo' target='_blank'>
      <Yt />
    </Link>
    <Link href='https://www.linkedin.com/company/barambo' target='_blank'>
      <In />
    </Link>
  </div>
)
