import Link from 'next/link'
import { android, apple } from '/public'
import Image from 'next/image'

export const DownloadApp = ({ text }: { text?: string }) => (
  <section className='px-16 pb-10 lg:pb-16'>
    {text && <h2 className='pb-10 text-xl font-bold'>{text}</h2>}
    <div className='flex gap-5'>
      <Link
        href='https://apps.apple.com/us/app/wallypay/id1499628677'
        target='_blank'
      >
        <Image src={apple} alt='apple' draggable={false} height={60} />
      </Link>
      <Link
        href='https://play.google.com/store/apps/details?id=com.wallypay'
        target='_blank'
      >
        <Image src={android} alt='android' draggable={false} height={60} />
      </Link>
    </div>
  </section>
)
