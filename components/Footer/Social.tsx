import Link from 'next/link'
import { Facebook, Instagram, LinkedIn, Telegram, WhatsApp } from '../icons'

export const Social = () => (
  <div className='flex gap-5 place-self-center'>
    <Link href='https://www.facebook.com/wallypay' target='_blank'>
      <Facebook />
    </Link>
    <Link href='https://www.instagram.com/wallypay_georgia' target='_blank'>
      <Instagram />
    </Link>
    <Link href='https://t.me/wallypay' target='_blank'>
      <Telegram />
    </Link>
    <Link href='https://www.linkedin.com/company/wallypay' target='_blank'>
      <LinkedIn />
    </Link>
    <Link href='https://wa.me/15551234567' target='_blank'>
      <WhatsApp />
    </Link>
  </div>
)
